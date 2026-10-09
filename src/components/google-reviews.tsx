import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GOOGLE_REVIEWS_URL, reviews as fallbackReviews } from "@/content/site";
import { getGoogleReviews, type GoogleReview } from "@/lib/google-reviews.functions";

const fallback: GoogleReview[] = fallbackReviews.map((review) => ({
  name: review.name,
  text: review.text,
  rating: 5,
  relativeTime: "",
  authorPhoto: null,
  reviewUrl: null,
}));

export function GoogleReviewsGrid() {
  const fetchReviews = useServerFn(getGoogleReviews);
  const { data } = useQuery({
    queryKey: ["google-reviews"],
    queryFn: () => fetchReviews(),
    staleTime: 1000 * 60 * 60,
  });

  const live = data?.reviews ?? [];
  const list = live.length > 0 ? live : fallback;
  const mapsUri = data?.mapsUri ?? GOOGLE_REVIEWS_URL;

  return (
    <>
      {data?.rating && data.totalCount ? (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {data.rating.toFixed(1)} out of 5 from {data.totalCount} Google reviews
        </p>
      ) : null}
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {list.slice(0, 6).map((review) => (
          <article
            key={`${review.name}-${review.text.slice(0, 24)}`}
            className="flex flex-col rounded-lg border border-border bg-card p-7 shadow-sm"
          >
            <div role="img" className="flex gap-1 text-primary" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={index < Math.round(review.rating) ? "size-5 fill-current" : "size-5 opacity-30"}
                />
              ))}
            </div>
            <p className="mt-6 flex-1 leading-7 text-foreground">“{review.text}”</p>
            <div className="mt-8 flex items-center gap-3 border-t border-border pt-5">
              {review.authorPhoto ? (
                <img
                  src={review.authorPhoto}
                  alt={`${review.name} on Google`}
                  loading="lazy"
                  className="size-9 rounded-full object-cover"
                />
              ) : null}
              <div>
                <p className="font-display font-bold text-foreground">{review.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Google Review{review.relativeTime ? ` · ${review.relativeTime}` : ""}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button asChild variant="outline">
          <a href={mapsUri} target="_blank" rel="noopener noreferrer">
            Read More Reviews on Google
          </a>
        </Button>
        <Button asChild>
          <a href={`${mapsUri}`} target="_blank" rel="noopener noreferrer">
            Leave Us a Review
          </a>
        </Button>
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
        Just hauled for you? Mentioning what we took and your town — like “hot tub removal in Castle Rock”
        or “shed tear-down in Parker” — helps your neighbors find us when they search for the same job.
      </p>
    </>
  );
}
