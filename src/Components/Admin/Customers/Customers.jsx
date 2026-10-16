import { StandardAdminPage } from "../Shared/AdminPatterns";
import "./Customers.css";

export default function Customers(){
  return <StandardAdminPage
    heading={{eyebrow:"WINJOLT CONTROL / CUSTOMER OPERATIONS",title:"Customers",subtitle:"Understand entrants, communication preferences, verification and responsible participation controls.",secondary:"Help & policies",primary:"Export customer data"}}
    stats={["REGISTERED CUSTOMERS","VERIFIED AGE 18+","RESTRICTED ACCOUNTS","CONSENT RECORDS"].map(label=>({label,value:"0",note:"No connected accounts"}))}
    filters={["All statuses","Date range","Export"]}
    mainTitle="Customer account directory"
    mainSubtitle="Operational records and current status"
    tabs={["All customers","Verified","Restricted","Email consent"]}
    empty={["No customer profiles available","Account registration, age verification and privacy controls must be implemented securely."]}
    details={["Profile & consent","Entry / order history","Account restrictions","Data rights requests"].map(x=>[x,"Role-authorised access and audit logging required."])}
    sideTitle="Privacy & participation"
    sideItems={["Data minimisation","Identity and age checks","Spending and exclusion","Access and erasure requests"].map(x=>[`○ ${x}`,"Controlled production workflow required"])}
  />;
}
