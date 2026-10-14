import { AccountNav, PageShell, PlaceholderCards } from "../CommonPages/CommonPages";
import "./MyPrizes.css";

export default function MyPrizes() {
  return (
    <PageShell
      eyebrow="MY WINJOLT / MY PRIZES"
      title="MY PRIZES"
      subtitle="Prize claim and fulfilment records."
      className="my-prizes-page"
    >
      <section className="info-content dashboard-layout my-prizes-content">
        <AccountNav active="prizes" />
        <div className="account-page-panel">
          <small>YOUR REWARDS</small>
          <h2>MY PRIZES</h2>
          <p>Track prize verification, claims and delivery progress.</p>
          <PlaceholderCards
          items={[
            "My confirmed prizes",
            "Verification and claims",
            "Delivery progress",
          ]}
          text="No records are available yet."
          />
        </div>
      </section>
    </PageShell>
  );
}
