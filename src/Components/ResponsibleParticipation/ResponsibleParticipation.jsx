import { AccountNav, PageShell, PlaceholderCards } from "../CommonPages/CommonPages";
import "./ResponsibleParticipation.css";
export default function ResponsibleParticipation() {
  return (
    <PageShell
      className="responsible-page"
      eyebrow="MY WINJOLT / RESPONSIBLE PARTICIPATION"
      title="RESPONSIBLE PARTICIPATION"
      subtitle="18+ only and play for entertainment."
    >
      <section className="info-content dashboard-layout">
        <AccountNav active="controls" />
        <div className="account-page-panel">
          <small>SPENDING &amp; PARTICIPATION CONTROLS</small>
          <h2>RESPONSIBLE PARTICIPATION</h2>
          <p>Tools and guidance to help keep participation safe and enjoyable.</p>
          <PlaceholderCards
          items={[
            "Who may participate",
            "Data and security policy",
            "Competition-specific terms",
            "Responsible participation safeguards",
            "Contact and complaints",
          ]}
          />
        </div>
      </section>
    </PageShell>
  );
}
