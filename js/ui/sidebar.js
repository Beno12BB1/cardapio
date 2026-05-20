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

  // Mobile: sem largura (filhos são fixed); Desktop: ocupa 256px no flex
  el.className = 'lg:w-64 lg:shrink-0'

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
    <div id="sidebar-backdrop"
      class="fixed inset-0 bg-black/50 z-40 opacity-0 pointer-events-none transition-opacity duration-300 lg:hidden"></div>

    <div id="sidebar-panel"
      class="fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-slate-900 shrink-0
             -translate-x-full transition-transform duration-300 ease-in-out
             lg:static lg:translate-x-0 lg:h-full">
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
  document.getElementById('sidebar-backdrop')?.addEventListener('click', () => window._closeSidebar())

  el.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth < 1024) window._closeSidebar()
    })
  })

  supabase.from('pratos')
    .select('*', { count: 'exact', head: true })
    .eq('disponivel', true)
    .then(({ count }) => {
      const badge = document.getElementById('badge-cardapio')
      if (badge && count) { badge.textContent = count; badge.classList.remove('hidden') }
    })
}

window._toggleSidebar = () => {
  const panel    = document.getElementById('sidebar-panel')
  const backdrop = document.getElementById('sidebar-backdrop')
  if (!panel || !backdrop) return
  const isOpen = !panel.classList.contains('-translate-x-full')
  panel.classList.toggle('-translate-x-full', isOpen)
  backdrop.classList.toggle('opacity-0', isOpen)
  backdrop.classList.toggle('pointer-events-none', isOpen)
}

window._closeSidebar = () => {
  const panel    = document.getElementById('sidebar-panel')
  const backdrop = document.getElementById('sidebar-backdrop')
  if (!panel || !backdrop) return
  panel.classList.add('-translate-x-full')
  backdrop.classList.add('opacity-0', 'pointer-events-none')
}
