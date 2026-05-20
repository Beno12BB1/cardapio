import{v as x,s as v}from"./auth-BWDIw5O6.js";import{S as f}from"./sweetalert2.esm.all-Dx-T5OB6.js";import{b,r as h,s as y,a as $}from"./header-25cIYKJM.js";let m=[],p="",c="";async function w(){const e=await x();e&&(b("cardapio"),h(e),y("Ver Cardápio"),$(),await k(),document.getElementById("btn-buscar").addEventListener("click",()=>{c=document.getElementById("input-busca").value.trim().toLowerCase(),l()}),document.getElementById("input-busca").addEventListener("keydown",o=>{o.key==="Enter"&&(c=o.target.value.trim().toLowerCase(),l())}),document.getElementById("btn-limpar").addEventListener("click",()=>{document.getElementById("input-busca").value="",c="",l()}),document.getElementById("btn-imprimir").addEventListener("click",()=>window.print()),document.body.style.visibility="visible")}function E(e){const o=document.getElementById("contador-disponiveis");if(!o)return;const s=performance.now(),n=900;function t(i){const a=Math.min((i-s)/n,1);o.textContent=Math.round((1-Math.pow(1-a,3))*e),a<1&&requestAnimationFrame(t)}requestAnimationFrame(t)}async function k(){try{const{data:e,error:o}=await v.from("pratos").select("id, nome, descricao, preco, tempo_preparo, disponivel, emoji, categorias(id, nome)").order("nome");if(o)throw o;m=e||[];const s=m.filter(i=>i.disponivel);E(s.length);const n=s.length?s.reduce((i,a)=>i+Number(a.preco),0)/s.length:0,t=document.getElementById("preco-medio");t&&(t.textContent=n>0?`R$ ${n.toFixed(2)}`:"—"),u(),l()}catch(e){f.fire({icon:"error",title:"Erro ao carregar cardápio",text:e.message})}}function u(){const e=[],o=new Set,s={};m.forEach(t=>{t.categorias&&(o.has(t.categorias.id)||(o.add(t.categorias.id),e.push(t.categorias)),s[t.categorias.id]=(s[t.categorias.id]||0)+1)});const n=document.getElementById("pills-categorias");n.innerHTML=[{id:"",nome:"Todas"},...e.sort((t,i)=>t.nome.localeCompare(i.nome))].map(t=>{const i=t.id===""?m.length:s[t.id]||0,a=p===t.id;return`
    <button
      onclick="window._filtrarCategoria('${t.id}')"
      data-cat="${t.id}"
      class="pill px-4 py-1.5 rounded-full text-sm font-medium border transition-colors flex items-center gap-1.5
        ${a?"bg-orange-500 text-white border-orange-500":"bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-orange-400 hover:text-orange-600"}">
      ${t.nome}
      <span class="text-xs px-1.5 py-0.5 rounded-full ${a?"bg-orange-400":"bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"}">${i}</span>
    </button>`}).join("")}function l(){let e=m.filter(a=>{var g;const r=!c||a.nome.toLowerCase().includes(c)||(a.descricao||"").toLowerCase().includes(c),d=!p||((g=a.categorias)==null?void 0:g.id)===p;return r&&d});const o=e.length,s=e.filter(a=>a.disponivel).length;document.getElementById("total-pratos").textContent=`${o} prato${o!==1?"s":""} (${s} disponível${s!==1?"is":""})`;const n=document.getElementById("conteudo-cardapio");if(!e.length){n.innerHTML=`
      <div class="text-center py-16 text-slate-400">
        <div class="text-5xl mb-4">🍽️</div>
        <p class="text-lg font-medium">Nenhum prato encontrado.</p>
        <p class="text-sm mt-1">Tente outro filtro ou cadastre novos pratos.</p>
      </div>`;return}const t={};e.forEach(a=>{var d;const r=((d=a.categorias)==null?void 0:d.nome)||"Sem categoria";t[r]||(t[r]=[]),t[r].push(a)});let i=0;n.innerHTML=Object.entries(t).sort(([a],[r])=>a.localeCompare(r)).map(([a,r])=>`
      <div>
        <div class="flex items-center gap-3 mb-4">
          <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">${a}</h2>
          <div class="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
          <span class="text-xs text-slate-400">${r.length} item${r.length!==1?"s":""}</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          ${r.map(d=>C(d,i++)).join("")}
        </div>
      </div>`).join("")}function C(e,o=0){const s=e.tempo_preparo?`⏱ ${e.tempo_preparo} min`:"",n=e.disponivel?'<span class="badge-disponivel">Disponível</span>':'<span class="badge-indisponivel">Indisponível</span>';return`
    <div class="card p-4 flex flex-col gap-2 ${e.disponivel?"":"opacity-60"}" style="animation-delay:${o*50}ms">
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
    </div>`}window._filtrarCategoria=e=>{p=e,u(),l()};w();
