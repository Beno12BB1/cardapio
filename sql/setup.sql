-- ==============================================
-- CARDÁPIO DIGITAL — Setup do Supabase
-- Cole e execute no SQL Editor do Supabase
-- ==============================================

-- CATEGORIAS
create table if not exists public.categorias (
  id          uuid primary key default gen_random_uuid(),
  nome        text not null unique,
  descricao   text,
  ativo       boolean not null default true,
  created_at  timestamptz default now()
);

-- PRATOS (FK → categorias)
create table if not exists public.pratos (
  id            uuid primary key default gen_random_uuid(),
  nome          text not null,
  descricao     text,
  preco         numeric(10,2) not null,
  tempo_preparo integer,           -- em minutos
  disponivel    boolean not null default true,
  emoji         text default '🍽️',
  categoria_id  uuid references public.categorias(id) on delete set null,
  created_at    timestamptz default now()
);

-- Se a tabela já existia, rode para adicionar a coluna:
-- alter table public.pratos add column if not exists emoji text default '🍽️';

-- ================================================
-- ROW LEVEL SECURITY
-- ================================================
alter table public.categorias enable row level security;
alter table public.pratos     enable row level security;

-- Qualquer usuário autenticado pode ver e gerenciar
create policy "categorias_autenticado" on public.categorias
  for all using (auth.role() = 'authenticated');

create policy "pratos_autenticado" on public.pratos
  for all using (auth.role() = 'authenticated');

-- ================================================
-- GRANTS
-- ================================================
grant usage on schema public to authenticated;
grant all on public.categorias to authenticated;
grant all on public.pratos     to authenticated;
