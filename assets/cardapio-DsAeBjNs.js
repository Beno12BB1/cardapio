import{v as u,s as x}from"./auth-BWDIw5O6.js";import{S as v}from"./sweetalert2.esm.all-BFGDy3mj.js";import{b as f,r as b,s as h,a as y}from"./header-BE-Yf_-c.js";let l=[],m="",d="";async function $(){const e=await u();e&&(f("cardapio"),b(e),h("Ver Cardápio"),y(),await k(),document.getElementById("btn-buscar").addEventListener("click",()=>{d=document.getElementById("input-busca").value.trim().toLowerCase(),c()}),document.getElementById("input-busca").addEventListener("keydown",s=>{s.key==="Enter"&&(d=s.target.value.trim().toLowerCase(),c())}),document.getElementById("btn-limpar").addEventListener("click",()=>{document.getElementById("input-busca").value="",d="",c()}),document.getElementById("btn-imprimir").addEventListener("click",()=>window.print()),document.body.style.visibility="visible")}function w(e){const s=document.getElementById("contador-disponiveis");if(!s)return;const n=performance.now(),i=900;function t(a){const o=Math.min((a-n)/i,1);s.textContent=Math.round((1-Math.pow(1-o,3))*e),o<1&&requestAnimationFrame(t)}requestAnimationFrame(t)}async function k(){try{const{data:e,error:s}=await x.from("pratos").select("id, nome, descricao, preco, tempo_preparo, disponivel, emoji, categorias(id, nome)").order("nome");if(s)throw s;l=e||[],w(l.filter(n=>n.disponivel).length),g(),c()}catch(e){v.fire({icon:"error",title:"Erro ao carregar cardápio",text:e.message})}}function g(){const e=[],s=new Set,n={};l.forEach(t=>{t.categorias&&(s.has(t.categorias.id)||(s.add(t.categorias.id),e.push(t.categorias)),n[t.categorias.id]=(n[t.categorias.id]||0)+1)});const i=document.getElementById("pills-categorias");i.innerHTML=[{id:"",nome:"Todas"},...e.sort((t,a)=>t.nome.localeCompare(a.nome))].map(t=>{const a=t.id===""?l.length:n[t.id]||0,o=m===t.id;return`
    <button
      onclick="window._filtrarCategoria('${t.id}')"
      data-cat="${t.id}"
      class="pill px-4 py-1.5 rounded-full text-sm font-medium border transition-colors flex items-center gap-1.5
        ${o?"bg-orange-500 text-white border-orange-500":"bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-orange-400 hover:text-orange-600"}">
      ${t.nome}
      <span class="text-xs px-1.5 py-0.5 rounded-full ${o?"bg-orange-400":"bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"}">${a}</span>
    </button>`}).join("")}function c(){let e=l.filter(a=>{var p;const o=!d||a.nome.toLowerCase().includes(d)||(a.descricao||"").toLowerCase().includes(d),r=!m||((p=a.categorias)==null?void 0:p.id)===m;return o&&r});const s=e.length,n=e.filter(a=>a.disponivel).length;document.getElementById("total-pratos").textContent=`${s} prato${s!==1?"s":""} (${n} disponível${n!==1?"is":""})`;const i=document.getElementById("conteudo-cardapio");if(!e.length){i.innerHTML=`
      <div class="text-center py-16 text-slate-400">
        <div class="text-5xl mb-4">🍽️</div>
        <p class="text-lg font-medium">Nenhum prato encontrado.</p>
        <p class="text-sm mt-1">Tente outro filtro ou cadastre novos pratos.</p>
      </div>`;return}const t={};e.forEach(a=>{var r;const o=((r=a.categorias)==null?void 0:r.nome)||"Sem categoria";t[o]||(t[o]=[]),t[o].push(a)}),i.innerHTML=Object.entries(t).sort(([a],[o])=>a.localeCompare(o)).map(([a,o])=>`
      <div>
        <div class="flex items-center gap-3 mb-4">
          <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">${a}</h2>
          <div class="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
          <span class="text-xs text-slate-400">${o.length} item${o.length!==1?"s":""}</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          ${o.map(r=>E(r)).join("")}
        </div>
      </div>`).join("")}function E(e){const s=e.tempo_preparo?`⏱ ${e.tempo_preparo} min`:"",n=e.disponivel?'<span class="badge-disponivel">Disponível</span>':'<span class="badge-indisponivel">Indisponível</span>';return`
    <div class="card p-4 flex flex-col gap-2 ${e.disponivel?"":"opacity-60"}">
      <div class="text-4xl text-center py-1">${e.emoji||"🍽️"}</div>
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-semibold text-slate-800 dark:text-slate-100 leading-tight">${e.nome}</h3>
        ${n}
      </div>
      ${e.descricao?`<p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">${e.descricao}</p>`:""}
      <div class="flex items-center justify-between mt-auto pt-2 border-t border-slate-100 dark:border-slate-700">
        <span class="text-lg font-bold text-orange-600 dark:text-orange-400">
          R$ ${Number(e.preco).toFixed(2)}
        </span>
        <span class="text-xs text-slate-400">${s}</span>
      </div>
    </div>`}window._filtrarCategoria=e=>{m=e,g(),c()};$();
