import {
  AdminLayout,
  DesignFooter,
  FilterBar,
  PageHeading,
  Panel,
  StatGrid,
} from "../Shared/AdminLayout";
import car from "../../../Assets/Pictures/car-card.jpg";
import "./CreateCompetition.css";
export default function CreateCompetition() {
  return (
    <AdminLayout>
      <PageHeading
        eyebrow="WINJOLT CONTROL  /  CAMPAIGN BUILDER"
        title="Create a competition"
        subtitle="Configure prizes, rules, entry routes and release checks before publication."
        primary="Save draft"
      />
      <StatGrid
        items={[
          {
            label: "CAMPAIGN STATUS",
            value: "DRAFT",
            note: "Not open for entries",
          },
          { label: "PRICE / ENTRY", value: "—", note: "Set before approval" },
          { label: "ENTRY LIMIT", value: "—", note: "Set per rules" },
          {
            label: "PUBLISH GATE",
            value: "BLOCKED",
            note: "Requires sign-off",
          },
        ]}
      />
      <FilterBar filters={["Campaign type", "Category", "Date range"]} />
      <div className="two-col builder-cols">
        <Panel title="Step 1 · Prize and campaign details">
          <div className="form-grid">
            <label>
              COMPETITION TITLE
              <span className="field">e.g. Performance Car + Cash</span>
            </label>
            <label>
              PRIZE CATEGORY
              <span className="field">Cars / Cash / Tech / Tools</span>
            </label>
            <label className="wide">
              PRIZE DESCRIPTION
              <span className="field">
                Enter exact prize specifications, conditions and delivery
                information
              </span>
            </label>
            <label>
              ENTRY PRICE<span className="field">Not yet set</span>
            </label>
            <label>
              ENTRY CAP<span className="field">Not yet set</span>
            </label>
          </div>
          <h2>Step 2 · Entry eligibility and selection</h2>
          <div className="check-list">
            {[
              "Qualifying free-entry method & deadline",
              "Age/eligibility checks and geographic restrictions",
              "Closing time & draw date",
              "Random-draw verification and dispute handling",
            ].map((x) => (
              <div key={x}>□ &nbsp;&nbsp; {x}</div>
            ))}
          </div>
          <button className="save-button" onClick={() => { localStorage.setItem("winjolt-draft:/admin/create-competition", new Date().toISOString()); window.alert("Campaign draft saved locally."); }}>Save campaign as draft →</button>
        </Panel>
        <Panel title="Prize preview">
          <img className="preview-image" src={car} alt="Blue performance car" />
          <span className="status">Draft</span>
          <p className="preview-copy">
            Competition cannot go live before all approval checks pass.
          </p>
          <div className="requirement-list">
            {[
              "Prize provenance & valuation",
              "Rules & entry route sign-off",
              "Verified result controls",
              "Payment gateway acceptance",
            ].map((x) => (
              <div key={x}>
                <strong>{x}</strong>
                <span>Not yet confirmed</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <DesignFooter />
    </AdminLayout>
  );
}
