import '../../css/style.css'
import { verificarAutenticacao } from '../auth.js'
import { renderSidebar } from '../ui/sidebar.js'
import { renderHeader, setTitulo } from '../ui/header.js'
import { renderIcons } from '../ui/icons.js'
import { supabase } from '../supabase.js'
import Swal from 'sweetalert2'

let todosOsPratos = []
let categoriaAtiva = ''
let busca = ''

async function init() {
  const usuario = await verificarAutenticacao()
  if (!usuario) return
  renderSidebar('cardapio')
  renderHeader(usuario)
  setTitulo('Ver Cardápio')
  renderIcons()
  await carregarTudo()

  document.getElementById('btn-buscar').addEventListener('click', () => {
    busca = document.getElementById('input-busca').value.trim().toLowerCase()
    renderCardapio()
  })
  document.getElementById('input-busca').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      busca = e.target.value.trim().toLowerCase()
      renderCardapio()
    }
  })
  document.getElementById('btn-limpar').addEventListener('click', () => {
    document.getElementById('input-busca').value = ''
    busca = ''
    renderCardapio()
  })
  document.getElementById('btn-imprimir').addEventListener('click', () => window.print())
  document.body.style.visibility = 'visible'
}

function animarContador(destino) {
  const el = document.getElementById('contador-disponiveis')
  if (!el) return
  const inicio = performance.now()
  const duracao = 900
  function tick(agora) {
    const t = Math.min((agora - inicio) / duracao, 1)
    el.textContent = Math.round((1 - Math.pow(1 - t, 3)) * destino)
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

async function carregarTudo() {
  try {
    const { data, error } = await supabase
      .from('pratos')
      .select('id, nome, descricao, preco, tempo_preparo, disponivel, emoji, categorias(id, nome)')
      .order('nome')

    if (error) throw error
    todosOsPratos = data || []
    animarContador(todosOsPratos.filter(p => p.disponivel).length)
    renderPills()
    renderCardapio()
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Erro ao carregar cardápio', text: err.message })
  }
}

function renderPills() {
  const categoriasUnicas = []
  const ids = new Set()
  const contagem = {}

  todosOsPratos.forEach(p => {
    if (p.categorias) {
      if (!ids.has(p.categorias.id)) {
        ids.add(p.categorias.id)
        categoriasUnicas.push(p.categorias)
      }
      contagem[p.categorias.id] = (contagem[p.categorias.id] || 0) + 1
    }
  })

  const pills = document.getElementById('pills-categorias')
  pills.innerHTML = [
    { id: '', nome: 'Todas' },
    ...categoriasUnicas.sort((a, b) => a.nome.localeCompare(b.nome)),
  ].map(c => {
    const n = c.id === '' ? todosOsPratos.length : (contagem[c.id] || 0)
    const ativo = categoriaAtiva === c.id
    return `
    <button
      onclick="window._filtrarCategoria('${c.id}')"
      data-cat="${c.id}"
      class="pill px-4 py-1.5 rounded-full text-sm font-medium border transition-colors flex items-center gap-1.5
        ${ativo
          ? 'bg-orange-500 text-white border-orange-500'
          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-orange-400 hover:text-orange-600'}">
      ${c.nome}
      <span class="text-xs px-1.5 py-0.5 rounded-full ${ativo ? 'bg-orange-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}">${n}</span>
    </button>`
  }).join('')
}

function renderCardapio() {
  // Filtrar pratos
  let pratosFiltrados = todosOsPratos.filter(p => {
    const matchBusca = !busca || p.nome.toLowerCase().includes(busca) ||
      (p.descricao || '').toLowerCase().includes(busca)
    const matchCat = !categoriaAtiva || p.categorias?.id === categoriaAtiva
    return matchBusca && matchCat
  })

  // Atualizar contador
  const total = pratosFiltrados.length
  const disponiveis = pratosFiltrados.filter(p => p.disponivel).length
  document.getElementById('total-pratos').textContent =
    `${total} prato${total !== 1 ? 's' : ''} (${disponiveis} disponível${disponiveis !== 1 ? 'is' : ''})`

  const container = document.getElementById('conteudo-cardapio')

  if (!pratosFiltrados.length) {
    container.innerHTML = `
      <div class="text-center py-16 text-slate-400">
        <div class="text-5xl mb-4">🍽️</div>
        <p class="text-lg font-medium">Nenhum prato encontrado.</p>
        <p class="text-sm mt-1">Tente outro filtro ou cadastre novos pratos.</p>
      </div>`
    return
  }

  // Agrupar por categoria
  const grupos = {}
  pratosFiltrados.forEach(p => {
    const catNome = p.categorias?.nome || 'Sem categoria'
    if (!grupos[catNome]) grupos[catNome] = []
    grupos[catNome].push(p)
  })

  container.innerHTML = Object.entries(grupos)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([catNome, pratos]) => `
      <div>
        <div class="flex items-center gap-3 mb-4">
          <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">${catNome}</h2>
          <div class="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
          <span class="text-xs text-slate-400">${pratos.length} item${pratos.length !== 1 ? 's' : ''}</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          ${pratos.map(p => cartaoPrato(p)).join('')}
        </div>
      </div>`
    ).join('')
}

function cartaoPrato(p) {
  const tempo = p.tempo_preparo ? `⏱ ${p.tempo_preparo} min` : ''
  const badgeDisp = p.disponivel
    ? '<span class="badge-disponivel">Disponível</span>'
    : '<span class="badge-indisponivel">Indisponível</span>'

  return `
    <div class="card p-4 flex flex-col gap-2 ${!p.disponivel ? 'opacity-60' : ''}">
      <div class="text-4xl text-center py-1">${p.emoji || '🍽️'}</div>
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-semibold text-slate-800 dark:text-slate-100 leading-tight">${p.nome}</h3>
        ${badgeDisp}
      </div>
      ${p.descricao ? `<p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">${p.descricao}</p>` : ''}
      <div class="flex items-center justify-between mt-auto pt-2 border-t border-slate-100 dark:border-slate-700">
        <span class="text-lg font-bold text-orange-600 dark:text-orange-400">
          R$ ${Number(p.preco).toFixed(2)}
        </span>
        <span class="text-xs text-slate-400">${tempo}</span>
      </div>
    </div>`
}

window._filtrarCategoria = (id) => {
  categoriaAtiva = id
  renderPills()
  renderCardapio()
}

init()
