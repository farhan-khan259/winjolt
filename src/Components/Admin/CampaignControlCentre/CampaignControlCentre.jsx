import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../../services/api";
import { AdminImage, AdminLayout, DesignFooter, PageHeading, Panel, StatGrid } from "../Shared/AdminLayout";
import "./CampaignControlCentre.css";

const lifecycle = {
  DRAFT: ["Submit for review", "submit-review"], REVIEW_REQUIRED: ["Approve campaign", "approve"],
  APPROVED: ["Schedule campaign", "schedule"], SCHEDULED: ["Publish campaign", "publish"],
  LIVE: ["Pause entries", "pause"], PAUSED: ["Resume entries", "resume"], COMPLETED: ["Archive campaign", "archive"],
};
const localDate = value => value ? new Date(value).toISOString().slice(0,16) : "";

export default function CampaignControlCentre() {
  const [params] = useSearchParams(); const navigate=useNavigate(); const id=params.get("id");
  const [item,setItem]=useState(null); const [loading,setLoading]=useState(true); const [error,setError]=useState(""); const [message,setMessage]=useState(""); const [busy,setBusy]=useState(false);
  const load=useCallback(()=>{setLoading(true);setError("");setItem(null);const direct=id?api.get(`/admin/competitions/${encodeURIComponent(id)}`):api.get("/admin/competitions?limit=1");direct.catch(async requestError=>{if(!id||requestError.status!==404)throw requestError;const result=await api.get("/admin/competitions?limit=100");const campaign=result.items.find(entry=>entry.publicId===id);if(!campaign)throw requestError;return {item:campaign};}).then(result=>{const campaign=result.item||result.items?.[0];if(!campaign)throw new Error("Competition not found. Return to the competition list and select it again.");setItem(campaign);}).catch(requestError=>setError(requestError.message)).finally(()=>setLoading(false));},[id]);
  useEffect(load,[load]);
  const run=async request=>{try{setBusy(true);setError("");setMessage("");const result=await request();setItem(result.item);setMessage("Campaign saved successfully. The action was written to the audit trail.");}catch(requestError){setError(requestError.message);}finally{setBusy(false);}};
  const lifecycleAction=()=>{if(!item)return;const action=lifecycle[item.status]?.[1];if(!action)return;const reason=window.prompt(`Reason for ${action.replace("-"," ")}:`)?.trim();if(!reason)return;if(action==="submit-review")return run(()=>api.post(`/admin/competitions/${item.publicId}/submit-review`,{evidence_ref:reason}));if(action==="approve")return run(()=>api.post(`/admin/competitions/${item.publicId}/approve`,{evidence_ref:reason}));return run(()=>api.post(`/admin/competitions/${item.publicId}/transition/${action}`,{reason}));};
  const save=event=>{event.preventDefault();const values=Object.fromEntries(new FormData(event.currentTarget));run(()=>api.patch(`/admin/competitions/${item.publicId}`,{title:values.title,category:values.category,description:values.description,priceMinor:Math.round(Number(values.price)*100),maxEntriesPerUser:Number(values.userCap),maxEntriesPerOrder:Number(values.orderCap),startsAt:new Date(values.startsAt).toISOString(),closesAt:new Date(values.closesAt).toISOString(),drawAt:new Date(values.drawAt).toISOString(),rulesVersion:values.rulesVersion,rulesText:values.rulesText,freeEntryInstructions:values.freeEntryInstructions,mainPrize:{...item.mainPrize,secured:values.prizeSecured==="on",evidenceRefs:values.prizeEvidence?[values.prizeEvidence]:[]},freeEntryApproved:values.freeEntryApproved==="on",paymentProviderApproved:values.paymentProviderApproved==="on",legalApproved:values.legalApproved==="on",randomnessAuditApproved:values.randomnessAuditApproved==="on",agePolicyApproved:values.agePolicyApproved==="on",reason:values.reason}));};
  if(loading)return <AdminLayout><div className="admin-empty"><strong>Loading campaign…</strong><p>Retrieving the authoritative campaign record.</p></div></AdminLayout>;
  if(!item)return <AdminLayout><PageHeading eyebrow="WINJOLT CONTROL / CAMPAIGN DETAIL" title="Campaign unavailable" subtitle={error||"Choose a campaign from Competition management."} secondary="Back to competitions" secondaryTo="/admin/competitions" primary="Retry" onPrimary={load}/></AdminLayout>;
  const gates=[
    ["Prize verification",item.mainPrize?.secured&&item.mainPrize?.evidenceRefs?.length], ["Competition rules",Boolean(item.rulesText)],
    ["Image gallery",Boolean(item.images?.length)], ["Free-entry route",Boolean(item.freeEntryInstructions)],
    ["Legal approval",item.legalApproved], ["Payment approval",item.paymentProviderApproved],
    ["Randomness audit",item.randomnessAuditApproved], ["Age policy",item.agePolicyApproved],
  ];
  return <AdminLayout>
    <PageHeading eyebrow={`WINJOLT CONTROL / ${item.publicId}`} title={item.title} subtitle="Edit the campaign and perform controlled lifecycle transitions against the live backend." secondary="← Competitions" secondaryTo="/admin/competitions" primary={lifecycle[item.status]?.[0]||"Lifecycle locked"} onPrimary={lifecycle[item.status]?lifecycleAction:undefined} busy={busy}/>
    <StatGrid items={[{label:"STATUS",value:item.status,note:"Authoritative campaign state"},{label:"ENTRY PRICE",value:`£${(item.priceMinor/100).toFixed(2)}`,note:"Current entry price"},{label:"TICKET CAPACITY",value:String(item.ticketRange.end-item.ticketRange.start+1),note:"Immutable allocated range"},{label:"RELEASE GATES",value:`${gates.filter(([,ok])=>ok).length}/${gates.length}`,note:"Required controls complete"}]}/>
    {message&&<div className="admin-action-message" role="status">{message}</div>}{error&&<div className="admin-action-message" role="alert">{error}</div>}
    <div className="two-col control-cols"><Panel title="Campaign configuration" subtitle="Material fields can be changed only in Draft or Review Required states.">
      <div className="campaign-state-row"><span className={`status ${item.status.toLowerCase()}`}>{item.status}</span></div>
      <AdminImage className="campaign-hero" src={item.images?.[0]} alt="Competition prize"/>
      <form onSubmit={save} className="record-fields">
        <label>CAMPAIGN TITLE<input name="title" defaultValue={item.title} required/></label><label>CATEGORY<input name="category" defaultValue={item.category} required/></label>
        <label>ENTRY PRICE (£)<input name="price" type="number" min="0" step="0.01" defaultValue={(item.priceMinor/100).toFixed(2)} required/></label><label>MAX ENTRIES / CUSTOMER<input name="userCap" type="number" min="1" defaultValue={item.maxEntriesPerUser} required/></label>
        <label>MAX ENTRIES / ORDER<input name="orderCap" type="number" min="1" defaultValue={item.maxEntriesPerOrder} required/></label><label>RULES VERSION<input name="rulesVersion" defaultValue={item.rulesVersion} required/></label>
        <label>STARTS<input name="startsAt" type="datetime-local" defaultValue={localDate(item.startsAt)} required/></label><label>CLOSES<input name="closesAt" type="datetime-local" defaultValue={localDate(item.closesAt)} required/></label>
        <label>DRAW TIME<input name="drawAt" type="datetime-local" defaultValue={localDate(item.drawAt)} required/></label><label>CHANGE REASON<input name="reason" placeholder="Required audit reason" required/></label>
        <label className="wide">DESCRIPTION<input name="description" defaultValue={item.description||""}/></label><label className="wide">RULES<input name="rulesText" defaultValue={item.rulesText||""} required/></label><label className="wide">FREE-ENTRY INSTRUCTIONS<input name="freeEntryInstructions" defaultValue={item.freeEntryInstructions||""} required/></label>
        <label className="wide">PRIZE OWNERSHIP EVIDENCE REFERENCE<input name="prizeEvidence" defaultValue={item.mainPrize?.evidenceRefs?.[0]||""} placeholder="Invoice, supplier agreement or asset reference" required/></label>
        <label><input name="prizeSecured" type="checkbox" defaultChecked={item.mainPrize?.secured}/> PRIZE LEGALLY SECURED</label><label><input name="freeEntryApproved" type="checkbox" defaultChecked={item.freeEntryApproved}/> FREE-ENTRY ROUTE APPROVED</label>
        <label><input name="paymentProviderApproved" type="checkbox" defaultChecked={item.paymentProviderApproved}/> PAYMENT PROCESS APPROVED</label><label><input name="legalApproved" type="checkbox" defaultChecked={item.legalApproved}/> RULES / LEGAL REVIEW APPROVED</label>
        <label><input name="randomnessAuditApproved" type="checkbox" defaultChecked={item.randomnessAuditApproved}/> RANDOMNESS CONTROL APPROVED</label><label><input name="agePolicyApproved" type="checkbox" defaultChecked={item.agePolicyApproved}/> AGE POLICY APPROVED</label>
        <button className="btn primary" type="submit" disabled={busy||!["DRAFT","REVIEW_REQUIRED"].includes(item.status)}>Save campaign changes</button>
      </form>
    </Panel><Panel className="campaign-readiness-panel" title="Campaign readiness" subtitle="Every gate must be complete before independent approval.">
      <div className="requirement-list">{gates.map(([label,ok])=><div key={label}><strong>{ok?"✓":"○"} {label}</strong><span>{ok?"Complete":"Evidence or approval required"}</span></div>)}</div>
      <div className="publication-sequence"><strong>Publication sequence</strong><ol><li>Save all evidence and approval gates.</li><li>Submit the draft for review.</li><li>A different authorised staff account approves it.</li><li>Schedule the approved campaign.</li><li>Publish it. Only then does it appear publicly.</li></ol></div>
      <div className="readiness-actions"><button className="btn secondary" type="button" onClick={()=>navigate(`/admin/competition-instant-wins?id=${item.publicId}`)}>Configure instant wins</button></div>
    </Panel></div><DesignFooter/>
  </AdminLayout>;
}
