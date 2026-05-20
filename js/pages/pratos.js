import '../../css/style.css'
import { verificarAutenticacao } from '../auth.js'
import { renderSidebar } from '../ui/sidebar.js'
import { renderHeader, setTitulo } from '../ui/header.js'
import { renderIcons } from '../ui/icons.js'
import { supabase } from '../supabase.js'
import { showToast } from '../ui/toast.js'
import { abrirDropdown } from '../ui/dropdown.js'
import Swal from 'sweetalert2'

const POR_PAGINA = 10
let pagina = 1, totalPaginas = 1
let busca = '', filtroCategoria = '', filtroDisponivel = ''
let sortCol = 'nome', sortDir = 'asc'
let buscaTimer

const esc = s => (s || '').replace(/'/g, "\\'")

async function init() {
  const usuario = await verificarAutenticacao()
  if (!usuario) return
  renderSidebar('pratos')
  renderHeader(usuario)
  setTitulo('Pratos')
  renderIcons()

  await carregarCategoriasFiltro()

  document.getElementById('btn-novo').addEventListener('click', () => abrirModal())
  document.getElementById('btn-exportar').addEventListener('click', exportarCSV)

  document.getElementById('form-busca').addEventListener('submit', e => {
    e.preventDefault()
    busca            = document.getElementById('input-busca').value.trim()
    filtroCategoria  = document.getElementById('filtro-categoria').value
    filtroDisponivel = document.getElementById('filtro-disponivel').value
    pagina = 1; carregar()
  })

  document.getElementById('input-busca').addEventListener('input', e => {
    clearTimeout(buscaTimer)
    buscaTimer = setTimeout(() => { busca = e.target.value.trim(); pagina = 1; carregar() }, 300)
  })

  document.getElementById('filtro-categoria').addEventListener('change', () => {
    filtroCategoria = document.getElementById('filtro-categoria').value
    pagina = 1; carregar()
  })

  document.getElementById('filtro-disponivel').addEventListener('change', () => {
    filtroDisponivel = document.getElementById('filtro-disponivel').value
    pagina = 1; carregar()
  })

  document.getElementById('btn-limpar').addEventListener('click', () => {
    document.getElementById('input-busca').value = ''
    document.getElementById('filtro-categoria').value = ''
    document.getElementById('filtro-disponivel').value = ''
    busca = ''; filtroCategoria = ''; filtroDisponivel = ''
    pagina = 1; carregar()
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

async function carregarCategoriasFiltro() {
  const { data } = await supabase.from('categorias').select('id, nome').eq('ativo', true).order('nome')
  const sel = document.getElementById('filtro-categoria')
  if (data) {
    data.forEach(c => {
      const opt = document.createElement('option')
      opt.value = c.id
      opt.textContent = c.nome
      sel.appendChild(opt)
    })
  }
}

async function carregar() {
  document.getElementById('tbody').innerHTML = `<tr><td colspan="7" class="px-4 py-8">
    <div class="space-y-2">
      ${Array(4).fill('<div class="animate-pulse h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>').join('')}
    </div></td></tr>`

  const inicio = (pagina - 1) * POR_PAGINA
  let q = supabase
    .from('pratos')
    .select('id, nome, descricao, preco, tempo_preparo, disponivel, emoji, categorias(id, nome)', { count: 'exact' })
    .order(sortCol, { ascending: sortDir === 'asc' })

  if (busca)            q = q.ilike('nome', `%${busca}%`)
  if (filtroCategoria)  q = q.eq('categoria_id', filtroCategoria)
  if (filtroDisponivel) q = q.eq('disponivel', filtroDisponivel === 'true')
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
    tbody.innerHTML = `<tr><td colspan="6" class="px-4 py-10 text-center text-slate-400">
      Nenhum prato encontrado.</td></tr>`
    return
  }

  tbody.innerHTML = rows.map((r, i) => {
    const badge = r.disponivel
      ? '<span class="badge-disponivel">Disponível</span>'
      : '<span class="badge-indisponivel">Indisponível</span>'
    const btnToggle = r.disponivel
      ? `<button onclick="window._toggle('${r.id}',false,'${esc(r.nome)}')" class="btn-danger text-xs px-3 py-1">Tirar</button>`
      : `<button onclick="window._toggle('${r.id}',true,'${esc(r.nome)}')"  class="btn-success text-xs px-3 py-1">Disponibilizar</button>`
    const tempo = r.tempo_preparo ? `${r.tempo_preparo} min` : '—'

    return `
      <tr class="table-row" style="animation:fadeInUp 0.3s ease both;animation-delay:${i * 50}ms">
        <td class="px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">${r.emoji || '🍽️'}</span>
            <div>
              <div class="font-medium">${r.nome}</div>
              ${r.descricao ? `<div class="text-xs text-slate-400 mt-0.5 max-w-xs truncate hidden sm:block">${r.descricao}</div>` : ''}
            </div>
          </div>
        </td>
        <td class="px-4 py-3 text-slate-600 dark:text-slate-300 hidden sm:table-cell">${r.categorias?.nome || '—'}</td>
        <td class="px-4 py-3 font-semibold ${r.disponivel ? 'text-green-600 dark:text-green-400' : 'text-slate-400 dark:text-slate-500'}">
          R$ ${Number(r.preco).toFixed(2)}
        </td>
        <td class="px-4 py-3 text-slate-600 dark:text-slate-300 hidden sm:table-cell">${tempo}</td>
        <td class="px-4 py-3 hidden sm:table-cell">${badge}</td>
        <td class="px-4 py-3 text-right space-x-2 hidden sm:table-cell">
          <button onclick="window._editar('${r.id}')" class="btn-secondary text-xs px-3 py-1">Editar</button>
          ${btnToggle}
          <button onclick="window._excluir('${r.id}','${esc(r.nome)}')" class="btn-danger text-xs px-3 py-1">Excluir</button>
        </td>
        <td class="px-2 py-3 text-right sm:hidden">
          <button onclick="window._menuPrato(this,'${r.id}','${esc(r.nome)}',${r.disponivel})"
            class="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl flex items-center justify-center ml-auto transition-colors">⋮</button>
        </td>
      </tr>`
  }).join('')
}

async function exportarCSV() {
  const { data, error } = await supabase
    .from('pratos')
    .select('nome, preco, tempo_preparo, disponivel, categorias(nome)')
    .order('nome')

  if (error || !data?.length) { showToast('Nenhum prato para exportar.', 'warning'); return }

  const bom = '﻿'
  const header = 'Nome,Categoria,Preço (R$),Tempo (min),Disponível\n'
  const rows = data.map(p => [
    `"${p.nome}"`,
    `"${p.categorias?.nome || ''}"`,
    Number(p.preco).toFixed(2).replace('.', ','),
    p.tempo_preparo || '',
    p.disponivel ? 'Sim' : 'Não',
  ].join(',')).join('\n')

  const blob = new Blob([bom + header + rows], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pratos-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
  showToast('CSV exportado com sucesso!')
}

async function abrirModal(id = null) {
  const { data: cats } = await supabase
    .from('categorias').select('id, nome').eq('ativo', true).order('nome')

  if (!cats?.length) {
    Swal.fire({ icon: 'warning', title: 'Atenção', text: 'Cadastre pelo menos uma categoria antes de adicionar pratos.' })
    return
  }

  let d = { nome: '', descricao: '', preco: '', tempo_preparo: '', disponivel: true, categoria_id: '', emoji: '🍽️' }
  if (id) {
    const { data } = await supabase.from('pratos').select('*').eq('id', id).single()
    if (data) d = data
  }

  const optsCats = cats.map(c =>
    `<option value="${c.id}" ${c.id === d.categoria_id ? 'selected' : ''}>${c.nome}</option>`
  ).join('')

  const { value } = await Swal.fire({
    title: id ? 'Editar Prato' : 'Novo Prato',
    width: 500,
    html: `
      <div class="text-left space-y-3 mt-2">
        <div class="grid grid-cols-[1fr_80px] gap-3">
          <div>
            <label class="text-sm font-medium text-slate-700">Nome *</label>
            <input id="s-nome" class="input-field mt-1" placeholder="Ex: Pizza Margherita" value="${d.nome}">
          </div>
          <div>
            <label class="text-sm font-medium text-slate-700">Emoji</label>
            <input id="s-emoji" class="input-field mt-1 text-center text-xl" placeholder="🍽️" value="${d.emoji || '🍽️'}">
          </div>
        </div>
        <div>
          <label class="text-sm font-medium text-slate-700">Descrição</label>
          <textarea id="s-desc" class="input-field mt-1 resize-none" rows="2"
            placeholder="Ingredientes, detalhes do prato...">${d.descricao || ''}</textarea>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium text-slate-700">Preço (R$) *</label>
            <input id="s-preco" type="number" min="0" step="0.01" class="input-field mt-1" placeholder="0,00" value="${d.preco || ''}">
          </div>
          <div>
            <label class="text-sm font-medium text-slate-700">Tempo de preparo (min)</label>
            <input id="s-tempo" type="number" min="1" class="input-field mt-1" placeholder="Ex: 30" value="${d.tempo_preparo || ''}">
          </div>
        </div>
        <div>
          <label class="text-sm font-medium text-slate-700">Categoria *</label>
          <select id="s-cat" class="input-field mt-1">
            <option value="">Selecione...</option>
            ${optsCats}
          </select>
        </div>
        <div class="flex items-center gap-2 pt-1">
          <input id="s-disp" type="checkbox" class="w-4 h-4 accent-orange-500" ${d.disponivel !== false ? 'checked' : ''}>
          <label for="s-disp" class="text-sm font-medium text-slate-700">Disponível no cardápio</label>
        </div>
      </div>`,
    showCancelButton: true,
    confirmButtonText: 'Salvar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#f97316',
    preConfirm: () => {
      const nome         = document.getElementById('s-nome').value.trim()
      const descricao    = document.getElementById('s-desc').value.trim() || null
      const precoStr     = document.getElementById('s-preco').value
      const tempoStr     = document.getElementById('s-tempo').value
      const categoria_id = document.getElementById('s-cat').value
      const disponivel   = document.getElementById('s-disp').checked
      const emoji        = document.getElementById('s-emoji').value.trim() || '🍽️'

      if (!nome)         { Swal.showValidationMessage('O nome é obrigatório.'); return false }
      if (!precoStr)     { Swal.showValidationMessage('O preço é obrigatório.'); return false }
      if (!categoria_id) { Swal.showValidationMessage('Selecione uma categoria.'); return false }

      const preco = parseFloat(precoStr)
      if (isNaN(preco) || preco < 0) { Swal.showValidationMessage('Preço inválido.'); return false }

      return { nome, descricao, preco, tempo_preparo: tempoStr ? parseInt(tempoStr) : null, categoria_id, disponivel, emoji }
    },
  })
  if (!value) return

  try {
    const { error } = id
      ? await supabase.from('pratos').update(value).eq('id', id)
      : await supabase.from('pratos').insert(value)
    if (error) throw error
    showToast(id ? 'Prato atualizado!' : 'Prato criado!')
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

window._menuPrato = (btn, id, nome, disponivel) => abrirDropdown(btn, [
  { label: 'Editar',                                           fn: () => window._editar(id) },
  { label: disponivel ? 'Tirar do cardápio' : 'Disponibilizar', fn: () => window._toggle(id, !disponivel, nome) },
  { label: 'Excluir',                                          fn: () => window._excluir(id, nome), perigo: true },
])

window._editar = id => abrirModal(id)

window._toggle = async (id, novoStatus, nome) => {
  const acao = novoStatus ? 'disponibilizar' : 'tirar do cardápio'
  const { isConfirmed } = await Swal.fire({
    icon: 'question',
    title: novoStatus ? 'Disponibilizar prato?' : 'Tirar do cardápio?',
    text: `Deseja ${acao} o prato "${nome}"?`,
    showCancelButton: true,
    confirmButtonText: `Sim, ${acao}`,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: novoStatus ? '#16A34A' : '#DC2626',
  })
  if (!isConfirmed) return
  const { error } = await supabase.from('pratos').update({ disponivel: novoStatus }).eq('id', id)
  if (error) { Swal.fire({ icon: 'error', title: 'Erro', text: error.message }); return }
  showToast(novoStatus ? 'Prato disponibilizado!' : 'Prato removido do cardápio!')
  carregar()
}

window._excluir = async (id, nome) => {
  const { isConfirmed } = await Swal.fire({
    icon: 'warning',
    title: 'Excluir prato?',
    text: `Deseja excluir "${nome}"? Esta ação não pode ser desfeita.`,
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#DC2626',
  })
  if (!isConfirmed) return
  const { error } = await supabase.from('pratos').delete().eq('id', id)
  if (error) { Swal.fire({ icon: 'error', title: 'Erro', text: error.message }); return }
  showToast('Prato excluído!')
  carregar()
}

init()
