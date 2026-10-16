import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../../services/api";
import { AdminLayout, DesignFooter, FilterBar, PageHeading, Panel, StatGrid } from "./AdminLayout";
import "./AdminPatterns.css";

export function Steps({ items }) { return <div className="admin-steps">{items.map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><strong>{x}</strong></div>)}</div>; }
export function SoftItems({ items }) { return <div className="soft-list">{items.map(x=><div className="soft-row" key={x[0] || x}><strong>{Array.isArray(x)?x[0]:x}</strong>{Array.isArray(x)&&<p>{x[1]}</p>}</div>)}</div>; }

const endpoints = {
  "/admin/entries-tickets":"/admin/tickets", "/admin/free-entry-processing":"/admin/free-entries", "/admin/draws-results":"/admin/draws",
  "/admin/orders-payments":"/admin/orders", "/admin/prize-inventory":"/admin/prizes", "/admin/winners-claims":"/admin/claims",
  "/admin/customers":"/admin/customers", "/admin/support-complaints":"/admin/support-cases", "/admin/analytics":"/admin/analytics",
  "/admin/website-content":"/admin/content", "/admin/staff-permissions":"/admin/staff", "/admin/audit-compliance":"/admin/audit-events",
  "/admin/instant-wins":"/admin/instant-results",
  "/admin/settings":"/admin/settings",
};
const creationPaths = new Set(["/admin/prize-inventory", "/admin/staff-permissions", "/admin/website-content", "/admin/support-complaints"]);
const ask = (message, initial = "") => window.prompt(message, initial)?.trim();
const recordLabel = item => item._label || item.title || item.publicId || item.eventType || item.email || item.key || item.status || "Operational record";
const recordDetail = item => item._detail || [item.status,item.category,item.sourceRoute,item.type,item.amountMinor!=null?`£${(item.amountMinor/100).toFixed(2)}`:null,item.createdAt?new Date(item.createdAt).toLocaleString("en-GB"):null].filter(Boolean).join(" · ");

