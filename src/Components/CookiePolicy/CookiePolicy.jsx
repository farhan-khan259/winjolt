import { PageShell, PlaceholderCards } from "../CommonPages/CommonPages";
import { policySections } from "../TermsAndConditions/TermsAndConditions";
import "./CookiePolicy.css";

export default function CookiePolicy() {
  return (
    <PageShell
      eyebrow="COOKIE POLICY"
      title="COOKIE POLICY"
      subtitle="Manage cookies and tracking choices."
      className="cookie-page"
    >
      <section className="info-content policy-content cookie-content">
        <PlaceholderCards
          items={policySections}
          text="The final legally reviewed policy will be published here before launch."
        />
      </section>
    </PageShell>
  );
}
