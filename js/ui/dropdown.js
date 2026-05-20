export function abrirDropdown(btn, acoes) {
  document.getElementById('dd-acoes')?.remove()

  const menu = document.createElement('div')
  menu.id = 'dd-acoes'
  menu.className = [
    'fixed z-[200] bg-white dark:bg-slate-800 rounded-xl shadow-xl',
    'border border-slate-100 dark:border-slate-700 py-1 min-w-[160px]',
  ].join(' ')

  acoes.forEach(({ label, fn, perigo = false }) => {
    const item = document.createElement('button')
    item.type = 'button'
    item.textContent = label
    item.className = `block w-full text-left px-4 py-2.5 text-sm transition-colors ${
      perigo
        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
    }`
    item.onclick = () => { menu.remove(); fn() }
    menu.appendChild(item)
  })

  const rect = btn.getBoundingClientRect()
  menu.style.top   = `${rect.bottom + 4}px`
  menu.style.right = `${window.innerWidth - rect.right}px`
  document.body.appendChild(menu)

  setTimeout(() => {
    document.addEventListener('click', function h(e) {
      if (!menu.contains(e.target)) {
        menu.remove()
        document.removeEventListener('click', h, true)
      }
    }, true)
  }, 0)
}
