import { heroicon } from './icons.js'

export function renderHeader(usuario) {
  const el = document.getElementById('header')
  if (!el) return

  const email = usuario?.email || 'Usuário'

  el.innerHTML = `
    <header class="h-14 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700
                   px-6 flex items-center justify-between shrink-0">
      <h1 id="titulo-pagina" class="text-base font-semibold text-slate-800 dark:text-slate-100"></h1>
      <div class="flex items-center gap-3">
        <button id="btn-tema" title="Alternar tema"
          class="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <span id="icone-tema">${heroicon('moon')}</span>
        </button>
        <div class="flex items-center gap-2 text-sm">
          ${heroicon('user-circle', 'text-orange-500 w-7 h-7')}
          <span class="font-medium text-slate-700 dark:text-slate-200 hidden sm:block">${email}</span>
        </div>
      </div>
    </header>`

  // Aplicar tema salvo
  if (localStorage.getItem('tema') === 'dark') {
    document.documentElement.classList.add('dark')
    document.getElementById('icone-tema').innerHTML = heroicon('sun')
  }

  document.getElementById('btn-tema')?.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('tema', dark ? 'dark' : 'light')
    document.getElementById('icone-tema').innerHTML = heroicon(dark ? 'sun' : 'moon')
  })
}

export function setTitulo(titulo) {
  const el = document.getElementById('titulo-pagina')
  if (el) el.textContent = titulo
}
