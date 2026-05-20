import { heroicon } from './icons.js'

export function renderHeader(usuario) {
  const el = document.getElementById('header')
  if (!el) return

  const email = usuario?.email || 'Usuário'

  el.innerHTML = `
    <header class="h-14 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700
                   px-4 flex items-center justify-between shrink-0 gap-2">
      <div class="flex items-center gap-2 min-w-0">
        <button onclick="window._toggleSidebar()" title="Menu"
          class="lg:hidden shrink-0 p-2 rounded-lg text-slate-500
                 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <h1 id="titulo-pagina"
          class="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 truncate"></h1>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button id="btn-tema" title="Alternar tema"
          class="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <span id="icone-tema">${heroicon('moon')}</span>
        </button>
        <div class="flex items-center gap-1.5 text-sm">
          ${heroicon('user-circle', 'text-orange-500 w-7 h-7 shrink-0')}
          <span class="hidden sm:block font-medium text-slate-700 dark:text-slate-200
                       max-w-[120px] truncate">${email}</span>
        </div>
      </div>
    </header>`

  if (localStorage.getItem('tema') === 'dark') {
    document.documentElement.classList.add('dark')
    document.getElementById('icone-tema').innerHTML = heroicon('sun')
  }

  document.getElementById('btn-tema')?.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('tema', dark ? 'dark' : 'light')
    document.getElementById('icone-tema').innerHTML = heroicon(dark ? 'sun' : 'moon')
  })

  if (!document.getElementById('btn-top')) {
    const btn = document.createElement('button')
    btn.id = 'btn-top'
    btn.title = 'Voltar ao topo'
    btn.className = 'fixed bottom-6 right-6 z-50 p-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg transition-all duration-300 no-print'
    btn.style.cssText = 'opacity:0;transform:translateY(8px);pointer-events:none'
    btn.innerHTML = heroicon('arrow-up', 'w-5 h-5')
    document.body.appendChild(btn)

    setTimeout(() => {
      const main = document.querySelector('main')
      if (!main) return
      main.addEventListener('scroll', () => {
        const show = main.scrollTop > 200
        btn.style.opacity   = show ? '1' : '0'
        btn.style.transform = show ? 'translateY(0)' : 'translateY(8px)'
        btn.style.pointerEvents = show ? 'auto' : 'none'
      }, { passive: true })
      btn.addEventListener('click', () => main.scrollTo({ top: 0, behavior: 'smooth' }))
    }, 0)
  }
}

export function setTitulo(titulo) {
  const el = document.getElementById('titulo-pagina')
  if (el) el.textContent = titulo
}
