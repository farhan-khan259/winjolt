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
import { Link } from "react-router-dom";
const rows = [
  ["Performance Car + Cash", "Vehicle competition", car],
  ["£10,000 Cash Prize", "Cash campaign", cash],
  ["Technology & Gaming Bundle", "Technology", gaming],
];
export default function CompetitionManagement() {
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
          { label: "LIVE CAMPAIGNS", value: "0", note: "No published prizes" },
          {
            label: "DRAFT CONCEPTS",
            value: "3",
            note: "Campaign drafts",
          },
          { label: "CLOSED DRAWS", value: "0", note: "No results published" },
          { label: "ARCHIVED", value: "0", note: "Nothing archived" },
        ]}
      />
      <FilterBar />
      <div className="two-col">
        <Panel
          title="All competition campaigns"
          subtitle="Draft concepts · No campaign is currently published"
        >
          <div className="campaign-list">
            {rows.map((r) => (
              <div className="campaign-row" key={r[0]}>
                <div className="prize-cell">
                  <img src={r[2]} alt="" />
                  <div>
                    <strong>{r[0]}</strong>
                    <small>{r[1]} &nbsp;·&nbsp; Managed campaign record</small>
                  </div>
                </div>
                <span className="status">Draft</span>
                <Link className="action-link" to="/admin/campaign-control-centre">Edit →</Link>
              </div>
            ))}
          </div>
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
