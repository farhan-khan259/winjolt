import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../../services/api";
import { AdminLayout, PageHeading, Panel } from "../Shared/AdminLayout";
import "./CompetitionInstantWins.css";

const emptyTier = () => ({ code: "", title: "", kind: "PHYSICAL", valueMinor: 0, plannedCount: 1, allocatedCount: 0, fulfilmentTerms: "" });

export default function CompetitionInstantWins() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [campaigns, setCampaigns] = useState([]);
  const [campaign, setCampaign] = useState(null);
  const [enabled, setEnabled] = useState(false);
  const [wheelMode, setWheelMode] = useState("PRESENTATION_ON");
  const [tiers, setTiers] = useState([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const selectedId = params.get("id") || "";

  useEffect(() => {
    api.get("/admin/competitions?limit=100").then(({ items }) => {
      setCampaigns(items);
      if (!selectedId && items[0]) setParams({ id: items[0].publicId }, { replace: true });
    }).catch((error) => setMessage(error.message));
  }, [selectedId, setParams]);

  useEffect(() => {
    if (!selectedId) return;
    setMessage("Loading instant-win configuration…");
    api.get(`/admin/competitions/${encodeURIComponent(selectedId)}`).then(({ item }) => {
      setCampaign(item);
      setEnabled(Boolean(item.instant?.enabled));
      setWheelMode(item.instant?.wheelMode || "PRESENTATION_ON");
      setTiers(item.instant?.tiers?.map((tier) => ({ ...tier })) || []);
      setMessage("");
    }).catch((error) => setMessage(error.message));
  }, [selectedId]);

  const updateTier = (index, field, value) => setTiers((current) => current.map((tier, tierIndex) => tierIndex === index ? { ...tier, [field]: ["valueMinor", "plannedCount"].includes(field) ? Number(value) : value } : tier));
  const addTier = () => setTiers((current) => [...current, emptyTier()]);
  const removeTier = (index) => setTiers((current) => current.filter((_, tierIndex) => tierIndex !== index));

  const save = async () => {
    if (!campaign) return;
    if (enabled && (!tiers.length || tiers.some((tier) => !tier.code.trim() || !tier.title.trim() || tier.plannedCount < 1 || tier.valueMinor < 0))) {
      setMessage("Every enabled prize tier needs a code, title, quantity and valid value.");
      return;
    }
    try {
      setSaving(true);
      setMessage("Saving instant-win configuration…");
      const instant = { enabled, status: enabled ? "DRAFT" : "DISABLED", wheelMode, allocationCursor: campaign.instant?.allocationCursor || 0, tiers: enabled ? tiers.map((tier) => ({ ...tier, code: tier.code.trim().toUpperCase(), title: tier.title.trim(), valueMinor: Number(tier.valueMinor), plannedCount: Number(tier.plannedCount), allocatedCount: Number(tier.allocatedCount || 0) })) : [] };
      const { item } = await api.patch(`/admin/competitions/${campaign.publicId}`, { instant, reason: "Instant-win configuration updated in campaign builder" });
      setCampaign(item);
      setTiers(item.instant?.tiers || []);
      setMessage("Instant-win configuration saved to the database.");
    } catch (error) { setMessage(error.message); }
    finally { setSaving(false); }
  };

  return <AdminLayout>
    <PageHeading eyebrow="COMPETITION BUILDER / INSTANT-WIN LAYER" title="Configure real instant wins" subtitle="Choose a database campaign, configure its finite prize inventory and save it to the authoritative campaign record." secondary="← Campaign" secondaryTo={campaign ? `/admin/campaign-control-centre?id=${campaign.publicId}` : "/admin/competitions"} primary={saving ? "Saving…" : "Save configuration"} onPrimary={save} busy={saving}/>
    <Panel title="Competition" subtitle="Instant wins belong to a competition; they are not separate mock catalogue cards.">
      <label className="ciw-campaign-picker">CAMPAIGN<select value={selectedId} onChange={(event) => setParams({ id: event.target.value })}><option value="">Select a campaign</option>{campaigns.map((item) => <option key={item.publicId} value={item.publicId}>{item.title} · {item.status}</option>)}</select></label>
      {campaign && <div className="ciw-selected"><strong>{campaign.title}</strong><span>{campaign.publicId} · {campaign.category} · {campaign.status}</span></div>}
    </Panel>
    {campaign && <div className="ciw-layout">
      <div className="ciw-stack"><Panel title="Instant-win controls" subtitle="Changes are saved directly to this campaign in MongoDB.">
        <div className="ciw-control-grid"><label><input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)}/> ENABLE INSTANT WINS</label><label>REVEAL MODE<select value={wheelMode} onChange={(event) => setWheelMode(event.target.value)}><option value="PRESENTATION_ON">Reveal animation on</option><option value="PRESENTATION_OFF">Reveal animation off</option></select></label></div>
        <div className="ciw-live-table"><div className="ciw-live-head"><b>CODE</b><b>PRIZE TITLE</b><b>TYPE</b><b>VALUE (£)</b><b>QTY</b><b/></div>{tiers.map((tier, index) => <div className="ciw-live-row" key={`${tier.code}-${index}`}>
          <input value={tier.code} onChange={(event) => updateTier(index, "code", event.target.value)} placeholder="PHONE"/><input value={tier.title} onChange={(event) => updateTier(index, "title", event.target.value)} placeholder="Prize title"/>
          <select value={tier.kind || "PHYSICAL"} onChange={(event) => updateTier(index, "kind", event.target.value)}><option>CASH</option><option>ELECTRONICS</option><option>TOOLS</option><option>VOUCHER</option><option>PHYSICAL</option><option>WEBSITE_CREDIT</option><option>OTHER</option></select>
          <input type="number" min="0" step="0.01" value={(tier.valueMinor || 0) / 100} onChange={(event) => updateTier(index, "valueMinor", Math.round(Number(event.target.value) * 100))}/><input type="number" min="1" step="1" value={tier.plannedCount} onChange={(event) => updateTier(index, "plannedCount", event.target.value)}/><button type="button" onClick={() => removeTier(index)}>Remove</button>
        </div>)}</div>
        <div className="ciw-actions"><button type="button" onClick={addTier}>+ Add prize tier</button><button type="button" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save to database"}</button></div>{message && <div className="ciw-added" role="status">{message}</div>}
      </Panel></div>
      <div className="ciw-stack"><Panel title="Publication safeguards"><div className="ciw-safeguards">{[["Finite inventory", "Every tier has an exact quantity and value."],["Main draw retained", "Each issued ticket remains eligible for the campaign's main draw."],["Server outcome", "The backend commits the outcome before any reveal animation."],["Approval required", "Save as draft, complete campaign gates, then use the controlled review and publication workflow."]].map(([title, copy]) => <div key={title}><b>{title}</b><span>{copy}</span></div>)}</div></Panel><button className="btn secondary" type="button" onClick={() => navigate(`/admin/campaign-control-centre?id=${campaign.publicId}`)}>Return to campaign controls</button></div>
    </div>}
  </AdminLayout>;
}
