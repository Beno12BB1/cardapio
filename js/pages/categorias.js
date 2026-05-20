import '../../css/style.css'
import { verificarAutenticacao } from '../auth.js'
import { renderSidebar } from '../ui/sidebar.js'
import { renderHeader, setTitulo } from '../ui/header.js'
import { renderIcons } from '../ui/icons.js'
import { supabase } from '../supabase.js'
import { showToast } from '../ui/toast.js'
import Swal from 'sweetalert2'

const POR_PAGINA = 10
let pagina = 1, totalPaginas = 1, busca = '', filtroAtivo = ''
let sortCol = 'nome', sortDir = 'asc'
let buscaTimer

const esc = s => (s || '').replace(/'/g, "\\'")

async function init() {
  const usuario = await verificarAutenticacao()
  if (!usuario) return
  renderSidebar('categorias')
  renderHeader(usuario)
  setTitulo('Categorias')
  renderIcons()

  document.getElementById('btn-nova').addEventListener('click', () => abrirModal())

  document.getElementById('form-busca').addEventListener('submit', e => {
    e.preventDefault()
    busca = document.getElementById('input-busca').value.trim()
    filtroAtivo = document.getElementById('filtro-ativo').value
    pagina = 1; carregar()
  })

  document.getElementById('input-busca').addEventListener('input', e => {
    clearTimeout(buscaTimer)
    buscaTimer = setTimeout(() => { busca = e.target.value.trim(); pagina = 1; carregar() }, 300)
  })

  document.getElementById('filtro-ativo').addEventListener('change', () => {
    filtroAtivo = document.getElementById('filtro-ativo').value
    pagina = 1; carregar()
  })

  document.getElementById('btn-limpar').addEventListener('click', () => {
    document.getElementById('input-busca').value = ''
    document.getElementById('filtro-ativo').value = ''
    busca = ''; filtroAtivo = ''; pagina = 1; carregar()
  })

  document.getElementById('btn-anterior').addEventListener('click', () => {
    if (pagina > 1) { pagina--; carregar() }
  })
  document.getElementById('btn-proxima').addEventListener('click', () => {
    if (pagina < totalPaginas) { pagina++; carregar() }
  })

  await carregar()
  document.body.style.visibility = 'visible'
}

async function carregar() {
  document.getElementById('tbody').innerHTML = `<tr><td colspan="4" class="px-4 py-8">
    <div class="space-y-2">
      ${Array(4).fill('<div class="animate-pulse h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>').join('')}
    </div></td></tr>`

  const inicio = (pagina - 1) * POR_PAGINA
  let q = supabase.from('categorias').select('*', { count: 'exact' })
    .order(sortCol, { ascending: sortDir === 'asc' })
  if (busca)       q = q.ilike('nome', `%${busca}%`)
  if (filtroAtivo) q = q.eq('ativo', filtroAtivo === 'true')
  q = q.range(inicio, inicio + POR_PAGINA - 1)

  const { data, count, error } = await q
  if (error) { Swal.fire({ icon: 'error', title: 'Erro', text: error.message }); return }

  totalPaginas = Math.max(1, Math.ceil((count || 0) / POR_PAGINA))
  renderTabela(data || [])
  document.getElementById('info-pagina').textContent = `Página ${pagina} de ${totalPaginas}`
  document.getElementById('btn-anterior').disabled = pagina === 1
  document.getElementById('btn-proxima').disabled  = pagina === totalPaginas
}

function renderTabela(rows) {
  const tbody = document.getElementById('tbody')
  if (!rows.length) {
    tbody.innerHTML = `
      <tr><td colspan="4" class="px-4 py-10 text-center text-slate-400">
        Nenhuma categoria encontrada.
      </td></tr>`
    return
  }
  tbody.innerHTML = rows.map(r => {
    const badge = r.ativo
      ? '<span class="badge-ativo">Ativa</span>'
      : '<span class="badge-inativo">Inativa</span>'
    const btnToggle = r.ativo
      ? `<button onclick="window._toggle('${r.id}',false,'${esc(r.nome)}')" class="btn-danger text-xs px-3 py-1">Inativar</button>`
      : `<button onclick="window._toggle('${r.id}',true,'${esc(r.nome)}')"  class="btn-success text-xs px-3 py-1">Reativar</button>`
    return `
      <tr class="table-row">
        <td class="px-4 py-3 font-medium">${r.nome}</td>
        <td class="px-4 py-3 text-slate-500 dark:text-slate-400">${r.descricao || '—'}</td>
        <td class="px-4 py-3">${badge}</td>
        <td class="px-4 py-3 text-right space-x-2">
          <button onclick="window._editar('${r.id}')" class="btn-secondary text-xs px-3 py-1">Editar</button>
          <button onclick="window._excluir('${r.id}','${esc(r.nome)}')" class="btn-danger text-xs px-3 py-1">Excluir</button>
          ${btnToggle}
        </td>
      </tr>`
  }).join('')
}

async function abrirModal(id = null) {
  let dados = { nome: '', descricao: '' }
  if (id) {
    const { data } = await supabase.from('categorias').select('*').eq('id', id).single()
    if (data) dados = data
  }

  const { value } = await Swal.fire({
    title: id ? 'Editar Categoria' : 'Nova Categoria',
    html: `
      <div class="text-left space-y-3 mt-2">
        <div>
          <label class="text-sm font-medium text-slate-700">Nome *</label>
          <input id="s-nome" class="input-field mt-1" placeholder="Ex: Pizzas" value="${dados.nome}">
        </div>
        <div>
          <label class="text-sm font-medium text-slate-700">Descrição</label>
          <textarea id="s-desc" class="input-field mt-1 resize-none" rows="2"
            placeholder="Breve descrição da categoria...">${dados.descricao || ''}</textarea>
        </div>
      </div>`,
    showCancelButton: true,
    confirmButtonText: 'Salvar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#f97316',
    preConfirm: () => {
      const nome = document.getElementById('s-nome').value.trim()
      if (!nome) { Swal.showValidationMessage('O nome é obrigatório.'); return false }
      return { nome, descricao: document.getElementById('s-desc').value.trim() || null }
    },
  })
  if (!value) return

  try {
    const { error } = id
      ? await supabase.from('categorias').update(value).eq('id', id)
      : await supabase.from('categorias').insert({ ...value, ativo: true })
    if (error) throw error
    showToast(id ? 'Categoria atualizada!' : 'Categoria criada!')
    carregar()
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Erro ao salvar', text: err.message })
  }
}

window._sortBy = col => {
  sortDir = sortCol === col && sortDir === 'asc' ? 'desc' : 'asc'
  sortCol = col
  document.querySelectorAll('[data-sort]').forEach(el => {
    el.textContent = el.dataset.sort === col ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ' ↕'
  })
  pagina = 1; carregar()
}

window._editar = id => abrirModal(id)

window._toggle = async (id, novoStatus, nome) => {
  const acao = novoStatus ? 'reativar' : 'inativar'
  const { isConfirmed } = await Swal.fire({
    icon: 'question',
    title: `${novoStatus ? 'Reativar' : 'Inativar'} categoria?`,
    text: `Deseja ${acao} "${nome}"?`,
    showCancelButton: true,
    confirmButtonText: `Sim, ${acao}`,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: novoStatus ? '#16A34A' : '#DC2626',
  })
  if (!isConfirmed) return
  const { error } = await supabase.from('categorias').update({ ativo: novoStatus }).eq('id', id)
  if (error) { Swal.fire({ icon: 'error', title: 'Erro', text: error.message }); return }
  showToast(`Categoria ${novoStatus ? 'reativada' : 'inativada'}!`)
  carregar()
}

window._excluir = async (id, nome) => {
  const { count } = await supabase.from('pratos')
    .select('*', { count: 'exact', head: true })
    .eq('categoria_id', id)
  const infoPrevia = count > 0
    ? `<p class="mt-2 text-sm text-orange-600 font-medium">⚠️ ${count} prato${count !== 1 ? 's' : ''} vinculado${count !== 1 ? 's' : ''} perderão a categoria.</p>`
    : `<p class="mt-2 text-sm text-slate-400">Nenhum prato vinculado.</p>`
  const { isConfirmed } = await Swal.fire({
    icon: 'warning',
    title: 'Excluir categoria?',
    html: `<p>Deseja excluir <strong>"${nome}"</strong>?</p>${infoPrevia}`,
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#DC2626',
  })
  if (!isConfirmed) return
  const { error } = await supabase.from('categorias').delete().eq('id', id)
  if (error) { Swal.fire({ icon: 'error', title: 'Erro', text: error.message }); return }
  showToast('Categoria excluída!')
  carregar()
}

init()
