import { AdminLayout, PageHeading, Panel, StatGrid } from "../Shared/AdminLayout";
import wheel from "../../../Assets/Pictures/jolt-wheel.png";
import "./JoltCreditPrizes.css";

const pool=[
  ["£10 website credit",1,0,1,"£10.00"],
  ["£5 website credit",2,0,2,"£10.00"],
  ["£2 website credit",3,0,3,"£6.00"],
  ["£1 website credit",4,0,4,"£4.00"],
  ["50p website credit",10,0,10,"£5.00"],
];
const controls=[
  ["20 website-credit winning outcomes","Wheel merely reveals a determined result","FIXED","info"],
  ["Campaign lifecycle","Draft → approved → locked → closed","DRAFT","amber"],
  ["Prize pool editing","Permitted only before activation","UNLOCKED","amber"],
  ["Winner modification","No post-commitment override","BLOCKED","red"],
  ["Live entries","Disabled until all checks pass","OFF","amber"],
];
const wallet=[
  ["Wallet issuance","Credit a verified winner exactly once after an immutable outcome."],
  ["Spend restrictions","State clearly which WinJolt goods or entries credit can buy; obtain legal review."],
  ["No cash substitution","Do not describe £10 site credit as a £10 cash prize or iPhone."],
  ["Expiry and limitations","Publish any expiry, transferability or eligibility restrictions before entry."],
  ["Refunds & disputes","Trace reversals and balance adjustments with approved reasons."],
  ["Ledger reconciliation","Track all £35 prize liability, credited/used/expired balances and claim events."],
];
const approvals=["Legal classification","Proof of 20 credit awards","Customer terms & odds","Paid/free entry parity","Fair randomness & audit","Result integrity & security","Checkout/age compliance","Two-person approval"];
const audit=[
  ["Prize pool configured","Approved 20-credit / £35 liability manifest, campaign rules and approver","NOT RECORDED"],
  ["Random allocation verified","Test output, randomness verification & independent audit reference","PENDING"],
  ["Campaign published / locked","Publication timestamp, immutable settings snapshot and signature","BLOCKED"],
  ["Entry & result committed","Eligibility check, entry record, outcome reference, timestamp","NO ENTRIES"],
  ["Customer reveal & claim","Reveal delivery, winning notification and fulfilment status","NO RECORDS"],
  ["Pool exhaustion / closure","Final accounting: 20 credit rewards and £35 credit liability reconciled","NOT STARTED"],
];

const Chip=({children,tone="amber"})=><span className={`credit-chip ${tone}`}>{children}</span>;

