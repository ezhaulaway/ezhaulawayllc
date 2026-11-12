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

-- Same idea for the estimate leads table: cap the fields the earlier rule left open.
DROP POLICY IF EXISTS "Anyone can submit an AI estimate request" ON public.ai_estimate_requests;

CREATE POLICY "Anyone can submit an AI estimate request"
ON public.ai_estimate_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND char_length(trim(name)) BETWEEN 1 AND 100
  AND char_length(trim(phone)) BETWEEN 1 AND 30
  AND char_length(trim(description)) BETWEEN 1 AND 2000
  AND photo_count >= 0 AND photo_count <= 10
  AND char_length(coalesce(address, '')) <= 200
  AND char_length(coalesce(load_size, '')) <= 60
  AND char_length(coalesce(summary, '')) <= 2000
  AND coalesce(array_length(items_identified, 1), 0) <= 30
  AND char_length(array_to_string(items_identified, '')) <= 6000
);

-- Quote photos: cap each file at 25 MB if no cap is set yet (phone photos are well under this).
UPDATE storage.buckets
SET file_size_limit = 26214400
WHERE id = 'quote-photos' AND file_size_limit IS NULL;
