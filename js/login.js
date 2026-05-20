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
  } finally {
    btn.disabled = false; btn.textContent = 'Entrar'
  }
})

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
