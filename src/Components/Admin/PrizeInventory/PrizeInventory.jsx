import { StandardAdminPage } from "../Shared/AdminPatterns";
import "./PrizeInventory.css";

export default function PrizeInventory(){
  return <StandardAdminPage
    heading={{eyebrow:"WINJOLT CONTROL / ASSETS & PROCUREMENT",title:"Prize inventory",subtitle:"Record ownership, supplier provenance, valuation, imagery and fulfilment conditions for every prize.",secondary:"Help & policies",primary:"+ Add prize"}}
    stats={[["PRIZES CATALOGUED","0","Authoritative inventory"],["VERIFIED STOCK","0","Evidence approved"],["RESERVED PRIZES","0","Assigned to campaigns"],["FULFILLED PRIZES","0","Delivered to winners"]].map(([label,value,note])=>({label,value,note}))}
    filters={["All statuses","Date range","Export"]}
    mainTitle="Prize procurement register" mainSubtitle="Operational inventory records and current verification state"
    empty={["No prizes in inventory","Use Add prize to create the first controlled asset record."]}
    sideTitle="Prize verification" sideItems={["Prove legal control","Photograph actual item","Document prize value","Fulfilment readiness"].map(x=>[`○ ${x}`,"Evidence required before publication"])}
  />;
}
