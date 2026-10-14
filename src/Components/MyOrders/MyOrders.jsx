import { PageShell, PlaceholderCards } from "../CommonPages/CommonPages";
import "./MyOrders.css";

export default function MyOrders() {
  return (
    <PageShell eyebrow="MY ORDERS" title="MY ORDERS" subtitle="Order receipts and status." className="my-orders-page">
      <section className="info-content my-orders-content">
        <PlaceholderCards items={["Order references", "Payment history", "Refunds and transaction status"]} text="No live customer data is connected to this visual design." />
      </section>
    </PageShell>
  );
}
