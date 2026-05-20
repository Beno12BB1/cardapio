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

function buildLinks(paginaAtiva) {
  return NAV.map(item => {
    const ativo = item.key === paginaAtiva
    return `
      <a href="${BASE + item.href}"
        class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
          ${ativo ? 'bg-orange-500 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}">
        ${heroicon(item.icon)}
        <span>${item.label}</span>
        ${item.key === 'cardapio'
          ? `<span class="badge-cardapio ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full hidden ${ativo ? 'bg-white/20 text-white' : 'bg-orange-500 text-white'}"></span>`
          : ''}
      </a>`
  }).join('')
}

const logoHtml = `
  <div class="flex items-center gap-3">
    <span class="text-2xl">🍕</span>
    <div>
      <div class="text-white font-bold text-base leading-tight">Cardápio Digital</div>
      <div class="text-slate-400 text-xs">Gestão de Restaurante</div>
    </div>
  </div>`

const logoutHtml = (id) => `
  <button id="${id}"
    class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
           text-slate-300 hover:bg-red-600 hover:text-white w-full transition-colors">
    ${heroicon('arrow-right-on-rectangle')}
    <span>Sair</span>
  </button>`

export function renderSidebar(paginaAtiva) {
  const el = document.getElementById('sidebar')
  if (!el) return

  // Mobile: 0 width (sidebar is a fixed overlay).  Desktop: 256 px in flex flow.
  el.className = 'w-0 lg:w-64 lg:shrink-0'

  const links = buildLinks(paginaAtiva)

  el.innerHTML = `
    <!-- ── Backdrop mobile ─────────────────────────────── -->
    <div id="sidebar-backdrop"
      class="lg:hidden fixed inset-0 bg-black/50 z-40 hidden"></div>

    <!-- ── Drawer mobile (fixed overlay) ──────────────── -->
    <aside id="sidebar-mobile"
      class="lg:hidden fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-slate-900
             transform -translate-x-full transition-transform duration-300 ease-in-out">
      <div class="flex items-center justify-between px-5 py-6 border-b border-slate-700">
        ${logoHtml}
        <button onclick="window._closeSidebar()"
          class="shrink-0 ml-2 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">${links}</nav>
      <div class="px-3 py-4 border-t border-slate-700">${logoutHtml('btn-logout-mobile')}</div>
    </aside>

    <!-- ── Sidebar desktop (in-flow, hidden on mobile) ── -->
    <div id="sidebar-desktop"
      class="hidden lg:flex flex-col h-full bg-slate-900">
      <div class="px-5 py-6 border-b border-slate-700">${logoHtml}</div>
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">${links}</nav>
      <div class="px-3 py-4 border-t border-slate-700">${logoutHtml('btn-logout')}</div>
    </div>`

  document.getElementById('btn-logout')?.addEventListener('click', () => logout())
  document.getElementById('btn-logout-mobile')?.addEventListener('click', () => logout())
  document.getElementById('sidebar-backdrop')?.addEventListener('click', () => window._closeSidebar())

  // Close mobile drawer when a nav link is tapped
  el.querySelectorAll('#sidebar-mobile nav a').forEach(a =>
    a.addEventListener('click', () => window._closeSidebar())
  )

  // Badge: pratos disponíveis
  supabase.from('pratos')
    .select('*', { count: 'exact', head: true })
    .eq('disponivel', true)
    .then(({ count }) => {
      if (!count) return
      document.querySelectorAll('.badge-cardapio').forEach(b => {
        b.textContent = count
        b.classList.remove('hidden')
      })
    })
}

window._toggleSidebar = () => {
  const mobile   = document.getElementById('sidebar-mobile')
  const backdrop = document.getElementById('sidebar-backdrop')
  if (!mobile || !backdrop) return
  const open = mobile.classList.contains('-translate-x-full')
  mobile.classList.toggle('-translate-x-full', !open)
  backdrop.classList.toggle('hidden', !open)
}

window._closeSidebar = () => {
  document.getElementById('sidebar-mobile')?.classList.add('-translate-x-full')
  document.getElementById('sidebar-backdrop')?.classList.add('hidden')
}
