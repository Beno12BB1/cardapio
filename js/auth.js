import { supabase } from './supabase.js'

const BASE = import.meta.env.BASE_URL

export async function registrar(email, senha) {
  const { data, error } = await supabase.auth.signUp({ email, password: senha })
  if (error) throw error
  return data
}

export async function login(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha })
  if (error) throw error
  return data
}

export async function logout() {
  await supabase.auth.signOut()
  window.location.href = BASE + 'login.html'
}

export async function getUsuarioAtual() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user || null
}

export async function verificarAutenticacao() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    window.location.href = BASE + 'login.html'
    return null
  }
  return session.user
}
