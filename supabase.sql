-- sofa.ai: Supabase -> SQL Editor -> New query -> shu kodni qo'yib "Run" bosing.

create table public.profiles (
  id uuid primary key,
  first_name text not null,
  last_name text not null,
  phone text not null,
  created_at timestamptz not null default now()
);

create table public.results (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  section text not null check (section in ('reading', 'listening', 'writing', 'speaking')),
  band numeric(2, 1) not null,
  details jsonb,
  created_at timestamptz not null default now()
);

-- Xavfsizlik: ilova faqat QO'SHA oladi, o'qiy olmaydi (ma'lumotni faqat siz dashboard'da ko'rasiz).
alter table public.profiles enable row level security;
alter table public.results enable row level security;

create policy "ilova foydalanuvchi qo'sha oladi" on public.profiles for insert to anon with check (true);
create policy "ilova natija qo'sha oladi" on public.results for insert to anon with check (true);
