import fs from "node:fs";
import path from "node:path";

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  throw new Error("Uso: node patch-social-editorial-shadow.mjs <entrada.json> <salida.json>");
}

const workflow = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const nodeBy = (fragment) => {
  const node = workflow.nodes.find((candidate) => candidate.name.includes(fragment));
  if (!node) throw new Error(`No se encontró el nodo: ${fragment}`);
  return node;
};
const replaceOnce = (value, search, replacement, label) => {
  if (!value.includes(search)) throw new Error(`No se encontró el bloque para ${label}`);
  return value.replace(search, replacement);
};

const schedule = nodeBy("Generar edici");
const manual = nodeBy("Prueba manual");
const readExisting = nodeBy("Leer edici");
const dailyGate = nodeBy("Gate edici");
schedule.disabled = true;
manual.disabled = true;
delete workflow.connections[schedule.name];
delete workflow.connections[manual.name];

const executeTrigger = {
  parameters: {
    workflowInputs: {
      values: [
        { name: "request_id" },
        { name: "slot_key" },
        { name: "mode" },
        { name: "requested_topic" },
        { name: "editorial_instructions" },
        { name: "publish_date" },
        { name: "scheduled_at" },
        { name: "priority", type: "number" },
        { name: "source_urls_json" },
      ],
    },
  },
  id: "0cb58b0d-b41e-4c4c-9f42-1edee2822a44",
  name: "Solicitud editorial orquestada",
  type: "n8n-nodes-base.executeWorkflowTrigger",
  typeVersion: 1.2,
  position: [-2200, -740],
};
const normalizeRequest = {
  parameters: {
    jsCode: `const raw=$input.first()?.json??{},now=new Date(),timezone='America/Argentina/Buenos_Aires';
const localDate=new Intl.DateTimeFormat('en-CA',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
const mode=String(raw.mode??'auto').trim().toLowerCase();
if(!['auto','manual','urgent'].includes(mode))throw new Error('EDITORIAL_REQUEST_INVALID_MODE');
const slotKey=String(raw.slot_key??(mode==='urgent'?'urgent_'+now.getTime():'s1')).trim().toLowerCase().replace(/[^a-z0-9_-]/g,'').slice(0,48);
if(!slotKey)throw new Error('EDITORIAL_REQUEST_INVALID_SLOT');
const requestedTopic=String(raw.requested_topic??'').trim().slice(0,1200),instructions=String(raw.editorial_instructions??'').trim().slice(0,3000);
if(mode!=='auto'&&requestedTopic.length<8)throw new Error('EDITORIAL_REQUEST_TOPIC_REQUIRED');
const publishDate=/^\\d{4}-\\d{2}-\\d{2}$/.test(String(raw.publish_date??''))?String(raw.publish_date):localDate;
const fallbackHour=slotKey==='s1'?'18:30:00':slotKey==='s2'?'19:30:00':'20:30:00';
const fallback=new Date(publishDate+'T'+fallbackHour+'-03:00'),requested=new Date(String(raw.scheduled_at??''));
const scheduledAt=Number.isFinite(requested.getTime())?requested.toISOString():fallback.toISOString();
const priority=Math.max(0,Math.min(100,Number(raw.priority??(mode==='urgent'?100:mode==='manual'?80:50))));
let sourceUrls=[];try{sourceUrls=Array.isArray(raw.source_urls_json)?raw.source_urls_json:JSON.parse(String(raw.source_urls_json??'[]'));}catch{}
sourceUrls=sourceUrls.map(String).filter(url=>String(url).toLowerCase().startsWith('https://')).slice(0,12);
const requestId=String(raw.request_id??('editorial_'+publishDate.replace(/-/g,'')+'_'+slotKey)).trim().slice(0,160);
return [{json:{request_id:requestId,slot_key:slotKey,mode,requested_topic:requestedTopic,editorial_instructions:instructions,publish_date:publishDate,scheduled_at:scheduledAt,priority,source_urls_json:JSON.stringify(sourceUrls),received_at:now.toISOString(),timezone}}];`,
  },
  id: "c684235f-d2ed-413c-a349-bb55bd8cf5c1",
  name: "Normalizar solicitud editorial",
  type: "n8n-nodes-base.code",
  typeVersion: 2,
  position: [-1980, -740],
};
workflow.nodes.push(executeTrigger, normalizeRequest);
workflow.connections[executeTrigger.name] = { main: [[{ node: normalizeRequest.name, type: "main", index: 0 }]] };
workflow.connections[normalizeRequest.name] = { main: [[{ node: readExisting.name, type: "main", index: 0 }]] };

