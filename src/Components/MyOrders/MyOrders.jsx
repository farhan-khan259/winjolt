import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { AccountNav, Action, PageShell } from "../CommonPages/CommonPages";
import "./MyOrders.css";
export default function MyOrders(){
  const [items,setItems]=useState([]); const [filter,setFilter]=useState("all"); const [error,setError]=useState("");
  useEffect(()=>{api.get("/accounts/orders").then((result)=>setItems(result.items)).catch((requestError)=>setError(requestError.message));},[]);
  const visible=items.filter((item)=>filter==="all"||item.status.toLowerCase().includes(filter));
  return <PageShell eyebrow="MY WINJOLT / ORDER HISTORY" title="ORDER HISTORY" subtitle="Review purchases, authoritative payment status and receipts." className="my-orders-page"><section className="info-content dashboard-layout my-orders-content"><AccountNav active="orders"/><div className="orders-panel"><div className="orders-heading"><div><small>YOUR PURCHASES</small><h2>ORDER HISTORY</h2></div><label><span>FILTER ORDERS</span><select value={filter} onChange={(event)=>setFilter(event.target.value)}><option value="all">All orders</option><option value="issued">Tickets issued</option><option value="awaiting">Awaiting provider</option><option value="refunded">Refunded</option></select></label></div>{error&&<p role="alert">{error}</p>}<div className="orders-table" role="table"><div className="orders-table-head" role="row"><span>ORDER</span><span>DATE</span><span>ITEMS</span><span>TOTAL</span><span>STATUS</span></div>{visible.length===0?<div className="orders-empty"><h3>NO ORDERS YET</h3><Action href="/competitions">EXPLORE COMPETITIONS</Action></div>:visible.map((item)=><div className="orders-table-head" role="row" key={item.publicId}><span>{item.publicId}</span><span>{new Date(item.createdAt).toLocaleDateString("en-GB")}</span><span>{item.lineItems?.[0]?.quantity||0}</span><span>£{(item.amountMinor/100).toFixed(2)}</span><span>{item.status}</span></div>)}</div></div></section></PageShell>;
}
