create extension if not exists pgcrypto;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  source text default 'website',
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy if not exists "Allow public insert to contact_messages"
on public.contact_messages
for insert
with check (true);

create policy if not exists "Allow authenticated read access to contact_messages"
on public.contact_messages
for select
using (auth.role() = 'authenticated');

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  category text,
  author text,
  published_at timestamptz not null default now(),
  reading_time text,
  content jsonb default '[]'::jsonb
);

alter table public.blog_posts enable row level security;

create policy if not exists "Blog posts are readable by everyone"
on public.blog_posts
for select
using (true);

create policy if not exists "Authenticated admins can manage blog posts"
on public.blog_posts
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create table if not exists public.site_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  body jsonb default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_pages enable row level security;

create policy if not exists "Site pages are readable by everyone"
on public.site_pages
for select
using (true);

create policy if not exists "Authenticated admins can manage site pages"
on public.site_pages
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
