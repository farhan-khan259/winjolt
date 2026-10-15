import { Link } from "react-router-dom";
import { StandardAdminPage } from "../Shared/AdminPatterns";
import "./OrdersPayments.css";

export default function OrdersPayments(){
  return <StandardAdminPage
    heading={{eyebrow:"WINJOLT CONTROL / TRANSACTIONS & RECONCILIATION",title:"Orders & payments",subtitle:"Track settled and unsettled payments, receipts, refunds and payment-provider events.",secondary:"Help & policies",primary:"Export ledger"}}
    stats={[["GROSS PAYMENT VALUE","£0.00","No completed charges"],["PAID ORDERS","0","Nothing confirmed"],["REFUNDS","0","None recorded"],["RECONCILIATION","PENDING","Provider not connected"]].map(([label,value,note])=>({label,value,note}))}
    filters={["All statuses","Date range","Export"]}
    mainTitle="Transaction reconciliation"
    mainSubtitle="Operational records and current status"
    empty={["No payment transactions","Connect an approved payment service and verify signed webhooks before issuing any paid tickets."]}
    sideTitle="Finance safeguards"
    sideItems={["Provider-signed webhooks","Idempotent ticket allocation","Refund and reversal handling","Reconciliation report"].map(x=>[`○ ${x}`,"Production approval required"])}
  >
    <Link className="payment-record-link" to="/admin/payment-refund-record">OPEN PAYMENT &amp; REFUND RECORD <span>→</span></Link>
    <div className="mini-grid">{["Incoming charge","Entry fulfilment","Payout match"].map(x=><div key={x}>{x}</div>)}</div>
  </StandardAdminPage>;
}
