import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../../services/api";
import { AdminLayout, PageHeading, Panel, StatGrid } from "../Shared/AdminLayout";
import "./CustomerProfile.css";

const value = (input) => input == null || input === "" ? "Not provided" : String(input);
const dateValue = (input) => {
  if (!input) return "Not available";
  const date = new Date(input);
  return Number.isNaN(date.getTime()) ? "Not available" : date.toLocaleString("en-GB");
};

export default function CustomerProfile() {
  const [params] = useSearchParams(); const navigate = useNavigate(); const id = params.get("id");
  const [data,setData]=useState(null); const [error,setError]=useState(""); const [loading,setLoading]=useState(Boolean(id));
  useEffect(()=>{if(!id)return;setLoading(true);setError("");api.get(`/admin/customers/${encodeURIComponent(id)}`).catch(async requestError=>{if(requestError.status!==404)throw requestError;const directory=await api.get("/admin/customers?limit=100");const item=directory.items.find(customer=>customer.publicId===id);if(!item)throw requestError;return {item,metrics:{tickets:0,orders:0,free_entries:0,claims:0,support_cases:0},limited:true};}).then(setData).catch(requestError=>setError(requestError.message)).finally(()=>setLoading(false));},[id]);
  if(!id)return <AdminLayout><PageHeading eyebrow="WINJOLT CONTROL / PRIVATE CUSTOMER VIEW" title="Choose a customer" subtitle="Open this page from a customer record to view its authoritative profile." secondary="← Customers" secondaryTo="/admin/customers"/><div className="admin-empty"><strong>No customer selected</strong><p>Use Open Customer 360° Profile from the customer directory.</p></div></AdminLayout>;
  if(loading)return <AdminLayout><div className="admin-empty"><strong>Loading customer profile…</strong></div></AdminLayout>;
  if(error||!data)return <AdminLayout><PageHeading eyebrow="WINJOLT CONTROL / PRIVATE CUSTOMER VIEW" title="Customer unavailable" subtitle={error||"Customer not found."} secondary="← Customers" secondaryTo="/admin/customers"/></AdminLayout>;
  const {item,metrics}=data;
  const fields=[["ACCOUNT ID",item.publicId],["CUSTOMER",`${value(item.firstName)} ${value(item.lastName)}`],["EMAIL",value(item.email)],["PHONE",value(item.phone)],["ACCOUNT STATUS",value(item.status)],["EMAIL VERIFIED",item.emailVerified?"Yes":"No"],["DOB AGE GATE",value(item.dobGateStatus)],["ASSURANCE STATUS",value(item.assuranceStatus)],["MARKETING CONSENT",item.marketingConsent?"Granted":"Not granted"],["RESTRICTIONS",item.restrictions?.join(", ")||"None"],["REGISTERED",dateValue(item.createdAt)],["LAST UPDATED",dateValue(item.updatedAt)]];
  return <AdminLayout>
    <PageHeading eyebrow="WINJOLT CONTROL / PRIVATE CUSTOMER VIEW" title="Customer 360° profile" subtitle={`${item.firstName} ${item.lastName} · ${item.publicId}`} secondary="← Customers" secondaryTo="/admin/customers" primary="Open Automatic 18+ Age Checks" onPrimary={()=>navigate(`/admin/automatic-age-checks?id=${encodeURIComponent(item.publicId)}`)}/>
    <StatGrid items={[{label:"TICKETS",value:String(metrics.tickets),note:"Issued entries"},{label:"ORDERS",value:String(metrics.orders),note:"Customer orders"},{label:"FREE ENTRIES",value:String(metrics.free_entries),note:"Submitted applications"},{label:"CLAIMS / SUPPORT",value:`${metrics.claims} / ${metrics.support_cases}`,note:"Prize claims / support cases"}]}/>
    <div className="record-notice"><strong>● &nbsp; RESTRICTED CUSTOMER DATA</strong><span>{data.limited?"Basic customer record loaded. Restart the backend to enable linked activity totals and address data.":"Access is permission-controlled; use only for legitimate customer operations."}</span></div>
    <div className="two-col record-cols"><Panel title="ACCOUNT & IDENTITY" subtitle="Authoritative customer record from MongoDB"><div className="record-fields">{fields.map(([label,fieldValue])=><label key={label}>{label}<input value={fieldValue} readOnly/></label>)}</div></Panel><Panel title="POSTAL ADDRESS" subtitle="Visible only to authorised staff"><div className="detail-list">{item.address?Object.entries(item.address).filter(([,fieldValue])=>fieldValue).map(([label,fieldValue])=><div key={label}><strong>{label.replaceAll(/([A-Z])/g," $1").toUpperCase()}</strong><span>{fieldValue}</span></div>):<div><strong>Address unavailable</strong><span>PII permission may be required.</span></div>}</div></Panel></div>
  </AdminLayout>;
}
