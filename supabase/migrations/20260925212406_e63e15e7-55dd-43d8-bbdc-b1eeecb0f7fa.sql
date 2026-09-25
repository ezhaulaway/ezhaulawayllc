-- ai_estimate_requests
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_estimate_requests TO authenticated;
GRANT ALL ON public.ai_estimate_requests TO service_role;
CREATE POLICY "Staff and admin can update AI estimate requests" ON public.ai_estimate_requests
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
CREATE POLICY "Admins can delete AI estimate requests" ON public.ai_estimate_requests
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- quote_requests
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quote_requests TO authenticated;
GRANT ALL ON public.quote_requests TO service_role;
CREATE POLICY "Staff and admin can update quote requests" ON public.quote_requests
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
CREATE POLICY "Admins can delete quote requests" ON public.quote_requests
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- jobs_and_schedule
CREATE TABLE public.jobs_and_schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  customer_name text,
  phone text,
  address text,
  scheduled_at timestamptz,
  status text NOT NULL DEFAULT 'scheduled',
  load_size text,
  price numeric,
  notes text,
  assigned_crew text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.jobs_and_schedule TO authenticated;
GRANT ALL ON public.jobs_and_schedule TO service_role;
ALTER TABLE public.jobs_and_schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff and admin can view jobs" ON public.jobs_and_schedule FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
CREATE POLICY "Staff and admin can add jobs" ON public.jobs_and_schedule FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
CREATE POLICY "Staff and admin can update jobs" ON public.jobs_and_schedule FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
CREATE POLICY "Admins can delete jobs" ON public.jobs_and_schedule FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- customers
CREATE TABLE public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  address text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customers TO authenticated;
GRANT ALL ON public.customers TO service_role;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff and admin can view customers" ON public.customers FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
CREATE POLICY "Staff and admin can add customers" ON public.customers FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
CREATE POLICY "Staff and admin can update customers" ON public.customers FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
CREATE POLICY "Admins can delete customers" ON public.customers FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- user_roles: own-read policy already exists; add admin full control
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can add roles" ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can update roles" ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));