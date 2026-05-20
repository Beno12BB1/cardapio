import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_KEY

if (!url || !key) {
  console.error('Crie o arquivo .env com VITE_SUPABASE_URL e VITE_SUPABASE_KEY')
}

export const supabase = createClient(url, key)

export async function uploadImagem(arquivo) {
  const ext  = arquivo.name.split('.').pop().toLowerCase()
  const nome = `${crypto.randomUUID()}.${ext}`

  const { data, error } = await supabase.storage
    .from('pratos')
    .upload(nome, arquivo, { cacheControl: '3600', upsert: false })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('pratos')
    .getPublicUrl(data.path)

  return publicUrl
}
