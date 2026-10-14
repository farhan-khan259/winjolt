import { PageShell, PlaceholderCards } from "../CommonPages/CommonPages";
import { policySections } from "../TermsAndConditions/TermsAndConditions";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <PageShell eyebrow="PRIVACY POLICY" title="PRIVACY POLICY" subtitle="How personal information is handled." className="privacy-page">
      <section className="info-content policy-content privacy-content"><PlaceholderCards items={policySections} text="The final legally reviewed policy will be published here before launch." /></section>
    </PageShell>
  );
}
