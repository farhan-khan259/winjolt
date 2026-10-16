import { useMemo, useState } from "react";
import { api } from "../../services/api";
import { Action, PageShell } from "../CommonPages/CommonPages";
import "./SecureCheckout.css";
export default function SecureCheckout() {
  const basket = useMemo(() => { try { return JSON.parse(localStorage.getItem("winjoltBasket") || "{}"); } catch { return {}; } }, []);
  const [error, setError] = useState(""); const [submitting, setSubmitting] = useState(false);

  const continueToPayment = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      setSubmitting(true); setError("");
      sessionStorage.setItem("winjolt-checkout", JSON.stringify({ name: form.get("name"), email: form.get("email"), postcode: form.get("postcode") }));
      const order = await api.post("/orders", { reservation_id: basket.reservationId }, { headers: { "Idempotency-Key": api.idempotencyKey() } });
      sessionStorage.setItem("winjolt-order", JSON.stringify({ ...order, name: form.get("name"), email: form.get("email") }));
      if (!order.checkout_url) throw new Error("Checkout is disabled until the approved payment provider is configured.");
      window.location.assign(order.checkout_url);
    } catch (requestError) { setError(requestError.message); setSubmitting(false); }
  };

  return (
    <PageShell
      preview
      className="checkout-page"
      eyebrow="COMPETITIONS"
      title="SECURE CHECKOUT"
      subtitle="Complete your details and payment securely."
    >
      <section className="info-content">
        <div className="checkout-steps">
          <span>1 · BASKET</span>
          <span className="active">2 · DETAILS</span>
          <span>3 · PAYMENT</span>
          <span>4 · CONFIRMATION</span>
        </div>
        <div className="two-column checkout-layout">
          <form className="checkout-box" onSubmit={continueToPayment}>
            <h2>YOUR DELIVERY &amp; CONTACT DETAILS</h2>
            <div className="checkout-fields">
              {[
                ["FULL NAME", "Enter full name", "name", "text"], 
                ["EMAIL ADDRESS", "Enter email address", "email", "email"],
                ["CONTACT NUMBER", "Mobile telephone", "phone", "tel"],
                ["POSTCODE", "UK postcode", "postcode", "text"],
                ["ADDRESS", "Address line 1", "address", "text"],
              ].map(([l, p, name, type], i) => (
                <label
                  className={`form-field${i === 4 ? " wide" : ""}`}
                  key={l}
                >
                  {l}
                  <input name={name} type={type} placeholder={p} required />
                </label>
              ))}
            </div>
            <div className="info-note">
              <b>18+ AND ELIGIBILITY</b>
              <br />
              Age verification, entry caps and competition-specific rules are
              are applied securely before payment.
            </div>
            <label className="checkbox-row">
              <input type="checkbox" required />I have read the competition
              terms and confirm that my details are correct.
            </label>
            <hr />
            {error && <div className="info-note" role="alert">{error}</div>}
            <button className="checkout-continue" type="submit" disabled={submitting}>{submitting ? "OPENING SECURE PAYMENT…" : "CONTINUE TO SECURE PAYMENT →"}</button>
          </form>
          <aside className="summary-box">
            <h2>YOUR ORDER SUMMARY</h2>
            <p>{basket.title || "Your basket is empty."}</p>
            <p className="summary-line">
              <b>Subtotal</b>
              <span>£{((basket.quantity || 0) * (basket.unitPriceMinor || 0) / 100).toFixed(2)}</span>
            </p>
            <p className="summary-line">
              <b>Actual charge</b>
              <span>Calculated by the server</span>
            </p>
            <hr />
            <p>
              🔒 Card details are collected only by the approved payment provider. WinJolt never receives raw card data.
            </p>
            <Action outline href="/free-entry">
              FREE ENTRY RULES
            </Action>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
