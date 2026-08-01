import fs from "node:fs";
import path from "node:path";

const outputPath = process.argv[2];
if (!outputPath) throw new Error("Falta la ruta de salida.");

const requestTable = {
  __rl: true,
  mode: "id",
  value: "BcACCpr24jrjxcOA",
  cachedResultName: "SalesOS_Social_Requests_Olmond",
};
const column = (id, type = "string") => ({
  id,
  displayName: id,
  type,
  required: false,
  defaultMatch: false,
  display: true,
  canBeUsedToMatch: true,
});
const requestColumns = [
  column("kind"), column("request_id"), column("idempotency_key"), column("request_version", "number"),
  column("mode"), column("slot_key"), column("requested_topic"), column("editorial_instructions"),
  column("source_urls_json"), column("publish_date"), column("scheduled_at"), column("priority", "number"),
  column("status"), column("result_content_id"), column("last_error"), column("attempt_count", "number"),
  column("created_at"), column("updated_at"), column("requested_by"),
];
const requestValues = Object.fromEntries(requestColumns.map(({ id }) => [id, `={{ $json["${id}"] }}`]));

const sha256Code = `const sha256=s=>{const r=(n,x)=>x>>>n|x<<32-n,m=Math.pow(2,32),l='length',w=[],k=[];let h=[],p=2;for(;k[l]<64;p++){let q=2;for(;q*q<=p;q++)if(p%q===0)break;if(q*q>p){h.push(Math.pow(p,.5)*m|0);k.push(Math.pow(p,1/3)*m|0)}}s=unescape(encodeURIComponent(s));const n=s[l],b=n*8;s+='\\x80';while(s[l]%64!==56)s+='\\x00';for(let i=0;i<s[l];i++){const j=s.charCodeAt(i);if(j>>8)return'';w[i>>2]|=j<<(3-i)%4*8}w[w[l]]=b/m|0;w[w[l]]=b;for(let j=0;j<w[l];){const v=w.slice(j,j+=16),o=h.slice(0);for(let i=0;i<64;i++){const x=v[i-15],y=v[i-2],A=h[0],E=h[4],t=h[7]+(r(6,E)^r(11,E)^r(25,E))+(E&h[5]^~E&h[6])+k[i]+(v[i]=i<16?v[i]:v[i-16]+(r(7,x)^r(18,x)^x>>>3)+v[i-7]+(r(17,y)^r(19,y)^y>>>10)|0),u=(r(2,A)^r(13,A)^r(22,A))+(A&h[1]^A&h[2]^h[1]&h[2]);h=[t+u|0,A,h[1],h[2],h[3]+t|0,h[4],h[5],h[6]]}for(let i=0;i<8;i++)h[i]=h[i]+o[i]|0}return h.map(v=>(v>>>0).toString(16).padStart(8,'0')).join('')};`;
const normalizeCode = `${sha256Code}
const root=$input.first()?.json??{},body=root.body&&typeof root.body==='object'?root.body:root,token=String(body.token??'').trim(),mode=String(body.mode??'').trim().toLowerCase(),version=Number(body.request_version??0),nonce=String(body.client_request_nonce??'').trim().toLowerCase(),requestHash=String(body.request_sha256??'').trim().toLowerCase(),topics=Array.isArray(body.topics)?body.topics:[];
const errors=[];if(!/^[A-Za-z0-9_-]{32,160}$/.test(token))errors.push('token');if(!['manual','urgent'].includes(mode))errors.push('mode');if(version!==1)errors.push('request_version');if(!/^[a-f0-9-]{20,64}$/.test(nonce))errors.push('nonce');if(!/^[a-f0-9]{64}$/.test(requestHash))errors.push('request_sha256');if(topics.length<1||topics.length>3)errors.push('topics');
const clean=topics.map((raw,index)=>{const requestedTopic=String(raw?.requested_topic??'').replace(/\\s+/g,' ').trim(),instructions=String(raw?.editorial_instructions??'').trim(),slotKey=String(raw?.slot_key??('s'+(index+1))).trim().toLowerCase(),scheduledAt=String(raw?.scheduled_at??'').trim();let sources=[];try{sources=Array.isArray(raw?.source_urls)?raw.source_urls:JSON.parse(String(raw?.source_urls_json??'[]'));}catch{}sources=[...new Set(sources.map(String).map(v=>v.trim()).filter(v=>v.startsWith('https://')))].slice(0,12);if(requestedTopic.length<8||requestedTopic.length>1200)errors.push('topic_'+(index+1));if(instructions.length>4000)errors.push('instructions_'+(index+1));if(mode==='manual'&&!/^s[123]$/.test(slotKey))errors.push('slot_'+(index+1));if(mode==='manual'&&!Number.isFinite(Date.parse(scheduledAt)))errors.push('schedule_'+(index+1));return {requested_topic:requestedTopic,editorial_instructions:instructions,slot_key:slotKey,scheduled_at:scheduledAt,source_urls:sources,priority:Number(raw?.priority??(mode==='urgent'?100:80))}});
const canonical=JSON.stringify({mode,request_version:version,client_request_nonce:nonce,topics:clean});if(sha256(canonical)!==requestHash)errors.push('request_integrity');
return [{json:{mode,request_version:version,client_request_nonce:nonce,request_sha256:requestHash,topics:clean,token_hash:sha256(token),request_error:errors.length?'Solicitud inválida: '+[...new Set(errors)].join(', '):''}}];`;

