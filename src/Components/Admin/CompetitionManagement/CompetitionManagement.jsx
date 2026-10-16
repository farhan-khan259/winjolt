import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../services/api";
import {
  AdminLayout,
  DesignFooter,
  FilterBar,
  PageHeading,
  Panel,
  StatGrid,
} from "../Shared/AdminLayout";
import car from "../../../Assets/Pictures/car-card.jpg";
import cash from "../../../Assets/Pictures/cash-card.jpg";
import gaming from "../../../Assets/Pictures/gaming-card.jpg";
import "./CompetitionManagement.css";

const campaignImages = [car, cash, gaming];
export default function CompetitionManagement() {
  const [rows, setRows] = useState([]); const [error, setError] = useState("");
  useEffect(() => { api.get("/admin/competitions?limit=100").then((result) => setRows(result.items)).catch((requestError) => setError(requestError.message)); }, []);
  const count = (status) => rows.filter((row) => status.includes(row.status)).length;
  return (
    <AdminLayout>
      <PageHeading
        eyebrow="WINJOLT CONTROL  /  COMPETITION CAMPAIGNS"
        title="Competition management"
        subtitle="Manage every prize campaign from draft to publication and final result."
        primary="+ Create competition"
      />
      <StatGrid
        items={[
          { label: "LIVE CAMPAIGNS", value: String(count(["LIVE"])), note: "Published prizes" },
          {
            label: "DRAFT CONCEPTS",
            value: String(count(["DRAFT", "REVIEW_REQUIRED", "APPROVED", "SCHEDULED"])),
            note: "Campaign drafts",
          },
          { label: "CLOSED DRAWS", value: String(count(["COMPLETED"])), note: "Completed campaigns" },
          { label: "ARCHIVED", value: String(count(["ARCHIVED"])), note: "Archived campaigns" },
        ]}
      />
      <FilterBar />
      <div className="two-col">
        <Panel
          title="All competition campaigns"
          subtitle="Draft concepts · No campaign is currently published"
        >
          <div className="campaign-list">
            {rows.map((r, index) => (
              <div className="campaign-row" key={r.publicId}>
                <div className="prize-cell">
                  <img src={r.images?.[0] || campaignImages[index % campaignImages.length]} alt="" />
                  <div>
                    <strong>{r.title}</strong>
                    <small>{r.category} &nbsp;·&nbsp; {r.publicId}</small>
                  </div>
                </div>
                <span className="status">{r.status}</span>
                <Link className="action-link" to="/admin/campaign-control-centre">Edit →</Link>
              </div>
            ))}
          </div>
          {error && <p role="alert">{error}</p>}
        </Panel>
        <Panel title="Publish requirements">
          <div className="requirement-list">
            {[
              "Prize owned or contractually secured",
              "Competition rules approved",
              "Entry and refund processes verified",
              "Prize photos and descriptions final",
              "Free-entry route published",
              "Draw and auditor service tested",
            ].map((x) => (
              <div key={x}>
                <strong>{x}</strong>
                <span>Release gate · not yet approved</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <DesignFooter />
    </AdminLayout>
  );
}
