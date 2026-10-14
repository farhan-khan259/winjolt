import { RecordReviewPage } from "../Shared/AdminPatterns";
import "./PrizeAssetVerification.css";
export default function PrizeAssetVerification() {
  return (
    <RecordReviewPage
      heading={{
        eyebrow: "WINJOLT CONTROL / PRIZE STOCK CONTROL",
        title: "Prize asset verification",
        subtitle:
          "Evidence of ownership, precise specification, fulfilment and insurer details",
        secondary: "← Prize inventory",
        primary: "Save draft preview",
      }}
      notice="Prize imagery must match the verified asset record."
      fields={[
        ["PRIZE CATEGORY", "Vehicle"],
        ["MODEL / REGISTRATION", "Unverified"],
        ["OWNER / SUPPLIER", "Not documented"],
        ["CONDITION / MILEAGE", "Not recorded"],
        ["PRIZE VALUATION", "Evidence missing"],
        ["DELIVERY ARRANGEMENTS", "Not approved"],
      ]}
      reviews={[
        "Collect supplier invoice or legal supply agreement",
        "Photograph the actual item and serial/vehicle identifiers",
        "Approve valuation, insurance and transport logistics",
        "Attach compliance notes to the planned campaign",
      ]}
    />
  );
}