const expandCode = `const envelope=$input.first()?.json??{},now=new Date(),timezone='America/Argentina/Buenos_Aires';
return envelope.topics.map((topic,index)=>{const scheduled=topic.scheduled_at?new Date(topic.scheduled_at):null,scheduledAt=envelope.mode==='urgent'?'':scheduled.toISOString(),publishDate=envelope.mode==='urgent'?new Intl.DateTimeFormat('en-CA',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit'}).format(now):scheduledAt.slice(0,10),slotKey=envelope.mode==='urgent'?('urgent_'+envelope.client_request_nonce.slice(0,12)+'_'+(index+1)):topic.slot_key,idempotencyKey=envelope.client_request_nonce+':'+(index+1)+':'+envelope.request_sha256.slice(0,16),requestId='request_'+envelope.client_request_nonce.replace(/-/g,'').slice(0,24)+'_'+(index+1);return {json:{kind:'CONTENT_REQUEST',request_id:requestId,idempotency_key:idempotencyKey,request_version:1,mode:envelope.mode,slot_key:slotKey,requested_topic:topic.requested_topic,editorial_instructions:topic.editorial_instructions,source_urls_json:JSON.stringify(topic.source_urls),publish_date:publishDate,scheduled_at:scheduledAt,priority:Math.max(0,Math.min(100,Number(topic.priority))),status:'REQUESTED',result_content_id:'',last_error:'',attempt_count:0,created_at:now.toISOString(),updated_at:now.toISOString(),requested_by:'patricio'}}});`;

