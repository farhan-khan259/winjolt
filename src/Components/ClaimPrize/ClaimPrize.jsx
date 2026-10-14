import {
  Action,
  PageShell,
  PlaceholderCards,
} from "../CommonPages/CommonPages";
import "./ClaimPrize.css";

export default function ClaimPrize() {
  const steps = [
    "1 · Claim reference",
    "2 · Verify identity and eligibility",
    "3 · Choose delivery or collection",
    "4 · Track fulfilment",
  ];
  return (
    <PageShell
      eyebrow="CLAIM A PRIZE"
      title="CLAIM A PRIZE"
      subtitle="Prize eligibility and collection steps."
      className="claim-prize-page"
    >
      <section className="info-content claim-prize-content">
        <PlaceholderCards
          items={steps}
          text="A genuine prize claim will include verified documents and tracking."
        />
        <Action href="/contact-us">CONTACT CLAIMS SUPPORT</Action>
      </section>
    </PageShell>
  );
}
