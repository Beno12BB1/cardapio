import{v as c,s as n}from"./auth-B7QBNdBX.js";import{S as l}from"./sweetalert2.esm.all-BFGDy3mj.js";import{b as m,r as v,s as u,h as p}from"./header-CkVEXoaN.js";async function g(){var s;const t=await c();if(!t)return;m("dashboard"),v(t),u("Dashboard");const a=((s=t.user_metadata)==null?void 0:s.full_name)||t.email.split("@")[0],e=new Date().getHours(),i=e<12?"Bom dia":e<18?"Boa tarde":"Boa noite";document.getElementById("boas-vindas").innerHTML=`
    <div>
      <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">${i}, ${a}! 👋</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Aqui está o resumo do seu cardápio.</p>
    </div>`,await x(),document.body.style.visibility="visible"}async function x(){try{const[{count:t},{count:a},{count:e},{count:i},{data:s},{data:o},{data:r}]=await Promise.all([n.from("pratos").select("*",{count:"exact",head:!0}),n.from("pratos").select("*",{count:"exact",head:!0}).eq("disponivel",!0),n.from("categorias").select("*",{count:"exact",head:!0}),n.from("categorias").select("*",{count:"exact",head:!0}).eq("ativo",!0),n.from("pratos").select("id, nome, preco, disponivel, emoji, categorias(nome)").order("created_at",{ascending:!1}).limit(5),n.from("categorias").select("id, nome, descricao, ativo").eq("ativo",!0).order("nome").limit(6),n.from("pratos").select("disponivel, categorias(nome)")]);b(t,a,e,i),f(s||[]),h(o||[]),$(r||[])}catch(t){l.fire({icon:"error",title:"Erro ao carregar dados",text:t.message})}}function b(t,a,e,i){const s=[{label:"Total de Pratos",valor:t,icon:"book-open",cor:"bg-orange-500"},{label:"Pratos Disponíveis",valor:a,icon:"check-circle",cor:"bg-green-500"},{label:"Total de Categorias",valor:e,icon:"tag",cor:"bg-blue-500"},{label:"Categorias Ativas",valor:i,icon:"chart-bar",cor:"bg-purple-500"}];document.getElementById("cards").innerHTML=s.map(o=>`
    <div class="card flex items-center gap-4">
      <div class="p-3 rounded-xl ${o.cor} text-white shrink-0">${p(o.icon,"w-6 h-6")}</div>
      <div>
        <div class="text-3xl font-bold text-slate-800 dark:text-slate-100">${o.valor??0}</div>
        <div class="text-sm text-slate-500 dark:text-slate-400">${o.label}</div>
      </div>
    </div>`).join("")}function f(t){const a=document.getElementById("lista-pratos-recentes");if(!t.length){a.innerHTML='<p class="text-slate-400 text-sm">Nenhum prato cadastrado ainda.</p>';return}a.innerHTML=t.map(e=>{var s;const i=e.disponivel?'<span class="badge-disponivel">Disponível</span>':'<span class="badge-indisponivel">Indisponível</span>';return`
      <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
        <div class="flex items-center gap-2">
          <span class="text-xl">${e.emoji||"🍽️"}</span>
          <div>
            <div class="font-medium text-sm">${e.nome}</div>
            <div class="text-xs text-slate-400">${((s=e.categorias)==null?void 0:s.nome)||"Sem categoria"}</div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm font-semibold text-orange-600 dark:text-orange-400">
            R$ ${Number(e.preco).toFixed(2)}
          </span>
          ${i}
        </div>
      </div>`}).join("")}function h(t){const a=document.getElementById("lista-categorias");if(!t.length){a.innerHTML='<p class="text-slate-400 text-sm">Nenhuma categoria ativa.</p>';return}a.innerHTML=t.map(e=>`
    <div class="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <div class="w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
      <div>
        <div class="text-sm font-medium">${e.nome}</div>
        ${e.descricao?`<div class="text-xs text-slate-400">${e.descricao}</div>`:""}
      </div>
    </div>`).join("")}function $(t){var s;const a={};t.forEach(o=>{var d;const r=((d=o.categorias)==null?void 0:d.nome)||"Sem categoria";a[r]=(a[r]||0)+1});const e=Object.entries(a).sort(([,o],[,r])=>r-o),i=((s=e[0])==null?void 0:s[1])||1;document.getElementById("grafico-categorias").innerHTML=e.length?e.map(([o,r])=>{const d=Math.round(r/i*100);return`
          <div>
            <div class="flex justify-between text-sm mb-1.5">
              <span class="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[65%]">${o}</span>
              <span class="text-slate-400 shrink-0">${r} prato${r!==1?"s":""}</span>
            </div>
            <div class="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div class="h-full bg-orange-500 rounded-full"
                style="width:${d}%;transition:width 0.8s ease"></div>
            </div>
          </div>`}).join(""):'<p class="text-slate-400 text-sm">Nenhum prato cadastrado.</p>'}g();
