CREATE TABLE public.blg_articles (
  id bigint PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  previous_slugs text[] NOT NULL DEFAULT '{}',
  title text NOT NULL,
  meta_description text,
  hero_image_url text,
  language_code text,
  content_html text,
  json_ld jsonb,
  faq_json_ld jsonb,
  article_created_at timestamptz,
  article_updated_at timestamptz,
  synced_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blg_articles TO anon, authenticated;
GRANT ALL ON public.blg_articles TO service_role;
ALTER TABLE public.blg_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Blog articles are public" ON public.blg_articles FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX blg_articles_created_idx ON public.blg_articles (article_created_at DESC);
CREATE INDEX blg_articles_prev_slugs_idx ON public.blg_articles USING gin (previous_slugs);

CREATE TABLE public.blg_sync_state (
  id int PRIMARY KEY DEFAULT 1,
  list_offset int NOT NULL DEFAULT 0,
  list_complete boolean NOT NULL DEFAULT false,
  last_run_at timestamptz,
  lease_until timestamptz,
  next_allowed_at timestamptz,
  backoff_seconds int NOT NULL DEFAULT 0
);
GRANT ALL ON public.blg_sync_state TO service_role;
ALTER TABLE public.blg_sync_state ENABLE ROW LEVEL SECURITY;
INSERT INTO public.blg_sync_state (id) VALUES (1);

CREATE OR REPLACE FUNCTION public.blg_claim_lease()
RETURNS SETOF public.blg_sync_state
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.blg_sync_state SET lease_until = now() + interval '3 minutes', last_run_at = now()
  WHERE id = 1 AND (lease_until IS NULL OR lease_until < now())
  RETURNING *;
$$;
CREATE OR REPLACE FUNCTION public.blg_mark_call(_gap_ms int)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.blg_sync_state SET next_allowed_at = now() + make_interval(secs => _gap_ms / 1000.0),
    lease_until = now() + interval '3 minutes' WHERE id = 1;
$$;
REVOKE ALL ON FUNCTION public.blg_claim_lease() FROM public, anon, authenticated;
REVOKE ALL ON FUNCTION public.blg_mark_call(int) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.blg_claim_lease() TO service_role;
GRANT EXECUTE ON FUNCTION public.blg_mark_call(int) TO service_role;