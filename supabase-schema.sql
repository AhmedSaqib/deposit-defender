-- Run this in your Supabase SQL editor

-- v2 migration: run this if you already created the table
-- alter table sales add column if not exists status text not null default 'sold';

create table if not exists sales (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  item_name text not null,
  category text not null default 'other',
  platform text not null,
  cost_of_goods numeric(10,2) not null default 0,
  sale_price numeric(10,2) not null,
  shipping_cost numeric(10,2) not null default 0,
  sale_date date not null,
  notes text,
  status text not null default 'sold',
  created_at timestamptz default now() not null
);

alter table sales enable row level security;

create policy "Users own their sales"
  on sales for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── Expenses ──────────────────────────────────────────────────────────────────
create table if not exists expenses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  description text not null,
  amount numeric(10,2) not null,
  category text not null,
  expense_date date not null,
  notes text,
  created_at timestamptz default now() not null
);
alter table expenses enable row level security;
create policy "Users own their expenses" on expenses for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Sourcing trips ────────────────────────────────────────────────────────────
create table if not exists sourcing_trips (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  trip_date date not null,
  total_spent numeric(10,2) not null default 0,
  notes text,
  created_at timestamptz default now() not null
);
alter table sourcing_trips enable row level security;
create policy "Users own their trips" on sourcing_trips for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Migrations (run these if you already created the tables above) ────────────
-- alter table sales add column if not exists status text not null default 'sold';
-- alter table sales add column if not exists sourcing_trip_id uuid references sourcing_trips(id) on delete set null;

-- ── Applied migrations ────────────────────────────────────────────────────────
-- Backfill + lock down sales.status (run once, already applied on prod)
-- update sales set status = 'sold' where status is null;
-- alter table sales alter column status set default 'sold';
-- alter table sales alter column status set not null;
-- alter table sales add constraint sales_status_check check (status in ('sold', 'returned'));
