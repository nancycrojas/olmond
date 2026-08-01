import fs from "node:fs";
import path from "node:path";

const outputPath = process.argv[2];
if (!outputPath) throw new Error("Falta la ruta de salida.");

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

const planDailyCode = `const rows=$input.all().map(item=>item.json??{}).filter(row=>row.content_id),now=new Date(),timezone='America/Argentina/Buenos_Aires';
const localDate=new Intl.DateTimeFormat('en-CA',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
const parse=value=>{try{return JSON.parse(String(value??'{}'));}catch{return {};}};
const terminal=new Set(['REJECTED','CANCELLED','CANCELED','FAILED_FINAL','SUPERSEDED']);
const social=rows.filter(row=>String(row.content_id).startsWith('social_')&&String(row.publish_date??'').slice(0,10)===localDate&&!terminal.has(String(row.status??'').toUpperCase())).sort((a,b)=>Date.parse(a.scheduled_at||0)-Date.parse(b.scheduled_at||0));
const occupied=new Set();social.forEach((row,index)=>{const evidence=parse(row.evidence_json),match=String(row.content_id).match(/_(s[123])_/i),slot=match?.[1]?.toLowerCase()||evidence.request?.slot_key||('s'+Math.min(index+1,3));occupied.add(slot);});
const eligibleRequest=rows.filter(row=>{const status=String(row.status??'').toUpperCase(),age=Date.now()-Date.parse(row.updated_at||row.created_at||0);return String(row.publish_date??'').slice(0,10)===localDate&&(status==='REQUESTED'||(status==='PROCESSING'&&age>2*3600000));}).map(row=>{const evidence=parse(row.evidence_json),request=evidence.request??{};return {row,request:{...request,requested_topic:String(request.requested_topic??row.title??'').trim(),editorial_instructions:String(request.editorial_instructions??row.thesis??'').trim(),source_urls_json:request.source_urls_json??row.source_urls_json??'[]'}};}).filter(item=>['manual','urgent'].includes(String(item.request.mode??'manual')));
const used=new Set(),slots=[{key:'s1',time:'18:30:00',lane:'noticia_relevante_72h'},{key:'s2',time:'19:30:00',lane:'paper_o_metodo'},{key:'s3',time:'20:30:00',lane:'seguridad_y_gobierno'}],out=[];
for(const slot of slots){if(occupied.has(slot.key))continue;let selected=eligibleRequest.find(item=>!used.has(item.row.review_id)&&String(item.request.slot_key??'')===slot.key);if(!selected)selected=eligibleRequest.find(item=>!used.has(item.row.review_id)&&String(item.request.mode??'manual')==='manual'&&!item.request.slot_key);if(selected)used.add(selected.row.review_id);const mode=selected?String(selected.request.mode??'manual'):'auto',requestId=selected?String(selected.row.review_id):('request_'+localDate.replace(/-/g,'')+'_'+slot.key),scheduledRaw=selected?.request.scheduled_at??selected?.row.scheduled_at,scheduledParsed=new Date(String(scheduledRaw??'')),scheduledAt=Number.isFinite(scheduledParsed.getTime())?scheduledParsed.toISOString():new Date(localDate+'T'+slot.time+'-03:00').toISOString(),requestedTopic=selected?.request.requested_topic??'',instructions=selected?.request.editorial_instructions??('Seleccionar una pieza distinta para el eje '+slot.lane+'. Informar con fuentes primarias, lenguaje accesible y sin tono comercial.');const request={request_id:requestId,slot_key:slot.key,mode,requested_topic:requestedTopic,editorial_instructions:instructions,publish_date:localDate,scheduled_at:scheduledAt,priority:Number(selected?.request.priority??(mode==='manual'?80:50)),source_urls_json:typeof selected?.request.source_urls_json==='string'?selected.request.source_urls_json:JSON.stringify(selected?.request.source_urls_json??[])};out.push({json:{...request,title:requestedTopic||('Selección automática · '+slot.lane),timezone,status:'PROCESSING',stage_attempts:Number(selected?.row.stage_attempts??0)+1,created_at:selected?.row.created_at||now.toISOString(),updated_at:now.toISOString(),control_evidence_json:JSON.stringify({request,orchestrator:'slate-v1',planned_at:now.toISOString()})}});}
return out;`;

