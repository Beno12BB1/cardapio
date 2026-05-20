# 🍕 Cardápio Digital

Sistema web completo de gestão de cardápio para restaurantes, desenvolvido como projeto acadêmico na **Fatec Itu**.

![Preview](https://via.placeholder.com/900x420/f97316/ffffff?text=🍕+Cardápio+Digital+-+Fatec+Itu)

## ✨ Funcionalidades

- 🔐 Autenticação segura com Supabase (login e cadastro)
- 📊 Dashboard com estatísticas e gráfico de pratos por categoria
- 🏷️ Gerenciamento completo de categorias (criar, editar, ativar/inativar, excluir)
- 🍽️ Gerenciamento de pratos com emoji, preço, tempo de preparo e disponibilidade
- 📋 Visualização do cardápio com filtros por categoria e busca por nome
- 🖨️ Impressão do cardápio em PDF
- 🌙 Modo escuro / claro
- 📱 Layout responsivo (desktop e mobile)

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 + CSS3 | Estrutura e estilo |
| JavaScript ES Modules | Lógica da aplicação |
| [Tailwind CSS v3](https://tailwindcss.com/) | Estilização utilitária |
| [Supabase](https://supabase.com/) | Banco de dados PostgreSQL e autenticação |
| [Vite v5](https://vitejs.dev/) | Bundler e servidor de desenvolvimento |
| [SweetAlert2](https://sweetalert2.github.io/) | Modais e alertas |

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Conta gratuita no [Supabase](https://supabase.com/)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/Beno12BB1/cardapio.git
cd cardapio

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Abra o .env e preencha com suas credenciais do Supabase
```

Edite o arquivo `.env`:
```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_KEY=sua_anon_key_aqui
```

```bash
# 4. Configure o banco de dados
# No Supabase, vá em SQL Editor e execute:
# - sql/setup.sql        (cria as tabelas)
# - sql/dados-exemplo.sql (popula com dados de teste)

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: [http://localhost:5173/cardapio/](http://localhost:5173/cardapio/)

## 📦 Build e Deploy

```bash
# Gerar build de produção
npm run build

# Publicar no GitHub Pages
npm run deploy
```

## 🌐 Link do Projeto

**[https://beno12bb1.github.io/cardapio/](https://beno12bb1.github.io/cardapio/)**

## 👥 Integrantes do Grupo

| Nome | GitHub |
|---|---|
| Integrante 1 | [@usuario](https://github.com/usuario) |
| Integrante 2 | [@usuario](https://github.com/usuario) |
| Integrante 3 | [@usuario](https://github.com/usuario) |

> 📚 Projeto desenvolvido para a disciplina de **Desenvolvimento Web** — [Fatec Itu](https://www.fatecitu.edu.br/)
