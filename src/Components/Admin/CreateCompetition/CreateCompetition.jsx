import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import {
  AdminLayout,
  DesignFooter,
  FilterBar,
  PageHeading,
  Panel,
  StatGrid,
} from "../Shared/AdminLayout";
import "./CreateCompetition.css";
export default function CreateCompetition() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [preview, setPreview] = useState({ competitionTitle: "", prizeCategory: "", prizeDescription: "", entryPrice: "", entryCap: "", startsAt: "", closesAt: "", drawAt: "", rulesText: "", freeEntryInstructions: "", eligibilityChecks: [] });
  const [saving, setSaving] = useState(false);
  const updatePreview = (event) => {
    const { name, value, checked, type } = event.target;
    if (!name || type === "file") return;
    if (name === "eligibilityChecks") {
      setPreview((current) => ({ ...current, eligibilityChecks: checked ? [...current.eligibilityChecks, value] : current.eligibilityChecks.filter((item) => item !== value) }));
      return;
    }
    setPreview((current) => ({ ...current, [name]: value }));
  };
  const chooseImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setMessage("Choose a JPEG, PNG or WebP image."); event.target.value = ""; return; }
    if (file.size > 10 * 1024 * 1024) { setMessage("The campaign image must be 10 MB or smaller."); event.target.value = ""; return; }
    setImageFile(file); setPreviewImage(URL.createObjectURL(file)); setMessage("");
  };
  const saveDraft = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    try {
      setSaving(true);
      setMessage("Saving draft…");
      const slug = values.competitionTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const matches = await api.get(`/admin/competitions?limit=10&q=${encodeURIComponent(slug)}`);
      const existing = matches.items.find(item => item.slug === slug);
      if (existing) { navigate(`/admin/campaign-control-centre?id=${encodeURIComponent(existing.publicId)}`); return; }
      let images = [];
      if (imageFile) {
        setMessage("Uploading campaign image…");
        const upload = new FormData(); upload.append("file", imageFile); upload.append("purpose", "CAMPAIGN_MEDIA"); upload.append("access", "PUBLIC");
        const uploaded = await api.upload("/admin/assets", upload); images = [api.assetUrl(uploaded.item.id)];
      }
      setMessage("Creating ticket inventory and saving campaign…");
      const result = await api.post("/admin/competitions", { title: values.competitionTitle, slug, category: values.prizeCategory, description: values.prizeDescription, images, main_prize: { kind: values.prizeCategory?.toUpperCase(), title: values.competitionTitle, secured: false, evidenceRefs: [] }, price_minor: Math.round(Number(values.entryPrice) * 100), ticket_range: { start: 1, end: Number(values.entryCap), padWidth: String(values.entryCap).length }, max_entries_per_user: Number(values.customerCap), max_entries_per_order: Number(values.orderCap), starts_at: new Date(values.startsAt).toISOString(), closes_at: new Date(values.closesAt).toISOString(), draw_at: new Date(values.drawAt).toISOString(), rules_version: values.rulesVersion, rules_text: values.rulesText, free_entry_instructions: values.freeEntryInstructions });
      setMessage("Campaign draft saved to the server. Publication remains blocked until all evidence and approvals pass.");
      form.reset();
      navigate(`/admin/campaign-control-centre?id=${encodeURIComponent(result.item.publicId)}`);
    } catch (error) {
      if (error.code === "COMPETITION_ALREADY_EXISTS" && error.details?.existing_id) {
        navigate(`/admin/campaign-control-centre?id=${encodeURIComponent(error.details.existing_id)}`);
        return;
      }
      setMessage(error.message);
    } finally { setSaving(false); }
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
          { label: "PRICE / ENTRY", value: preview.entryPrice === "" ? "—" : `£${Number(preview.entryPrice).toFixed(2)}`, note: "Draft entry price" },
          { label: "ENTRY LIMIT", value: preview.entryCap || "—", note: "Draft ticket capacity" },
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
          <form onSubmit={saveDraft} onChange={updatePreview}>
          <div className="form-grid">
            <label>
              COMPETITION TITLE
              <input className="field" name="competitionTitle" placeholder="e.g. Performance Car + Cash" required />
            </label>
            <label>
              PRIZE CATEGORY
              <input className="field" name="prizeCategory" placeholder="Cars / Cash / Tech / Tools" list="prize-categories" required />
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
            <label className="wide campaign-upload">
              CAMPAIGN / PRIZE IMAGE
              <input className="field" name="campaignImage" type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseImage} />
              <span>JPEG, PNG or WebP · maximum 10 MB. The uploaded image will be shown on competition cards and details.</span>
            </label>
            <label>
              ENTRY PRICE
              <input className="field" name="entryPrice" type="number" min="0" step="0.01" placeholder="Not yet set" required />
            </label>
            <label>
              ENTRY CAP
              <input className="field" name="entryCap" type="number" min="1" max="1000000" step="1" placeholder="Not yet set" required />
            </label>
            <label>
              MAX ENTRIES PER CUSTOMER
              <input className="field" name="customerCap" type="number" min="1" step="1" required />
            </label>
            <label>
              MAX ENTRIES PER ORDER
              <input className="field" name="orderCap" type="number" min="1" max="100" defaultValue="20" required />
            </label>
            <label>
              ENTRY START (YOUR LOCAL TIME)
              <input className="field" name="startsAt" type="datetime-local" required />
            </label>
            <label>
              ENTRY CUTOFF (YOUR LOCAL TIME)
              <input className="field" name="closesAt" type="datetime-local" required />
            </label>
            <label>
              DRAW TIME (YOUR LOCAL TIME)
              <input className="field" name="drawAt" type="datetime-local" required />
            </label>
            <label>
              RULES VERSION
              <input className="field" name="rulesVersion" defaultValue="draft-v1" required />
            </label>
            <label className="wide">
              CAMPAIGN RULES
              <textarea className="field" name="rulesText" required />
            </label>
            <label className="wide">
              QUALIFYING FREE-ENTRY INSTRUCTIONS
              <textarea className="field" name="freeEntryInstructions" required />
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
          <button className="save-button" type="submit" disabled={saving}>{saving ? "Saving campaign…" : "Save campaign as draft →"}</button>
          {message && <p role="status">{message}</p>}
          </form>
        </Panel>
        <Panel title="Prize preview">
          {previewImage ? <img className="preview-image" src={previewImage} alt={preview.competitionTitle || "Campaign prize preview"} /> : <div className="preview-image preview-image-empty">Upload a campaign image to preview it here</div>}
          <div className="preview-heading">
            <div><h2>{preview.competitionTitle || "Your competition title"}</h2><p>{preview.prizeCategory || "Prize category"}</p></div>
            <span className="status">Draft</span>
          </div>
          <p className="preview-description">{preview.prizeDescription || "Your prize description will appear here as you type."}</p>
          <div className="preview-facts"><div><span>ENTRY PRICE</span><strong>{preview.entryPrice === "" ? "Not set" : `£${Number(preview.entryPrice).toFixed(2)}`}</strong></div><div><span>ENTRY CAP</span><strong>{preview.entryCap || "Not set"}</strong></div></div>
          <p className="preview-copy">
            Competition cannot go live before all approval checks pass.
          </p>
          <div className="requirement-list">
            {[
              ["Prize details & image", Boolean(preview.competitionTitle && preview.prizeCategory && preview.prizeDescription && imageFile), "Complete", "Title, category, description and image required"],
              ["Rules & free-entry route", Boolean(preview.rulesText && preview.freeEntryInstructions), "Complete", "Rules and free-entry instructions required"],
              ["Eligibility & draw controls", Boolean(preview.startsAt && preview.closesAt && preview.drawAt && preview.eligibilityChecks.length === 4), "Complete", "Dates and all four checks required"],
              ["Payment gateway acceptance", false, "Complete", "Approval required after draft is saved"],
            ].map(([label, complete, ready, pending]) => (
              <div key={label}>
                <strong>{complete ? "✓ " : "○ "}{label}</strong>
                <span>{complete ? ready : pending}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <DesignFooter />
    </AdminLayout>
  );
}