dailyGate.parameters.jsCode = `const request=$("${normalizeRequest.name}").first().json,terminal=new Set(['REJECTED','CANCELLED','CANCELED','FAILED_FINAL','SUPERSEDED']);
const existing=$input.all().map(item=>item.json??{}).filter(row=>row.content_id&&!terminal.has(String(row.status??'').toUpperCase()));
const sameSlot=existing.some(row=>{if(String(row.publish_date??'').slice(0,10)!==request.publish_date)return false;const id=String(row.content_id??'').toLowerCase();if(id.includes('_'+request.slot_key+'_'))return true;try{return JSON.parse(String(row.evidence_json??'{}')).request?.slot_key===request.slot_key;}catch{return false;}});
if(sameSlot)return [];
return [{json:{...request,dedupe_checked:true,checked_at:new Date().toISOString()}}];`;

const contractNode = nodeBy("Construir contrato");
contractNode.parameters.jsCode = contractNode.parameters.jsCode.replace("maximumRecoveryRounds:12", "maximumRecoveryRounds:8");
const contractStart = contractNode.parameters.jsCode.indexOf("const now=new Date();");
const contractEnd = contractNode.parameters.jsCode.indexOf("const run_id=", contractStart);
if (contractStart < 0 || contractEnd < 0) throw new Error("No se pudo localizar la selección editorial.");
const requestAwareSelection = `const now=new Date();
const request=$("${normalizeRequest.name}").first().json;
const weekdayName=new Intl.DateTimeFormat('en-US',{timeZone:'America/Argentina/Buenos_Aires',weekday:'short'}).format(now);
const weekday={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[weekdayName];
const autoLaneBySlot={s1:'noticia_relevante_72h',s2:'paper_o_metodo',s3:spec.lanesByWeekday[String(weekday)]??'seguridad_y_gobierno'};
const lane=request.mode==='auto'?(autoLaneBySlot[request.slot_key]??spec.lanesByWeekday[String(weekday)]??'noticia_relevante_72h'):'tema_solicitado';
const priorityTopic=request.requested_topic||('Seleccionar el desarrollo de inteligencia artificial más relevante de las últimas 72 horas dentro del eje '+lane+'. Debe aportar información nueva, datos, contexto o una explicación útil. Evitar repetir temas, ejemplos y marcos recientes.');
`;
contractNode.parameters.jsCode = contractNode.parameters.jsCode.slice(0, contractStart) + requestAwareSelection + contractNode.parameters.jsCode.slice(contractEnd);
contractNode.parameters.jsCode = replaceOnce(
  contractNode.parameters.jsCode,
  "  editorial_brief:priorityTopic,",
  "  editorial_brief:priorityTopic,\n  request,",
  "request en contrato",
);
contractNode.parameters.jsCode = replaceOnce(
  contractNode.parameters.jsCode,
  "  lane,\n  priority_topic:priorityTopic,",
  "  lane,\n  priority_topic:priorityTopic,\n  request_id:request.request_id,\n  slot_key:request.slot_key,\n  request_mode:request.mode,\n  scheduled_at:request.scheduled_at,\n  publish_date:request.publish_date,\n  editorial_instructions:request.editorial_instructions,",
  "request en salida",
);

for (const gate of [nodeBy("Gate determinístico"), nodeBy("Gate determinístico 2")]) {
  gate.parameters.jsCode = gate.parameters.jsCode
    .replace(
      "if(norm(c.instagram)===norm(c.facebook)||norm(c.linkedin)===norm(c.facebook))failures.push('CHANNEL_DUPLICATION');",
      "if(norm(c.linkedin)===norm(c.facebook)||norm(c.linkedin)===norm(c.instagram))failures.push('CHANNEL_DUPLICATION');",
    )
    .replace("if(editorialSlides.some(s=>String(s.eyebrow??'').trim()))failures.push('EYEBROW_NOT_ALLOWED');", "")
    .replace("if(/[?¿]/u.test(String(c.title??''))||editorialSlides.some(s=>/[?¿]/u.test(String(s.headline??''))))failures.push('QUESTION_HEADLINE');", "")
    .replace("if(/^(?:¿|Qué |Cómo |Cuál |Cuándo |Dónde |Por qué )/u.test(firstLinkedinLine))failures.push('QUESTION_OPENING');", "");
}

