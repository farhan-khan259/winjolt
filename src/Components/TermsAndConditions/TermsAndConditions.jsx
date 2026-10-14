import { PageShell, PlaceholderCards } from "../CommonPages/CommonPages";
import "./TermsAndConditions.css";

export const policySections = [
  "Eligibility and participation",
  "Prize and draw terms",
  "Data processing, privacy and security",
  "Free-entry routes and fair results",
  "Complaints and support",
];

export default function TermsAndConditions() {
  return (
    <PageShell
      eyebrow="TERMS & CONDITIONS"
      title="TERMS & CONDITIONS"
      subtitle="WinJolt participation terms."
      className="terms-page"
    >
      <section className="info-content policy-content">
        <PlaceholderCards
          items={policySections}
          text="The final legally reviewed policy will be published here before launch."
        />
      </section>
    </PageShell>
  );
}
