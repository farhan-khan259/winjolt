import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { AccountNav, PageShell } from "../CommonPages/CommonPages";
import "./MyEntries.css";
export default function MyEntries(){
  const [items,setItems]=useState([]); const [error,setError]=useState("");
  useEffect(()=>{api.get("/accounts/tickets").then((result)=>setItems(result.items)).catch((requestError)=>setError(requestError.message));},[]);
  return <PageShell className="entries-page" eyebrow="MY WINJOLT / MY ENTRIES" title="MY ENTRIES" subtitle="View your entries, ticket numbers and committed results."><section className="info-content dashboard-layout"><AccountNav active="entries"/><div className="account-page-panel"><small>YOUR COMPETITION ACTIVITY</small><h2>MY ENTRIES</h2>{error&&<p role="alert">{error}</p>}{items.length===0?<p>No entries are available yet.</p>:items.map((item)=><article className="info-note" key={item.publicId}><b>{item.competition?.title}</b><p>Ticket {String(item.number).padStart(5,"0")} · {item.sourceRoute} · {item.status}</p><p>Instant result: {item.instantResult?.status || "Not enabled"}</p></article>)}</div></section></PageShell>;
}
