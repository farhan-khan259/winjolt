import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import {
  AdminLayout,
  DesignFooter,
  FilterBar,
  PageHeading,
  Panel,
  StatGrid,
} from "../Shared/AdminLayout";
import "./OperationsCalendar.css";
export default function OperationsCalendar() {
  let days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const [campaigns,setCampaigns]=useState([]); const [error,setError]=useState("");
  useEffect(()=>{api.get("/admin/competitions?limit=100").then(result=>setCampaigns(result.items)).catch(requestError=>setError(requestError.message));},[]);
  const events=campaigns.flatMap(item=>[[item.startsAt,"Launch",item],[item.closesAt,"Entries close",item],[item.drawAt,"Draw",item]]).filter(([date])=>date).sort((a,b)=>new Date(a[0])-new Date(b[0]));
  return (
    <AdminLayout>
      <PageHeading
        eyebrow="WINJOLT CONTROL  /  SCHEDULING"
        title="Operations calendar"
        subtitle="Coordinate prize deadlines, draw windows, verification and fulfilment work."
        primary="+ Create campaign event"
        primaryTo="/admin/create-competition"
      />
      <StatGrid
        items={[
          { label: "PLANNED EVENTS", value: String(events.length), note: "Campaign milestones" },
          { label: "UPCOMING DRAWS", value: String(events.filter(([,type])=>type==="Draw").length), note: "Configured draw dates" },
          { label: "OPEN TASKS", value: "0", note: "No open tasks" },
          {
            label: "FULFILMENT VISITS",
            value: "0",
            note: "No collection bookings",
          },
        ]}
      />
      <FilterBar filters={["All statuses", "All dates", "Date range"]} />
      <div className="two-col calendar-cols">
        <Panel
          title="Calendar · Preview week"
          subtitle="Campaign launch, closing and draw milestones"
        >
          <div className="week-grid">
            {days.map((d) => (
              <div className="day-card" key={d}>
                <strong>{d}</strong>
                <div>—</div>
                <small>{events.filter(([date])=>new Date(date).toLocaleDateString("en-GB",{weekday:"short"}).toUpperCase()===d).length} events</small>
              </div>
            ))}
          </div>
          <h2 className="milestone-title">Scheduled operational milestones</h2>
          <div className="detail-list">{events.slice(0,12).map(([date,type,item]) => (
              <div key={`${item.publicId}-${type}`}>
                <strong>{type} · {item.title}</strong>
                <span>{new Date(date).toLocaleString("en-GB")} · {item.status}</span>
              </div>
            ))}{events.length===0&&<div><strong>No scheduled milestones</strong><span>Create or edit a campaign to add dates.</span></div>}{error&&<p role="alert">{error}</p>}
          </div>
        </Panel>
        <Panel title="Scheduling controls">
          <div className="detail-list">
            {[
              "Create competition deadline",
              "Schedule result verification",
              "Book winner handover",
              "Assign responsible staff",
            ].map((x) => (
              <div key={x}>
                <strong>{x}</strong>
                <span>Create only after required sign-off</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <DesignFooter />
    </AdminLayout>
  );
}
