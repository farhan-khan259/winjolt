import { useMemo } from "react";
import { Action, PageShell } from "../CommonPages/CommonPages";
import "./OrderConfirmation.css";
export default function OrderConfirmation() {
  const order = useMemo(() => {
    try { return JSON.parse(sessionStorage.getItem("winjolt-order")) || {}; }
    catch { return {}; }
  }, []);

  return (
    <PageShell
      preview
      className="confirmation-page"
      eyebrow="ORDER CONFIRMATION"
      title="ORDER CONFIRMATION"
      subtitle="Your checkout is complete."
    >
      <section className="info-content confirmation-content">
        <div className="checkout-steps">
          <span>1 · BASKET</span><span>2 · DETAILS</span><span>3 · PAYMENT</span><span className="active">4 · CONFIRMATION</span>
        </div>
        <article className="confirmation-card">
          <div className="confirmation-mark" aria-hidden="true">✓</div>
          <p className="confirmation-kicker">ORDER CONFIRMED</p>
          <h2>THANK YOU{order.name ? `, ${order.name.toUpperCase()}` : ""}</h2>
          <p>Your payment was processed and your competition entries have been confirmed.</p>
          <div className="confirmation-details">
            <div><span>ORDER REFERENCE</span><strong>{order.reference || "WJ-ORDER"}</strong></div>
            <div><span>PAYMENT STATUS</span><strong>PAYMENT CONFIRMED</strong></div>
            <div><span>EMAIL</span><strong>{order.email || "Not provided"}</strong></div>
            <div><span>ORDER TOTAL</span><strong>£0.00</strong></div>
          </div>
          <div className="confirmation-actions"><Action href="/competitions">RETURN TO COMPETITIONS</Action><Action outline href="/my-orders">VIEW MY ORDERS</Action></div>
        </article>
      </section>
    </PageShell>
  );
}
