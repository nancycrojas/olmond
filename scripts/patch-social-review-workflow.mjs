import fs from "node:fs";
import path from "node:path";

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  throw new Error("Uso: node patch-social-review-workflow.mjs <entrada.json> <salida.json>");
}

const workflow = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const nodeBy = (fragment) => {
  const node = workflow.nodes.find((candidate) => candidate.name.includes(fragment));
  if (!node) throw new Error(`No se encontró el nodo: ${fragment}`);
  return node;
};

nodeBy("Validar POST").parameters.jsCode = `const root=$input.first()?.json??{},body=root.body&&typeof root.body==='object'?root.body:root,token=String(body.token??'').trim(),action=String(body.action??'').toLowerCase(),content=body.content??{},rejection_reason=String(body.rejection_reason??body.reason??body.motivo??'').trim(),expected_revision=Number(body.expected_revision),expected_manifest_sha256=String(body.expected_manifest_sha256??'').trim().toLowerCase();
const errors=[];
if(!/^[A-Za-z0-9_-]{24,160}$/.test(token))errors.push('token');
if(!['save','approve','reject'].includes(action))errors.push('action');
if(action==='reject'&&rejection_reason.length<8)errors.push('rejection_reason');
if(!Number.isInteger(expected_revision)||expected_revision<1)errors.push('expected_revision');
if(!/^[a-f0-9]{64}$/.test(expected_manifest_sha256))errors.push('expected_manifest_sha256');
if(JSON.stringify(content).length>38000)errors.push('payload');
return [{json:{token,action,content,rejection_reason,expected_revision,expected_manifest_sha256,request_error:errors.length?'Solicitud de revisión inválida: '+errors.join(', '):''}}];`;

nodeBy("Responder revisi").parameters.jsCode = `const requested=$("Validar GET").first()?.json??{},row=$input.first()?.json??{};
if(requested.request_error||!row.review_id||row.review_token!==requested.token||new Date(row.review_expires_at??0).getTime()<Date.now())return [{json:{success:false,message:'Revisión inválida o vencida.',http_status:404}}];
if(!['PENDING_REVIEW','SAVED'].includes(String(row.status)))return [{json:{success:false,message:'Esta pieza ya no está disponible para revisión.',http_status:409}}];
if(!Number.isInteger(Number(row.revision))||!/^[a-f0-9]{64}$/i.test(String(row.manifest_sha256??'')))return [{json:{success:false,message:'La pieza no tiene una versión verificable. No puede aprobarse.',http_status:409}}];
let slides=[],media=[],alts=[];
try{slides=JSON.parse(row.slides_json||'[]');media=JSON.parse(row.media_urls_json||'[]');alts=JSON.parse(row.alt_text_json||'[]');}catch{}
slides=slides.map((slide,index)=>({...slide,preview_url:media[index]||'',alt_text:alts[index]||slide.alt_text||''}));
return [{json:{success:true,http_status:200,content:{review_id:row.review_id,title:row.title,status:row.status,revision:Number(row.revision),input_sha256:row.input_sha256,manifest_sha256:String(row.manifest_sha256).toLowerCase(),linkedin_copy:row.linkedin_copy,instagram_copy:row.instagram_copy,facebook_copy:row.facebook_copy,x_copy:row.x_copy,linkedin_image_url:row.linkedin_image_url||'',linkedin_image_alt:row.linkedin_image_alt||'',slides}}}];`;

