import { AccountNav, PageShell, PlaceholderCards } from "../CommonPages/CommonPages";
import "./HelpCentre.css";
export default function HelpCentre() {
  return (
    <PageShell
      className="help-page"
      eyebrow="MY WINJOLT / HELP CENTRE"
      title="HELP CENTRE"
      subtitle="Find support for orders, entries and claims."
    >
      <section className="info-content dashboard-layout">
        <AccountNav active="support" />
        <div className="account-page-panel">
          <small>CUSTOMER SUPPORT</small>
          <h2>HELP CENTRE</h2>
          <p>Find help for competitions, orders, entries and prize claims.</p>
          <PlaceholderCards
          items={[
            "How do I enter competitions?",
            "Do you offer free entry?",
            "How are winners selected?",
            "How do instant-win outcomes work?",
            "How are prizes delivered?",
          ]}
          />
        </div>
      </section>
    </PageShell>
  );
}
