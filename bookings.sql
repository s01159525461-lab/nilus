-- ===========================================================================
-- إعداد قاعدة بيانات نيلوس على Supabase
-- شغّل الكود ده مرة واحدة من: Supabase Dashboard → SQL Editor → New query → Run
-- ===========================================================================

-- 1) جدول الحجوزات
create table if not exists public.bookings (
  id           text primary key,
  full_name    text not null,
  phone        text not null,
  email        text,
  destination  text,
  start_date   date,
  days         integer default 1,
  people       integer default 1,
  activities   text[] default '{}',
  notes        text,
  status       text default 'قيد المراجعة',
  created_at   timestamptz default now()
);

-- 2) تفعيل الحماية على مستوى الصفوف (Row Level Security)
alter table public.bookings enable row level security;

-- 3) أي حد زائر للموقع يقدر "يضيف" حجز بس (فورم الحجز العادي)
drop policy if exists "Public can create bookings" on public.bookings;
create policy "Public can create bookings"
  on public.bookings
  for insert
  to anon
  with check (true);

-- 4) بس الأدمن اللي عامل تسجيل دخول (authenticated) يقدر يشوف/يعدّل/يحذف
drop policy if exists "Authenticated can view bookings" on public.bookings;
create policy "Authenticated can view bookings"
  on public.bookings
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can update bookings" on public.bookings;
create policy "Authenticated can update bookings"
  on public.bookings
  for update
  to authenticated
  using (true);

drop policy if exists "Authenticated can delete bookings" on public.bookings;
create policy "Authenticated can delete bookings"
  on public.bookings
  for delete
  to authenticated
  using (true);

-- 5) فهرس بسيط يسرّع الترتيب والبحث بالتاريخ
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);

-- ===========================================================================
-- خطوة أخيرة (مش SQL): اعمل مستخدم أدمن حقيقي
-- من: Authentication → Users → Add user
-- حط إيميل وباسورد لفريق العمل، وده اللي هيدخل بيه على admin.html
-- (تقدر تضيف أكتر من مستخدم لو أكتر من حد هيدخل يدير الحجوزات)
-- ===========================================================================