const planUrgentCode = `const rows=$input.all().map(item=>item.json??{}).filter(row=>row.content_id),now=new Date(),timezone='America/Argentina/Buenos_Aires',parse=value=>{try{return JSON.parse(String(value??'{}'));}catch{return {};}};
const existingRequestIds=new Set(rows.filter(row=>String(row.content_id).startsWith('social_')).map(row=>parse(row.evidence_json).request?.request_id).filter(Boolean));
const eligible=rows.map(row=>({row,request:parse(row.evidence_json).request??{}})).filter(({row,request})=>{const status=String(row.status??'').toUpperCase(),age=Date.now()-Date.parse(row.updated_at||row.created_at||0),retry=status==='PROCESSING'&&age>2*3600000;return (status==='REQUESTED'||retry)&&String(request.mode??'').toLowerCase()==='urgent'&&!existingRequestIds.has(row.review_id);}).sort((a,b)=>Number(b.request.priority??100)-Number(a.request.priority??100)||Date.parse(a.row.created_at||0)-Date.parse(b.row.created_at||0)).slice(0,2);
return eligible.map(({row,request},index)=>{const requestId=String(row.review_id),safe=requestId.toLowerCase().replace(/[^a-z0-9_-]/g,'').slice(-32)||String(now.getTime()),slotKey=String(request.slot_key??('urgent_'+safe)),requested=new Date(String(request.scheduled_at??row.scheduled_at??'')),scheduledAt=Number.isFinite(requested.getTime())&&requested.getTime()>Date.now()?requested.toISOString():new Date(Date.now()+(index+1)*30*60000).toISOString(),publishDate=String(row.publish_date??now.toLocaleDateString('en-CA',{timeZone:timezone})).slice(0,10),normalized={request_id:requestId,slot_key:slotKey,mode:'urgent',requested_topic:String(request.requested_topic??row.title??'').trim(),editorial_instructions:String(request.editorial_instructions??row.thesis??'').trim(),publish_date:publishDate,scheduled_at:scheduledAt,priority:Number(request.priority??100),source_urls_json:typeof request.source_urls_json==='string'?request.source_urls_json:(row.source_urls_json??'[]')};return {json:{...normalized,title:normalized.requested_topic,timezone,status:'PROCESSING',stage_attempts:Number(row.stage_attempts??0)+1,created_at:row.created_at||now.toISOString(),updated_at:now.toISOString(),control_evidence_json:JSON.stringify({request:normalized,orchestrator:'slate-v1',planned_at:now.toISOString()})}};});`;

