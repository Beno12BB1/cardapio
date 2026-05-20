import{v as n,s as i}from"./auth-B7QBNdBX.js";import{S as d}from"./sweetalert2.esm.all-p74vj6oU.js";import{b as l,r as c,s as m,h as v}from"./header-B-WQajdd.js";async function u(){var s;const e=await n();if(!e)return;l("dashboard"),c(e),m("Dashboard");const a=((s=e.user_metadata)==null?void 0:s.full_name)||e.email.split("@")[0],t=new Date().getHours(),o=t<12?"Bom dia":t<18?"Boa tarde":"Boa noite";document.getElementById("boas-vindas").innerHTML=`
    <div>
      <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">${o}, ${a}! 👋</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Aqui está o resumo do seu cardápio.</p>
    </div>`,await p(),document.body.style.visibility="visible"}async function p(){try{const[{count:e},{count:a},{count:t},{count:o},{data:s},{data:r}]=await Promise.all([i.from("pratos").select("*",{count:"exact",head:!0}),i.from("pratos").select("*",{count:"exact",head:!0}).eq("disponivel",!0),i.from("categorias").select("*",{count:"exact",head:!0}),i.from("categorias").select("*",{count:"exact",head:!0}).eq("ativo",!0),i.from("pratos").select("id, nome, preco, disponivel, emoji, categorias(nome)").order("created_at",{ascending:!1}).limit(5),i.from("categorias").select("id, nome, descricao, ativo").eq("ativo",!0).order("nome").limit(6)]);x(e,a,t,o),g(s||[]),b(r||[])}catch(e){d.fire({icon:"error",title:"Erro ao carregar dados",text:e.message})}}function x(e,a,t,o){const s=[{label:"Total de Pratos",valor:e,icon:"book-open",cor:"bg-orange-500"},{label:"Pratos Disponíveis",valor:a,icon:"check-circle",cor:"bg-green-500"},{label:"Total de Categorias",valor:t,icon:"tag",cor:"bg-blue-500"},{label:"Categorias Ativas",valor:o,icon:"chart-bar",cor:"bg-purple-500"}];document.getElementById("cards").innerHTML=s.map(r=>`
    <div class="card flex items-center gap-4">
      <div class="p-3 rounded-xl ${r.cor} text-white shrink-0">${v(r.icon,"w-6 h-6")}</div>
      <div>
        <div class="text-3xl font-bold text-slate-800 dark:text-slate-100">${r.valor??0}</div>
        <div class="text-sm text-slate-500 dark:text-slate-400">${r.label}</div>
      </div>
    </div>`).join("")}function g(e){const a=document.getElementById("lista-pratos-recentes");if(!e.length){a.innerHTML='<p class="text-slate-400 text-sm">Nenhum prato cadastrado ainda.</p>';return}a.innerHTML=e.map(t=>{var s;const o=t.disponivel?'<span class="badge-disponivel">Disponível</span>':'<span class="badge-indisponivel">Indisponível</span>';return`
      <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
        <div class="flex items-center gap-2">
          <span class="text-xl">${t.emoji||"🍽️"}</span>
          <div>
            <div class="font-medium text-sm">${t.nome}</div>
            <div class="text-xs text-slate-400">${((s=t.categorias)==null?void 0:s.nome)||"Sem categoria"}</div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm font-semibold text-orange-600 dark:text-orange-400">
            R$ ${Number(t.preco).toFixed(2)}
          </span>
          ${o}
        </div>
      </div>`}).join("")}function b(e){const a=document.getElementById("lista-categorias");if(!e.length){a.innerHTML='<p class="text-slate-400 text-sm">Nenhuma categoria ativa.</p>';return}a.innerHTML=e.map(t=>`
    <div class="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <div class="w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
      <div>
        <div class="text-sm font-medium">${t.nome}</div>
        ${t.descricao?`<div class="text-xs text-slate-400">${t.descricao}</div>`:""}
      </div>
    </div>`).join("")}u();
