import { PageShell, PlaceholderCards } from "../CommonPages/CommonPages";
import "./ResponsibleParticipation.css";
export default function ResponsibleParticipation() {
  return (
    <PageShell
      className="responsible-page"
      eyebrow="RESPONSIBLE PARTICIPATION"
      title="RESPONSIBLE PARTICIPATION"
      subtitle="18+ only and play for entertainment."
    >
      <section className="info-content">
        <PlaceholderCards
          items={[
            "Who may participate",
            "Data and security policy",
            "Competition-specific terms",
            "Responsible participation safeguards",
            "Contact and complaints",
          ]}
        />
      </section>
    </PageShell>
  );
}
