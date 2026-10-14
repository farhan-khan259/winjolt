import { StandardAdminPage } from "../Shared/AdminPatterns";
import "./AuditCompliance.css";
export default function AuditCompliance() {
  return (
    <StandardAdminPage
      heading={{
        eyebrow: "WINJOLT CONTROL / ACCOUNTABILITY & RISK",
        title: "Audit & compliance",
        subtitle:
          "Preserve a verifiable history of competition changes, ticket eligibility, draw decisions, security and incidents.",
        secondary: "Help & policies",
        primary: "Export audit evidence",
      }}
      stats={[
        ["SECURITY EVENTS", "0", "No platform connected"],
        ["OPEN INCIDENTS", "0", "No reported breaches"],
        ["COMPLIANCE GATES", "0/8", "No controls approved"],
        ["EVIDENCE RECORDS", "0", "No signed artefacts"],
      ].map(([label, value, note]) => ({ label, value, note }))}
      filters={false}
      mainTitle="Immutable audit trail design"
      mainSubtitle="Every production change must leave attributable, verifiable evidence."
      empty={[
        "No events to display",
        "A live service should record actor ID, event ID, UTC timestamp, prior/after state, approval reference and integrity checksum.",
      ]}
      sideTitle="Regulatory readiness"
      sideItems={[
        "Competition format review",
        "Free entry & skill controls",
        "Gambling-specific games",
        "Privacy and payments",
      ].map((x) => [x, "Evidence and specialist review required"])}
    >
      <div className="soft-list">
        {[
          "Ticket allocation locked after payment confirmation",
          "No result overwrite after draw lock",
          "Reviewer identity separate from drawer identity",
        ].map((x) => (
          <div className="soft-row" key={x}>
            <strong>{x}</strong>
            <p>Required enforcement in backend services</p>
          </div>
        ))}
      </div>
    </StandardAdminPage>
  );
}
