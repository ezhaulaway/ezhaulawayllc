-- Tighten the public insert rule for quote requests so it matches the limits the site's form
-- enforces. Without this, anyone holding the public key could insert rows of any size or status
-- straight into the table, bypassing the form.
DROP POLICY IF EXISTS "Anyone can submit a quote request" ON public.quote_requests;

CREATE POLICY "Anyone can submit a quote request"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND char_length(trim(name)) BETWEEN 1 AND 100
  AND char_length(trim(phone)) BETWEEN 1 AND 30
  AND char_length(trim(location)) BETWEEN 1 AND 100
  AND char_length(trim(details)) BETWEEN 1 AND 2000
  AND coalesce(array_length(photo_paths, 1), 0) <= 10
  AND char_length(array_to_string(photo_paths, '')) <= 1200
);

-- AI estimate leads are inserted with the service role. Main already dropped the
-- public insert policy and revoked anon/authenticated INSERT
-- (drizzle/migrations/0001_lock_ai_estimate_inserts.sql). Repeat that lock here so
-- applying this migration cannot open the table to the public key again.
DROP POLICY IF EXISTS "Anyone can submit an AI estimate request" ON public.ai_estimate_requests;
REVOKE INSERT ON public.ai_estimate_requests FROM anon, authenticated;
GRANT ALL ON public.ai_estimate_requests TO service_role;

-- Quote photos: cap each file at 25 MB if no cap is set yet (phone photos are well under this).
UPDATE storage.buckets
SET file_size_limit = 26214400
WHERE id = 'quote-photos' AND file_size_limit IS NULL;
