import { createServerFn } from "@tanstack/react-start";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";
const CACHE_KEY = "ez-haulaway";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

/** Text query used to locate the business when no place id is configured. */
const BUSINESS_QUERY = "EZ Haulaway LLC junk removal Parker CO";

export type GoogleReview = {
  name: string;
  text: string;
  rating: number;
  relativeTime: string;
  authorPhoto: string | null;
  reviewUrl: string | null;
};

export type GoogleReviewsPayload = {
  reviews: GoogleReview[];
  rating: number | null;
  totalCount: number | null;
  mapsUri: string | null;
};

const EMPTY: GoogleReviewsPayload = { reviews: [], rating: null, totalCount: null, mapsUri: null };

type PlacesReview = {
  text?: { text?: string };
  originalText?: { text?: string };
  rating?: number;
  relativePublishTimeDescription?: string;
  authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
};

function gatewayHeaders(mapsKey: string, lovableKey: string, fieldMask: string) {
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": mapsKey,
    "Content-Type": "application/json",
    "X-Goog-FieldMask": fieldMask,
  };
}

async function readBody(response: Response) {
  const body = await response.text();
  return body;
}

async function resolvePlaceId(mapsKey: string, lovableKey: string): Promise<string | null> {
  const configured = process.env["GOOGLE_PLACE_ID"];
  if (configured) return configured;

  const response = await fetch(`${GATEWAY_URL}/places/v1/places:searchText`, {
    method: "POST",
    headers: gatewayHeaders(mapsKey, lovableKey, "places.id,places.displayName"),
    body: JSON.stringify({
      textQuery: BUSINESS_QUERY,
      regionCode: "US",
      pageSize: 5,
      locationBias: { circle: { center: { latitude: 39.5186, longitude: -104.7614 }, radius: 40000 } },
    }),
  });

  if (!response.ok) {
    console.error(`Google Places search failed [${response.status}]: ${await readBody(response)}`);
    return null;
  }

  const data = (await response.json()) as { places?: Array<{ id?: string; displayName?: { text?: string } }> };
  const match =
    data.places?.find((place) => (place.displayName?.text ?? "").toLowerCase().includes("haulaway")) ?? null;
  return match?.id ?? null;
}

async function fetchFromGoogle(): Promise<GoogleReviewsPayload> {
  const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
  const lovableKey = process.env["LOVABLE_API_KEY"];
  if (!mapsKey || !lovableKey) {
    console.error("Google Maps connector credentials are missing");
    return EMPTY;
  }

  const placeId = await resolvePlaceId(mapsKey, lovableKey);
  if (!placeId) return EMPTY;

  const response = await fetch(`${GATEWAY_URL}/places/v1/places/${encodeURIComponent(placeId)}`, {
    headers: gatewayHeaders(
      mapsKey,
      lovableKey,
      "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
    ),
  });

  if (!response.ok) {
    console.error(`Google Places details failed [${response.status}]: ${await readBody(response)}`);
    return EMPTY;
  }

  const data = (await response.json()) as {
    rating?: number;
    userRatingCount?: number;
    googleMapsUri?: string;
    reviews?: PlacesReview[];
  };

  const reviews: GoogleReview[] = (data.reviews ?? [])
    .map((review) => ({
      name: review.authorAttribution?.displayName?.trim() || "Google user",
      text: (review.text?.text ?? review.originalText?.text ?? "").trim(),
      rating: review.rating ?? 5,
      relativeTime: review.relativePublishTimeDescription ?? "",
      authorPhoto: review.authorAttribution?.photoUri ?? null,
      reviewUrl: review.authorAttribution?.uri ?? null,
    }))
    .filter((review) => review.text.length > 0);

  return {
    reviews,
    rating: data.rating ?? null,
    totalCount: data.userRatingCount ?? null,
    mapsUri: data.googleMapsUri ?? null,
  };
}

/**
 * Returns the business's latest Google reviews (max 5 from the Places API),
 * cached in the database for 6 hours so page views don't run up Maps usage.
 */
export const getGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReviewsPayload> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: cached } = await supabaseAdmin
      .from("google_reviews_cache")
      .select("payload, fetched_at")
      .eq("id", CACHE_KEY)
      .maybeSingle();

    const cachedPayload = (cached?.payload as GoogleReviewsPayload | null) ?? null;
    const fetchedAt = cached?.fetched_at ? new Date(cached.fetched_at).getTime() : 0;
    if (cachedPayload && Date.now() - fetchedAt < CACHE_TTL_MS) {
      return cachedPayload;
    }

    let fresh: GoogleReviewsPayload;
    try {
      fresh = await fetchFromGoogle();
    } catch (error) {
      console.error("Google reviews fetch threw", error);
      return cachedPayload ?? EMPTY;
    }

    const payload = fresh.reviews.length > 0 ? fresh : (cachedPayload ?? fresh);

    await supabaseAdmin
      .from("google_reviews_cache")
      .upsert({ id: CACHE_KEY, payload, fetched_at: new Date().toISOString() });

    return payload;
  },
);
