import '../css/style.css'
import { login, registrar, getUsuarioAtual } from './auth.js'
import Swal from 'sweetalert2'

const BASE = import.meta.env.BASE_URL

// Aplicar tema salvo
if (localStorage.getItem('tema') === 'dark') {
  document.documentElement.classList.add('dark')
}

// Se já logado, vai pro dashboard
getUsuarioAtual().then(u => {
  if (u) window.location.href = BASE + 'pages/dashboard.html'
})

// === LOGIN ===
document.getElementById('form-login').addEventListener('submit', async e => {
  e.preventDefault()
  const email = document.getElementById('login-email').value.trim()
  const senha  = document.getElementById('login-senha').value
  if (!email || !senha) {
    Swal.fire({ icon: 'warning', title: 'Atenção', text: 'Preencha e-mail e senha.' })
    return
  }
  const btn = document.getElementById('btn-login')
  btn.disabled = true; btn.textContent = 'Entrando...'
  try {
    await login(email, senha)
    window.location.href = BASE + 'pages/dashboard.html'
  } catch (err) {
    Swal.fire({
      icon: 'error', title: 'Erro ao entrar',
      text: err.message.includes('Invalid') ? 'E-mail ou senha incorretos.' : err.message,
    })
    const form = document.getElementById('form-login')
    form.classList.remove('shake')
    void form.offsetWidth
    form.classList.add('shake')
    form.addEventListener('animationend', () => form.classList.remove('shake'), { once: true })
  } finally {
    btn.disabled = false; btn.textContent = 'Entrar'
  }
})

// === FORÇA DE SENHA + VALIDAÇÃO ===
{
  const cadEmail    = document.getElementById('cad-email')
  const cadSenha    = document.getElementById('cad-senha')
  const cadConfirma = document.getElementById('cad-confirma')
  const btnCad      = document.getElementById('btn-cadastro')

  btnCad.disabled = true

  function verificarCampos() {
    btnCad.disabled = !(cadEmail.value.trim() && cadSenha.value && cadConfirma.value)
  }

  function atualizarForca(senha) {
    const div    = document.getElementById('forca-senha')
    const texto  = document.getElementById('texto-forca')
    const barras = ['barra-f1', 'barra-f2', 'barra-f3'].map(id => document.getElementById(id))
    if (!senha) { div.classList.add('hidden'); return }
    div.classList.remove('hidden')

    let nivel, label, cor
    if (senha.length < 6) {
      nivel = 1; label = 'Fraca'; cor = 'bg-red-500'
    } else if (senha.length < 8 || !/\d/.test(senha)) {
      nivel = 2; label = 'Média'; cor = 'bg-yellow-500'
    } else {
      nivel = 3; label = 'Forte'; cor = 'bg-green-500'
    }

    barras.forEach((b, i) => {
      b.className = `h-1 flex-1 rounded-full transition-colors duration-300 ${i < nivel ? cor : 'bg-slate-200'}`
    })
    texto.textContent = label
    texto.className = `text-xs ${nivel === 1 ? 'text-red-500' : nivel === 2 ? 'text-yellow-500' : 'text-green-500'}`
  }

  cadSenha.addEventListener('input', () => { atualizarForca(cadSenha.value); verificarCampos() })
  cadEmail.addEventListener('input', verificarCampos)
  cadConfirma.addEventListener('input', verificarCampos)
}

// Ripple effect nos botões
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-primary, .btn-danger')
  if (!btn) return
  const rect = btn.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const r = document.createElement('span')
  r.className = 'ripple'
  r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`
  btn.appendChild(r)
  r.addEventListener('animationend', () => r.remove())
}, true)

// === CADASTRO ===
document.getElementById('form-cadastro').addEventListener('submit', async e => {
  e.preventDefault()
  const email    = document.getElementById('cad-email').value.trim()
  const senha    = document.getElementById('cad-senha').value
  const confirma = document.getElementById('cad-confirma').value
  if (!email || !senha) {
    Swal.fire({ icon: 'warning', title: 'Atenção', text: 'Preencha todos os campos.' }); return
  }
  if (senha.length < 6) {
    Swal.fire({ icon: 'warning', title: 'Atenção', text: 'A senha deve ter ao menos 6 caracteres.' }); return
  }
  if (senha !== confirma) {
    Swal.fire({ icon: 'warning', title: 'Atenção', text: 'As senhas não coincidem.' }); return
  }
  const btn = document.getElementById('btn-cadastro')
  btn.disabled = true; btn.textContent = 'Criando conta...'
  try {
    const data = await registrar(email, senha)
    if (data.session) {
      window.location.href = BASE + 'pages/dashboard.html'
      return
    }
    Swal.fire({
      icon: 'success', title: 'Conta criada!',
      text: 'Faça o login para continuar.',
    })
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Erro ao cadastrar', text: err.message })
  } finally {
    btn.disabled = false; btn.textContent = 'Criar conta'
  }
})
