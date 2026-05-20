import{s as m,v as T}from"./auth-BWDIw5O6.js";import{S as l}from"./sweetalert2.esm.all-DGQl66V2.js";import{b as j,r as L,s as P,a as D}from"./header-Dw_q0Stu.js";import{a as S,s as x}from"./dropdown-bibIyZlW.js";const h=10;let n=1,y=1,g="",f="",v="",$="nome",w="asc",B;const b=o=>(o||"").replace(/'/g,"\\'");async function q(){const o=await T();o&&(j("pratos"),L(o),P("Pratos"),D(),await M(),document.getElementById("btn-novo").addEventListener("click",()=>I()),document.getElementById("btn-exportar").addEventListener("click",z),document.getElementById("form-busca").addEventListener("submit",t=>{t.preventDefault(),g=document.getElementById("input-busca").value.trim(),f=document.getElementById("filtro-categoria").value,v=document.getElementById("filtro-disponivel").value,n=1,s()}),document.getElementById("input-busca").addEventListener("input",t=>{clearTimeout(B),B=setTimeout(()=>{g=t.target.value.trim(),n=1,s()},300)}),document.getElementById("filtro-categoria").addEventListener("change",()=>{f=document.getElementById("filtro-categoria").value,n=1,s()}),document.getElementById("filtro-disponivel").addEventListener("change",()=>{v=document.getElementById("filtro-disponivel").value,n=1,s()}),document.getElementById("btn-limpar").addEventListener("click",()=>{document.getElementById("input-busca").value="",document.getElementById("filtro-categoria").value="",document.getElementById("filtro-disponivel").value="",g="",f="",v="",n=1,s()}),document.getElementById("btn-anterior").addEventListener("click",()=>{n>1&&(n--,s())}),document.getElementById("btn-proxima").addEventListener("click",()=>{n<y&&(n++,s())}),await s(),document.body.style.visibility="visible")}async function M(){const{data:o}=await m.from("categorias").select("id, nome").eq("ativo",!0).order("nome"),t=document.getElementById("filtro-categoria");o&&o.forEach(e=>{const i=document.createElement("option");i.value=e.id,i.textContent=e.nome,t.appendChild(i)})}async function s(){document.getElementById("tbody").innerHTML=`<tr><td colspan="7" class="px-4 py-8">
    <div class="space-y-2">
      ${Array(4).fill('<div class="animate-pulse h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>').join("")}
    </div></td></tr>`;const o=(n-1)*h;let t=m.from("pratos").select("id, nome, descricao, preco, tempo_preparo, disponivel, emoji, imagem_url, categorias(id, nome)",{count:"exact"}).order($,{ascending:w==="asc"});g&&(t=t.ilike("nome",`%${g}%`)),f&&(t=t.eq("categoria_id",f)),v&&(t=t.eq("disponivel",v==="true")),t=t.range(o,o+h-1);const{data:e,count:i,error:r}=await t;if(r){l.fire({icon:"error",title:"Erro",text:r.message});return}y=Math.max(1,Math.ceil((i||0)/h)),N(e||[]),document.getElementById("info-pagina").textContent=`Página ${n} de ${y}`,document.getElementById("btn-anterior").disabled=n===1,document.getElementById("btn-proxima").disabled=n===y}function N(o){const t=document.getElementById("tbody");if(!o.length){t.innerHTML=`<tr><td colspan="6" class="px-4 py-10 text-center text-slate-400">
      Nenhum prato encontrado.</td></tr>`;return}t.innerHTML=o.map((e,i)=>{var d;const r=e.disponivel?'<span class="badge-disponivel">Disponível</span>':'<span class="badge-indisponivel">Indisponível</span>',a=e.disponivel?`<button onclick="window._toggle('${e.id}',false,'${b(e.nome)}')" class="btn-danger text-xs px-3 py-1">Tirar</button>`:`<button onclick="window._toggle('${e.id}',true,'${b(e.nome)}')"  class="btn-success text-xs px-3 py-1">Disponibilizar</button>`,p=e.tempo_preparo?`${e.tempo_preparo} min`:"—";return`
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
        <td class="px-4 py-3 hidden sm:table-cell">${r}</td>
        <td class="px-4 py-3 text-right space-x-2 hidden sm:table-cell">
          <button onclick="window._editar('${e.id}')" class="btn-secondary text-xs px-3 py-1">Editar</button>
          ${a}
          <button onclick="window._excluir('${e.id}','${b(e.nome)}')" class="btn-danger text-xs px-3 py-1">Excluir</button>
        </td>
        <td class="px-2 py-3 text-right sm:hidden">
          <button onclick="window._menuPrato(this,'${e.id}','${b(e.nome)}',${e.disponivel})"
            class="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl flex items-center justify-center ml-auto transition-colors">⋮</button>
        </td>
      </tr>`}).join("")}async function z(){const{data:o,error:t}=await m.from("pratos").select("nome, preco, tempo_preparo, disponivel, categorias(nome)").order("nome");if(t||!(o!=null&&o.length)){x("Nenhum prato para exportar.","warning");return}const e="\uFEFF",i=`Nome,Categoria,Preço (R$),Tempo (min),Disponível
`,r=o.map(c=>{var u;return[`"${c.nome}"`,`"${((u=c.categorias)==null?void 0:u.nome)||""}"`,Number(c.preco).toFixed(2).replace(".",","),c.tempo_preparo||"",c.disponivel?"Sim":"Não"].join(",")}).join(`
`),a=new Blob([e+i+r],{type:"text/csv;charset=utf-8;"}),p=URL.createObjectURL(a),d=document.createElement("a");d.href=p,d.download=`pratos-${new Date().toISOString().slice(0,10)}.csv`,d.click(),URL.revokeObjectURL(p),x("CSV exportado com sucesso!")}async function I(o=null){const{data:t}=await m.from("categorias").select("id, nome").eq("ativo",!0).order("nome");if(!(t!=null&&t.length)){l.fire({icon:"warning",title:"Atenção",text:"Cadastre pelo menos uma categoria antes de adicionar pratos."});return}let e={nome:"",descricao:"",preco:"",tempo_preparo:"",disponivel:!0,categoria_id:"",emoji:"🍽️",imagem_url:""};if(o){const{data:a}=await m.from("pratos").select("*").eq("id",o).single();a&&(e=a)}const i=t.map(a=>`<option value="${a.id}" ${a.id===e.categoria_id?"selected":""}>${a.nome}</option>`).join(""),{value:r}=await l.fire({title:o?"Editar Prato":"Novo Prato",width:500,html:`
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
          <label class="text-sm font-medium text-slate-700">URL da Imagem (opcional)</label>
          <input id="s-imagem" type="url" class="input-field mt-1"
            placeholder="https://exemplo.com/imagem.jpg"
            value="${e.imagem_url||""}">
          <div id="preview-imagem" class="mt-2 ${e.imagem_url?"":"hidden"}">
            <img id="img-preview" src="${e.imagem_url||""}"
              class="w-full h-28 object-cover rounded-lg border border-slate-200 dark:border-slate-600">
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
      </div>`,showCancelButton:!0,confirmButtonText:"Salvar",cancelButtonText:"Cancelar",confirmButtonColor:"#f97316",didOpen:()=>{const a=document.getElementById("s-imagem"),p=document.getElementById("preview-imagem"),d=document.getElementById("img-preview");a&&a.addEventListener("input",()=>{const c=a.value.trim();d.src=c,p.classList.toggle("hidden",!c)})},preConfirm:()=>{const a=document.getElementById("s-nome").value.trim(),p=document.getElementById("s-desc").value.trim()||null,d=document.getElementById("s-preco").value,c=document.getElementById("s-tempo").value,u=document.getElementById("s-cat").value,_=document.getElementById("s-disp").checked,C=document.getElementById("s-emoji").value.trim()||"🍽️",k=document.getElementById("s-imagem").value.trim()||null;if(!a)return l.showValidationMessage("O nome é obrigatório."),!1;if(!d)return l.showValidationMessage("O preço é obrigatório."),!1;if(!u)return l.showValidationMessage("Selecione uma categoria."),!1;const E=parseFloat(d);return isNaN(E)||E<0?(l.showValidationMessage("Preço inválido."),!1):{nome:a,descricao:p,preco:E,tempo_preparo:c?parseInt(c):null,categoria_id:u,disponivel:_,emoji:C,imagem_url:k}}});if(r)try{const{error:a}=o?await m.from("pratos").update(r).eq("id",o):await m.from("pratos").insert(r);if(a)throw a;x(o?"Prato atualizado!":"Prato criado!"),s()}catch(a){l.fire({icon:"error",title:"Erro ao salvar",text:a.message})}}window._sortBy=o=>{w=$===o&&w==="asc"?"desc":"asc",$=o,document.querySelectorAll("[data-sort]").forEach(t=>{t.textContent=t.dataset.sort===o?w==="asc"?" ↑":" ↓":" ↕"}),n=1,s()};window._menuPrato=(o,t,e,i)=>S(o,[{label:"Editar",fn:()=>window._editar(t)},{label:i?"Tirar do cardápio":"Disponibilizar",fn:()=>window._toggle(t,!i,e)},{label:"Excluir",fn:()=>window._excluir(t,e),perigo:!0}]);window._editar=o=>I(o);window._toggle=async(o,t,e)=>{const i=t?"disponibilizar":"tirar do cardápio",{isConfirmed:r}=await l.fire({icon:"question",title:t?"Disponibilizar prato?":"Tirar do cardápio?",text:`Deseja ${i} o prato "${e}"?`,showCancelButton:!0,confirmButtonText:`Sim, ${i}`,cancelButtonText:"Cancelar",confirmButtonColor:t?"#16A34A":"#DC2626"});if(!r)return;const{error:a}=await m.from("pratos").update({disponivel:t}).eq("id",o);if(a){l.fire({icon:"error",title:"Erro",text:a.message});return}x(t?"Prato disponibilizado!":"Prato removido do cardápio!"),s()};window._excluir=async(o,t)=>{const{isConfirmed:e}=await l.fire({icon:"warning",title:"Excluir prato?",text:`Deseja excluir "${t}"? Esta ação não pode ser desfeita.`,showCancelButton:!0,confirmButtonText:"Sim, excluir",cancelButtonText:"Cancelar",confirmButtonColor:"#DC2626"});if(!e)return;const{error:i}=await m.from("pratos").delete().eq("id",o);if(i){l.fire({icon:"error",title:"Erro",text:i.message});return}x("Prato excluído!"),s()};q();
