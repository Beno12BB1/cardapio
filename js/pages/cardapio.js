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
  document.getElementById('btn-float-busca')?.addEventListener('click', () => {
    const input = document.getElementById('input-busca')
    input.focus()
    input.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
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
      .select('id, nome, descricao, preco, tempo_preparo, disponivel, emoji, imagem_url, categorias(id, nome)')
      .order('nome')

    if (error) throw error
    todosOsPratos = data || []
    const disponiveisList = todosOsPratos.filter(p => p.disponivel)
    animarContador(disponiveisList.length)
    const media = disponiveisList.length
      ? disponiveisList.reduce((s, p) => s + Number(p.preco), 0) / disponiveisList.length : 0
    const elMedia = document.getElementById('preco-medio')
    if (elMedia) elMedia.textContent = media > 0 ? `R$ ${media.toFixed(2)}` : '—'
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

  let cardIdx = 0
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
          ${pratos.map(p => cartaoPrato(p, cardIdx++)).join('')}
        </div>
      </div>`
    ).join('')
}

function cartaoPrato(p, idx = 0) {
  const imgHtml = p.imagem_url
    ? `<div style="width:100%;height:130px;overflow:hidden;border-radius:8px;margin-bottom:10px">
         <img src="${p.imagem_url}" alt="${p.nome}"
           style="width:100%;height:100%;object-fit:cover;display:block;position:static">
       </div>`
    : `<div style="text-align:center;font-size:3rem;margin-bottom:10px">${p.emoji || '🍽️'}</div>`

  return `
    <div class="card card-prato hover:-translate-y-1 hover:shadow-md ${!p.disponivel ? 'opacity-60' : ''}"
      style="display:flex;flex-direction:column;break-inside:avoid;animation-delay:${idx * 50}ms;padding:1rem">
      ${imgHtml}
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:6px">
          <h3 style="margin:0;font-size:14px;font-weight:600">${p.nome}</h3>
          ${p.disponivel ? '<span class="badge-disponivel">Disponível</span>' : '<span class="badge-indisponivel">Indisponível</span>'}
        </div>
        ${p.descricao ? `<p style="margin:0 0 8px;font-size:12px;color:#64748b">${p.descricao}</p>` : ''}
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e2e8f0;padding-top:8px;margin-top:auto">
          <span style="font-weight:700;color:#f97316">R$ ${Number(p.preco).toFixed(2)}</span>
          ${p.tempo_preparo ? `<span style="font-size:11px;color:#94a3b8">⏱ ${p.tempo_preparo} min</span>` : ''}
        </div>
      </div>
    </div>`
}

window._filtrarCategoria = (id) => {
  categoriaAtiva = id
  renderPills()
  renderCardapio()
}

init()