const versionNode = nodeBy("Validar y versionar");
const helperEnd = versionNode.parameters.jsCode.indexOf("const req=");
if (helperEnd < 0) throw new Error("No se encontraron los helpers de hash del nodo de versión.");
const hashHelpers = versionNode.parameters.jsCode.slice(0, helperEnd);
versionNode.parameters.jsCode = hashHelpers + String.raw`const req=$("Validar POST").first()?.json??{},row=$input.first()?.json??{};
const bad=(message,status=400)=>[{json:{success:false,message,http_status:status,action:'error'}}];
if(req.request_error)return bad(req.request_error);
if(!row.review_id||row.review_token!==req.token)return bad('Revisión inválida o vencida.',404);
if(new Date(row.review_expires_at??0).getTime()<Date.now())return bad('El enlace de revisión venció.',410);
if(!['PENDING_REVIEW','SAVED'].includes(String(row.status)))return bad('Esta pieza ya no está disponible para revisión.',409);
const currentRevision=Number(row.revision??0),currentManifest=String(row.manifest_sha256??'').trim().toLowerCase();
if(req.expected_revision!==currentRevision||req.expected_manifest_sha256!==currentManifest)return bad('La revisión cambió desde que abriste la página. Recargá antes de decidir.',409);
if(!/^[a-f0-9]{64}$/.test(currentManifest))return bad('La pieza no tiene una huella verificable y no puede aprobarse.',409);

const parseSlides=()=>{let slides=[],media=[],alts=[];try{slides=JSON.parse(row.slides_json||'[]');media=JSON.parse(row.media_urls_json||'[]');alts=JSON.parse(row.alt_text_json||'[]');}catch{}return slides.map((slide,index)=>({...slide,preview_url:media[index]||'',alt_text:alts[index]||slide.alt_text||''}));};
const responseContent=(source,status)=>({review_id:source.review_id,title:source.title,status,revision:Number(source.revision),input_sha256:source.input_sha256,manifest_sha256:String(source.manifest_sha256||'').toLowerCase(),linkedin_copy:source.linkedin_copy,instagram_copy:source.instagram_copy,facebook_copy:source.facebook_copy,x_copy:source.x_copy,linkedin_image_url:source.linkedin_image_url||'',linkedin_image_alt:source.linkedin_image_alt||'',slides:parseSlides()});
const now=new Date().toISOString();

if(req.action==='reject'){
  const reason=String(req.rejection_reason||'').trim();
  if(reason.length<8)return bad('Para rechazar necesitás indicar un motivo claro.',400);
  const rejected={...row,revision:currentRevision,status:'REJECTED',approval_status:'HUMAN_REJECTED',updated_at:now,approved_at:'',last_error:'Rechazado por revisión humana: '+reason};
  return [{json:{...rejected,success:true,message:'Contenido rechazado. Esta revisión quedó cerrada y no puede publicarse.',http_status:200,action:'reject',response_content:responseContent(rejected,'REJECTED')}}];
}

if(req.action==='approve'){
  if(req.content&&Object.keys(req.content).length)return bad('No se puede editar y aprobar en una misma operación. Guardá, revisá la nueva vista previa y luego aprobá.',409);
  const targetDate=String(row.publish_date||now.slice(0,10)),fallbackTarget=new Date(targetDate+'T19:30:00-03:00'),storedTarget=new Date(String(row.scheduled_at||'')),target=Number.isFinite(storedTarget.getTime())?storedTarget:fallbackTarget,scheduledAt=target.getTime()>Date.now()?target.toISOString():now;
  const approved={...row,status:'APPROVED',approval_status:'HUMAN_APPROVED',scheduled_at:scheduledAt,updated_at:now,approved_at:now,last_error:''};
  return [{json:{...approved,success:true,message:'Revisión exacta aprobada y enviada a las colas de publicación.',http_status:200,action:'approve',response_content:responseContent(approved,'APPROVED')}}];
}

const c=req.content??{},errors=[];
const title=String(c.title??'').trim();
if(title.length<8||title.length>180)errors.push('title');
const linkedinImageUrl=String(c.linkedin_image_url??row.linkedin_image_url??'').trim(),linkedinImageAlt=String(c.linkedin_image_alt??row.linkedin_image_alt??'').trim().slice(0,500);
if(!/^https:\/\/(?:www\.)?olmondconsulting\.com\/social\/linkedin\/[A-Za-z0-9._/-]+\.png(?:\?.*)?$/.test(linkedinImageUrl))errors.push('linkedin_image_url');
if(linkedinImageAlt.length<20)errors.push('linkedin_image_alt');
const text=(key,max)=>{const value=String(c[key]??'').trim();if(!value||value.length>max)errors.push(key);return value;};
const fitXCopy=(value)=>{const chars=[...String(value??'').trim()];if(chars.length<=280)return chars.join('');const cut=chars.slice(0,279).join(''),boundary=cut.replace(/[\s,;:.!?]+\S*$/u,'').trim();return ((boundary.length>=180?boundary:cut.trim()).replace(/[.,;:!?-]+$/u,'')+'.').slice(0,280);};
const linkedin=text('linkedin_copy',6000),instagram=text('instagram_copy',2200),facebook=text('facebook_copy',5000),x=fitXCopy(c.x_copy);
if(!x)errors.push('x_copy');
const words=linkedin.split(/\s+/).filter(Boolean).length;
if(words<80||words>650)errors.push('linkedin_copy_words');
const slides=Array.isArray(c.slides)?c.slides:[];
if(slides.length!==8)errors.push('slides');
const cleanSlides=slides.slice(0,8).map((s,index)=>{const headline=String(s.headline??'').trim(),body=String(s.body??'').trim(),eyebrow=String(s.eyebrow??'').trim();if(!headline||headline.length>54||body.length>150||eyebrow.length>32)errors.push('slide_'+(index+1));return {index:index+1,kind:index===0?'cover':index===7?'closing':'content',eyebrow,headline,body,bullets:Array.isArray(s.bullets)?s.bullets.map(v=>String(v).trim()).filter(Boolean).slice(0,4):[],alt_text:String(s.alt_text??('Carrusel Olmond, placa '+(index+1)+' de 8. '+headline)).slice(0,500)};});
if(errors.length)return bad('Corregí estos campos antes de continuar: '+[...new Set(errors)].join(', '));
const render=(slide)=>{const payload=base64url(JSON.stringify({eyebrow:slide.eyebrow,headline:slide.headline,body:slide.body,bullets:slide.bullets,index:slide.index,total:8,kind:slide.kind,layout_version:5}));return 'https://www.olmondconsulting.com/api/social/card?p='+payload+'&h='+sha256(payload).slice(0,20)+'&v=5';};
const media=cleanSlides.map(render),alts=cleanSlides.map(s=>s.alt_text),canonical={title,linkedin_image_url:linkedinImageUrl,linkedin_image_alt:linkedinImageAlt,linkedin,instagram,facebook,x,slides:cleanSlides},newHash=sha256(JSON.stringify(canonical)),changed=newHash!==String(row.input_sha256??''),revision=currentRevision+(changed?1:0),manifest=sha256(JSON.stringify({revision,input_sha256:newHash,title,linkedin_image_url:linkedinImageUrl,media,alts}));
const saved={...row,title,linkedin_image_url:linkedinImageUrl,linkedin_image_alt:linkedinImageAlt,revision,status:'SAVED',linkedin_copy:linkedin,instagram_copy:instagram,facebook_copy:facebook,x_copy:x,slides_json:JSON.stringify(cleanSlides),media_urls_json:JSON.stringify(media),alt_text_json:JSON.stringify(alts),approval_status:'PENDING',input_sha256:newHash,manifest_sha256:manifest,updated_at:now,approved_at:'',last_error:'',original_linkedin_copy:row.original_linkedin_copy||row.linkedin_copy,original_facebook_copy:row.original_facebook_copy||row.facebook_copy,original_x_copy:row.original_x_copy||row.x_copy,original_slides_json:row.original_slides_json||row.slides_json,original_sha256:row.original_sha256||row.input_sha256,human_edit_count:Number(row.human_edit_count??0)+(changed?1:0)};
return [{json:{...saved,success:true,message:changed?'Cambios guardados como una nueva revisión. Revisá las nuevas vistas previas antes de aprobar.':'No hubo cambios de contenido. La revisión verificable se mantiene.',http_status:200,action:'save',response_content:{review_id:saved.review_id,title:saved.title,status:'SAVED',revision:saved.revision,input_sha256:saved.input_sha256,manifest_sha256:saved.manifest_sha256,linkedin_copy:saved.linkedin_copy,instagram_copy:saved.instagram_copy,facebook_copy:saved.facebook_copy,x_copy:saved.x_copy,linkedin_image_url:saved.linkedin_image_url,linkedin_image_alt:saved.linkedin_image_alt,slides:cleanSlides.map((s,i)=>({...s,preview_url:media[i]}))}}}];`;

