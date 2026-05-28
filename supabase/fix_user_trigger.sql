-- Fix: make the new-user trigger resilient
-- Run this in Supabase Dashboard → SQL Editor

-- 1. Recreate the function with ON CONFLICT + null safety
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.email, '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- 2. Re-attach the trigger (safe to re-run)
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Grant insert on profiles to the trigger's execution role
grant insert on public.profiles to postgres;
grant insert on public.profiles to service_role;
