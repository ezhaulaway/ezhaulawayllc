-- Avoid exposing a SECURITY DEFINER function through the API.
revoke all on function public.has_role(uuid, public.app_role) from anon, authenticated, public;

drop policy if exists "Admins and staff can view quote requests" on public.quote_requests;
create policy "Admins and staff can view quote requests"
on public.quote_requests for select to authenticated
using (
  exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid() and ur.role in ('admin','staff')
  )
);

drop policy if exists "Admins and staff can read quote photos" on storage.objects;
create policy "Admins and staff can read quote photos"
on storage.objects for select to authenticated
using (
  bucket_id = 'quote-photos'
  and exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid() and ur.role in ('admin','staff')
  )
);
