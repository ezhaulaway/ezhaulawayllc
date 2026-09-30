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
);