export function StandardAdminPage({ heading, stats, filters, mainTitle, mainSubtitle, tabs, empty, details=[], sideTitle, sideSubtitle="Approval gates and controls for the production system", sideItems=[], children }) {
  const { pathname } = useLocation(); const navigate=useNavigate(); const [params] = useSearchParams();
  const [records,setRecords] = useState(null); const [loadError,setLoadError] = useState(""); const [message,setMessage] = useState(""); const [busy,setBusy] = useState(false); const [reload,setReload] = useState(0);
  const endpoint = endpoints[pathname];
  const load = useCallback(() => { if (!endpoint) return; setLoadError(""); const query=new URLSearchParams({limit:"100"}); const q=params.get("q"); if(q) query.set("q",q); if(reload) query.set("refresh",String(reload)); api.get(`${endpoint}?${query}`).then(result=>setRecords(result.items||result)).catch(error=>setLoadError(error.message)); },[endpoint,params,reload]);
  useEffect(load,[load]);
  const list=useMemo(()=>Array.isArray(records)?records:records&&typeof records==="object"?Object.entries(records).map(([key,value])=>({_label:key.replaceAll("_"," "),_detail:typeof value==="string"?value:JSON.stringify(value)})):[],[records]);
  const filtered=useMemo(()=>{const q=(params.get("q")||"").toLowerCase();const selected=[...params.entries()].filter(([key,value])=>key.startsWith("filter")&&value).map(([,value])=>value.toLowerCase());return list.filter(item=>{const text=JSON.stringify(item).toLowerCase();return(!q||text.includes(q))&&selected.every(value=>text.includes(value));});},[list,params]);
  const mutate=async(request,success)=>{try{setBusy(true);setMessage("");await request();setMessage(success);setReload(value=>value+1);}catch(error){setMessage(error.message);}finally{setBusy(false);}};
  const reason=label=>ask(`${label}\n\nEnter the required operational reason:`);
  const actOn=(item,action)=>{
    if(action==="approve-free"||action==="reject-free"){const why=reason(action==="approve-free"?"Approve free-entry application":"Reject free-entry application");if(why)mutate(()=>api.post(`/admin/free-entries/${item.publicId}/review`,{decision:action==="approve-free"?"APPROVED":"REJECTED",reason_code:why}),"Free-entry decision saved.");}
    if(action==="refund"){const why=reason("Create payment refund");if(why&&window.confirm("Submit this refund to the configured payment provider?"))mutate(()=>api.post(`/admin/orders/${item.publicId}/refund`,{reason:why}),"Refund request processed.");}
    if(action==="claim"){const status=ask("New claim status: IDENTITY_REVIEW, ACCEPTED, DISPATCHED, COLLECTION_SCHEDULED, FULFILLED, DISPUTED or FAILED_DELIVERY",item.status);const why=status&&reason("Update winner claim");if(why)mutate(()=>api.patch(`/admin/claims/${item.publicId}`,{status,reason:why}),"Claim updated.");}
    if(action==="verify-prize"){const why=reason("Verify prize evidence");if(why)mutate(()=>api.post(`/admin/prizes/${item.publicId}/verify`,{reason:why}),"Prize verified.");}
    if(action==="support"){const status=ask("New case status: OPEN, IN_REVIEW, AWAITING_CUSTOMER, RESOLVED, CLOSED or APPEALED",item.status);const why=status&&reason("Update support case");if(why)mutate(()=>api.patch(`/admin/support-cases/${item.publicId}`,{status,reason:why}),"Support case updated.");}
    if(action==="customer"){const status=ask("New customer status: ACTIVE, SUSPENDED, SELF_EXCLUDED or REVOKED",item.status);const why=status&&reason("Change customer access");if(why)mutate(()=>api.patch(`/admin/customers/${item.publicId}`,{status,reason:why}),"Customer status updated.");}
    if(action==="customer-profile")navigate(`/admin/customer-profile?id=${encodeURIComponent(item.publicId)}`);
    if(action==="age-check")navigate(`/admin/automatic-age-checks?id=${encodeURIComponent(item.publicId)}`);
    if(action==="staff"){const status=item.status==="ACTIVE"?"REVOKED":"ACTIVE";const why=reason(`${status==="ACTIVE"?"Restore":"Revoke"} staff access`);if(why)mutate(()=>api.patch(`/admin/staff/${item.publicId}`,{status,reason:why}),"Staff access updated.");}
    if(action==="content"){const status=ask("New content status: REVIEW, PUBLISHED or ARCHIVED",item.status);const why=status&&reason("Change content publication state");if(why)mutate(()=>api.patch(`/admin/content/${item._id}`,{status,reason:why}),"Content state updated.");}
    if(action==="execute-draw"&&window.confirm("Execute this locked draw now?"))mutate(()=>api.post(`/admin/draws/${item.publicId}/execute`,{}),"Draw executed and immutable result recorded.");
    if(action==="verify-draw"){const evidence=ask("Independent verification evidence reference:");if(evidence)mutate(()=>api.post(`/admin/draws/${item.publicId}/verify`,{evidence_ref:evidence}),"Draw independently verified.");}
    if(action==="publish-draw"&&window.confirm("Publish this verified draw result to customers?"))mutate(()=>api.post(`/admin/draws/${item.publicId}/publish`,{}),"Draw result published.");
  };
  const actionsFor=item=>{
    if(pathname==="/admin/free-entry-processing"&&["REVIEW_REQUIRED","APPEALED"].includes(item.status))return [["Approve","approve-free"],["Reject","reject-free"]];
    if(pathname==="/admin/orders-payments"&&item.status==="TICKETS_ISSUED")return [["Refund","refund"]];
    if(pathname==="/admin/winners-claims"&&item.status!=="FULFILLED")return [["Update claim","claim"]];
    if(pathname==="/admin/prize-inventory"&&item.status==="VERIFICATION_REQUIRED")return [["Verify evidence","verify-prize"]];
    if(pathname==="/admin/support-complaints"&&item.status!=="CLOSED")return [["Update case","support"]];
    if(pathname==="/admin/customers")return [["Open Customer 360° Profile","customer-profile"],["Open Automatic 18+ Age Checks","age-check"],["Change status","customer"]];
    if(pathname==="/admin/staff-permissions")return [[item.status==="ACTIVE"?"Revoke":"Restore","staff"]];
    if(pathname==="/admin/website-content")return [["Change status","content"]];
    if(pathname==="/admin/draws-results"){if(item.status==="LEDGER_LOCKED")return [["Execute draw","execute-draw"]];if(item.status==="DRAW_EXECUTED")return [["Verify result","verify-draw"]];if(item.status==="INDEPENDENTLY_VERIFIED")return [["Publish result","publish-draw"]];}
    return [];
  };
  const create=()=>{
    if(pathname==="/admin/prize-inventory"){const title=ask("Prize title:");const kind=title&&ask("Prize kind: CASH, VEHICLE, ELECTRONICS, TOOLS, VOUCHER, PHYSICAL, SERVICE, WEBSITE_CREDIT or OTHER","OTHER");const quantity=kind&&Number(ask("Quantity:","1"));const evidence=quantity&&ask("Ownership evidence reference (optional; add one to request verification):");if(title&&kind&&quantity)mutate(()=>api.post("/admin/prizes",{title,kind,quantity,currency:"GBP",evidence_refs:evidence?[evidence]:[]}),"Prize added to inventory.");}
    if(pathname==="/admin/staff-permissions"){const email=ask("Reviewer email:");const firstName=email&&ask("First name:");const lastName=firstName&&ask("Last name:");const password=lastName&&ask("Temporary password (10+ characters):");if(password)mutate(()=>api.post("/admin/staff",{email,password,first_name:firstName,last_name:lastName,roles:["COMPETITION_REVIEWER"],permissions:["dashboard:read","competition:read","competition:edit","competition:submit","competition:approve","competition:transition","audit:read"]}),"Reviewer account created. Share credentials securely; the reviewer must use MFA when approving.");}
    if(pathname==="/admin/website-content"){const key=ask("Content key (for example homepage-banner):");const title=key&&ask("Content title:");const body=title&&ask("Content body:");if(body)mutate(()=>api.post("/admin/content",{key,title,body}),"Content draft created.");}
    if(pathname==="/admin/support-complaints"){const email=ask("Customer email:");const name=email&&ask("Customer name:");const message=name&&ask("Case summary:");if(message)mutate(()=>api.post("/support-cases",{email,name,message,type:"ENQUIRY",category:"ADMIN_CREATED"}),"Support case created.");}
  };
  const openClaimsWorkflow=()=>{setReload(value=>value+1);setMessage(list.length?"Claims refreshed. Select Update claim on a record to continue its workflow.":"No claim is available yet. A claim is created automatically after a verified draw or instant-win result awards a real prize.");window.setTimeout(()=>document.querySelector(".standard-cols")?.scrollIntoView({behavior:"smooth",block:"start"}),0);};
  const primaryAction=creationPaths.has(pathname)?create:pathname==="/admin/winners-claims"?openClaimsWorkflow:heading.onPrimary;
  const displayedStats=stats.map((item,index)=>({...item,value:records===null&&endpoint?"…":endpoint&&index===0?String(filtered.length):item.value,note:endpoint&&index===0?"Authoritative records returned":item.note}));
  return <AdminLayout><PageHeading {...heading} busy={busy} onPrimary={primaryAction}/><StatGrid items={displayedStats}/>{filters!==false&&<FilterBar filters={filters}/>} {message&&<div className="admin-action-message" role="status">{message}</div>}<div className="two-col standard-cols"><Panel title={mainTitle} subtitle={mainSubtitle}>{tabs&&<div className="admin-tabs">{tabs.map(x=><span key={x}>{x}</span>)}</div>}{records===null&&endpoint&&<div className="admin-empty"><strong>Loading authoritative records…</strong></div>}{loadError&&<div className="admin-empty"><strong>Backend unavailable</strong><p>{loadError}</p><button className="admin-record-action" onClick={()=>setReload(value=>value+1)}>Retry</button></div>}{filtered.length>0&&<div className="detail-list">{filtered.map((item,index)=><div className="admin-record-row" key={item.publicId||item._id||index}><span><strong>{recordLabel(item)}</strong><small>{recordDetail(item)||"Authoritative backend record"}</small></span>{actionsFor(item).length>0&&<span className="admin-record-actions">{actionsFor(item).map(([label,action])=><button key={action} type="button" disabled={busy} onClick={()=>actOn(item,action)}>{label}</button>)}</span>}</div>)}</div>}{records&&filtered.length===0&&empty&&<div className="admin-empty"><strong>{empty[0]}</strong><p>{empty[1]}</p></div>}{!endpoint&&empty&&<div className="admin-empty"><strong>{empty[0]}</strong><p>{empty[1]}</p></div>}{children}{details.length>0&&<div className="detail-list">{details.map(x=><div key={x[0]}><strong>{x[0]}</strong><span>{x[1]}</span></div>)}</div>}</Panel><Panel title={sideTitle} subtitle={sideSubtitle}><SoftItems items={sideItems}/></Panel></div><DesignFooter/></AdminLayout>;
}

