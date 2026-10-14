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
  return (
    <AdminLayout>
      <PageHeading
        eyebrow="WINJOLT CONTROL  /  SCHEDULING"
        title="Operations calendar"
        subtitle="Coordinate prize deadlines, draw windows, verification and fulfilment work."
        primary="+ New event"
      />
      <StatGrid
        items={[
          { label: "PLANNED EVENTS", value: "0", note: "No events scheduled" },
          { label: "DRAWS THIS WEEK", value: "0", note: "No confirmed draws" },
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
          subtitle="No public draws or staff appointments scheduled"
        >
          <div className="week-grid">
            {days.map((d) => (
              <div className="day-card" key={d}>
                <strong>{d}</strong>
                <div>—</div>
                <small>No events</small>
              </div>
            ))}
          </div>
          <h2 className="milestone-title">Scheduled operational milestones</h2>
          <div className="detail-list">
            {[
              [
                "Competition deadline",
                "Closing date must be published per campaign",
              ],
              ["Result verification", "Second reviewer checks locked entrants"],
              ["Prize collection", "Winner proof and tracking are required"],
            ].map((x) => (
              <div key={x[0]}>
                <strong>{x[0]}</strong>
                <span>{x[1]}</span>
              </div>
            ))}
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
