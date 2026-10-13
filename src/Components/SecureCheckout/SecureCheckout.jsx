import { Action, PageShell } from "../CommonPages/CommonPages";
import "./SecureCheckout.css";
export default function SecureCheckout() {
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
          <form className="checkout-box" onSubmit={(e) => e.preventDefault()}>
            <h2>YOUR DELIVERY &amp; CONTACT DETAILS</h2>
            <div className="checkout-fields">
              {[
                ["FULL NAME", "Enter full name"], 
                ["EMAIL ADDRESS", "you@example.com"],
                ["CONTACT NUMBER", "Mobile telephone"],
                ["POSTCODE", "UK postcode"],
                ["ADDRESS", "Address line 1"],
              ].map(([l, p], i) => (
                <label
                  className={`form-field${i === 4 ? " wide" : ""}`}
                  key={l}
                >
                  {l}
                  <input placeholder={p} />
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
              <input type="checkbox" />I have read the demonstration competition
              terms and understand that no entry or purchase occurs.
            </label>
            <hr />
            <Action href="/order-confirmation">
              SHOW ORDER CONFIRMATION PREVIEW
            </Action>
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
