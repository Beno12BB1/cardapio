const TIPOS = {
  success: { borda: 'border-green-500', icone: '✓', iconeCor: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400', texto: 'text-slate-700 dark:text-slate-200' },
  error:   { borda: 'border-red-500',   icone: '✕', iconeCor: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400',       texto: 'text-slate-700 dark:text-slate-200' },
  warning: { borda: 'border-yellow-500',icone: '!', iconeCor: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400', texto: 'text-slate-700 dark:text-slate-200' },
}

export function showToast(mensagem, tipo = 'success') {
  const c = TIPOS[tipo] || TIPOS.success

  let container = document.getElementById('toast-container')
  if (!container) {
    container = document.createElement('div')
    container.id = 'toast-container'
    container.className = 'fixed bottom-20 right-6 z-[100] flex flex-col gap-2 pointer-events-none'
    document.body.appendChild(container)
  }

  const toast = document.createElement('div')
  toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border-l-4 shadow-lg text-sm max-w-xs bg-white dark:bg-slate-800 ${c.borda} transition-all duration-300`
  toast.style.transform = 'translateX(calc(100% + 1.5rem))'
  toast.innerHTML = `
    <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${c.iconeCor}">${c.icone}</div>
    <span class="font-medium ${c.texto}">${mensagem}</span>`

  container.appendChild(toast)
  requestAnimationFrame(() => { toast.style.transform = 'translateX(0)' })

  setTimeout(() => {
    toast.style.opacity = '0'
    toast.style.transform = 'translateX(calc(100% + 1.5rem))'
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}
