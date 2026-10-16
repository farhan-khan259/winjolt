import { useEffect, useState } from "react";
import { Action, PageShell } from "../CommonPages/CommonPages";
import { api } from "../../services/api";
import "./OrderConfirmation.css";

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null); const [error, setError] = useState("");
  useEffect(() => {
    let stored = {}; try { stored = JSON.parse(sessionStorage.getItem("winjolt-order") || "{}"); } catch {}
    if (!stored.order_id) { setError("No order reference was found."); return; }
    let attempts = 0; let timer;
    const load = () => api.get(`/orders/${stored.order_id}`).then(({ item }) => { setOrder({ ...stored, ...item }); if (item.status !== "TICKETS_ISSUED" && attempts++ < 10) timer = window.setTimeout(load, 2000); }).catch((requestError) => setError(requestError.message));
    load(); return () => window.clearTimeout(timer);
  }, []);
  const confirmed = order?.status === "TICKETS_ISSUED";
  return <PageShell className="confirmation-page" eyebrow="ORDER CONFIRMATION" title="ORDER CONFIRMATION" subtitle="Verified order and ticket status.">
    <section className="info-content confirmation-content"><div className="checkout-steps"><span>1 · BASKET</span><span>2 · DETAILS</span><span>3 · PAYMENT</span><span className="active">4 · CONFIRMATION</span></div>
      <article className="confirmation-card"><div className="confirmation-mark" aria-hidden="true">{confirmed ? "✓" : "…"}</div><p className="confirmation-kicker">{confirmed ? "ORDER CONFIRMED" : "VERIFYING PROVIDER SETTLEMENT"}</p>
        <h2>{confirmed ? `THANK YOU${order.name ? `, ${order.name.toUpperCase()}` : ""}` : "PLEASE WAIT"}</h2><p>{confirmed ? "Your payment was verified and your exact competition tickets were issued." : "A browser redirect is not payment proof. We are waiting for the signed provider confirmation before issuing tickets."}</p>
        {error && <p role="alert">{error}</p>}
        {order && <div className="confirmation-details"><div><span>ORDER REFERENCE</span><strong>{order.publicId || order.order_id}</strong></div><div><span>PAYMENT STATUS</span><strong>{order.status}</strong></div><div><span>EMAIL</span><strong>{order.email || "Account email"}</strong></div><div><span>ORDER TOTAL</span><strong>£{((order.amountMinor || order.amount_minor || 0) / 100).toFixed(2)}</strong></div>{order.tickets?.length > 0 && <div><span>TICKET NUMBERS</span><strong>{order.tickets.map((ticket) => String(ticket.number).padStart(5, "0")).join(", ")}</strong></div>}</div>}
        <div className="confirmation-actions"><Action href="/competitions">RETURN TO COMPETITIONS</Action><Action outline href="/my-orders">VIEW MY ORDERS</Action></div>
      </article></section>
  </PageShell>;
}
