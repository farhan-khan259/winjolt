import { Action, PageShell } from "../CommonPages/CommonPages";
import "./MyOrders.css";

export default function MyOrders() {
  return (
    <PageShell
      eyebrow="MY WINJOLT / ORDER HISTORY"
      title="ORDER HISTORY"
      subtitle="Review your competition purchases, payment status and receipts."
      className="my-orders-page"
    >
      <section className="info-content dashboard-layout my-orders-content">
        <nav className="dashboard-nav" aria-label="Account navigation">
          <a href="/my-winjolt-dashboard">▣ Dashboard</a>
          <a href="/my-entries">◆ My Entries</a>
          <a className="active" href="/my-orders" aria-current="page">▤ Order History</a>
          <a href="/my-prizes">🏆 Prize Claims</a>
          <a href="/account-settings">⚙ Account Settings</a>
          <a href="/responsible-participation">♡ Spending Controls</a>
          <a href="/help-centre">✉ Support</a>
        </nav>

        <div className="orders-panel">
          <div className="orders-heading">
            <div>
              <small>YOUR PURCHASES</small>
              <h2>ORDER HISTORY</h2>
              <p>Receipts and completed transactions will appear here.</p>
            </div>
            <label>
              <span>FILTER ORDERS</span>
              <select defaultValue="all" aria-label="Filter orders">
                <option value="all">All orders</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </label>
          </div>

          <div className="orders-table" role="table" aria-label="Order history">
            <div className="orders-table-head" role="row">
              <span>ORDER</span>
              <span>DATE</span>
              <span>ITEMS</span>
              <span>TOTAL</span>
              <span>STATUS</span>
            </div>
            <div className="orders-empty">
              <span className="orders-empty-icon" aria-hidden="true">▤</span>
              <h3>NO ORDERS YET</h3>
              <p>When you purchase competition entries, your order details and receipts will be shown here.</p>
              <Action href="/competitions">EXPLORE COMPETITIONS</Action>
            </div>
          </div>

          <div className="orders-help">
            <div>
              <strong>NEED HELP WITH AN ORDER?</strong>
              <p>Contact support and include your order reference so we can help quickly.</p>
            </div>
            <Action outline href="/contact-us">CONTACT SUPPORT</Action>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
