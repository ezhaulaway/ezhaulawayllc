DROP POLICY IF EXISTS "Anyone can submit an AI estimate request" ON public.ai_estimate_requests;
REVOKE INSERT ON public.ai_estimate_requests FROM anon, authenticated;
GRANT ALL ON public.ai_estimate_requests TO service_role;