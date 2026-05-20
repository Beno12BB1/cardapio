-- =====================================================
-- CARDÁPIO DIGITAL — Configuração do Supabase Storage
-- Cole e execute no SQL Editor do Supabase
-- =====================================================

-- 1. Cria o bucket público "pratos"
insert into storage.buckets (id, name, public)
values ('pratos', 'pratos', true)
on conflict (id) do nothing;

-- 2. Qualquer pessoa pode VER as imagens (necessário para exibir no cardápio)
create policy "Imagens públicas — leitura"
  on storage.objects for select
  using (bucket_id = 'pratos');

-- 3. Somente usuários autenticados podem ENVIAR imagens
create policy "Upload autenticado"
  on storage.objects for insert
  with check (bucket_id = 'pratos' and auth.role() = 'authenticated');

-- 4. Somente usuários autenticados podem ATUALIZAR imagens
create policy "Update autenticado"
  on storage.objects for update
  using (bucket_id = 'pratos' and auth.role() = 'authenticated');

-- 5. Somente usuários autenticados podem DELETAR imagens
create policy "Delete autenticado"
  on storage.objects for delete
  using (bucket_id = 'pratos' and auth.role() = 'authenticated');
