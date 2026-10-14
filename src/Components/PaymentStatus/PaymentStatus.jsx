import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Action, PageShell } from "../CommonPages/CommonPages";
import "./PaymentStatus.css";
export default function PaymentStatus() {
  const navigate = useNavigate();
  const checkout = useMemo(() => {
    try { return JSON.parse(sessionStorage.getItem("winjolt-checkout")) || {}; }
    catch { return {}; }
  }, []);

  const confirmDemoPayment = (event) => {
    event.preventDefault();
    const reference = `WJ-${Date.now().toString().slice(-8)}`;
    sessionStorage.setItem("winjolt-order", JSON.stringify({ ...checkout, reference }));
    navigate("/order-confirmation");
  };

  return (
    <PageShell
      preview
      className="payment-page"
      eyebrow="PAYMENT STATUS"
      title="PAYMENT STATUS"
      subtitle="Review your details and complete payment securely."
    >
      <section className="info-content payment-content">
        <div className="checkout-steps">
          <span>1 · BASKET</span><span>2 · DETAILS</span><span className="active">3 · PAYMENT</span><span>4 · CONFIRMATION</span>
        </div>
        <div className="two-column payment-layout">
          <form className="checkout-box payment-box" onSubmit={confirmDemoPayment}>
            <p className="payment-kicker">SECURE CHECKOUT</p>
            <h2>PAYMENT DETAILS</h2>
            <div className="demo-payment-notice"><b>PAYMENT DETAILS ARE ENCRYPTED</b><span>Your payment is processed securely.</span></div>
            <div className="checkout-fields">
              <label className="form-field wide">NAME ON CARD<input autoComplete="cc-name" placeholder="Enter cardholder name" required /></label>
              <label className="form-field wide">CARD NUMBER<input inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" pattern="[0-9 ]{15,19}" required /></label>
              <label className="form-field">EXPIRY DATE<input autoComplete="cc-exp" placeholder="MM / YY" pattern="[0-9 /]{5,7}" required /></label>
              <label className="form-field">SECURITY CODE<input inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" pattern="[0-9]{3,4}" required /></label>
            </div>
            <label className="checkbox-row"><input type="checkbox" required />I authorise this payment and confirm the order details are correct.</label>
            <hr />
            <button className="payment-submit" type="submit">COMPLETE PAYMENT →</button>
          </form>
          <aside className="summary-box payment-summary">
            <h2>ORDER SUMMARY</h2>
            <p>Checkout for <b>{checkout.name || "Customer"}</b></p>
            <p className="summary-line"><b>Subtotal</b><span>£0.00</span></p>
            <p className="summary-line"><b>Actual charge</b><span>£0.00</span></p>
            <hr />
            <p className="secure-copy">🔒 Card details are validated only in your browser and are not stored or transmitted.</p>
            <Action outline href="/secure-checkout">BACK TO DETAILS</Action>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
