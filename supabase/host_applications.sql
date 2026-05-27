-- Host registration applications table
create table if not exists public.host_applications (
  id           uuid primary key default gen_random_uuid(),
  host_name    text not null,
  phone        text not null,
  email        text,
  village      text not null,
  district     text not null,
  state        text not null,
  stay_type    text not null,
  rooms        integer not null,
  description  text not null,
  status       text not null default 'pending',   -- pending | reviewed | approved | rejected
  created_at   timestamptz not null default now()
);

-- Allow anyone to insert (public form)
alter table public.host_applications enable row level security;

create policy "Anyone can submit application"
  on public.host_applications
  for insert
  with check (true);

-- Only authenticated users (admins) can read
create policy "Authenticated users can read applications"
  on public.host_applications
  for select
  using (auth.role() = 'authenticated');
