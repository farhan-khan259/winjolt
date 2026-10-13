import { Action, PageShell } from "../CommonPages/CommonPages";
import "./OrderConfirmation.css";
export default function OrderConfirmation() {
  return (
    <PageShell
      preview
      className="confirmation-page"
      eyebrow="ORDER CONFIRMATION"
      title="ORDER CONFIRMATION"
      subtitle="An example order result screen."
    >
      <section className="info-content status-content">
        <article className="info-panel">
          <h2>DEMO ORDER SUMMARY</h2>
          <p>
            This is a sample order confirmation screen; no payment or ticket
            allocation was performed.
          </p>
        </article>
        <Action>RETURN TO COMPETITIONS</Action>
      </section>
    </PageShell>
  );
}