const secondGate = nodeBy("Gate determinístico 2");
secondGate.parameters.jsCode = secondGate.parameters.jsCode.replace(
  "recovery_terminal:(failures.length>0&&Number(frozen.recovery_rounds??1)>=4)",
  "recovery_terminal:(failures.length>0&&Number(frozen.recovery_rounds??1)>=Number(frozen.contract?.maximum_recovery_rounds??8))",
);

const prepareReview = nodeBy("Preparar revisi");
const prepareCode = prepareReview.parameters.jsCode;
const prepareStart = prepareCode.indexOf("const c=$json.candidate,now=new Date(),contentId=");
const renderStart = prepareCode.indexOf("const render=", prepareStart);
if (prepareStart < 0 || renderStart < 0) throw new Error("No se encontró el encabezado de Preparar revisión.");
const newPrepareHeader = `const c=$json.candidate,now=new Date(),execution=$("${contractNode.name}").item.json,request=$("${normalizeRequest.name}").first().json;
const slotKey=String(request.slot_key||'s1').replace(/[^a-z0-9_-]/g,'').slice(0,48),contentId='social_'+request.publish_date.replace(/-/g,'')+'_'+slotKey+'_'+String($execution.id??Date.now()),revision=1;
`;
prepareReview.parameters.jsCode = prepareCode.slice(0, prepareStart) + newPrepareHeader + prepareCode.slice(renderStart);
const inputHashStart = prepareReview.parameters.jsCode.indexOf("const inputHash=");
const returnStart = prepareReview.parameters.jsCode.indexOf("return [{json:{", inputHashStart);
if (inputHashStart < 0 || returnStart < 0) throw new Error("No se encontró el manifiesto de Preparar revisión.");
const manifestBlock = `const inputHash=$json.candidate_hash,publishDate=request.publish_date;
/* LINKEDIN_EDITORIAL_ASSET_LIBRARY_V1: recurso único por red, visible en revisión humana. */
const titleKey=String(c.title??'').toLowerCase(),hero=titleKey.match(/seguridad|incidente|ataque|vulnerabilidad/)?'https://www.olmondconsulting.com/social/linkedin/social_20260731_ai-security-incident-v1.png':titleKey.match(/regulaci|transparencia|contenido generado|ley|europa/)?'https://www.olmondconsulting.com/social/linkedin/social_20260731_eu-ai-transparency-v1.png':titleKey.match(/trabajo|empleo|profesi|productividad|tareas/)?'https://www.olmondconsulting.com/social/linkedin/social_20260731_work-boundaries-v1.png':'https://www.olmondconsulting.com/social/linkedin/default-editorial-ai-ops-v1.png',heroAlt=titleKey.match(/seguridad|incidente|ataque|vulnerabilidad/)?'Especialistas investigan una ruta anómala entre sistemas durante una prueba de seguridad.':titleKey.match(/regulaci|transparencia|contenido generado|ley|europa/)?'Dos profesionales revisan el origen y la identificación de contenido modificado digitalmente.':titleKey.match(/trabajo|empleo|profesi|productividad|tareas/)?'Tres profesionales analizan información y documentos en una mesa de trabajo.':'Imagen editorial de Olmond sobre inteligencia artificial y operación empresarial.';
const manifestHash=sha256(JSON.stringify({inputHash,title:String(c.title),media,alts,hero})),token=sha256(contentId+':'+manifestHash+':'+now.toISOString()).slice(0,48);
`;
prepareReview.parameters.jsCode = prepareReview.parameters.jsCode.slice(0, inputHashStart) + manifestBlock + prepareReview.parameters.jsCode.slice(returnStart);
prepareReview.parameters.jsCode = prepareReview.parameters.jsCode
  .replace("scheduled_at:now.toISOString()", "scheduled_at:request.scheduled_at")
  .replace("contract:$json.contract,evidence_hash", "contract:$json.contract,request,evidence_hash");

for (const alertFragment of ["Alertar bloqueo QA", "Mostrar bloqueo en Recibidos"]) {
  const alertNode = nodeBy(alertFragment);
  delete alertNode.disabled;
}

workflow.name = "WF-MKT · Social Editorial Engine v4 — SHADOW";
workflow.settings = {
  ...(workflow.settings ?? {}),
  executionOrder: "v1",
  timezone: "America/Argentina/Buenos_Aires",
  saveExecutionProgress: true,
};
workflow.meta = {
  ...(workflow.meta ?? {}),
  olmondContractVersion: "5.0.0-shadow",
  patchedAt: new Date().toISOString(),
  productionPublishersRequiredState: "PAUSED",
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(workflow, null, 2)}\n`, "utf8");
console.log(outputPath);
