CREATE TABLE public.ai_estimate_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  description TEXT NOT NULL,
  photo_count INTEGER NOT NULL DEFAULT 0,
  load_size TEXT,
  price_low NUMERIC,
  price_high NUMERIC,
  items_identified TEXT[] NOT NULL DEFAULT '{}'::text[],
  summary TEXT,
  status TEXT NOT NULL DEFAULT 'new'
);

GRANT SELECT ON public.ai_estimate_requests TO authenticated;
GRANT INSERT ON public.ai_estimate_requests TO anon, authenticated;
GRANT ALL ON public.ai_estimate_requests TO service_role;

ALTER TABLE public.ai_estimate_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an AI estimate request"
ON public.ai_estimate_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins and staff can view AI estimate requests"
ON public.ai_estimate_requests
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles ur
  WHERE ur.user_id = auth.uid()
    AND ur.role = ANY (ARRAY['admin'::app_role, 'staff'::app_role])
));