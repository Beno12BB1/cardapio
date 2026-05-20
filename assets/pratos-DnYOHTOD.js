import{s as p,u as q,v as S}from"./auth-BFs9X2rx.js";import{S as r}from"./sweetalert2.esm.all-BsatnCF5.js";import{b as R,r as z,s as A,a as O}from"./header-DvM2Ufkd.js";import{a as V,s as y}from"./dropdown-bibIyZlW.js";const C=10;let n=1,B=1,v="",x="",b="",j="nome",I="asc",M;const E=a=>(a||"").replace(/'/g,"\\'");async function F(){const a=await S();a&&(R("pratos"),z(a),A("Pratos"),O(),await U(),document.getElementById("btn-novo").addEventListener("click",()=>N()),document.getElementById("btn-exportar").addEventListener("click",G),document.getElementById("form-busca").addEventListener("submit",t=>{t.preventDefault(),v=document.getElementById("input-busca").value.trim(),x=document.getElementById("filtro-categoria").value,b=document.getElementById("filtro-disponivel").value,n=1,l()}),document.getElementById("input-busca").addEventListener("input",t=>{clearTimeout(M),M=setTimeout(()=>{v=t.target.value.trim(),n=1,l()},300)}),document.getElementById("filtro-categoria").addEventListener("change",()=>{x=document.getElementById("filtro-categoria").value,n=1,l()}),document.getElementById("filtro-disponivel").addEventListener("change",()=>{b=document.getElementById("filtro-disponivel").value,n=1,l()}),document.getElementById("btn-limpar").addEventListener("click",()=>{document.getElementById("input-busca").value="",document.getElementById("filtro-categoria").value="",document.getElementById("filtro-disponivel").value="",v="",x="",b="",n=1,l()}),document.getElementById("btn-anterior").addEventListener("click",()=>{n>1&&(n--,l())}),document.getElementById("btn-proxima").addEventListener("click",()=>{n<B&&(n++,l())}),await l(),document.body.style.visibility="visible")}async function U(){const{data:a}=await p.from("categorias").select("id, nome").eq("ativo",!0).order("nome"),t=document.getElementById("filtro-categoria");a&&a.forEach(e=>{const i=document.createElement("option");i.value=e.id,i.textContent=e.nome,t.appendChild(i)})}async function l(){document.getElementById("tbody").innerHTML=`<tr><td colspan="7" class="px-4 py-8">
    <div class="space-y-2">
      ${Array(4).fill('<div class="animate-pulse h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>').join("")}
    </div></td></tr>`;const a=(n-1)*C;let t=p.from("pratos").select("id, nome, descricao, preco, tempo_preparo, disponivel, emoji, imagem_url, categorias(id, nome)",{count:"exact"}).order(j,{ascending:I==="asc"});v&&(t=t.ilike("nome",`%${v}%`)),x&&(t=t.eq("categoria_id",x)),b&&(t=t.eq("disponivel",b==="true")),t=t.range(a,a+C-1);const{data:e,count:i,error:s}=await t;if(s){r.fire({icon:"error",title:"Erro",text:s.message});return}B=Math.max(1,Math.ceil((i||0)/C)),H(e||[]),document.getElementById("info-pagina").textContent=`Página ${n} de ${B}`,document.getElementById("btn-anterior").disabled=n===1,document.getElementById("btn-proxima").disabled=n===B}function H(a){const t=document.getElementById("tbody");if(!a.length){t.innerHTML=`<tr><td colspan="6" class="px-4 py-10 text-center text-slate-400">
      Nenhum prato encontrado.</td></tr>`;return}t.innerHTML=a.map((e,i)=>{var d;const s=e.disponivel?'<span class="badge-disponivel">Disponível</span>':'<span class="badge-indisponivel">Indisponível</span>',o=e.disponivel?`<button onclick="window._toggle('${e.id}',false,'${E(e.nome)}')" class="btn-danger text-xs px-3 py-1">Tirar</button>`:`<button onclick="window._toggle('${e.id}',true,'${E(e.nome)}')"  class="btn-success text-xs px-3 py-1">Disponibilizar</button>`,u=e.tempo_preparo?`${e.tempo_preparo} min`:"—";return`
      <tr class="table-row" style="animation:fadeInUp 0.3s ease both;animation-delay:${i*50}ms">
        <td class="px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">${e.emoji||"🍽️"}</span>
            <div>
              <div class="font-medium">${e.nome}</div>
              ${e.descricao?`<div class="text-xs text-slate-400 mt-0.5 max-w-xs truncate hidden sm:block">${e.descricao}</div>`:""}
            </div>
          </div>
        </td>
        <td class="px-4 py-3 text-slate-600 dark:text-slate-300 hidden sm:table-cell">${((d=e.categorias)==null?void 0:d.nome)||"—"}</td>
        <td class="px-4 py-3 font-semibold ${e.disponivel?"text-green-600 dark:text-green-400":"text-slate-400 dark:text-slate-500"}">
          R$ ${Number(e.preco).toFixed(2)}
        </td>
        <td class="px-4 py-3 text-slate-600 dark:text-slate-300 hidden sm:table-cell">${u}</td>
        <td class="px-4 py-3 hidden sm:table-cell">${s}</td>
        <td class="px-4 py-3 text-right space-x-2 hidden sm:table-cell">
          <button onclick="window._editar('${e.id}')" class="btn-secondary text-xs px-3 py-1">Editar</button>
          ${o}
          <button onclick="window._excluir('${e.id}','${E(e.nome)}')" class="btn-danger text-xs px-3 py-1">Excluir</button>
        </td>
        <td class="px-2 py-3 text-right sm:hidden">
          <button onclick="window._menuPrato(this,'${e.id}','${E(e.nome)}',${e.disponivel})"
            class="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl flex items-center justify-center ml-auto transition-colors">⋮</button>
        </td>
      </tr>`}).join("")}async function G(){const{data:a,error:t}=await p.from("pratos").select("nome, preco, tempo_preparo, disponivel, categorias(nome)").order("nome");if(t||!(a!=null&&a.length)){y("Nenhum prato para exportar.","warning");return}const e="\uFEFF",i=`Nome,Categoria,Preço (R$),Tempo (min),Disponível
`,s=a.map(c=>{var m;return[`"${c.nome}"`,`"${((m=c.categorias)==null?void 0:m.nome)||""}"`,Number(c.preco).toFixed(2).replace(".",","),c.tempo_preparo||"",c.disponivel?"Sim":"Não"].join(",")}).join(`
`),o=new Blob([e+i+s],{type:"text/csv;charset=utf-8;"}),u=URL.createObjectURL(o),d=document.createElement("a");d.href=u,d.download=`pratos-${new Date().toISOString().slice(0,10)}.csv`,d.click(),URL.revokeObjectURL(u),y("CSV exportado com sucesso!")}async function N(a=null){const{data:t}=await p.from("categorias").select("id, nome").eq("ativo",!0).order("nome");if(!(t!=null&&t.length)){r.fire({icon:"warning",title:"Atenção",text:"Cadastre pelo menos uma categoria antes de adicionar pratos."});return}let e={nome:"",descricao:"",preco:"",tempo_preparo:"",disponivel:!0,categoria_id:"",emoji:"🍽️",imagem_url:""};if(a){const{data:o}=await p.from("pratos").select("*").eq("id",a).single();o&&(e=o)}const i=t.map(o=>`<option value="${o.id}" ${o.id===e.categoria_id?"selected":""}>${o.nome}</option>`).join(""),{value:s}=await r.fire({title:a?"Editar Prato":"Novo Prato",width:500,html:`
      <div class="text-left space-y-3 mt-2">
        <div class="grid grid-cols-[1fr_80px] gap-3">
          <div>
            <label class="text-sm font-medium text-slate-700">Nome *</label>
            <input id="s-nome" class="input-field mt-1" placeholder="Ex: Pizza Margherita" value="${e.nome}">
          </div>
          <div>
            <label class="text-sm font-medium text-slate-700">Emoji</label>
            <input id="s-emoji" class="input-field mt-1 text-center text-xl" placeholder="🍽️" value="${e.emoji||"🍽️"}">
          </div>
        </div>
        <div>
          <label class="text-sm font-medium text-slate-700">Imagem (opcional)</label>
          ${e.imagem_url?`
            <div id="imagem-atual-wrapper" class="mb-2 mt-1">
              <img src="${e.imagem_url}"
                class="w-full h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-600">
              <div class="flex items-center justify-between mt-1">
                <p class="text-xs text-slate-400">Imagem atual</p>
                <button type="button" id="btn-remover-imagem"
                  class="text-xs text-red-500 hover:text-red-700 transition-colors flex items-center gap-1">
                  🗑️ Remover imagem
                </button>
              </div>
            </div>
            <input type="hidden" id="flag-remover" value="false">`:""}
          <input id="s-imagem" type="file" accept="image/*"
            class="block w-full mt-1 text-sm text-slate-500 cursor-pointer rounded-lg
                   file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0
                   file:text-sm file:font-medium file:bg-orange-100 file:text-orange-700
                   hover:file:bg-orange-200 file:cursor-pointer">
          <div id="preview-imagem" class="mt-2 hidden">
            <img id="img-preview" class="w-full h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-600">
            <p class="text-xs text-slate-400 mt-0.5">Nova imagem selecionada</p>
          </div>
          <div id="upload-progress" class="mt-2 hidden">
            <p class="text-xs text-slate-500 mb-1">Enviando imagem…</p>
            <div class="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div id="progress-bar" class="h-full bg-orange-500 rounded-full transition-all duration-300" style="width:0%"></div>
            </div>
          </div>
        </div>
        <div>
          <label class="text-sm font-medium text-slate-700">Descrição</label>
          <textarea id="s-desc" class="input-field mt-1 resize-none" rows="2"
            placeholder="Ingredientes, detalhes do prato...">${e.descricao||""}</textarea>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium text-slate-700">Preço (R$) *</label>
            <input id="s-preco" type="number" min="0" step="0.01" class="input-field mt-1" placeholder="0,00" value="${e.preco||""}">
          </div>
          <div>
            <label class="text-sm font-medium text-slate-700">Tempo de preparo (min)</label>
            <input id="s-tempo" type="number" min="1" class="input-field mt-1" placeholder="Ex: 30" value="${e.tempo_preparo||""}">
          </div>
        </div>
        <div>
          <label class="text-sm font-medium text-slate-700">Categoria *</label>
          <select id="s-cat" class="input-field mt-1">
            <option value="">Selecione...</option>
            ${i}
          </select>
        </div>
        <div class="flex items-center gap-2 pt-1">
          <input id="s-disp" type="checkbox" class="w-4 h-4 accent-orange-500" ${e.disponivel!==!1?"checked":""}>
          <label for="s-disp" class="text-sm font-medium text-slate-700">Disponível no cardápio</label>
        </div>
      </div>`,showCancelButton:!0,confirmButtonText:"Salvar",cancelButtonText:"Cancelar",confirmButtonColor:"#f97316",didOpen:()=>{var c;const o=document.getElementById("s-imagem"),u=document.getElementById("preview-imagem"),d=document.getElementById("img-preview");o&&(o.addEventListener("change",()=>{const m=o.files[0];if(!m){u.classList.add("hidden");return}const g=new FileReader;g.onload=$=>{d.src=$.target.result,u.classList.remove("hidden")},g.readAsDataURL(m)}),(c=document.getElementById("btn-remover-imagem"))==null||c.addEventListener("click",()=>{const m=document.getElementById("imagem-atual-wrapper");m&&(m.innerHTML=`
          <div class="text-center mb-2 py-1">
            <div class="text-4xl">${e.emoji||"🍽️"}</div>
            <p class="text-xs text-slate-400 mt-1">Nenhuma imagem — emoji será exibido no lugar</p>
          </div>`);const g=document.getElementById("flag-remover");g&&(g.value="true")}))},preConfirm:async()=>{var L,T,D;const o=document.getElementById("s-nome").value.trim(),u=document.getElementById("s-desc").value.trim()||null,d=document.getElementById("s-preco").value,c=document.getElementById("s-tempo").value,m=document.getElementById("s-cat").value,g=document.getElementById("s-disp").checked,$=document.getElementById("s-emoji").value.trim()||"🍽️";if(!o)return r.showValidationMessage("O nome é obrigatório."),!1;if(!d)return r.showValidationMessage("O preço é obrigatório."),!1;if(!m)return r.showValidationMessage("Selecione uma categoria."),!1;const _=parseFloat(d);if(isNaN(_)||_<0)return r.showValidationMessage("Preço inválido."),!1;let k=e.imagem_url||null;if(((L=document.getElementById("flag-remover"))==null?void 0:L.value)==="true"){if((T=e.imagem_url)!=null&&T.includes("/storage/v1/object/public/pratos/")){const f=e.imagem_url.split("/pratos/")[1];f&&await p.storage.from("pratos").remove([f]).catch(()=>{})}k=null}else{const f=(D=document.getElementById("s-imagem"))==null?void 0:D.files[0];if(f){const w=document.getElementById("progress-bar");document.getElementById("upload-progress").classList.remove("hidden"),w.style.width="0%";const P=setInterval(()=>{const h=parseFloat(w.style.width)||0;h<80&&(w.style.width=`${h+15}%`)},200);try{k=await q(f),clearInterval(P),w.style.width="100%"}catch(h){return clearInterval(P),r.showValidationMessage(`Erro no upload: ${h.message}`),!1}}}return{nome:o,descricao:u,preco:_,tempo_preparo:c?parseInt(c):null,categoria_id:m,disponivel:g,emoji:$,imagem_url:k}}});if(s)try{const{error:o}=a?await p.from("pratos").update(s).eq("id",a):await p.from("pratos").insert(s);if(o)throw o;y(a?"Prato atualizado!":"Prato criado!"),l()}catch(o){r.fire({icon:"error",title:"Erro ao salvar",text:o.message})}}window._sortBy=a=>{I=j===a&&I==="asc"?"desc":"asc",j=a,document.querySelectorAll("[data-sort]").forEach(t=>{t.textContent=t.dataset.sort===a?I==="asc"?" ↑":" ↓":" ↕"}),n=1,l()};window._menuPrato=(a,t,e,i)=>V(a,[{label:"Editar",fn:()=>window._editar(t)},{label:i?"Tirar do cardápio":"Disponibilizar",fn:()=>window._toggle(t,!i,e)},{label:"Excluir",fn:()=>window._excluir(t,e),perigo:!0}]);window._editar=a=>N(a);window._toggle=async(a,t,e)=>{const i=t?"disponibilizar":"tirar do cardápio",{isConfirmed:s}=await r.fire({icon:"question",title:t?"Disponibilizar prato?":"Tirar do cardápio?",text:`Deseja ${i} o prato "${e}"?`,showCancelButton:!0,confirmButtonText:`Sim, ${i}`,cancelButtonText:"Cancelar",confirmButtonColor:t?"#16A34A":"#DC2626"});if(!s)return;const{error:o}=await p.from("pratos").update({disponivel:t}).eq("id",a);if(o){r.fire({icon:"error",title:"Erro",text:o.message});return}y(t?"Prato disponibilizado!":"Prato removido do cardápio!"),l()};window._excluir=async(a,t)=>{const{isConfirmed:e}=await r.fire({icon:"warning",title:"Excluir prato?",text:`Deseja excluir "${t}"? Esta ação não pode ser desfeita.`,showCancelButton:!0,confirmButtonText:"Sim, excluir",cancelButtonText:"Cancelar",confirmButtonColor:"#DC2626"});if(!e)return;const{error:i}=await p.from("pratos").delete().eq("id",a);if(i){r.fire({icon:"error",title:"Erro",text:i.message});return}y("Prato excluído!"),l()};F();
