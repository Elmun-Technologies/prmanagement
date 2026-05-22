-- ══════════════════════════════════════════════════════════════════
-- MoySklad Launch — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- ══════════════════════════════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ──────────────────────────────────────────────────────────────────
-- 1. PROFILES — User roles and metadata
-- ──────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  role_id     text not null default 'jamoa',
  display_name text,
  avatar_emoji text default '👤',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, role_id, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'role_id', 'jamoa'),
    coalesce(new.raw_user_meta_data->>'display_name', new.email)
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ──────────────────────────────────────────────────────────────────
-- 2. TASK_STATUSES — Task completion per task_id
-- ──────────────────────────────────────────────────────────────────
create table if not exists public.task_statuses (
  task_id     text primary key,
  status      text not null default 'pending'
              check (status in ('pending', 'inprogress', 'done')),
  updated_by  uuid references public.profiles(id),
  updated_at  timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────────
-- 3. KPI_VALUES — Key performance indicator numbers
-- ──────────────────────────────────────────────────────────────────
create table if not exists public.kpi_values (
  key         text primary key,
  value       numeric not null default 0,
  updated_by  uuid references public.profiles(id),
  updated_at  timestamptz default now()
);

-- Insert default KPI keys
insert into public.kpi_values (key, value) values
  ('leads', 0),
  ('registrations', 0),
  ('attendees', 0),
  ('seminarSales', 0),
  ('courseSales', 0),
  ('callsMade', 0),
  ('adsSpend', 0),
  ('currentDay', -30)
on conflict (key) do nothing;

-- ──────────────────────────────────────────────────────────────────
-- 4. STANDUPS — Daily standup entries
-- ──────────────────────────────────────────────────────────────────
create table if not exists public.standups (
  id            uuid primary key default gen_random_uuid(),
  date          date not null,
  role_id       text not null,
  role_name     text,
  role_emoji    text,
  yesterday     text default '',
  today         text not null,
  blockers      text default '',
  mood          smallint default 3 check (mood between 1 and 5),
  submitted_by  uuid references public.profiles(id),
  submitted_at  timestamptz default now(),
  unique(date, role_id)
);

-- ──────────────────────────────────────────────────────────────────
-- 5. BONUS_UNLOCKS — Which bonuses have been revealed
-- ──────────────────────────────────────────────────────────────────
create table if not exists public.bonus_unlocks (
  bonus_id      text primary key,
  unlocked_by   uuid references public.profiles(id),
  unlocked_at   timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────────
-- 6. ORG_NODES — Organizational chart nodes
-- ──────────────────────────────────────────────────────────────────
create table if not exists public.org_nodes (
  id            text primary key,
  parent_id     text,
  name          text not null,
  title         text default '',
  emoji         text default '👤',
  color         text default '',
  department    text default 'Operations',
  level         integer default 3,
  is_external   boolean default false,
  is_vacant     boolean default false,
  sort_order    integer default 0,
  updated_at    timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────────
-- 7. MEMBER_CONTACTS — Real contact info per role
-- ──────────────────────────────────────────────────────────────────
create table if not exists public.member_contacts (
  role_id       text primary key,
  real_name     text default '',
  phone         text default '',
  telegram      text default '',
  updated_at    timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────────
-- 8. CUSTOM_MEMBERS — Dynamically added team members
-- ──────────────────────────────────────────────────────────────────
create table if not exists public.custom_members (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  role_label    text default '',
  emoji         text default '👤',
  phone         text default '',
  telegram      text default '',
  note          text default '',
  added_at      timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────────
-- 9. TASK_RESOURCES — Document attachments per task
-- ──────────────────────────────────────────────────────────────────
create table if not exists public.task_resources (
  id            serial primary key,
  task_id       text not null,
  resource_type text not null,
  label         text not null,
  url           text not null,
  hint          text default '',
  required      boolean default false,
  added_at      timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────────
-- 10. TASK_RESULT_LINKS — Submitted work URLs
-- ──────────────────────────────────────────────────────────────────
create table if not exists public.task_result_links (
  task_id       text primary key,
  url           text not null,
  submitted_by  uuid references public.profiles(id),
  submitted_at  timestamptz default now()
);

-- ──────────────────────────────────────────────────────────────────
-- 11. ANNOUNCEMENTS — Team-wide announcements from Producer
-- ──────────────────────────────────────────────────────────────────
create table if not exists public.announcements (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  body          text not null,
  emoji         text default '📢',
  priority      text default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  posted_by     uuid references public.profiles(id),
  posted_at     timestamptz default now(),
  expires_at    timestamptz,
  is_pinned     boolean default false
);

-- ──────────────────────────────────────────────────────────────────
-- 12. USER_XP — Gamification: XP and streaks per user
-- ──────────────────────────────────────────────────────────────────
create table if not exists public.user_xp (
  user_id       uuid primary key references public.profiles(id) on delete cascade,
  total_xp      integer default 0,
  streak        integer default 0,
  last_active   date
);

-- ══════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ══════════════════════════════════════════════════════════════════

-- Enable RLS on all tables
alter table public.profiles        enable row level security;
alter table public.task_statuses   enable row level security;
alter table public.kpi_values      enable row level security;
alter table public.standups        enable row level security;
alter table public.bonus_unlocks   enable row level security;
alter table public.org_nodes       enable row level security;
alter table public.member_contacts enable row level security;
alter table public.custom_members  enable row level security;
alter table public.task_resources  enable row level security;
alter table public.task_result_links enable row level security;
alter table public.announcements   enable row level security;
alter table public.user_xp         enable row level security;

-- Helper: get current user's role
create or replace function public.get_my_role()
returns text language sql security definer stable as $$
  select role_id from public.profiles where id = auth.uid();
$$;

-- Helper: is current user a full-access role (Producer or Ops Manager)?
create or replace function public.is_full_access()
returns boolean language sql security definer stable as $$
  select get_my_role() in ('mentor', 'assistent');
$$;

-- ── Profiles: everyone can read all profiles, only own profile to update
create policy "profiles_read_all"   on public.profiles for select using (true);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- ── Task statuses: everyone reads, authenticated users write
create policy "tasks_read_all"   on public.task_statuses for select using (true);
create policy "tasks_insert"     on public.task_statuses for insert with check (auth.uid() is not null);
create policy "tasks_update"     on public.task_statuses for update using (auth.uid() is not null);

-- ── KPIs: everyone reads, only full-access roles write
create policy "kpi_read_all"     on public.kpi_values for select using (true);
create policy "kpi_write"        on public.kpi_values for all using (is_full_access()) with check (is_full_access());

-- ── Standups: everyone reads, can insert/update own standup
create policy "standups_read_all"   on public.standups for select using (true);
create policy "standups_insert"     on public.standups for insert with check (auth.uid() is not null);
create policy "standups_update_own" on public.standups for update using (submitted_by = auth.uid());

-- ── Bonuses: everyone reads/writes (unlocking is collaborative)
create policy "bonuses_read_all"  on public.bonus_unlocks for select using (true);
create policy "bonuses_insert"    on public.bonus_unlocks for insert with check (auth.uid() is not null);

-- ── Org nodes: everyone reads, full-access writes
create policy "org_read_all"   on public.org_nodes for select using (true);
create policy "org_write"      on public.org_nodes for all using (is_full_access()) with check (is_full_access());

-- ── Member contacts: everyone reads, full-access writes
create policy "contacts_read_all" on public.member_contacts for select using (true);
create policy "contacts_write"    on public.member_contacts for all using (is_full_access()) with check (is_full_access());

-- ── Custom members: everyone reads, full-access writes
create policy "custom_members_read" on public.custom_members for select using (true);
create policy "custom_members_write" on public.custom_members for all using (is_full_access()) with check (is_full_access());

-- ── Task resources: everyone reads, full-access or own role adds
create policy "resources_read_all" on public.task_resources for select using (true);
create policy "resources_insert"   on public.task_resources for insert with check (auth.uid() is not null);
create policy "resources_delete"   on public.task_resources for delete using (is_full_access());

-- ── Task result links: everyone reads, own submission
create policy "results_read_all"  on public.task_result_links for select using (true);
create policy "results_insert"    on public.task_result_links for insert with check (auth.uid() is not null);
create policy "results_update_own" on public.task_result_links for update using (submitted_by = auth.uid());

-- ── Announcements: everyone reads, full-access posts
create policy "ann_read_all" on public.announcements for select using (true);
create policy "ann_write"    on public.announcements for all using (is_full_access()) with check (is_full_access());

-- ── User XP: everyone reads all, own update
create policy "xp_read_all"   on public.user_xp for select using (true);
create policy "xp_upsert_own" on public.user_xp for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ══════════════════════════════════════════════════════════════════
-- REALTIME — Enable realtime on key tables
-- ══════════════════════════════════════════════════════════════════
-- Run these in Supabase Dashboard → Database → Replication
-- Or uncomment and run:
-- alter publication supabase_realtime add table public.task_statuses;
-- alter publication supabase_realtime add table public.kpi_values;
-- alter publication supabase_realtime add table public.standups;
-- alter publication supabase_realtime add table public.announcements;
-- alter publication supabase_realtime add table public.bonus_unlocks;
