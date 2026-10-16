import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { AccountNav, Action, PageShell } from "../CommonPages/CommonPages";
import "./MyPrizes.css";
export default function MyPrizes(){
  const [items,setItems]=useState([]); const [error,setError]=useState("");
  useEffect(()=>{api.get("/accounts/claims").then((result)=>setItems(result.items)).catch((requestError)=>setError(requestError.message));},[]);
  return <PageShell eyebrow="MY WINJOLT / MY PRIZES" title="MY PRIZES" subtitle="Prize claim and fulfilment records." className="my-prizes-page"><section className="info-content dashboard-layout my-prizes-content"><AccountNav active="prizes"/><div className="account-page-panel"><small>YOUR REWARDS</small><h2>MY PRIZES</h2>{error&&<p role="alert">{error}</p>}{items.length===0?<p>No prizes are available yet.</p>:items.map((item)=><article className="info-note" key={item.publicId}><b>{item.prizeTitle}</b><p>{item.status} · Ticket {item.ticket?.number}</p>{["AWARDED","CUSTOMER_NOTIFIED"].includes(item.status)&&<Action href={`/claim-a-prize?claim=${item.publicId}`}>CLAIM PRIZE</Action>}</article>)}</div></section></PageShell>;
}
