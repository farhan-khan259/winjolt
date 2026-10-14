import { PageShell, PlaceholderCards } from "../CommonPages/CommonPages";
import "./AdministrationDashboard.css";

export default function AdministrationDashboard() {
  const panels = [
    "Dashboard overview",
    "Competition campaigns",
    "Prize inventory",
    "Free-entry queue",
    "Customers and payments",
    "Draws, winners & audit",
    "Claims and fulfilment",
    "Reports and compliance",
  ];
  return (
    <PageShell
      eyebrow="ADMINISTRATION DASHBOARD"
      title={
        <>
          ADMINISTRATION{" "}
          <span className="admin-title-break">
            <br />
          </span>
          DASHBOARD
        </>
      }
      subtitle="Role-controlled competition operations."
      className="administration-page"
    >
      <section className="info-content administration-content">
        <PlaceholderCards
          items={panels}
          text="No records are available yet."
        />
      </section>
    </PageShell>
  );
}
