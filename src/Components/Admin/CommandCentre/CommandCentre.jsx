import {
  AdminLayout,
  DesignFooter,
  PageHeading,
  Panel,
  StatGrid,
} from "../Shared/AdminLayout";
import car from "../../../Assets/Pictures/car-card.jpg";
import cash from "../../../Assets/Pictures/cash-card.jpg";
import gaming from "../../../Assets/Pictures/gaming-card.jpg";
import "./CommandCentre.css";
import { Link, useNavigate } from "react-router-dom";

const campaigns = [
  ["Performance car + cash", "Car prize", "Draft", car],
  ["£10,000 cash prize", "Cash prize", "Concept", cash],
  ["Gaming & technology", "Technology", "Concept", gaming],
];
export default function CommandCentre() {
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <PageHeading
        eyebrow="OVERVIEW  /  COMMAND CENTRE"
        title="Operations overview"
        subtitle="Manage campaigns, free entries, payments, results and prize fulfilment in one place."
        secondary="View reports"
        primary="+ Create competition"
      />
      <div className="notice-banner">
        <div>
          <strong>ϟ &nbsp; OPERATIONS STATUS · ACTION REQUIRED</strong>
          <p>
            No customers, tickets, payments or draws are connected. Legal
            structure, payment onboarding and verified result processes must be
            approved before launch.
          </p>
        </div>
        <button className="btn primary" onClick={() => navigate("/admin/competition-launch-approval")}>Review readiness →</button>
      </div>
      <StatGrid
        items={[
          {
            label: "ACTIVE COMPETITIONS",
            value: "0",
            note: "Nothing live yet",
            icon: "◇",
          },
          {
            label: "TICKETS ISSUED",
            value: "0",
            note: "No paid or free entries",
            icon: "▣",
          },
          {
            label: "FREE ENTRIES IN QUEUE",
            value: "0",
            note: "No applications received",
            icon: "✉",
          },
          {
            label: "GROSS PAYMENTS",
            value: "£0.00",
            note: "Payment system disconnected",
            icon: "£",
          },
        ]}
      />
      <div className="two-col command-grid">
        <div className="stack">
          <Panel
            title="Competition pipeline"
            subtitle="Current campaigns and publication status"
          >
            <div className="data-table">
              <div className="table-head">
                <span>PRIZE / CAMPAIGN</span>
                <span>TYPE</span>
                <span>STATUS</span>
                <span>ACTIONS</span>
              </div>
              {campaigns.map((c) => (
                <div className="table-row" key={c[0]}>
                  <div className="prize-cell">
                    <img src={c[3]} alt="" />
                    <div>
                      <strong>{c[0]}</strong>
                      <small>Prize campaign · entries pending</small>
                    </div>
                  </div>
                  <small>{c[1]}</small>
                  <span className={`status ${c[2].toLowerCase()}`}>{c[2]}</span>
                  <Link className="action-link" to="/admin/campaign-control-centre">Review →</Link>
                </div>
              ))}
            </div>
          </Panel>
          <Panel
            title="Entry activity"
            subtitle="Paid and free entries · no connected data"
          >
            <div className="empty-chart">
              <strong>No entry activity in the selected period</strong>
            </div>
          </Panel>
        </div>
        <div className="stack">
          <Panel
            title="Launch readiness"
            subtitle="Controls to complete before going live"
          >
            <div className="soft-list">
              {[
                ["Legal review", "Competition structure & published rules"],
                [
                  "Payment provider",
                  "Authorisation, webhooks & reconciliation",
                ],
                ["Draw verification", "Immutable result and audit record"],
                ["Prize operations", "Ownership, valuation & fulfilment"],
              ].map((x) => (
                <div className="soft-row" key={x[0]}>
                  <strong>○ &nbsp; {x[0]}</strong>
                  <p>{x[1]}</p>
                </div>
              ))}
            </div>
          </Panel>
          <Panel
            title="Draw schedule"
            subtitle="Upcoming draws and verification windows"
          >
            <div className="soft-row">
              <strong>◎ No draws scheduled</strong>
              <p>
                Draw timing and evidence become available after an authorised
                campaign is published.
              </p>
            </div>
          </Panel>
        </div>
      </div>
      <Panel
        title="Recent audit activity"
        subtitle="Every change to competitions, free entries, ticket allocation and draws should create a traceable event."
        className="audit-panel"
      >
        <div className="soft-row">
          No operational events are currently available.
        </div>
      </Panel>
      <DesignFooter />
    </AdminLayout>
  );
}
