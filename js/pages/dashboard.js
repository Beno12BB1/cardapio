import '../../css/style.css'
import { verificarAutenticacao } from '../auth.js'
import { renderSidebar } from '../ui/sidebar.js'
import { renderHeader, setTitulo } from '../ui/header.js'
import { heroicon } from '../ui/icons.js'
import { supabase } from '../supabase.js'
import Swal from 'sweetalert2'

async function init() {
  const usuario = await verificarAutenticacao()
  if (!usuario) return
  renderSidebar('dashboard')
  renderHeader(usuario)
  setTitulo('Dashboard')

  const nome = usuario.user_metadata?.full_name || usuario.email.split('@')[0]
  const hora = new Date().getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'
  document.getElementById('boas-vindas').innerHTML = `
    <div>
      <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">${saudacao}, ${nome}! 👋</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Aqui está o resumo do seu cardápio.</p>
    </div>`

  await carregarDados()
  document.body.style.visibility = 'visible'
}

async function carregarDados() {
  try {
    const [
      { count: totalPratos },
      { count: pratosDisponiveis },
      { count: totalCategorias },
      { count: categoriasAtivas },
      { data: pratosRecentes },
      { data: categorias },
    ] = await Promise.all([
      supabase.from('pratos').select('*', { count: 'exact', head: true }),
      supabase.from('pratos').select('*', { count: 'exact', head: true }).eq('disponivel', true),
      supabase.from('categorias').select('*', { count: 'exact', head: true }),
      supabase.from('categorias').select('*', { count: 'exact', head: true }).eq('ativo', true),
      supabase.from('pratos')
        .select('id, nome, preco, disponivel, categorias(nome)')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase.from('categorias')
        .select('id, nome, descricao, ativo')
        .eq('ativo', true)
        .order('nome')
        .limit(6),
    ])

    renderCards(totalPratos, pratosDisponiveis, totalCategorias, categoriasAtivas)
    renderPratosRecentes(pratosRecentes || [])
    renderCategorias(categorias || [])
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Erro ao carregar dados', text: err.message })
  }
}

function renderCards(totalPratos, disponiveis, totalCats, catsAtivas) {
  const dados = [
    { label: 'Total de Pratos',       valor: totalPratos,  icon: 'book-open', cor: 'bg-orange-500' },
    { label: 'Pratos Disponíveis',    valor: disponiveis,  icon: 'check-circle', cor: 'bg-green-500' },
    { label: 'Total de Categorias',   valor: totalCats,    icon: 'tag',       cor: 'bg-blue-500' },
    { label: 'Categorias Ativas',     valor: catsAtivas,   icon: 'chart-bar', cor: 'bg-purple-500' },
  ]
  document.getElementById('cards').innerHTML = dados.map(c => `
    <div class="card flex items-center gap-4">
      <div class="p-3 rounded-xl ${c.cor} text-white shrink-0">${heroicon(c.icon, 'w-6 h-6')}</div>
      <div>
        <div class="text-3xl font-bold text-slate-800 dark:text-slate-100">${c.valor ?? 0}</div>
        <div class="text-sm text-slate-500 dark:text-slate-400">${c.label}</div>
      </div>
    </div>`).join('')
}

function renderPratosRecentes(pratos) {
  const el = document.getElementById('lista-pratos-recentes')
  if (!pratos.length) {
    el.innerHTML = '<p class="text-slate-400 text-sm">Nenhum prato cadastrado ainda.</p>'
    return
  }
  el.innerHTML = pratos.map(p => {
    const badge = p.disponivel
      ? '<span class="badge-disponivel">Disponível</span>'
      : '<span class="badge-indisponivel">Indisponível</span>'
    return `
      <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
        <div>
          <div class="font-medium text-sm">${p.nome}</div>
          <div class="text-xs text-slate-400">${p.categorias?.nome || 'Sem categoria'}</div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm font-semibold text-orange-600 dark:text-orange-400">
            R$ ${Number(p.preco).toFixed(2)}
          </span>
          ${badge}
        </div>
      </div>`
  }).join('')
}

function renderCategorias(cats) {
  const el = document.getElementById('lista-categorias')
  if (!cats.length) {
    el.innerHTML = '<p class="text-slate-400 text-sm">Nenhuma categoria ativa.</p>'
    return
  }
  el.innerHTML = cats.map(c => `
    <div class="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <div class="w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
      <div>
        <div class="text-sm font-medium">${c.nome}</div>
        ${c.descricao ? `<div class="text-xs text-slate-400">${c.descricao}</div>` : ''}
      </div>
    </div>`).join('')
}

init()