const workflow = {
  name: "WF-MKT · Social Slate Orchestrator v1 — SHADOW",
  nodes: [
    {
      parameters: { rule: { interval: [{ triggerAtHour: 5, triggerAtMinute: 10 }] } },
      id: "536b7418-bc4d-4bd7-a52a-1c8382c47e8e",
      name: "Planificar 3 espacios · 05:10 AR",
      type: "n8n-nodes-base.scheduleTrigger",
      typeVersion: 1.2,
      position: [-900, -180],
      disabled: true,
    },
    {
      parameters: { rule: { interval: [{ field: "minutes", minutesInterval: 15 }] } },
      id: "9b67f366-bdc6-4e98-829d-53ed6c228c34",
      name: "Revisar solicitudes urgentes · 15 min",
      type: "n8n-nodes-base.scheduleTrigger",
      typeVersion: 1.2,
      position: [-900, 180],
      disabled: true,
    },
    {
      parameters: {},
      id: "d60cb081-02e1-4e27-9cd5-d846b4d4934c",
      name: "Prueba manual shadow",
      type: "n8n-nodes-base.manualTrigger",
      typeVersion: 1,
      position: [-900, -20],
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
      name: "Leer control editorial del día",
      type: "n8n-nodes-base.dataTable",
      typeVersion: 1,
      position: [-650, -180],
      alwaysOutputData: true,
    },
    {
      parameters: { operation: "get", dataTableId: reviewTable, returnAll: true },
      id: "e2f83bd1-0e78-44a1-8274-3cc4b2d5d9e3",
      name: "Leer solicitudes urgentes",
      type: "n8n-nodes-base.dataTable",
      typeVersion: 1,
      position: [-650, 180],
      alwaysOutputData: true,
    },
    {
      parameters: { jsCode: planDailyCode },
      id: "170e6e84-5398-47ca-8571-75cd2e8f2aa2",
      name: "Construir agenda diaria de 3 temas",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [-390, -180],
    },
    {
      parameters: { jsCode: planUrgentCode },
      id: "3a2ed7cb-1767-43fd-a08f-1932240b60a7",
      name: "Priorizar solicitudes urgentes",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [-390, 180],
    },
    {
      parameters: {
        operation: "upsert",
        dataTableId: reviewTable,
        matchType: "allConditions",
        filters: { conditions: [{ keyName: "review_id", keyValue: "={{ $json.request_id }}" }] },
        columns: {
          mappingMode: "defineBelow",
          value: {
            review_id: "={{ $json.request_id }}",
            content_id: "={{ $json.request_id }}",
            revision: 0,
            title: "={{ $json.title }}",
            publish_date: "={{ $json.publish_date }}",
            scheduled_at: "={{ $json.scheduled_at }}",
            timezone: "={{ $json.timezone }}",
            status: "={{ $json.status }}",
            source_urls_json: "={{ $json.source_urls_json }}",
            evidence_json: "={{ $json.control_evidence_json }}",
            created_at: "={{ $json.created_at }}",
            updated_at: "={{ $json.updated_at }}",
            stage_attempts: "={{ $json.stage_attempts }}",
            last_error: "",
          },
          schema: [
            column("review_id"), column("content_id"), column("revision", "number"), column("title"),
            column("publish_date"), column("scheduled_at"), column("timezone"), column("status"),
            column("source_urls_json"), column("evidence_json"), column("created_at"), column("updated_at"),
            column("stage_attempts", "number"), column("last_error"),
          ],
          matchingColumns: [],
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: {},
      },
      id: "7a911a24-8e5c-43bb-9d28-274f9c17485e",
      name: "Registrar solicitud en proceso",
      type: "n8n-nodes-base.dataTable",
      typeVersion: 1,
      position: [-100, 0],
    },
    {
      parameters: {
        jsCode: `const row=$json??{};let evidence={};try{evidence=JSON.parse(String(row.evidence_json??'{}'));}catch{}const request=evidence.request??{};if(!request.request_id)throw new Error('EDITORIAL_CONTROL_REQUEST_MISSING');return [{json:request}];`,
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
    "Planificar 3 espacios · 05:10 AR": { main: [[{ node: "Leer control editorial del día", type: "main", index: 0 }]] },
    "Prueba manual shadow": { main: [[{ node: "Leer control editorial del día", type: "main", index: 0 }]] },
    "Revisar solicitudes urgentes · 15 min": { main: [[{ node: "Leer solicitudes urgentes", type: "main", index: 0 }]] },
    "Leer control editorial del día": { main: [[{ node: "Construir agenda diaria de 3 temas", type: "main", index: 0 }]] },
    "Leer solicitudes urgentes": { main: [[{ node: "Priorizar solicitudes urgentes", type: "main", index: 0 }]] },
    "Construir agenda diaria de 3 temas": { main: [[{ node: "Registrar solicitud en proceso", type: "main", index: 0 }]] },
    "Priorizar solicitudes urgentes": { main: [[{ node: "Registrar solicitud en proceso", type: "main", index: 0 }]] },
    "Registrar solicitud en proceso": { main: [[{ node: "Restaurar contrato de solicitud", type: "main", index: 0 }]] },
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
    olmondContractVersion: "5.0.0-shadow",
    productionPublishersRequiredState: "PAUSED",
    childWorkflowId: "AAWGjrmZ4SvfkNCO",
  },
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(workflow, null, 2)}\n`, "utf8");
console.log(outputPath);