export default function JoltCreditPrizes(){
  return <AdminLayout>
    <PageHeading eyebrow="INSTANT WINS / CAMPAIGN CONFIGURATION" title="Jolt Reveal · Website-credit prizes" subtitle="Credit-only wheel · 50p to £10 · 20 planned wins · auditable allocation and disclosures." secondary="← Instant wins" primary="Save draft"/>
    <div className="notice-banner credit-notice"><div><strong>◇ &nbsp; DRAFT CAMPAIGN — CUSTOMER ENTRY DISABLED</strong><p>UK legal classification, fair allocation, independent audit, actual prizes, customer terms and free-route parity must pass approval before release.</p></div><Chip tone="red">NOT APPROVED</Chip></div>
    <StatGrid items={[{label:"FIXED PRIZE POOL",value:"20",note:"Campaign allocation limit"},{label:"AWARDED / COMMITTED",value:"0",note:"No outcomes exist"},{label:"REMAINING INVENTORY",value:"20",note:"No prizes distributed"},{label:"PUBLICATION",value:"BLOCKED",note:"Awaiting verified approvals"}]}/>

    <div className="credit-grid credit-top-grid">
      <Panel title="Website-credit prize inventory" subtitle="20 fixed website-credit rewards · £35 minimum / £35 maximum">
        <div className="credit-table"><div className="credit-head"><b>PRIZE TIER</b><b>PLANNED</b><b>AWARDED</b><b>LEFT</b><b>POOL VALUE</b></div>{pool.map(row=><div className="credit-row" key={row[0]}><strong>{row[0]}<small>Credit-only reward</small></strong>{row.slice(1).map((value,index)=><span className={index===2?"blue-number":""} key={index}>{value}</span>)}</div>)}<div className="credit-total"><b>TOTAL FIXED POOL</b><b>20</b><b>0</b><b>20</b><b>£35.00</b></div></div>
        <div className="credit-alert amber"><b>After publishing, prize quantities and allocation parameters must be locked and independently auditable.</b><span>A secret “no-prizes” switch must not be available while prizes are advertised as winnable.</span></div>
      </Panel>
      <Panel title="Campaign operating controls" subtitle="Fixed prize allocation">
        <div className="control-list">{controls.map(([title,text,state,tone])=><div className="control-item" key={title}><b>{title}</b><p>{text}</p><Chip tone={tone}>{state}</Chip></div>)}</div>
        <div className="credit-alert amber"><b>Never hide prize exhaustion</b><span>Pause or close new entries, and update customer disclosures.</span></div>
      </Panel>

      <Panel title="Jolt Reveal · website-credit-only wheel" subtitle="Twenty credit wins, from 50p to £10. No phone, laptop, voucher or cash awards on this wheel.">
        <div className="wheel-details"><img src={wheel} alt="Jolt Reveal website-credit wheel"/><div><h2>20 planned credit prizes</h2><strong>£35.00 maximum campaign credit liability</strong>{pool.map(row=><p key={row[0]}><b>{row[0].split(" ")[0]}</b><span>{row[1]} winning reward{row[1]===1?"":"s"}</span></p>)}</div></div>
        <div className="credit-alert info"><b>The wheel’s segment sizes do not represent winning odds.</b><span>An eligible entry receives a securely assigned result before animation. The game may also return No Win; actual probability remains undisclosed until verified and published.</span></div>
      </Panel>
      <Panel title="Customer wallet & credit accounting" subtitle="Required production behaviours and published conditions">
        <div className="wallet-list">{wallet.map(([title,text])=><div key={title}><b>{title}</b><p>{text}</p></div>)}</div>
        <div className="credit-alert amber"><b>UK legal review required</b><span>Credit usable toward paid chance-based entries may raise additional regulatory concerns.</span></div>
      </Panel>

      <Panel title="Fair allocation & secure result commitment" subtitle="Required behaviour for a legitimate instant-win system">
        <div className="credit-alert info"><b>RESULT ALLOCATION · AUDITABLE RANDOM PROCESS</b><span>Winning and non-winning outcomes must be assigned fairly and randomly, using a verifiable method. Results must be committed before the wheel animation runs.</span></div>
        <div className="fair-grid">{[["Prize cap","Exactly 20 winning credit outcomes, valued £35 in total."],["No staff steering","Employees cannot choose individual winners or rewrite committed result records."],["Entry parity","Eligible paid and free routes must feed the same selection process."],["Race-safe allocation","Concurrent eligible entries cannot receive the same limited prize twice."]].map(([h,p])=><div key={h}><b>{h}</b><p>{p}</p></div>)}</div>
        <div className="credit-alert info"><b>INDEPENDENT AUDIT EVIDENCE REQUIRED</b><span>Retain evidence of fair, random allocations, available/won prizes and actual customer notifications.</span></div>
        <div className="credit-alert amber"><b>WINNING PROBABILITY: UNDETERMINED</b><span>Do not invent a win percentage. The eligible-entry pool, selection schedule and significant conditions must be known and verified before publishing odds.</span></div>
      </Panel>
      <Panel title="Release-approval checklist" subtitle="All required sign-offs must pass before publishing or collecting entries.">
        <div className="approval-list">{approvals.map((item,index)=><div key={item}><b>{String(index+1).padStart(2,"0")} · {item}</b><Chip>PENDING</Chip><p>{index===0?"UK free draw/prize-competition structure reviewed":"Evidence and authorised sign-off required"}</p></div>)}</div>
        <div className="credit-alert red"><b>0 OF 8 APPROVALS COMPLETED</b><span>Publish action disabled. Draws, instant outcomes, payments and paid entries remain unavailable.</span></div>
      </Panel>
    </div>

    <Panel className="customer-prize-panel" title="Customer-facing prize information" subtitle="Copy preview · Must be checked against real prizes, odds and approved campaign terms">
      <div className="customer-copy"><div><small>JOLT REVEAL · WEBSITE CREDIT ONLY</small><h3>WIN up to £10 in website credit.</h3><p>Twenty website-credit prizes. No phones, laptops or physical products can be won on this wheel. Entry limits, chances and terms will be disclosed before launch.</p><b>20 planned credits · £35.00 total · 0 awarded</b></div><div><h3>TWO CLEAR ENTRY ROUTES</h3><div className="route-card"><b>PAID ENTRY</b><span>Entry price to be approved</span></div><div className="route-card"><b>FREE ENTRY</b><span>Qualifying route must be no less convenient</span></div><p>Both routes must be presented with equal prominence and feed into the same fair allocation process.</p></div></div>
    </Panel>

    <Panel className="credit-audit" title="Allocation audit log & evidence" subtitle="Expected immutable events and current evidence status">
      <div className="audit-table"><div className="audit-head"><b>REQUIRED EVENT</b><b>EVIDENCE STORED</b><b>CURRENT STATE</b></div>{audit.map(([event,evidence,state])=><div className="audit-row" key={event}><b>{event}</b><span>{evidence}</span><Chip tone={state==="BLOCKED"?"red":"amber"}>{state}</Chip></div>)}</div>
      <div className="credit-alert info"><b>Independent auditor’s statement and prize-distribution reconciliation required</b><span>Retain evidence of fair, random allocations, available/won prizes and actual customer notifications.</span></div>
    </Panel>
    <div className="credit-footer"><div><strong>CAMPAIGN NOT APPROVED · LAUNCH LOCKED</strong><span>Save draft is a visual control only. Publishing remains unavailable until every release gate passes.</span></div><button type="button" disabled>PUBLISH DISABLED</button></div>
  </AdminLayout>;
}
