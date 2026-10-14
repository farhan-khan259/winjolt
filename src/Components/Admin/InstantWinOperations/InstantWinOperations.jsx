import {
  AdminLayout,
  DesignFooter,
  FilterBar,
  PageHeading,
  Panel,
  StatGrid,
} from "../Shared/AdminLayout";
import wheel from "../../../Assets/Pictures/jolt-wheel.png";
import "./InstantWinOperations.css";
import { useNavigate } from "react-router-dom";
export default function InstantWinOperations() {
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <PageHeading
        eyebrow="WINJOLT CONTROL  /  FAIR RESULT ALLOCATION"
        title="Instant-win operations"
        subtitle="Manage the instant-win catalogue and auditable, preassigned outcomes."
        primary="+ Draft instant campaign"
      />
      <StatGrid
        items={[
          {
            label: "ACTIVE CAMPAIGNS",
            value: "0",
            note: "Instant wins disabled",
          },
          {
            label: "ALLOCATED RESULTS",
            value: "0",
            note: "No assigned outcomes",
          },
          {
            label: "OUTSTANDING CLAIMS",
            value: "0",
            note: "No prizes claimed",
          },
          {
            label: "WHEEL STATE",
            value: "VISUAL",
            note: "No outcome selection",
          },
        ]}
      />
      <div className="notice-banner">
        <div>
          <strong>ϟ &nbsp; JOLT REVEAL / FIXED 20-PRIZE ALLOCATION</strong>
          <p>
            Configure reward counts, audited random allocation, free/paid
            parity, published conditions and release approvals. Campaign is
            currently a blocked draft.
          </p>
        </div>
        <button className="btn primary" onClick={() => navigate("/admin/jolt-credit-prizes")}>CONFIGURE 20 PRIZES →</button>
      </div>
      <FilterBar />
      <div className="two-col instant-cols">
        <Panel
          title="Instant-win prize allocation"
          subtitle="The reveal animation is not permitted to determine winners."
        >
          <div className="detail-list">
            {[
              [
                "Allocation & sealing",
                "Outcome fixed and logged before reveal animation.",
              ],
              [
                "Prize distribution",
                "Inventory and odds reviewed against published campaign rules.",
              ],
              [
                "Equal entry treatment",
                "Qualifying free entries included on equal terms.",
              ],
              [
                "Immutable event ledger",
                "Assignment, redemption and void reasons traceable.",
              ],
            ].map((x) => (
              <div key={x[0]}>
                <strong>{x[0]}</strong>
                <span>{x[1]}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="wheel-panel">
          <img src={wheel} alt="Jolt Reveal prize wheel" />
          <h2>Jolt Reveal preview</h2>
          <p>All outcomes are determined before any animation.</p>
          <span className="status blocked">Blocked</span>
        </Panel>
      </div>
      <DesignFooter />
    </AdminLayout>
  );
}
