-- Odogwu Database Schema

-- Merchants table (must be created before gifts)
create table merchants (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  category     text,
  city         text,
  address      text,
  email        text unique not null,
  phone        text,
  commission_rate integer default 12,
  balance      integer default 0,
  active       boolean default false,
  created_at   timestamptz default now()
);

-- Gifts table
create table gifts (
  id           uuid primary key default gen_random_uuid(),
  code         text unique not null default upper(substring(md5(random()::text), 1, 8)),
  sender_name  text not null,
  sender_email text,
  recipient_phone text not null,
  amount       integer not null, -- in pence
  message      text,
  occasion     text default 'celebration',
  status       text default 'pending', -- pending | paid | delivered | redeemed | expired
  stripe_payment_id text,
  whatsapp_sent_at timestamptz,
  redeemed_at  timestamptz,
  merchant_id  uuid references merchants(id),
  expires_at   timestamptz default now() + interval '12 months',
  created_at   timestamptz default now()
);



-- Redemptions table
create table redemptions (
  id          uuid primary key default gen_random_uuid(),
  gift_id     uuid references gifts(id) not null,
  merchant_id uuid references merchants(id) not null,
  amount      integer not null,
  merchant_receives integer not null, -- amount - commission
  created_at  timestamptz default now()
);

-- RLS Policies
alter table gifts enable row level security;
alter table merchants enable row level security;
alter table redemptions enable row level security;

-- Anyone can read a gift by code (for reveal page)
create policy "Public read gift by code"
  on gifts for select using (true);

-- Service role can do everything
create policy "Service role full access gifts"
  on gifts for all using (auth.role() = 'service_role');

create policy "Service role full access merchants"
  on merchants for all using (auth.role() = 'service_role');

create policy "Service role full access redemptions"
  on redemptions for all using (auth.role() = 'service_role');

-- Merchants can read their own record
create policy "Merchant read own"
  on merchants for select using (true);