const saveNode = nodeBy("Guardar edici");
const extraColumns = {
  linkedin_image_url: "string",
  linkedin_image_alt: "string",
  original_linkedin_copy: "string",
  original_facebook_copy: "string",
  original_x_copy: "string",
  original_slides_json: "string",
  original_sha256: "string",
  human_edit_count: "number",
};
for (const [id, type] of Object.entries(extraColumns)) {
  saveNode.parameters.columns.value[id] = `={{ $json["${id}"] }}`;
  if (!saveNode.parameters.columns.schema.some((field) => field.id === id)) {
    saveNode.parameters.columns.schema.push({
      id,
      displayName: id,
      type,
      required: false,
      defaultMatch: false,
      display: true,
      canBeUsedToMatch: true,
    });
  }
}

const queueGuards = `const __approved=$("${versionNode.name}").first().json,__request=$("${nodeBy("Validar POST").name}").first().json;if(__approved.action!=='approve'||__approved.status!=='APPROVED'||__approved.approval_status!=='HUMAN_APPROVED'||__approved.manifest_sha256!==__request.expected_manifest_sha256||Number(__approved.revision)!==__request.expected_revision)throw new Error('APPROVAL_CONTRACT_MISMATCH: la cola no coincide con la revisión humana aprobada.');\n`;
const metaQueue = nodeBy("Preparar cola Meta");
metaQueue.parameters.jsCode = queueGuards + metaQueue.parameters.jsCode;
metaQueue.parameters.jsCode = metaQueue.parameters.jsCode.replaceAll("&v=4", "&v=5");
const bufferQueue = nodeBy("Preparar colas Buffer");
bufferQueue.parameters.jsCode = queueGuards + bufferQueue.parameters.jsCode;

workflow.name = "WF-MKT · Social Review & Approval v2 — exact revision contract";
workflow.settings = { ...(workflow.settings ?? {}), executionOrder: "v1", timezone: "America/Argentina/Buenos_Aires" };
workflow.meta = { ...(workflow.meta ?? {}), olmondContractVersion: "5.0.0", patchedAt: new Date().toISOString() };

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(workflow, null, 2)}\n`, "utf8");
console.log(outputPath);
