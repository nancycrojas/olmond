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
const reviewTable = {
  __rl: true,
  mode: "id",
  value: "TWcPR4pDfc876IaA",
  cachedResultName: "SalesOS_Social_Review_Olmond",
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

const planDailyCode = `const requests=$input.all().map(item=>item.json??{}).filter(row=>row.request_id),reviews=$("Leer revisiones del día").all().map(item=>item.json??{}).filter(row=>row.content_id),now=new Date(),timezone='America/Argentina/Buenos_Aires';
const localDate=new Intl.DateTimeFormat('en-CA',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
const inactive=new Set(['REJECTED','CANCELLED','CANCELED','FAILED_FINAL','SUPERSEDED']);
const occupied=new Set();
for(const row of reviews){if(String(row.publish_date??'').slice(0,10)!==localDate||inactive.has(String(row.status??'').toUpperCase()))continue;const match=String(row.content_id??'').match(/_(s[123])_/i);if(match)occupied.add(match[1].toLowerCase());}
for(const row of requests){const status=String(row.status??'').toUpperCase();if(String(row.publish_date??'').slice(0,10)!==localDate||status==='REQUESTED'||inactive.has(status))continue;if(/^s[123]$/.test(String(row.slot_key??'')))occupied.add(String(row.slot_key));}
const eligible=requests.filter(row=>String(row.kind??'CONTENT_REQUEST')==='CONTENT_REQUEST'&&String(row.publish_date??'').slice(0,10)===localDate&&String(row.status??'').toUpperCase()==='REQUESTED'&&['manual','urgent'].includes(String(row.mode??'').toLowerCase())).sort((a,b)=>Number(b.priority??0)-Number(a.priority??0)||Date.parse(a.created_at||0)-Date.parse(b.created_at||0));
const used=new Set(),slots=[{key:'s1',time:'18:30:00',lane:'noticia_relevante_72h'},{key:'s2',time:'19:30:00',lane:'paper_o_metodo'},{key:'s3',time:'20:30:00',lane:'seguridad_y_gobierno'}],out=[];
for(const slot of slots){if(occupied.has(slot.key))continue;let selected=eligible.find(row=>!used.has(row.request_id)&&String(row.slot_key??'')===slot.key);if(!selected)selected=eligible.find(row=>!used.has(row.request_id)&&String(row.mode??'')==='manual'&&!/^s[123]$/.test(String(row.slot_key??'')));if(selected)used.add(selected.request_id);const mode=selected?String(selected.mode):'auto',requestId=selected?String(selected.request_id):('request_'+localDate.replace(/-/g,'')+'_'+slot.key),scheduledRaw=selected?.scheduled_at,scheduledParsed=new Date(String(scheduledRaw??'')),scheduledAt=Number.isFinite(scheduledParsed.getTime())?scheduledParsed.toISOString():new Date(localDate+'T'+slot.time+'-03:00').toISOString(),requestedTopic=String(selected?.requested_topic??''),instructions=String(selected?.editorial_instructions??('Seleccionar una pieza distinta para el eje '+slot.lane+'. Informar con fuentes primarias, lenguaje accesible y sin tono comercial.'));
const row={kind:'CONTENT_REQUEST',request_id:requestId,idempotency_key:selected?.idempotency_key||('auto:'+localDate+':'+slot.key),request_version:Number(selected?.request_version??1),mode,slot_key:slot.key,requested_topic:requestedTopic,editorial_instructions:instructions,source_urls_json:String(selected?.source_urls_json??'[]'),publish_date:localDate,scheduled_at:scheduledAt,priority:Number(selected?.priority??(mode==='manual'?80:50)),status:'CLAIMED',result_content_id:String(selected?.result_content_id??''),last_error:'',attempt_count:Number(selected?.attempt_count??0)+1,created_at:selected?.created_at||now.toISOString(),updated_at:now.toISOString(),requested_by:String(selected?.requested_by??(mode==='auto'?'system':'patricio'))};out.push({json:row});}
return out;`;

const planUrgentCode = `const requests=$input.all().map(item=>item.json??{}).filter(row=>row.request_id),now=new Date(),terminal=new Set(['REJECTED','CANCELLED','CANCELED','FAILED_FINAL','SUPERSEDED','PUBLISHED','PENDING_REVIEW','APPROVED']);
const eligible=requests.filter(row=>String(row.kind??'CONTENT_REQUEST')==='CONTENT_REQUEST'&&String(row.mode??'').toLowerCase()==='urgent'&&String(row.status??'').toUpperCase()==='REQUESTED'&&!terminal.has(String(row.status??'').toUpperCase())).sort((a,b)=>Number(b.priority??100)-Number(a.priority??100)||Date.parse(a.created_at||0)-Date.parse(b.created_at||0)).slice(0,2);
return eligible.map((row,index)=>({json:{...row,status:'CLAIMED',scheduled_at:new Date(Math.max(Date.now()+(index+1)*30*60000,Date.parse(row.scheduled_at||0)||0)).toISOString(),attempt_count:Number(row.attempt_count??0)+1,last_error:'',updated_at:now.toISOString()}}));`;

const requestColumns = [
  column("kind"), column("request_id"), column("idempotency_key"), column("request_version", "number"),
  column("mode"), column("slot_key"), column("requested_topic"), column("editorial_instructions"),
  column("source_urls_json"), column("publish_date"), column("scheduled_at"), column("priority", "number"),
  column("status"), column("result_content_id"), column("last_error"), column("attempt_count", "number"),
  column("created_at"), column("updated_at"), column("requested_by"),
];
const requestValues = Object.fromEntries(requestColumns.map(({ id }) => [id, `={{ $json["${id}"] }}`]));

const workflow = {
  name: "WF-MKT · Social Slate Orchestrator v2 — SHADOW",
  nodes: [
    {
      parameters: { rule: { interval: [{ triggerAtHour: 5, triggerAtMinute: 10 }] } },
      id: "536b7418-bc4d-4bd7-a52a-1c8382c47e8e",
      name: "Planificar 3 espacios · 05:10 AR",
      type: "n8n-nodes-base.scheduleTrigger",
      typeVersion: 1.2,
      position: [-1120, -220],
      disabled: true,
    },
    {
      parameters: { rule: { interval: [{ field: "minutes", minutesInterval: 15 }] } },
      id: "9b67f366-bdc6-4e98-829d-53ed6c228c34",
      name: "Revisar solicitudes urgentes · 15 min",
      type: "n8n-nodes-base.scheduleTrigger",
      typeVersion: 1.2,
      position: [-1120, 220],
      disabled: true,
    },
    {
      parameters: {},
      id: "d60cb081-02e1-4e27-9cd5-d846b4d4934c",
      name: "Prueba manual shadow",
      type: "n8n-nodes-base.manualTrigger",
      typeVersion: 1,
      position: [-1120, -20],
    },
    {
      parameters: {
        operation: "get",
        dataTableId: reviewTable,
        matchType: "allConditions",
        filters: { conditions: [{ keyName: "publish_date", keyValue: "={{ $now.setZone('America/Argentina/Buenos_Aires').toFormat('yyyy-MM-dd') }}" }] },
        returnAll: true,
      },
      id: "097bc224-3877-4ccb-a9b9-7a1a3b9fdc38",
      name: "Leer revisiones del día",
      type: "n8n-nodes-base.dataTable",
      typeVersion: 1.1,
      position: [-880, -220],
      alwaysOutputData: true,
    },
    {
      parameters: { operation: "get", dataTableId: requestTable, returnAll: true },
      id: "1f95e5af-9f58-49fd-940e-c2d98aa4c226",
      name: "Leer solicitudes del día",
      type: "n8n-nodes-base.dataTable",
      typeVersion: 1.1,
      position: [-650, -220],
      alwaysOutputData: true,
    },
    {
      parameters: { operation: "get", dataTableId: requestTable, returnAll: true },
      id: "e2f83bd1-0e78-44a1-8274-3cc4b2d5d9e3",
      name: "Leer solicitudes urgentes",
      type: "n8n-nodes-base.dataTable",
      typeVersion: 1.1,
      position: [-650, 220],
      alwaysOutputData: true,
    },
    {
      parameters: { jsCode: planDailyCode },
      id: "170e6e84-5398-47ca-8571-75cd2e8f2aa2",
      name: "Construir agenda diaria de 3 temas",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [-390, -220],
    },
    {
      parameters: { jsCode: planUrgentCode },
      id: "3a2ed7cb-1767-43fd-a08f-1932240b60a7",
      name: "Priorizar solicitudes urgentes",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [-390, 220],
    },
    {
      parameters: {
        operation: "upsert",
        dataTableId: requestTable,
        matchType: "allConditions",
        filters: { conditions: [{ keyName: "request_id", keyValue: "={{ $json.request_id }}" }] },
        columns: {
          mappingMode: "defineBelow",
          value: requestValues,
          schema: requestColumns,
          matchingColumns: [],
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: {},
      },
      id: "7a911a24-8e5c-43bb-9d28-274f9c17485e",
      name: "Reclamar solicitud de forma idempotente",
      type: "n8n-nodes-base.dataTable",
      typeVersion: 1.1,
      position: [-100, 0],
    },
    {
      parameters: {
        jsCode: `const row=$json??{};if(!row.request_id)throw new Error('EDITORIAL_CONTROL_REQUEST_MISSING');return [{json:{request_id:String(row.request_id),slot_key:String(row.slot_key),mode:String(row.mode),requested_topic:String(row.requested_topic??''),editorial_instructions:String(row.editorial_instructions??''),publish_date:String(row.publish_date),scheduled_at:String(row.scheduled_at),priority:Number(row.priority??50),source_urls_json:String(row.source_urls_json??'[]')}}];`,
      },
      id: "d21029e7-31f9-4878-bbe0-ded728dbe145",
      name: "Restaurar contrato de solicitud",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [140, 0],
    },
    {
      parameters: {
        workflowId: {
          __rl: true,
          mode: "id",
          value: "AAWGjrmZ4SvfkNCO",
          cachedResultName: "WF-MKT · Social Editorial Engine v4 — SHADOW",
        },
        workflowInputs: { mappingMode: "autoMapInputData", value: null },
        mode: "each",
        options: { waitForSubWorkflow: true },
      },
      id: "61941025-ce4a-4395-91bb-b422e66952d6",
      name: "Ejecutar motor editorial shadow",
      type: "n8n-nodes-base.executeWorkflow",
      typeVersion: 1.3,
      position: [390, 0],
    },
  ],
  connections: {
    "Planificar 3 espacios · 05:10 AR": { main: [[{ node: "Leer revisiones del día", type: "main", index: 0 }]] },
    "Prueba manual shadow": { main: [[{ node: "Leer revisiones del día", type: "main", index: 0 }]] },
    "Leer revisiones del día": { main: [[{ node: "Leer solicitudes del día", type: "main", index: 0 }]] },
    "Leer solicitudes del día": { main: [[{ node: "Construir agenda diaria de 3 temas", type: "main", index: 0 }]] },
    "Revisar solicitudes urgentes · 15 min": { main: [[{ node: "Leer solicitudes urgentes", type: "main", index: 0 }]] },
    "Leer solicitudes urgentes": { main: [[{ node: "Priorizar solicitudes urgentes", type: "main", index: 0 }]] },
    "Construir agenda diaria de 3 temas": { main: [[{ node: "Reclamar solicitud de forma idempotente", type: "main", index: 0 }]] },
    "Priorizar solicitudes urgentes": { main: [[{ node: "Reclamar solicitud de forma idempotente", type: "main", index: 0 }]] },
    "Reclamar solicitud de forma idempotente": { main: [[{ node: "Restaurar contrato de solicitud", type: "main", index: 0 }]] },
    "Restaurar contrato de solicitud": { main: [[{ node: "Ejecutar motor editorial shadow", type: "main", index: 0 }]] },
  },
  pinData: {},
  settings: {
    executionOrder: "v1",
    timezone: "America/Argentina/Buenos_Aires",
    saveExecutionProgress: true,
    saveDataErrorExecution: "all",
    saveDataSuccessExecution: "all",
    errorWorkflow: "Qb6oQWiuz7sCuRBl",
    callerPolicy: "workflowsFromSameOwner",
  },
  meta: {
    olmondContractVersion: "5.1.0-shadow",
    productionPublishersRequiredState: "PAUSED",
    childWorkflowId: "AAWGjrmZ4SvfkNCO",
    requestTableId: "BcACCpr24jrjxcOA",
    reviewTableId: "TWcPR4pDfc876IaA",
  },
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(workflow, null, 2)}\n`, "utf8");
console.log(outputPath);
