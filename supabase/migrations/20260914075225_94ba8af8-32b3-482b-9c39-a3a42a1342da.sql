-- Roles infrastructure (separate table, never on profiles)
do $$ begin
  create type public.app_role as enum ('admin','staff','user');
exception when duplicate_object then null; end $$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

drop policy if exists "Users can view their own roles" on public.user_roles;
create policy "Users can view their own roles"
on public.user_roles for select to authenticated
using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Staff/admin can read submitted quote requests
grant select on public.quote_requests to authenticated;

drop policy if exists "Admins and staff can view quote requests" on public.quote_requests;
create policy "Admins and staff can view quote requests"
on public.quote_requests for select to authenticated
using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'staff'));

-- Tighten quote photo uploads: uuid folder, image extension, single nested file
drop policy if exists "Allow public uploads to quote-photos" on storage.objects;
create policy "Quote photo uploads into uuid folder"
on storage.objects for insert to anon, authenticated
with check (
  bucket_id = 'quote-photos'
  and array_length(storage.foldername(name), 1) = 1
  and (storage.foldername(name))[1] ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
  and lower(storage.extension(name)) in ('jpg','jpeg','png','webp','heic','heif','gif')
);

-- Staff/admin can read quote photos
drop policy if exists "Admins and staff can read quote photos" on storage.objects;
create policy "Admins and staff can read quote photos"
on storage.objects for select to authenticated
using (
  bucket_id = 'quote-photos'
  and (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'staff'))
);
