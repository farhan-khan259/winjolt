import { StandardAdminPage } from "../Shared/AdminPatterns";
import "./AnalyticsReports.css";
export default function AnalyticsReports() {
  return (
    <StandardAdminPage
      heading={{
        eyebrow: "WINJOLT CONTROL / BUSINESS INTELLIGENCE",
        title: "Analytics & reports",
        subtitle:
          "Measure campaign economics, entry funnels, customer engagement and acquisition costs without hiding the free-entry impact.",
        secondary: "Help & policies",
        primary: "Export report",
      }}
      stats={[
        ["TOTAL REVENUE", "£0.00", "Payment data pending"],
        ["CONVERSION RATE", "—", "No valid visits"],
        ["AVERAGE ORDER VALUE", "—", "No paid orders"],
        ["COST PER ACQUISITION", "—", "Attribution unavailable"],
      ].map(([label, value, note]) => ({ label, value, note }))}
      filters={false}
      mainTitle="Performance by campaign"
      mainSubtitle="Traffic and revenue charts will appear when integrations are connected."
      sideTitle="Reporting dimensions"
      sideItems={[
        "Paid vs free entry",
        "Campaign profitability",
        "Cash movement",
        "Privacy-safe traffic",
      ].map((x) => [x, "Separate, validated production reporting"])}
    >
      <div className="chart-placeholder">Awaiting validated business data</div>
      <div className="mini-grid">
        {[
          "Campaign revenue & costs",
          "Conversion & demand",
          "Customer lifecycle",
        ].map((x) => (
          <div key={x}>{x}</div>
        ))}
      </div>
    </StandardAdminPage>
  );
}