const workflow = {
  name: "WF-MKT · Social Control Intake v1 — SHADOW",
  nodes: [
    {
      parameters: { httpMethod: "POST", path: "olmond-social-control-v1", responseMode: "responseNode", options: {} },
      id: "8c0bcd76-a649-4a49-ac18-f8eb8b772bb1",
      name: "POST control editorial",
      type: "n8n-nodes-base.webhook",
      typeVersion: 2.1,
      position: [-1000, 0],
    },
    {
      parameters: { jsCode: normalizeCode },
      id: "300d7e2d-629f-4209-92f5-14438c3c4ce9",
      name: "Validar sobre y firma",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [-760, 0],
    },
    {
      parameters: {
        operation: "get",
        dataTableId: requestTable,
        matchType: "allConditions",
        filters: { conditions: [
          { keyName: "kind", keyValue: "CONTROL_TOKEN" },
          { keyName: "token_hash", keyValue: "={{ $json.token_hash }}" },
        ] },
        limit: 1,
      },
      id: "41e33c0d-d989-4edf-af83-d8405a9fbd98",
      name: "Buscar autorización activa",
      type: "n8n-nodes-base.dataTable",
      typeVersion: 1.1,
      position: [-520, 0],
      alwaysOutputData: true,
    },
    {
      parameters: {
        jsCode: `const envelope=$("Validar sobre y firma").first().json,row=$input.first()?.json??{},authorized=!envelope.request_error&&row.kind==='CONTROL_TOKEN'&&row.status==='ACTIVE'&&new Date(row.expires_at??0).getTime()>Date.now();return [{json:{...envelope,authorized,http_status:authorized?200:401,message:authorized?'Autorización válida.':'Acceso inválido o vencido.'}}];`,
      },
      id: "0af9ec10-8f47-4614-adcc-bf6c6cf05a4c",
      name: "Autorizar solicitud",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [-280, 0],
    },
    {
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: "", typeValidation: "strict", version: 2 },
          conditions: [{ id: "dc4bdd57-4a64-4a52-958d-c0594ccb6907", leftValue: "={{ $json.authorized }}", rightValue: true, operator: { type: "boolean", operation: "true", singleValue: true } }],
          combinator: "and",
        },
        options: {},
      },
      id: "ab2736e9-1414-43ef-af43-fe9127377032",
      name: "¿Autorizada?",
      type: "n8n-nodes-base.if",
      typeVersion: 2.2,
      position: [-40, 0],
    },
    {
      parameters: { jsCode: expandCode },
      id: "c93bb8d0-fcb8-49ee-985e-a07c7d95670a",
      name: "Expandir temas inmutables",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [200, -100],
    },
    {
      parameters: {
        operation: "get",
        dataTableId: requestTable,
        matchType: "allConditions",
        filters: { conditions: [{ keyName: "idempotency_key", keyValue: "={{ $json.idempotency_key }}" }] },
        limit: 1,
      },
      id: "35051f1d-8ae9-4412-bbbb-afae6081b91a",
      name: "Buscar solicitud duplicada",
      type: "n8n-nodes-base.dataTable",
      typeVersion: 1.1,
      position: [440, -100],
      alwaysOutputData: true,
    },
    {
      parameters: {
        jsCode: `const proposed=$("Expandir temas inmutables").item.json,existing=$input.first()?.json??{};return [{json:existing.request_id?{...existing,duplicate:true}:{...proposed,duplicate:false}}];`,
      },
      id: "8bec0987-ac40-4cf8-bbd9-b494757e3ce0",
      name: "Resolver idempotencia",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [680, -100],
    },
    {
      parameters: {
        operation: "upsert",
        dataTableId: requestTable,
        matchType: "allConditions",
        filters: { conditions: [{ keyName: "request_id", keyValue: "={{ $json.request_id }}" }] },
        columns: { mappingMode: "defineBelow", value: requestValues, schema: requestColumns, matchingColumns: [], attemptToConvertTypes: false, convertFieldsToString: false },
        options: {},
      },
      id: "a3124a57-7319-4ae0-8758-8cb7b82f3914",
      name: "Registrar sin duplicar",
      type: "n8n-nodes-base.dataTable",
      typeVersion: 1.1,
      position: [920, -100],
    },
    {
      parameters: {
        jsCode: `const rows=$input.all().map(item=>item.json??{}).filter(row=>row.request_id);return [{json:{success:true,http_status:200,message:rows.length===1?'Solicitud editorial registrada.':'Solicitudes editoriales registradas.',request_ids:rows.map(row=>row.request_id),statuses:rows.map(row=>row.status)}}];`,
      },
      id: "60096837-86b5-41df-9c3f-2a67039aa8a5",
      name: "Preparar confirmación",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [1160, -100],
    },
    {
      parameters: { respondWith: "json", responseBody: "={{ $json }}", options: { responseCode: "={{ $json.http_status }}", responseHeaders: { entries: [{ name: "Cache-Control", value: "no-store" }, { name: "X-Content-Type-Options", value: "nosniff" }] } } },
      id: "8c752090-6b87-4af3-a876-dc3e728d2d08",
      name: "Responder control editorial",
      type: "n8n-nodes-base.respondToWebhook",
      typeVersion: 1.4,
      position: [1400, 0],
    },
    {
      parameters: { jsCode: `return [{json:{success:false,http_status:Number($json.http_status??401),message:String($json.message??'Acceso inválido o vencido.')}}];` },
      id: "341c6acf-801b-4bbf-a8a6-4275242c8eac",
      name: "Preparar rechazo seguro",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [200, 140],
    },
  ],
  connections: {
    "POST control editorial": { main: [[{ node: "Validar sobre y firma", type: "main", index: 0 }]] },
    "Validar sobre y firma": { main: [[{ node: "Buscar autorización activa", type: "main", index: 0 }]] },
    "Buscar autorización activa": { main: [[{ node: "Autorizar solicitud", type: "main", index: 0 }]] },
    "Autorizar solicitud": { main: [[{ node: "¿Autorizada?", type: "main", index: 0 }]] },
    "¿Autorizada?": { main: [
      [{ node: "Expandir temas inmutables", type: "main", index: 0 }],
      [{ node: "Preparar rechazo seguro", type: "main", index: 0 }],
    ] },
    "Expandir temas inmutables": { main: [[{ node: "Buscar solicitud duplicada", type: "main", index: 0 }]] },
    "Buscar solicitud duplicada": { main: [[{ node: "Resolver idempotencia", type: "main", index: 0 }]] },
    "Resolver idempotencia": { main: [[{ node: "Registrar sin duplicar", type: "main", index: 0 }]] },
    "Registrar sin duplicar": { main: [[{ node: "Preparar confirmación", type: "main", index: 0 }]] },
    "Preparar confirmación": { main: [[{ node: "Responder control editorial", type: "main", index: 0 }]] },
    "Preparar rechazo seguro": { main: [[{ node: "Responder control editorial", type: "main", index: 0 }]] },
  },
  pinData: {},
  settings: {
    executionOrder: "v1",
    timezone: "America/Argentina/Buenos_Aires",
    saveExecutionProgress: true,
    saveDataErrorExecution: "all",
    saveDataSuccessExecution: "all",
    errorWorkflow: "Qb6oQWiuz7sCuRBl",
  },
  meta: {
    olmondContractVersion: "5.1.0-shadow",
    requestTableId: "BcACCpr24jrjxcOA",
    storesRawAccessToken: false,
    productionPublishersRequiredState: "PAUSED",
  },
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(workflow, null, 2)}\n`, "utf8");
console.log(outputPath);
