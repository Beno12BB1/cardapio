-- ==============================================
-- CARDÁPIO DIGITAL — Dados de Exemplo
-- Execute setup.sql primeiro, depois este arquivo
-- Cole e execute no SQL Editor do Supabase
-- ==============================================

-- CATEGORIAS
insert into public.categorias (nome, descricao, ativo) values
  ('Pizzas',       'Pizzas artesanais com massa fina e ingredientes frescos', true),
  ('Hambúrgueres', 'Hambúrgueres artesanais com blend especial da casa',      true),
  ('Bebidas',      'Refrigerantes, sucos naturais e drinks gelados',          true),
  ('Sobremesas',   'Doces e sobremesas para finalizar com chave de ouro',     true);

-- PRATOS
insert into public.pratos (nome, descricao, preco, tempo_preparo, disponivel, emoji, categoria_id) values

  -- Pizzas
  ('Pizza Margherita',
   'Molho de tomate artesanal, mussarela de búfala e manjericão fresco',
   45.90, 30, true, '🍕',
   (select id from public.categorias where nome = 'Pizzas')),

  ('Pizza Calabresa',
   'Molho de tomate, calabresa acebolada fatiada e mussarela',
   48.90, 30, true, '🍕',
   (select id from public.categorias where nome = 'Pizzas')),

  -- Hambúrgueres
  ('X-Burguer Clássico',
   'Blend 180g, queijo cheddar, alface, tomate e molho especial da casa',
   32.90, 20, true, '🍔',
   (select id from public.categorias where nome = 'Hambúrgueres')),

  ('X-Bacon Double',
   'Dois blends 150g, bacon crocante, cheddar duplo e cebola caramelizada',
   42.90, 25, true, '🍔',
   (select id from public.categorias where nome = 'Hambúrgueres')),

  -- Bebidas
  ('Coca-Cola 350ml',
   'Refrigerante gelado em lata',
   8.90, 2, true, '🥤',
   (select id from public.categorias where nome = 'Bebidas')),

  ('Suco de Laranja Natural',
   'Suco feito na hora com laranjas selecionadas — 400ml',
   12.90, 5, true, '🍊',
   (select id from public.categorias where nome = 'Bebidas')),

  -- Sobremesas
  ('Petit Gateau',
   'Bolinho de chocolate quente com sorvete de baunilha',
   22.90, 15, true, '🍫',
   (select id from public.categorias where nome = 'Sobremesas')),

  ('Pudim de Leite Condensado',
   'Receita tradicional da casa, porção individual',
   14.90, 5, true, '🍮',
   (select id from public.categorias where nome = 'Sobremesas'));
