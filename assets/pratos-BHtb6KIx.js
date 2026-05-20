import{s as c,v as h}from"./auth-B7QBNdBX.js";import{S as n}from"./sweetalert2.esm.all-p74vj6oU.js";import{b as I,r as C,s as _,a as k}from"./header-B-WQajdd.js";const x=10;let s=1,m=1,p="",u="",f="";const v=o=>(o||"").replace(/'/g,"\\'");async function P(){const o=await h();o&&(I("pratos"),C(o),_("Pratos"),k(),await T(),document.getElementById("btn-novo").addEventListener("click",()=>E()),document.getElementById("form-busca").addEventListener("submit",t=>{t.preventDefault(),p=document.getElementById("input-busca").value.trim(),u=document.getElementById("filtro-categoria").value,f=document.getElementById("filtro-disponivel").value,s=1,l()}),document.getElementById("btn-limpar").addEventListener("click",()=>{document.getElementById("input-busca").value="",document.getElementById("filtro-categoria").value="",document.getElementById("filtro-disponivel").value="",p="",u="",f="",s=1,l()}),document.getElementById("btn-anterior").addEventListener("click",()=>{s>1&&(s--,l())}),document.getElementById("btn-proxima").addEventListener("click",()=>{s<m&&(s++,l())}),await l(),document.body.style.visibility="visible")}async function T(){const{data:o}=await c.from("categorias").select("id, nome").eq("ativo",!0).order("nome"),t=document.getElementById("filtro-categoria");o&&o.forEach(e=>{const a=document.createElement("option");a.value=e.id,a.textContent=e.nome,t.appendChild(a)})}async function l(){const o=(s-1)*x;let t=c.from("pratos").select("id, nome, descricao, preco, tempo_preparo, disponivel, emoji, categorias(id, nome)",{count:"exact"}).order("nome");p&&(t=t.ilike("nome",`%${p}%`)),u&&(t=t.eq("categoria_id",u)),f&&(t=t.eq("disponivel",f==="true")),t=t.range(o,o+x-1);const{data:e,count:a,error:r}=await t;if(r){n.fire({icon:"error",title:"Erro",text:r.message});return}m=Math.max(1,Math.ceil((a||0)/x)),j(e||[]),document.getElementById("info-pagina").textContent=`Página ${s} de ${m}`,document.getElementById("btn-anterior").disabled=s===1,document.getElementById("btn-proxima").disabled=s===m}function j(o){const t=document.getElementById("tbody");if(!o.length){t.innerHTML=`<tr><td colspan="6" class="px-4 py-10 text-center text-slate-400">
      Nenhum prato encontrado.</td></tr>`;return}t.innerHTML=o.map(e=>{var d;const a=e.disponivel?'<span class="badge-disponivel">Disponível</span>':'<span class="badge-indisponivel">Indisponível</span>',r=e.disponivel?`<button onclick="window._toggle('${e.id}',false,'${v(e.nome)}')" class="btn-danger text-xs px-3 py-1">Tirar</button>`:`<button onclick="window._toggle('${e.id}',true,'${v(e.nome)}')"  class="btn-success text-xs px-3 py-1">Disponibilizar</button>`,i=e.tempo_preparo?`${e.tempo_preparo} min`:"—";return`
      <tr class="table-row">
        <td class="px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">${e.emoji||"🍽️"}</span>
            <div>
              <div class="font-medium">${e.nome}</div>
              ${e.descricao?`<div class="text-xs text-slate-400 mt-0.5 max-w-xs truncate">${e.descricao}</div>`:""}
            </div>
          </div>
        </td>
        <td class="px-4 py-3 text-slate-600 dark:text-slate-300">${((d=e.categorias)==null?void 0:d.nome)||"—"}</td>
        <td class="px-4 py-3 font-semibold text-orange-600 dark:text-orange-400">
          R$ ${Number(e.preco).toFixed(2)}
        </td>
        <td class="px-4 py-3 text-slate-600 dark:text-slate-300">${i}</td>
        <td class="px-4 py-3">${a}</td>
        <td class="px-4 py-3 text-right space-x-2">
          <button onclick="window._editar('${e.id}')" class="btn-secondary text-xs px-3 py-1">Editar</button>
          ${r}
          <button onclick="window._excluir('${e.id}','${v(e.nome)}')" class="btn-danger text-xs px-3 py-1">Excluir</button>
        </td>
      </tr>`}).join("")}async function E(o=null){const{data:t}=await c.from("categorias").select("id, nome").eq("ativo",!0).order("nome");if(!(t!=null&&t.length)){n.fire({icon:"warning",title:"Atenção",text:"Cadastre pelo menos uma categoria antes de adicionar pratos."});return}let e={nome:"",descricao:"",preco:"",tempo_preparo:"",disponivel:!0,categoria_id:"",emoji:"🍽️"};if(o){const{data:i}=await c.from("pratos").select("*").eq("id",o).single();i&&(e=i)}const a=t.map(i=>`<option value="${i.id}" ${i.id===e.categoria_id?"selected":""}>${i.nome}</option>`).join(""),{value:r}=await n.fire({title:o?"Editar Prato":"Novo Prato",width:500,html:`
      <div class="text-left space-y-3 mt-2">

        <div class="grid grid-cols-[1fr_80px] gap-3">
          <div>
            <label class="text-sm font-medium text-slate-700">Nome *</label>
            <input id="s-nome" class="input-field mt-1" placeholder="Ex: Pizza Margherita"
              value="${e.nome}">
          </div>
          <div>
            <label class="text-sm font-medium text-slate-700">Emoji</label>
            <input id="s-emoji" class="input-field mt-1 text-center text-xl" placeholder="🍽️"
              value="${e.emoji||"🍽️"}">
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
            <input id="s-preco" type="number" min="0" step="0.01"
              class="input-field mt-1" placeholder="0,00" value="${e.preco||""}">
          </div>
          <div>
            <label class="text-sm font-medium text-slate-700">Tempo de preparo (min)</label>
            <input id="s-tempo" type="number" min="1"
              class="input-field mt-1" placeholder="Ex: 30" value="${e.tempo_preparo||""}">
          </div>
        </div>

        <div>
          <label class="text-sm font-medium text-slate-700">Categoria *</label>
          <select id="s-cat" class="input-field mt-1">
            <option value="">Selecione...</option>
            ${a}
          </select>
        </div>

        <div class="flex items-center gap-2 pt-1">
          <input id="s-disp" type="checkbox" class="w-4 h-4 accent-orange-500"
            ${e.disponivel!==!1?"checked":""}>
          <label for="s-disp" class="text-sm font-medium text-slate-700">Disponível no cardápio</label>
        </div>

      </div>`,showCancelButton:!0,confirmButtonText:"Salvar",cancelButtonText:"Cancelar",confirmButtonColor:"#f97316",preConfirm:()=>{const i=document.getElementById("s-nome").value.trim(),d=document.getElementById("s-desc").value.trim()||null,b=document.getElementById("s-preco").value,y=document.getElementById("s-tempo").value,w=document.getElementById("s-cat").value,B=document.getElementById("s-disp").checked,$=document.getElementById("s-emoji").value.trim()||"🍽️";if(!i)return n.showValidationMessage("O nome é obrigatório."),!1;if(!b)return n.showValidationMessage("O preço é obrigatório."),!1;if(!w)return n.showValidationMessage("Selecione uma categoria."),!1;const g=parseFloat(b);return isNaN(g)||g<0?(n.showValidationMessage("Preço inválido."),!1):{nome:i,descricao:d,preco:g,tempo_preparo:y?parseInt(y):null,categoria_id:w,disponivel:B,emoji:$}}});if(r)try{const{error:i}=o?await c.from("pratos").update(r).eq("id",o):await c.from("pratos").insert(r);if(i)throw i;n.fire({icon:"success",title:o?"Prato atualizado!":"Prato criado!",timer:1500,showConfirmButton:!1}),l()}catch(i){n.fire({icon:"error",title:"Erro ao salvar",text:i.message})}}window._editar=o=>E(o);window._toggle=async(o,t,e)=>{const a=t?"disponibilizar":"tirar do cardápio",{isConfirmed:r}=await n.fire({icon:"question",title:t?"Disponibilizar prato?":"Tirar do cardápio?",text:`Deseja ${a} o prato "${e}"?`,showCancelButton:!0,confirmButtonText:`Sim, ${a}`,cancelButtonText:"Cancelar",confirmButtonColor:t?"#16A34A":"#DC2626"});if(!r)return;const{error:i}=await c.from("pratos").update({disponivel:t}).eq("id",o);if(i){n.fire({icon:"error",title:"Erro",text:i.message});return}n.fire({icon:"success",title:t?"Prato disponibilizado!":"Prato removido do cardápio!",timer:1500,showConfirmButton:!1}),l()};window._excluir=async(o,t)=>{const{isConfirmed:e}=await n.fire({icon:"warning",title:"Excluir prato?",text:`Deseja excluir "${t}"? Esta ação não pode ser desfeita.`,showCancelButton:!0,confirmButtonText:"Sim, excluir",cancelButtonText:"Cancelar",confirmButtonColor:"#DC2626"});if(!e)return;const{error:a}=await c.from("pratos").delete().eq("id",o);if(a){n.fire({icon:"error",title:"Erro",text:a.message});return}n.fire({icon:"success",title:"Prato excluído!",timer:1500,showConfirmButton:!1}),l()};P();
