import { useNavigate } from "react-router-dom";
import { Action, PageShell } from "../CommonPages/CommonPages";
import "./SecureCheckout.css";
export default function SecureCheckout() {
  const navigate = useNavigate();

  const continueToPayment = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    sessionStorage.setItem("winjolt-checkout", JSON.stringify({
      name: form.get("name"),
      email: form.get("email"),
      postcode: form.get("postcode"),
    }));
    navigate("/payment-status");
  };

  return (
    <PageShell
      preview
      className="checkout-page"
      eyebrow="COMPETITIONS"
      title="SECURE CHECKOUT"
      subtitle="A proposed customer checkout layout. Payment submission is deliberately disabled."
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
                ["EMAIL ADDRESS", "you@example.com", "email", "email"],
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
              required before any real payment.
            </div>
            <label className="checkbox-row">
              <input type="checkbox" required />I have read the demonstration competition
              terms and understand that no entry or purchase occurs.
            </label>
            <hr />
            <button className="checkout-continue" type="submit">CONTINUE TO PAYMENT →</button>
          </form>
          <aside className="summary-box">
            <h2>YOUR DEMO SUMMARY</h2>
            <p>Your basket is currently empty.</p>
            <p className="summary-line">
              <b>Example subtotal</b>
              <span>£0.00</span>
            </p>
            <p className="summary-line">
              <b>Actual charge</b>
              <span>£0.00</span>
            </p>
            <hr />
            <p>
              🔒 Real payment processing requires separate integration, provider
              approval and server-side ticket allocation.
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
