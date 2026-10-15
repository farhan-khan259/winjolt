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
  const saveDraft = (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    localStorage.setItem(
      "winjolt-draft:/admin/create-competition",
      JSON.stringify({ ...values, savedAt: new Date().toISOString() }),
    );
    window.alert("Campaign draft saved locally.");
  };

  return (
    <AdminLayout>
      <PageHeading
        eyebrow="WINJOLT CONTROL  /  CAMPAIGN BUILDER"
        title="Create a competition"
        subtitle="Configure prizes, rules, entry routes and release checks before publication."
        secondary="Configure instant wins"
        secondaryTo="/admin/competition-instant-wins"
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
          <form onSubmit={saveDraft}>
          <div className="form-grid">
            <label>
              COMPETITION TITLE
              <input className="field" name="competitionTitle" placeholder="e.g. Performance Car + Cash" />
            </label>
            <label>
              PRIZE CATEGORY
              <input className="field" name="prizeCategory" placeholder="Cars / Cash / Tech / Tools" list="prize-categories" />
              <datalist id="prize-categories">
                <option value="Cars" />
                <option value="Cash" />
                <option value="Tech" />
                <option value="Tools" />
              </datalist>
            </label>
            <label className="wide">
              PRIZE DESCRIPTION
              <textarea className="field" name="prizeDescription" placeholder="Enter exact prize specifications, conditions and delivery information" />
            </label>
            <label>
              ENTRY PRICE
              <input className="field" name="entryPrice" type="number" min="0" step="0.01" placeholder="Not yet set" />
            </label>
            <label>
              ENTRY CAP
              <input className="field" name="entryCap" type="number" min="1" step="1" placeholder="Not yet set" />
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
              <label key={x}>
                <input type="checkbox" name="eligibilityChecks" value={x} />
                <span>{x}</span>
              </label>
            ))}
          </div>
          <button className="save-button" type="submit">Save campaign as draft →</button>
          </form>
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
