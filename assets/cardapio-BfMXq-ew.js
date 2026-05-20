import{v as u,s as x}from"./auth-B7QBNdBX.js";import{S as v}from"./sweetalert2.esm.all-p74vj6oU.js";import{b,r as f,s as h,a as y}from"./header-B-WQajdd.js";let c=[],m="",n="";async function $(){const e=await u();e&&(b("cardapio"),f(e),h("Ver Cardápio"),y(),await w(),document.getElementById("btn-buscar").addEventListener("click",()=>{n=document.getElementById("input-busca").value.trim().toLowerCase(),d()}),document.getElementById("input-busca").addEventListener("keydown",o=>{o.key==="Enter"&&(n=o.target.value.trim().toLowerCase(),d())}),document.getElementById("btn-limpar").addEventListener("click",()=>{document.getElementById("input-busca").value="",n="",d()}),document.getElementById("btn-imprimir").addEventListener("click",()=>window.print()),document.body.style.visibility="visible")}async function w(){try{const{data:e,error:o}=await x.from("pratos").select("id, nome, descricao, preco, tempo_preparo, disponivel, emoji, categorias(id, nome)").order("nome");if(o)throw o;c=e||[],g(),d()}catch(e){v.fire({icon:"error",title:"Erro ao carregar cardápio",text:e.message})}}function g(){const e=[],o=new Set,r={};c.forEach(t=>{t.categorias&&(o.has(t.categorias.id)||(o.add(t.categorias.id),e.push(t.categorias)),r[t.categorias.id]=(r[t.categorias.id]||0)+1)});const l=document.getElementById("pills-categorias");l.innerHTML=[{id:"",nome:"Todas"},...e.sort((t,a)=>t.nome.localeCompare(a.nome))].map(t=>{const a=t.id===""?c.length:r[t.id]||0,s=m===t.id;return`
    <button
      onclick="window._filtrarCategoria('${t.id}')"
      data-cat="${t.id}"
      class="pill px-4 py-1.5 rounded-full text-sm font-medium border transition-colors flex items-center gap-1.5
        ${s?"bg-orange-500 text-white border-orange-500":"bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-orange-400 hover:text-orange-600"}">
      ${t.nome}
      <span class="text-xs px-1.5 py-0.5 rounded-full ${s?"bg-orange-400":"bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"}">${a}</span>
    </button>`}).join("")}function d(){let e=c.filter(a=>{var p;const s=!n||a.nome.toLowerCase().includes(n)||(a.descricao||"").toLowerCase().includes(n),i=!m||((p=a.categorias)==null?void 0:p.id)===m;return s&&i});const o=e.length,r=e.filter(a=>a.disponivel).length;document.getElementById("total-pratos").textContent=`${o} prato${o!==1?"s":""} (${r} disponível${r!==1?"is":""})`;const l=document.getElementById("conteudo-cardapio");if(!e.length){l.innerHTML=`
      <div class="text-center py-16 text-slate-400">
        <div class="text-5xl mb-4">🍽️</div>
        <p class="text-lg font-medium">Nenhum prato encontrado.</p>
        <p class="text-sm mt-1">Tente outro filtro ou cadastre novos pratos.</p>
      </div>`;return}const t={};e.forEach(a=>{var i;const s=((i=a.categorias)==null?void 0:i.nome)||"Sem categoria";t[s]||(t[s]=[]),t[s].push(a)}),l.innerHTML=Object.entries(t).sort(([a],[s])=>a.localeCompare(s)).map(([a,s])=>`
      <div>
        <div class="flex items-center gap-3 mb-4">
          <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">${a}</h2>
          <div class="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
          <span class="text-xs text-slate-400">${s.length} item${s.length!==1?"s":""}</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          ${s.map(i=>k(i)).join("")}
        </div>
      </div>`).join("")}function k(e){const o=e.tempo_preparo?`⏱ ${e.tempo_preparo} min`:"",r=e.disponivel?'<span class="badge-disponivel">Disponível</span>':'<span class="badge-indisponivel">Indisponível</span>';return`
    <div class="card p-4 flex flex-col gap-2 ${e.disponivel?"":"opacity-60"}">
      <div class="text-4xl text-center py-1">${e.emoji||"🍽️"}</div>
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-semibold text-slate-800 dark:text-slate-100 leading-tight">${e.nome}</h3>
        ${r}
      </div>
      ${e.descricao?`<p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">${e.descricao}</p>`:""}
      <div class="flex items-center justify-between mt-auto pt-2 border-t border-slate-100 dark:border-slate-700">
        <span class="text-lg font-bold text-orange-600 dark:text-orange-400">
          R$ ${Number(e.preco).toFixed(2)}
        </span>
        <span class="text-xs text-slate-400">${o}</span>
      </div>
    </div>`}window._filtrarCategoria=e=>{m=e,g(),d()};$();
