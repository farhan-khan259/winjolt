import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { PageShell } from "../CommonPages/CommonPages";
import "./PaymentStatus.css";

export default function PaymentStatus() {
  const [order, setOrder] = useState(null); const [error, setError] = useState("");
  useEffect(() => {
    let stored = {}; try { stored = JSON.parse(sessionStorage.getItem("winjolt-order") || "{}"); } catch {}
    if (!stored.order_id) { setError("No checkout session was found."); return; }
    api.get(`/orders/${stored.order_id}`).then(({ item }) => setOrder(item)).catch((requestError) => setError(requestError.message));
  }, []);
  return <PageShell className="payment-page" eyebrow="PAYMENT STATUS" title="PAYMENT STATUS" subtitle="Authoritative provider and ticket status.">
    <section className="info-content payment-content"><article className="checkout-box payment-box">
      <p className="payment-kicker">SECURE CHECKOUT</p><h2>{order?.status || "CHECKING PAYMENT…"}</h2>
      <div className="demo-payment-notice"><b>SERVER-VERIFIED STATUS</b><span>Tickets are issued only after a signed payment-provider webhook confirms settlement.</span></div>
      {error && <p role="alert">{error}</p>}
      {order && <p>Order {order.publicId} · £{(order.amountMinor / 100).toFixed(2)} {order.currency}</p>}
      <Link className="payment-submit" to="/my-orders">VIEW MY ORDERS →</Link>
    </article></section>
  </PageShell>;
}
