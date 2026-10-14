import {
  AdminLayout,
  DesignFooter,
  FilterBar,
  PageHeading,
  Panel,
  StatGrid,
} from "../Shared/AdminLayout";
import car from "../../../Assets/Pictures/car-card.jpg";
import "./CampaignControlCentre.css";
export default function CampaignControlCentre() {
  return (
    <AdminLayout>
      <PageHeading
        eyebrow="WINJOLT CONTROL  /  CAMPAIGN DETAIL"
        title="Campaign control centre"
        subtitle="Review a vehicle campaign, its controls and launch readiness."
        primary="Review for publication"
      />
      <StatGrid
        items={[
          { label: "STATUS", value: "DRAFT", note: "No active sales" },
          {
            label: "ENTRY PRICE",
            value: "£0.99",
            note: "Current entry price",
          },
          { label: "TOTAL ENTRIES", value: "0", note: "No real tickets" },
          { label: "RESULT STATE", value: "NONE", note: "No draw recorded" },
        ]}
      />
      <FilterBar />
      <div className="two-col control-cols">
        <Panel title="Performance Car + Cash">
          <span className="status">Draft</span>
          <img className="campaign-hero" src={car} alt="Blue performance car" />
          <p className="panel-subtitle">Competition prize</p>
          <div className="tabs">
            {["Overview", "Prize", "Entries", "Rules", "Results"].map((x) => (
              <span className={x === "Overview" ? "active" : ""} key={x}>
                {x}
              </span>
            ))}
          </div>
          <div className="detail-list">
            {[
              ["Campaign URL", "/competitions/car"],
              ["Entry limits", "Not approved · set campaign limit"],
              ["Paid & free entry", "Parity required before launch"],
              ["Result engine", "Allocation service pending"],
            ].map((x) => (
              <div key={x[0]}>
                <strong>{x[0]}</strong>
                <span>{x[1]}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Campaign readiness">
          <div className="requirement-list">
            {[
              ["Prize verification", "Documentation needed"],
              ["Competition rules", "Legal review needed"],
              ["Image gallery", "Prize photographs"],
              ["Entry allocation", "No server integration"],
              ["Final approval", "Not authorised"],
            ].map((x) => (
              <div key={x[0]}>
                <strong>{x[0]}</strong>
                <span>{x[1]}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <DesignFooter />
    </AdminLayout>
  );
}
