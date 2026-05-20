import{v as x,s as v}from"./auth-BWDIw5O6.js";import{S as b}from"./sweetalert2.esm.all-8-IS4QHV.js";import{b as f,r as h,s as y,a as $}from"./header-Dw_q0Stu.js";let m=[],p="",c="";async function w(){var n;const e=await x();e&&(f("cardapio"),h(e),y("Ver Cardápio"),$(),await k(),document.getElementById("btn-buscar").addEventListener("click",()=>{c=document.getElementById("input-busca").value.trim().toLowerCase(),l()}),document.getElementById("input-busca").addEventListener("keydown",a=>{a.key==="Enter"&&(c=a.target.value.trim().toLowerCase(),l())}),document.getElementById("btn-limpar").addEventListener("click",()=>{document.getElementById("input-busca").value="",c="",l()}),document.getElementById("btn-imprimir").addEventListener("click",()=>window.print()),(n=document.getElementById("btn-float-busca"))==null||n.addEventListener("click",()=>{const a=document.getElementById("input-busca");a.focus(),a.scrollIntoView({behavior:"smooth",block:"center"})}),document.body.style.visibility="visible")}function E(e){const n=document.getElementById("contador-disponiveis");if(!n)return;const a=performance.now(),s=900;function t(i){const o=Math.min((i-a)/s,1);n.textContent=Math.round((1-Math.pow(1-o,3))*e),o<1&&requestAnimationFrame(t)}requestAnimationFrame(t)}async function k(){try{const{data:e,error:n}=await v.from("pratos").select("id, nome, descricao, preco, tempo_preparo, disponivel, emoji, categorias(id, nome)").order("nome");if(n)throw n;m=e||[];const a=m.filter(i=>i.disponivel);E(a.length);const s=a.length?a.reduce((i,o)=>i+Number(o.preco),0)/a.length:0,t=document.getElementById("preco-medio");t&&(t.textContent=s>0?`R$ ${s.toFixed(2)}`:"—"),g(),l()}catch(e){b.fire({icon:"error",title:"Erro ao carregar cardápio",text:e.message})}}function g(){const e=[],n=new Set,a={};m.forEach(t=>{t.categorias&&(n.has(t.categorias.id)||(n.add(t.categorias.id),e.push(t.categorias)),a[t.categorias.id]=(a[t.categorias.id]||0)+1)});const s=document.getElementById("pills-categorias");s.innerHTML=[{id:"",nome:"Todas"},...e.sort((t,i)=>t.nome.localeCompare(i.nome))].map(t=>{const i=t.id===""?m.length:a[t.id]||0,o=p===t.id;return`
    <button
      onclick="window._filtrarCategoria('${t.id}')"
      data-cat="${t.id}"
      class="pill px-4 py-1.5 rounded-full text-sm font-medium border transition-colors flex items-center gap-1.5
        ${o?"bg-orange-500 text-white border-orange-500":"bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-orange-400 hover:text-orange-600"}">
      ${t.nome}
      <span class="text-xs px-1.5 py-0.5 rounded-full ${o?"bg-orange-400":"bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"}">${i}</span>
    </button>`}).join("")}function l(){let e=m.filter(o=>{var u;const r=!c||o.nome.toLowerCase().includes(c)||(o.descricao||"").toLowerCase().includes(c),d=!p||((u=o.categorias)==null?void 0:u.id)===p;return r&&d});const n=e.length,a=e.filter(o=>o.disponivel).length;document.getElementById("total-pratos").textContent=`${n} prato${n!==1?"s":""} (${a} disponível${a!==1?"is":""})`;const s=document.getElementById("conteudo-cardapio");if(!e.length){s.innerHTML=`
      <div class="text-center py-16 text-slate-400">
        <div class="text-5xl mb-4">🍽️</div>
        <p class="text-lg font-medium">Nenhum prato encontrado.</p>
        <p class="text-sm mt-1">Tente outro filtro ou cadastre novos pratos.</p>
      </div>`;return}const t={};e.forEach(o=>{var d;const r=((d=o.categorias)==null?void 0:d.nome)||"Sem categoria";t[r]||(t[r]=[]),t[r].push(o)});let i=0;s.innerHTML=Object.entries(t).sort(([o],[r])=>o.localeCompare(r)).map(([o,r])=>`
      <div>
        <div class="flex items-center gap-3 mb-4">
          <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">${o}</h2>
          <div class="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
          <span class="text-xs text-slate-400">${r.length} item${r.length!==1?"s":""}</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          ${r.map(d=>I(d,i++)).join("")}
        </div>
      </div>`).join("")}function I(e,n=0){const a=e.tempo_preparo?`⏱ ${e.tempo_preparo} min`:"",s=e.disponivel?'<span class="badge-disponivel">Disponível</span>':'<span class="badge-indisponivel">Indisponível</span>';return`
    <div class="card p-4 flex flex-col gap-2 hover:-translate-y-1 hover:shadow-md ${e.disponivel?"":"opacity-60"}" style="animation-delay:${n*50}ms">
      <div class="text-4xl text-center py-1">${e.emoji||"🍽️"}</div>
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-semibold text-slate-800 dark:text-slate-100 leading-tight">${e.nome}</h3>
        ${s}
      </div>
      ${e.descricao?`<p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">${e.descricao}</p>`:""}
      <div class="flex items-center justify-between mt-auto pt-2 border-t border-slate-100 dark:border-slate-700">
        <span class="text-lg font-bold text-orange-600 dark:text-orange-400">
          R$ ${Number(e.preco).toFixed(2)}
        </span>
        <span class="text-xs text-slate-400">${a}</span>
      </div>
    </div>`}window._filtrarCategoria=e=>{p=e,g(),l()};w();
