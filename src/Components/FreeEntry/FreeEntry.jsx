import { Action, PageShell } from "../CommonPages/CommonPages";
import "./FreeEntry.css";
const steps = [
  [
    "Choose an active competition",
    "Read the full campaign-specific terms, closing date and restrictions.",
  ],
  [
    "Use the advertised free-entry method",
    "The qualifying route must be presented clearly alongside paid entry where applicable.",
  ],
  [
    "Submit within the deadline",
    "Applications must meet the published rules and eligible deadlines.",
  ],
  [
    "Receive equivalent treatment",
    "Qualifying free and paid entries must enter the same fair prize-selection system.",
  ],
];
export default function FreeEntry() {
  return (
    <PageShell
      className="free-entry-page"
      eyebrow="FREE ENTRY"
      title="FREE ENTRY ROUTE"
      subtitle="Clear, prominent instructions for eligible competitions and equal treatment of qualifying entries."
    >
      <section className="info-content free-entry-grid">
        <article className="free-entry-main">
          <small>FREE-ENTRY ACCESS</small>
          <h2>HOW TO ENTER WITHOUT PAYING</h2>
          <p className="amber-note">
            Campaign-specific rules required. The free-entry method, deadline,
            eligibility and submission details will be provided for each actual
            competition. No entries can be submitted yet.
          </p>
          {steps.map(([h, p], i) => (
            <div className="number-step" key={h}>
              <b>{i + 1}</b>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </article>
        <aside className="info-panel principles">
          <h2>KEY PRINCIPLES</h2>
          <ul>
            <li>Clear, prominent free-route information</li>
            <li>Equal opportunities for qualifying entries</li>
            <li>Fair and transparent processing</li>
            <li>Accurate, non-misleading competition rules</li>
            <li>Full records of entries and results</li>
          </ul>
          <Action>VIEW COMPETITIONS</Action>
          <Action outline href="/terms-and-conditions">READ PLATFORM TERMS</Action>
        </aside>
      </section>
    </PageShell>
  );
}