export function RecordReviewPage({ heading, notice, fields, reviews }) { const navigate=useNavigate(); const title=heading.title.toLowerCase(); const target=title.includes("payment")?"/admin/orders-payments":title.includes("customer")?"/admin/customers":title.includes("complaint")?"/admin/support-complaints":title.includes("prize")?"/admin/prize-inventory":title.includes("draw")?"/admin/draws-results":"/admin/competitions"; return <AdminLayout><PageHeading {...heading} primary="Open live records" onPrimary={()=>navigate(target)}/><div className="record-notice"><strong>● &nbsp; REVIEW REQUIRED</strong><span>{notice}</span></div><div className="two-col record-cols"><Panel title="RECORD DETAILS" subtitle="This preview documents the required fields; changes are performed in the live record list."><div className="record-fields">{fields.map(([label,value])=><label key={label}>{label}<input type="text" aria-label={label} value={value} readOnly/></label>)}</div></Panel><Panel title="REVIEW & AUTHORISATION" subtitle="Track reviewers, evidence and outstanding controls"><SoftItems items={reviews.map((x,i)=>[`${String(i+1).padStart(2,"0")}  ${x}`,"Pending · Requires evidence and permitted reviewer"])}/></Panel></div><Panel className="history-panel" title="Record history & evidence" subtitle="All edits, authorisations and status changes include actor, timestamp and immutable evidence."><div className="history-line">Select a live record to view its current audit history.</div></Panel></AdminLayout>; }
