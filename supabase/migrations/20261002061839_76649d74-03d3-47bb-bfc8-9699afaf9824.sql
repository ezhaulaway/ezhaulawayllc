CREATE TABLE public.estimate_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  city text,
  region text,
  country text,
  device text,
  description text,
  photo_count integer NOT NULL DEFAULT 0,
  load_size text,
  price_low numeric,
  price_high numeric,
  items_identified text[] NOT NULL DEFAULT '{}',
  input_tokens integer,
  output_tokens integer,
  est_credits numeric,
  locked_in boolean NOT NULL DEFAULT false,
  locked_in_at timestamptz
);
GRANT SELECT ON public.estimate_events TO authenticated;
GRANT ALL ON public.estimate_events TO service_role;
ALTER TABLE public.estimate_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff and admin can view estimate events" ON public.estimate_events
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));