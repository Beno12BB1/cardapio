import{s as d,v as k}from"./auth-BWDIw5O6.js";import{S as l}from"./sweetalert2.esm.all-DlTzfnTl.js";import{b as T,r as j,s as P,a as D}from"./header-25cIYKJM.js";import{a as L,s as v}from"./dropdown-bibIyZlW.js";const h=10;let n=1,y=1,g="",f="",x="",$="nome",w="asc",B;const b=o=>(o||"").replace(/'/g,"\\'");async function S(){const o=await k();o&&(T("pratos"),j(o),P("Pratos"),D(),await q(),document.getElementById("btn-novo").addEventListener("click",()=>I()),document.getElementById("btn-exportar").addEventListener("click",N),document.getElementById("form-busca").addEventListener("submit",t=>{t.preventDefault(),g=document.getElementById("input-busca").value.trim(),f=document.getElementById("filtro-categoria").value,x=document.getElementById("filtro-disponivel").value,n=1,s()}),document.getElementById("input-busca").addEventListener("input",t=>{clearTimeout(B),B=setTimeout(()=>{g=t.target.value.trim(),n=1,s()},300)}),document.getElementById("filtro-categoria").addEventListener("change",()=>{f=document.getElementById("filtro-categoria").value,n=1,s()}),document.getElementById("filtro-disponivel").addEventListener("change",()=>{x=document.getElementById("filtro-disponivel").value,n=1,s()}),document.getElementById("btn-limpar").addEventListener("click",()=>{document.getElementById("input-busca").value="",document.getElementById("filtro-categoria").value="",document.getElementById("filtro-disponivel").value="",g="",f="",x="",n=1,s()}),document.getElementById("btn-anterior").addEventListener("click",()=>{n>1&&(n--,s())}),document.getElementById("btn-proxima").addEventListener("click",()=>{n<y&&(n++,s())}),await s(),document.body.style.visibility="visible")}async function q(){const{data:o}=await d.from("categorias").select("id, nome").eq("ativo",!0).order("nome"),t=document.getElementById("filtro-categoria");o&&o.forEach(e=>{const i=document.createElement("option");i.value=e.id,i.textContent=e.nome,t.appendChild(i)})}async function s(){document.getElementById("tbody").innerHTML=`<tr><td colspan="7" class="px-4 py-8">
    <div class="space-y-2">
      ${Array(4).fill('<div class="animate-pulse h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>').join("")}
    </div></td></tr>`;const o=(n-1)*h;let t=d.from("pratos").select("id, nome, descricao, preco, tempo_preparo, disponivel, emoji, categorias(id, nome)",{count:"exact"}).order($,{ascending:w==="asc"});g&&(t=t.ilike("nome",`%${g}%`)),f&&(t=t.eq("categoria_id",f)),x&&(t=t.eq("disponivel",x==="true")),t=t.range(o,o+h-1);const{data:e,count:i,error:r}=await t;if(r){l.fire({icon:"error",title:"Erro",text:r.message});return}y=Math.max(1,Math.ceil((i||0)/h)),M(e||[]),document.getElementById("info-pagina").textContent=`Página ${n} de ${y}`,document.getElementById("btn-anterior").disabled=n===1,document.getElementById("btn-proxima").disabled=n===y}function M(o){const t=document.getElementById("tbody");if(!o.length){t.innerHTML=`<tr><td colspan="6" class="px-4 py-10 text-center text-slate-400">
      Nenhum prato encontrado.</td></tr>`;return}t.innerHTML=o.map(e=>{var m;const i=e.disponivel?'<span class="badge-disponivel">Disponível</span>':'<span class="badge-indisponivel">Indisponível</span>',r=e.disponivel?`<button onclick="window._toggle('${e.id}',false,'${b(e.nome)}')" class="btn-danger text-xs px-3 py-1">Tirar</button>`:`<button onclick="window._toggle('${e.id}',true,'${b(e.nome)}')"  class="btn-success text-xs px-3 py-1">Disponibilizar</button>`,a=e.tempo_preparo?`${e.tempo_preparo} min`:"—";return`
      <tr class="table-row">
        <td class="px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">${e.emoji||"🍽️"}</span>
            <div>
              <div class="font-medium">${e.nome}</div>
              ${e.descricao?`<div class="text-xs text-slate-400 mt-0.5 max-w-xs truncate hidden sm:block">${e.descricao}</div>`:""}
            </div>
          </div>
        </td>
        <td class="px-4 py-3 text-slate-600 dark:text-slate-300 hidden sm:table-cell">${((m=e.categorias)==null?void 0:m.nome)||"—"}</td>
        <td class="px-4 py-3 font-semibold ${e.disponivel?"text-green-600 dark:text-green-400":"text-slate-400 dark:text-slate-500"}">
          R$ ${Number(e.preco).toFixed(2)}
        </td>
        <td class="px-4 py-3 text-slate-600 dark:text-slate-300 hidden sm:table-cell">${a}</td>
        <td class="px-4 py-3 hidden sm:table-cell">${i}</td>
        <td class="px-4 py-3 text-right space-x-2 hidden sm:table-cell">
          <button onclick="window._editar('${e.id}')" class="btn-secondary text-xs px-3 py-1">Editar</button>
          ${r}
          <button onclick="window._excluir('${e.id}','${b(e.nome)}')" class="btn-danger text-xs px-3 py-1">Excluir</button>
        </td>
        <td class="px-2 py-3 text-right sm:hidden">
          <button onclick="window._menuPrato(this,'${e.id}','${b(e.nome)}',${e.disponivel})"
            class="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl flex items-center justify-center ml-auto transition-colors">⋮</button>
        </td>
      </tr>`}).join("")}async function N(){const{data:o,error:t}=await d.from("pratos").select("nome, preco, tempo_preparo, disponivel, categorias(nome)").order("nome");if(t||!(o!=null&&o.length)){v("Nenhum prato para exportar.","warning");return}const e="\uFEFF",i=`Nome,Categoria,Preço (R$),Tempo (min),Disponível
`,r=o.map(c=>{var u;return[`"${c.nome}"`,`"${((u=c.categorias)==null?void 0:u.nome)||""}"`,Number(c.preco).toFixed(2).replace(".",","),c.tempo_preparo||"",c.disponivel?"Sim":"Não"].join(",")}).join(`
`),a=new Blob([e+i+r],{type:"text/csv;charset=utf-8;"}),m=URL.createObjectURL(a),p=document.createElement("a");p.href=m,p.download=`pratos-${new Date().toISOString().slice(0,10)}.csv`,p.click(),URL.revokeObjectURL(m),v("CSV exportado com sucesso!")}async function I(o=null){const{data:t}=await d.from("categorias").select("id, nome").eq("ativo",!0).order("nome");if(!(t!=null&&t.length)){l.fire({icon:"warning",title:"Atenção",text:"Cadastre pelo menos uma categoria antes de adicionar pratos."});return}let e={nome:"",descricao:"",preco:"",tempo_preparo:"",disponivel:!0,categoria_id:"",emoji:"🍽️"};if(o){const{data:a}=await d.from("pratos").select("*").eq("id",o).single();a&&(e=a)}const i=t.map(a=>`<option value="${a.id}" ${a.id===e.categoria_id?"selected":""}>${a.nome}</option>`).join(""),{value:r}=await l.fire({title:o?"Editar Prato":"Novo Prato",width:500,html:`
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
      </div>`,showCancelButton:!0,confirmButtonText:"Salvar",cancelButtonText:"Cancelar",confirmButtonColor:"#f97316",preConfirm:()=>{const a=document.getElementById("s-nome").value.trim(),m=document.getElementById("s-desc").value.trim()||null,p=document.getElementById("s-preco").value,c=document.getElementById("s-tempo").value,u=document.getElementById("s-cat").value,C=document.getElementById("s-disp").checked,_=document.getElementById("s-emoji").value.trim()||"🍽️";if(!a)return l.showValidationMessage("O nome é obrigatório."),!1;if(!p)return l.showValidationMessage("O preço é obrigatório."),!1;if(!u)return l.showValidationMessage("Selecione uma categoria."),!1;const E=parseFloat(p);return isNaN(E)||E<0?(l.showValidationMessage("Preço inválido."),!1):{nome:a,descricao:m,preco:E,tempo_preparo:c?parseInt(c):null,categoria_id:u,disponivel:C,emoji:_}}});if(r)try{const{error:a}=o?await d.from("pratos").update(r).eq("id",o):await d.from("pratos").insert(r);if(a)throw a;v(o?"Prato atualizado!":"Prato criado!"),s()}catch(a){l.fire({icon:"error",title:"Erro ao salvar",text:a.message})}}window._sortBy=o=>{w=$===o&&w==="asc"?"desc":"asc",$=o,document.querySelectorAll("[data-sort]").forEach(t=>{t.textContent=t.dataset.sort===o?w==="asc"?" ↑":" ↓":" ↕"}),n=1,s()};window._menuPrato=(o,t,e,i)=>L(o,[{label:"Editar",fn:()=>window._editar(t)},{label:i?"Tirar do cardápio":"Disponibilizar",fn:()=>window._toggle(t,!i,e)},{label:"Excluir",fn:()=>window._excluir(t,e),perigo:!0}]);window._editar=o=>I(o);window._toggle=async(o,t,e)=>{const i=t?"disponibilizar":"tirar do cardápio",{isConfirmed:r}=await l.fire({icon:"question",title:t?"Disponibilizar prato?":"Tirar do cardápio?",text:`Deseja ${i} o prato "${e}"?`,showCancelButton:!0,confirmButtonText:`Sim, ${i}`,cancelButtonText:"Cancelar",confirmButtonColor:t?"#16A34A":"#DC2626"});if(!r)return;const{error:a}=await d.from("pratos").update({disponivel:t}).eq("id",o);if(a){l.fire({icon:"error",title:"Erro",text:a.message});return}v(t?"Prato disponibilizado!":"Prato removido do cardápio!"),s()};window._excluir=async(o,t)=>{const{isConfirmed:e}=await l.fire({icon:"warning",title:"Excluir prato?",text:`Deseja excluir "${t}"? Esta ação não pode ser desfeita.`,showCancelButton:!0,confirmButtonText:"Sim, excluir",cancelButtonText:"Cancelar",confirmButtonColor:"#DC2626"});if(!e)return;const{error:i}=await d.from("pratos").delete().eq("id",o);if(i){l.fire({icon:"error",title:"Erro",text:i.message});return}v("Prato excluído!"),s()};S();
