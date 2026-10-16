import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import {
  AdminLayout,
  AdminImage,
  DesignFooter,
  PageHeading,
  Panel,
  StatGrid,
} from "../Shared/AdminLayout";
import "./CommandCentre.css";
import { Link, useNavigate } from "react-router-dom";

export default function CommandCentre() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({}); const [campaigns, setCampaigns] = useState([]); const [audits,setAudits]=useState([]); const [error, setError] = useState("");
  useEffect(() => { Promise.all([api.get("/admin/dashboard"), api.get("/admin/competitions?limit=5"),api.get("/admin/audit-events?limit=5")]).then(([dashboard, list,auditList]) => { setMetrics(dashboard.metrics); setCampaigns(list.items); setAudits(auditList.items); }).catch((requestError) => setError(requestError.message)); }, []);
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
            Live values below come from the authoritative backend. Campaign release remains blocked until every required gate is approved.
          </p>
        </div>
        <button className="btn primary" onClick={() => navigate("/admin/competition-launch-approval")}>Review readiness →</button>
      </div>
      <StatGrid
        items={[
          {
            label: "ACTIVE COMPETITIONS",
            value: String(metrics.live_campaigns || 0),
            note: "Authoritative live count",
            icon: "◇",
          },
          {
            label: "TICKETS ISSUED",
            value: String((metrics.paid_entries || 0) + (metrics.free_entries || 0)),
            note: `${metrics.paid_entries || 0} paid · ${metrics.free_entries || 0} free`,
            icon: "▣",
          },
          {
            label: "FREE ENTRIES IN QUEUE",
            value: String(metrics.free_entries || 0),
            note: "Issued qualifying free entries",
            icon: "✉",
          },
          {
            label: "GROSS PAYMENTS",
            value: `£${((metrics.gross_minor || 0) / 100).toFixed(2)}`,
            note: "Settled orders with tickets issued",
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
                <div className="table-row" key={c.publicId}>
                  <div className="prize-cell">
                    <AdminImage src={c.images?.[0]} alt="" />
                    <div>
                      <strong>{c.title}</strong>
                      <small>Prize campaign · entries pending</small>
                    </div>
                  </div>
                  <small>{c.category}</small>
                  <span className={`status ${c.status.toLowerCase()}`}>{c.status}</span>
                  <Link className="action-link" to={`/admin/campaign-control-centre?id=${encodeURIComponent(c.publicId)}`}>Review →</Link>
                </div>
              ))}
            </div>
            {error && <p role="alert">{error}</p>}
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
        {audits.length===0?<div className="soft-row">No operational events are currently available.</div>:audits.map((event)=><div className="soft-row" key={event.publicId}><strong>{event.eventType}</strong><p>{event.aggregateType} · {event.aggregateId} · {new Date(event.occurredAt).toLocaleString("en-GB")}</p></div>)}
      </Panel>
      <DesignFooter />
    </AdminLayout>
  );
}
