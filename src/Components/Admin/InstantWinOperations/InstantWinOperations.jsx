import {
  AdminLayout,
  DesignFooter,
  FilterBar,
  PageHeading,
  Panel,
  StatGrid,
} from "../Shared/AdminLayout";
import wheel from "../../../Assets/Pictures/jolt-wheel.png";
import { api } from "../../../services/api";
import "./InstantWinOperations.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function InstantWinOperations() {
  const navigate = useNavigate();
  const [campaigns,setCampaigns]=useState([]); const [results,setResults]=useState([]); const [error,setError]=useState("");
  useEffect(()=>{Promise.all([api.get("/admin/competitions?limit=100"),api.get("/admin/instant-results?limit=100")]).then(([competitionData,resultData])=>{setCampaigns(competitionData.items.filter(item=>item.instant?.enabled));setResults(resultData.items);}).catch(requestError=>setError(requestError.message));},[]);
  const active=campaigns.filter(item=>item.instant?.status==="ACTIVE").length;
  const outstanding=results.filter(item=>["COMMITTED_WIN","NOTIFIED","CLAIM_PENDING"].includes(item.status)).length;
  return (
    <AdminLayout>
      <PageHeading
        eyebrow="WINJOLT CONTROL  /  FAIR RESULT ALLOCATION"
        title="Instant-win operations"
        subtitle="Manage the instant-win catalogue and auditable, preassigned outcomes."
        secondary="Global Jolt controls"
        secondaryTo="/admin/jolt-reveal-controls"
        primary="+ Draft instant campaign"
        onPrimary={() => navigate("/admin/competition-instant-wins")}
      />
      <StatGrid
        items={[
          {
            label: "ACTIVE CAMPAIGNS",
            value: String(active),
            note: `${campaigns.length} configured campaigns`,
          },
          {
            label: "ALLOCATED RESULTS",
            value: String(results.length),
            note: "Authoritative result records",
          },
          {
            label: "OUTSTANDING CLAIMS",
            value: String(outstanding),
            note: "Committed or pending claims",
          },
          {
            label: "WHEEL STATE",
            value: campaigns.some(item=>item.instant?.wheelMode==="PRESENTATION_ON") ? "ON" : "OFF",
            note: "Presentation only",
          },
        ]}
      />
      <div className="notice-banner">
        <div>
          <strong>ϟ &nbsp; INSTANT-WIN CAMPAIGN INVENTORY</strong>
          <p>
            Configure finite reward counts, audited allocation, free/paid
            parity, published conditions and release approvals per campaign.
          </p>
        </div>
        <button className="btn primary" onClick={() => navigate("/admin/competition-instant-wins")}>CONFIGURE CAMPAIGNS →</button>
      </div>
      <FilterBar />
      <div className="two-col instant-cols">
        <Panel
          title="Instant-win prize allocation"
          subtitle="The reveal animation is not permitted to determine winners."
        >
          <div className="detail-list">
            {campaigns.map((item) => <div key={item.publicId}><strong>{item.title}</strong><span>{item.instant.status} · {item.instant.tiers?.reduce((sum,tier)=>sum+(tier.plannedCount||0),0) || 0} planned prizes · {item.status}</span></div>)}
            {!campaigns.length&&<div><strong>No instant-win campaigns configured</strong><span>Choose a draft competition and add its genuine prize tiers.</span></div>}
            {error&&<p role="alert">{error}</p>}
          </div>
        </Panel>
        <Panel className="wheel-panel">
          <img src={wheel} alt="Jolt Reveal prize wheel" />
          <h2>Jolt Reveal preview</h2>
          <p>All outcomes are determined before any animation.</p>
          <span className={`status ${active ? "" : "blocked"}`}>{active ? "Active" : "Inactive"}</span>
        </Panel>
      </div>
      <DesignFooter />
    </AdminLayout>
  );
}
