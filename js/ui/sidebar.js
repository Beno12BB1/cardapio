import { heroicon } from './icons.js'
import { logout } from '../auth.js'
import { supabase } from '../supabase.js'

const BASE = import.meta.env.BASE_URL

const NAV = [
  { key: 'dashboard',  label: 'Dashboard',   icon: 'home',      href: 'pages/dashboard.html' },
  { key: 'categorias', label: 'Categorias',   icon: 'tag',       href: 'pages/categorias.html' },
  { key: 'pratos',     label: 'Pratos',       icon: 'book-open', href: 'pages/pratos.html' },
  { key: 'cardapio',   label: 'Ver Cardápio', icon: 'chart-bar', href: 'pages/cardapio.html' },
]

export function renderSidebar(paginaAtiva) {
  const el = document.getElementById('sidebar')
  if (!el) return

  const links = NAV.map(item => {
    const ativo = item.key === paginaAtiva
    return `
      <a href="${BASE + item.href}"
        class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
          ${ativo ? 'bg-orange-500 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}">
        ${heroicon(item.icon)}
        <span>${item.label}</span>
        ${item.key === 'cardapio'
          ? `<span id="badge-cardapio" class="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full hidden ${ativo ? 'bg-white/20 text-white' : 'bg-orange-500 text-white'}"></span>`
          : ''}
      </a>`
  }).join('')

  el.innerHTML = `
    <div class="flex flex-col h-full w-64 bg-slate-900 shrink-0">
      <div class="px-5 py-6 border-b border-slate-700">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🍕</span>
          <div>
            <div class="text-white font-bold text-base leading-tight">Cardápio Digital</div>
            <div class="text-slate-400 text-xs">Gestão de Restaurante</div>
          </div>
        </div>
      </div>
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">${links}</nav>
      <div class="px-3 py-4 border-t border-slate-700">
        <button id="btn-logout"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
                 text-slate-300 hover:bg-red-600 hover:text-white w-full transition-colors">
          ${heroicon('arrow-right-on-rectangle')}
          <span>Sair</span>
        </button>
      </div>
    </div>`

  document.getElementById('btn-logout')?.addEventListener('click', () => logout())

  supabase.from('pratos')
    .select('*', { count: 'exact', head: true })
    .eq('disponivel', true)
    .then(({ count }) => {
      const badge = document.getElementById('badge-cardapio')
      if (badge && count) {
        badge.textContent = count
        badge.classList.remove('hidden')
      }
    })
}
