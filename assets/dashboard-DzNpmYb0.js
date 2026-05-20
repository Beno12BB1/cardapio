import{v as u,s as c}from"./auth-BFs9X2rx.js";import{S as v}from"./sweetalert2.esm.all-QOjssywB.js";import{b as p,r as x,s as g,h as m}from"./header-DvM2Ufkd.js";async function b(){var o;const e=await u();if(!e)return;p("dashboard"),x(e),g("Dashboard");const a=((o=e.user_metadata)==null?void 0:o.full_name)||e.email.split("@")[0],t=new Date().getHours(),n=t<12?"Bom dia":t<18?"Boa tarde":"Boa noite";document.getElementById("boas-vindas").innerHTML=`
    <div>
      <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">${n}, ${a}! 👋</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Aqui está o resumo do seu cardápio.</p>
    </div>`,await f(),document.body.style.visibility="visible"}async function f(){try{const[{count:e},{count:a},{count:t},{count:n},{data:o},{data:r},{data:i}]=await Promise.all([c.from("pratos").select("*",{count:"exact",head:!0}),c.from("pratos").select("*",{count:"exact",head:!0}).eq("disponivel",!0),c.from("categorias").select("*",{count:"exact",head:!0}),c.from("categorias").select("*",{count:"exact",head:!0}).eq("ativo",!0),c.from("pratos").select("id, nome, preco, disponivel, emoji, imagem_url, categorias(nome)").order("created_at",{ascending:!1}).limit(5),c.from("categorias").select("id, nome, descricao, ativo").eq("ativo",!0).order("nome").limit(6),c.from("pratos").select("nome, preco, disponivel, categorias(nome)")]);h(e,a,t,n),y(i||[]),k(o||[]),w(r||[]),M(i||[])}catch(e){v.fire({icon:"error",title:"Erro ao carregar dados",text:e.message})}}function h(e,a,t,n){const o=[{label:"Total de Pratos",valor:e,icon:"book-open",cor:"bg-orange-500"},{label:"Pratos Disponíveis",valor:a,icon:"check-circle",cor:"bg-green-500"},{label:"Total de Categorias",valor:t,icon:"tag",cor:"bg-blue-500"},{label:"Categorias Ativas",valor:n,icon:"chart-bar",cor:"bg-purple-500"}];document.getElementById("cards").innerHTML=o.map(r=>`
    <div class="card flex items-center gap-4">
      <div class="p-3 rounded-xl ${r.cor} text-white shrink-0">${m(r.icon,"w-6 h-6")}</div>
      <div>
        <div class="text-3xl font-bold text-slate-800 dark:text-slate-100" data-counter="${r.valor??0}">0</div>
        <div class="text-sm text-slate-500 dark:text-slate-400">${r.label}</div>
      </div>
    </div>`).join(""),$()}function $(){document.querySelectorAll("[data-counter]").forEach(e=>{const a=parseInt(e.dataset.counter)||0;if(!a){e.textContent="0";return}const t=performance.now(),n=900,o=r=>{const i=Math.min((r-t)/n,1);e.textContent=Math.round((1-Math.pow(1-i,3))*a),i<1&&requestAnimationFrame(o)};requestAnimationFrame(o)})}function k(e){const a=document.getElementById("lista-pratos-recentes");if(!e.length){a.innerHTML='<p class="text-slate-400 text-sm">Nenhum prato cadastrado ainda.</p>';return}a.innerHTML=e.map(t=>{var o;const n=t.disponivel?'<span class="badge-disponivel">Disponível</span>':'<span class="badge-indisponivel">Indisponível</span>';return`
      <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
        <div class="flex items-center gap-2">
          <span class="text-xl">${t.emoji||"🍽️"}</span>
          <div>
            <div class="font-medium text-sm">${t.nome}</div>
            <div class="text-xs text-slate-400">${((o=t.categorias)==null?void 0:o.nome)||"Sem categoria"}</div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm font-semibold text-orange-600 dark:text-orange-400">
            R$ ${Number(t.preco).toFixed(2)}
          </span>
          ${n}
        </div>
      </div>`}).join("")}function w(e){const a=document.getElementById("lista-categorias");if(!e.length){a.innerHTML='<p class="text-slate-400 text-sm">Nenhuma categoria ativa.</p>';return}a.innerHTML=e.map(t=>`
    <div class="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <div class="w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
      <div>
        <div class="text-sm font-medium">${t.nome}</div>
        ${t.descricao?`<div class="text-xs text-slate-400">${t.descricao}</div>`:""}
      </div>
    </div>`).join("")}function y(e){const a=document.getElementById("cards-stats");if(!a||!e.length){a&&(a.innerHTML="");return}const t=e.map(s=>Number(s.preco)),n=t.reduce((s,d)=>s+d,0)/t.length,o=e.reduce((s,d)=>Number(s.preco)>=Number(d.preco)?s:d),r=e.reduce((s,d)=>Number(s.preco)<=Number(d.preco)?s:d),i=Math.round(e.filter(s=>s.disponivel).length/e.length*100),l=[{label:"Preço Médio",valor:`R$ ${n.toFixed(2)}`,icon:"tag",cor:"bg-teal-500"},{label:"Prato Mais Caro",valor:`R$ ${Number(o.preco).toFixed(2)}`,sub:o.nome,icon:"arrow-up",cor:"bg-red-500"},{label:"Prato Mais Barato",valor:`R$ ${Number(r.preco).toFixed(2)}`,sub:r.nome,icon:"check-circle",cor:"bg-sky-500"},{label:"Disponibilidade",valor:`${i}%`,icon:"chart-bar",cor:"bg-indigo-500"}];a.innerHTML=l.map(s=>`
    <div class="card flex items-center gap-4">
      <div class="p-3 rounded-xl ${s.cor} text-white shrink-0">${m(s.icon,"w-6 h-6")}</div>
      <div class="min-w-0">
        <div class="text-2xl font-bold text-slate-800 dark:text-slate-100">${s.valor}</div>
        <div class="text-xs text-slate-500 dark:text-slate-400">${s.label}</div>
        ${s.sub?`<div class="text-xs text-slate-400 truncate mt-0.5">${s.sub}</div>`:""}
      </div>
    </div>`).join("")}function M(e){var o;const a={};e.forEach(r=>{var l;const i=((l=r.categorias)==null?void 0:l.nome)||"Sem categoria";a[i]=(a[i]||0)+1});const t=Object.entries(a).sort(([,r],[,i])=>i-r),n=((o=t[0])==null?void 0:o[1])||1;document.getElementById("grafico-categorias").innerHTML=t.length?t.map(([r,i])=>{const l=Math.round(i/n*100);return`
          <div>
            <div class="flex justify-between text-sm mb-1.5">
              <span class="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[65%]">${r}</span>
              <span class="text-slate-400 shrink-0">${i} prato${i!==1?"s":""}</span>
            </div>
            <div class="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div class="h-full bg-orange-500 rounded-full"
                style="width:${l}%;transition:width 0.8s ease"></div>
            </div>
          </div>`}).join(""):'<p class="text-slate-400 text-sm">Nenhum prato cadastrado.</p>'}b();
