import{s as m,u as q,v as z}from"./auth-BFs9X2rx.js";import{S as r}from"./sweetalert2.esm.all-g3P2OzMs.js";import{b as N,r as R,s as S,a as A}from"./header-DvM2Ufkd.js";import{a as O,s as b}from"./dropdown-bibIyZlW.js";const C=10;let n=1,I=1,f="",v="",x="",L="nome",B="asc",P;const E=o=>(o||"").replace(/'/g,"\\'");async function V(){const o=await z();o&&(N("pratos"),R(o),S("Pratos"),A(),await F(),document.getElementById("btn-novo").addEventListener("click",()=>M()),document.getElementById("btn-exportar").addEventListener("click",H),document.getElementById("form-busca").addEventListener("submit",t=>{t.preventDefault(),f=document.getElementById("input-busca").value.trim(),v=document.getElementById("filtro-categoria").value,x=document.getElementById("filtro-disponivel").value,n=1,l()}),document.getElementById("input-busca").addEventListener("input",t=>{clearTimeout(P),P=setTimeout(()=>{f=t.target.value.trim(),n=1,l()},300)}),document.getElementById("filtro-categoria").addEventListener("change",()=>{v=document.getElementById("filtro-categoria").value,n=1,l()}),document.getElementById("filtro-disponivel").addEventListener("change",()=>{x=document.getElementById("filtro-disponivel").value,n=1,l()}),document.getElementById("btn-limpar").addEventListener("click",()=>{document.getElementById("input-busca").value="",document.getElementById("filtro-categoria").value="",document.getElementById("filtro-disponivel").value="",f="",v="",x="",n=1,l()}),document.getElementById("btn-anterior").addEventListener("click",()=>{n>1&&(n--,l())}),document.getElementById("btn-proxima").addEventListener("click",()=>{n<I&&(n++,l())}),await l(),document.body.style.visibility="visible")}async function F(){const{data:o}=await m.from("categorias").select("id, nome").eq("ativo",!0).order("nome"),t=document.getElementById("filtro-categoria");o&&o.forEach(e=>{const i=document.createElement("option");i.value=e.id,i.textContent=e.nome,t.appendChild(i)})}async function l(){document.getElementById("tbody").innerHTML=`<tr><td colspan="7" class="px-4 py-8">
    <div class="space-y-2">
      ${Array(4).fill('<div class="animate-pulse h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>').join("")}
    </div></td></tr>`;const o=(n-1)*C;let t=m.from("pratos").select("id, nome, descricao, preco, tempo_preparo, disponivel, emoji, imagem_url, categorias(id, nome)",{count:"exact"}).order(L,{ascending:B==="asc"});f&&(t=t.ilike("nome",`%${f}%`)),v&&(t=t.eq("categoria_id",v)),x&&(t=t.eq("disponivel",x==="true")),t=t.range(o,o+C-1);const{data:e,count:i,error:s}=await t;if(s){r.fire({icon:"error",title:"Erro",text:s.message});return}I=Math.max(1,Math.ceil((i||0)/C)),U(e||[]),document.getElementById("info-pagina").textContent=`Página ${n} de ${I}`,document.getElementById("btn-anterior").disabled=n===1,document.getElementById("btn-proxima").disabled=n===I}function U(o){const t=document.getElementById("tbody");if(!o.length){t.innerHTML=`<tr><td colspan="6" class="px-4 py-10 text-center text-slate-400">
      Nenhum prato encontrado.</td></tr>`;return}t.innerHTML=o.map((e,i)=>{var d;const s=e.disponivel?'<span class="badge-disponivel">Disponível</span>':'<span class="badge-indisponivel">Indisponível</span>',a=e.disponivel?`<button onclick="window._toggle('${e.id}',false,'${E(e.nome)}')" class="btn-danger text-xs px-3 py-1">Tirar</button>`:`<button onclick="window._toggle('${e.id}',true,'${E(e.nome)}')"  class="btn-success text-xs px-3 py-1">Disponibilizar</button>`,p=e.tempo_preparo?`${e.tempo_preparo} min`:"—";return`
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
        <td class="px-4 py-3 text-slate-600 dark:text-slate-300 hidden sm:table-cell">${p}</td>
        <td class="px-4 py-3 hidden sm:table-cell">${s}</td>
        <td class="px-4 py-3 text-right space-x-2 hidden sm:table-cell">
          <button onclick="window._editar('${e.id}')" class="btn-secondary text-xs px-3 py-1">Editar</button>
          ${a}
          <button onclick="window._excluir('${e.id}','${E(e.nome)}')" class="btn-danger text-xs px-3 py-1">Excluir</button>
        </td>
        <td class="px-2 py-3 text-right sm:hidden">
          <button onclick="window._menuPrato(this,'${e.id}','${E(e.nome)}',${e.disponivel})"
            class="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl flex items-center justify-center ml-auto transition-colors">⋮</button>
        </td>
      </tr>`}).join("")}async function H(){const{data:o,error:t}=await m.from("pratos").select("nome, preco, tempo_preparo, disponivel, categorias(nome)").order("nome");if(t||!(o!=null&&o.length)){b("Nenhum prato para exportar.","warning");return}const e="\uFEFF",i=`Nome,Categoria,Preço (R$),Tempo (min),Disponível
`,s=o.map(c=>{var u;return[`"${c.nome}"`,`"${((u=c.categorias)==null?void 0:u.nome)||""}"`,Number(c.preco).toFixed(2).replace(".",","),c.tempo_preparo||"",c.disponivel?"Sim":"Não"].join(",")}).join(`
`),a=new Blob([e+i+s],{type:"text/csv;charset=utf-8;"}),p=URL.createObjectURL(a),d=document.createElement("a");d.href=p,d.download=`pratos-${new Date().toISOString().slice(0,10)}.csv`,d.click(),URL.revokeObjectURL(p),b("CSV exportado com sucesso!")}async function M(o=null){const{data:t}=await m.from("categorias").select("id, nome").eq("ativo",!0).order("nome");if(!(t!=null&&t.length)){r.fire({icon:"warning",title:"Atenção",text:"Cadastre pelo menos uma categoria antes de adicionar pratos."});return}let e={nome:"",descricao:"",preco:"",tempo_preparo:"",disponivel:!0,categoria_id:"",emoji:"🍽️",imagem_url:""};if(o){const{data:a}=await m.from("pratos").select("*").eq("id",o).single();a&&(e=a)}const i=t.map(a=>`<option value="${a.id}" ${a.id===e.categoria_id?"selected":""}>${a.nome}</option>`).join(""),{value:s}=await r.fire({title:o?"Editar Prato":"Novo Prato",width:500,html:`
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
            <div style="margin-bottom:8px;margin-top:4px">
              <img src="${e.imagem_url}"
                style="width:100%;height:96px;object-fit:cover;border-radius:8px;border:1px solid #e2e8f0">
              <p style="font-size:12px;color:#94a3b8;margin-top:4px">Imagem atual</p>
            </div>`:""}
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
          ${e.imagem_url?`
            <div id="area-remover" style="margin-top:8px">
              <button type="button" id="btn-remover-img"
                style="background:#dc2626;color:white;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:13px">
                🗑️ Remover imagem atual
              </button>
            </div>`:""}
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
      </div>`,showCancelButton:!0,confirmButtonText:"Salvar",cancelButtonText:"Cancelar",confirmButtonColor:"#f97316",didOpen:()=>{const a=document.getElementById("s-imagem"),p=document.getElementById("preview-imagem"),d=document.getElementById("img-preview");if(!a)return;a.addEventListener("change",()=>{const u=a.files[0];if(!u){p.classList.add("hidden");return}const w=new FileReader;w.onload=$=>{d.src=$.target.result,p.classList.remove("hidden")},w.readAsDataURL(u)}),window._removerImagem=!1;const c=document.getElementById("btn-remover-img");c&&c.addEventListener("click",()=>{document.getElementById("area-remover").innerHTML='<p style="color:#94a3b8;font-size:13px">✓ Imagem será removida ao salvar</p>',window._removerImagem=!0})},preConfirm:async()=>{var T,j;const a=document.getElementById("s-nome").value.trim(),p=document.getElementById("s-desc").value.trim()||null,d=document.getElementById("s-preco").value,c=document.getElementById("s-tempo").value,u=document.getElementById("s-cat").value,w=document.getElementById("s-disp").checked,$=document.getElementById("s-emoji").value.trim()||"🍽️";if(!a)return r.showValidationMessage("O nome é obrigatório."),!1;if(!d)return r.showValidationMessage("O preço é obrigatório."),!1;if(!u)return r.showValidationMessage("Selecione uma categoria."),!1;const _=parseFloat(d);if(isNaN(_)||_<0)return r.showValidationMessage("Preço inválido."),!1;let k=e.imagem_url||null;if(window._removerImagem===!0){if((T=e.imagem_url)!=null&&T.includes("/storage/v1/object/public/pratos/")){const g=e.imagem_url.split("/pratos/")[1];g&&await m.storage.from("pratos").remove([g]).catch(()=>{})}k=null}else{const g=(j=document.getElementById("s-imagem"))==null?void 0:j.files[0];if(g){const y=document.getElementById("progress-bar");document.getElementById("upload-progress").classList.remove("hidden"),y.style.width="0%";const D=setInterval(()=>{const h=parseFloat(y.style.width)||0;h<80&&(y.style.width=`${h+15}%`)},200);try{k=await q(g),clearInterval(D),y.style.width="100%"}catch(h){return clearInterval(D),r.showValidationMessage(`Erro no upload: ${h.message}`),!1}}}return{nome:a,descricao:p,preco:_,tempo_preparo:c?parseInt(c):null,categoria_id:u,disponivel:w,emoji:$,imagem_url:k}}});if(window._removerImagem=!1,!!s)try{const{error:a}=o?await m.from("pratos").update(s).eq("id",o):await m.from("pratos").insert(s);if(a)throw a;b(o?"Prato atualizado!":"Prato criado!"),l()}catch(a){r.fire({icon:"error",title:"Erro ao salvar",text:a.message})}}window._sortBy=o=>{B=L===o&&B==="asc"?"desc":"asc",L=o,document.querySelectorAll("[data-sort]").forEach(t=>{t.textContent=t.dataset.sort===o?B==="asc"?" ↑":" ↓":" ↕"}),n=1,l()};window._menuPrato=(o,t,e,i)=>O(o,[{label:"Editar",fn:()=>window._editar(t)},{label:i?"Tirar do cardápio":"Disponibilizar",fn:()=>window._toggle(t,!i,e)},{label:"Excluir",fn:()=>window._excluir(t,e),perigo:!0}]);window._editar=o=>M(o);window._toggle=async(o,t,e)=>{const i=t?"disponibilizar":"tirar do cardápio",{isConfirmed:s}=await r.fire({icon:"question",title:t?"Disponibilizar prato?":"Tirar do cardápio?",text:`Deseja ${i} o prato "${e}"?`,showCancelButton:!0,confirmButtonText:`Sim, ${i}`,cancelButtonText:"Cancelar",confirmButtonColor:t?"#16A34A":"#DC2626"});if(!s)return;const{error:a}=await m.from("pratos").update({disponivel:t}).eq("id",o);if(a){r.fire({icon:"error",title:"Erro",text:a.message});return}b(t?"Prato disponibilizado!":"Prato removido do cardápio!"),l()};window._excluir=async(o,t)=>{const{isConfirmed:e}=await r.fire({icon:"warning",title:"Excluir prato?",text:`Deseja excluir "${t}"? Esta ação não pode ser desfeita.`,showCancelButton:!0,confirmButtonText:"Sim, excluir",cancelButtonText:"Cancelar",confirmButtonColor:"#DC2626"});if(!e)return;const{error:i}=await m.from("pratos").delete().eq("id",o);if(i){r.fire({icon:"error",title:"Erro",text:i.message});return}b("Prato excluído!"),l()};V();
