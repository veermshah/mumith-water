-- Mumith Water: lead capture tables.
-- Run in the Supabase SQL editor (or `supabase db push` if you use the CLI).

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null unique check (char_length(email) <= 254),
  use_case text check (use_case in ('campus', 'gym', 'events', 'other'))
);

create table if not exists public.sponsor_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  company text not null check (char_length(company) between 1 and 160),
  email text not null check (char_length(email) <= 254),
  company_size text not null,
  bottle_quantity text not null,
  message text check (char_length(message) <= 2000)
);

-- Row Level Security: the public (anon) key may insert, but never read, update or delete.
alter table public.waitlist enable row level security;
alter table public.sponsor_leads enable row level security;

drop policy if exists "anon can insert waitlist" on public.waitlist;
create policy "anon can insert waitlist" on public.waitlist
  for insert to anon with check (true);

drop policy if exists "anon can insert sponsor leads" on public.sponsor_leads;
create policy "anon can insert sponsor leads" on public.sponsor_leads
  for insert to anon with check (true);

grant insert on public.waitlist to anon;
grant insert on public.sponsor_leads to anon;
