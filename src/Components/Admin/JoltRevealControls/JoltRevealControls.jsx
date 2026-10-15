import { AdminLayout, PageHeading, Panel, StatGrid } from "../Shared/AdminLayout";
import "./JoltRevealControls.css";

const switches=[
  ["WHEEL ANIMATION","OFF shows a static verified result instead of animation.","ON"],
  ["NEW JOLT ENTRIES","Emergency global PAUSE blocks only new entries across affected campaigns; prior entries/results retained.","CONTROLLED"],
  ["PAUSE / RESUME RIGHTS","Require authorised staff, reason, timestamp, and dual approval when appropriate.","RESTRICTED"],
  ["PUBLIC STATUS UPDATES","When paused/closed, show truthful reason and availability. Do not imply prizes remain winnable.","REQUIRED"],
];
const categories=[
  ["WEBSITE CREDIT","£0.50 to £10 or other approved values","Wallet liability, expiry, redemption rules"],
  ["PHYSICAL PRIZE","e.g. iPhone / Mac / car / tools","Ownership, delivery, valuation, claim verification"],
  ["CASH PRIZE","Real cash amount published for that campaign","Payment, AML/tax and eligibility reviewed"],
  ["NO WIN","Non-winning outcome if rules allow it","Accurate chance messaging, no invented odds"],
];
const campaigns=[["20-credit example","20 winning website credits · £35 liability"],["Physical rewards example","e.g. an iPhone or Mac only if actually available"],["Mixed rewards example","Credit + real products, subject to approved terms"]];
const rules=[["DRAFT","No public entries or claimed outcomes"],["SCHEDULED","Upcoming, not available yet"],["LIVE","Accept eligible entries to verified pool"],["PAUSED","Refuse new entries; preserve previous claims"],["CLOSED","Stop new entries; finish outstanding outcomes"],["ARCHIVED","Read-only audit, reporting and records"]];
const tests=["Operator switches wheel animation OFF: customer still sees previously committed result in a static accessible view.","Operator pauses a campaign: new paid/free entries are rejected equally; entries already accepted remain recorded and claims are honoured.","Resume only when eligibility, available genuine prizes, rules and approvals remain valid; do not regenerate already committed results.","Prize types and availability come from each campaign’s verified inventory.","Global pause and individual pause both write actor ID, timestamp, reason, before/after state, communication status and reviewer.","Close or exhaust prize inventory transparently; winner/claim records remain accessible to authorised users and customers."];

export default function JoltRevealControls(){return <AdminLayout>
  <PageHeading eyebrow="INSTANT WINS / GLOBAL JOLT REVEAL CONTROLS" title="Jolt Reveal · All prize types & availability" subtitle="Control the wheel’s presentation separately from campaign availability and locked prize inventories." secondary="← Instant wins" primary="Review controls"/>
  <div className="notice-banner jrc-notice"><div><strong>⚡ &nbsp; PRESENTATION CONTROLS CANNOT CHANGE COMMITTED RESULTS</strong><p>All winning outcomes must come from the approved campaign’s genuine prize inventory and be determined before reveal. No secretly all-losing mode.</p></div></div>
  <StatGrid items={[{label:"WHEEL PRESENTATION",value:"ON",note:"Global animation feature switch"},{label:"CAMPAIGN ENTRY",value:"CONTROLLED",note:"Individually live, paused or closed"},{label:"PRIZE TYPES",value:"FLEXIBLE",note:"Credit, cash, physical, other approved"},{label:"OVERRIDE RESULTS",value:"PROHIBITED",note:"Committed results immutable"}]}/>
  <div className="jrc-layout"><div className="jrc-stack"><Panel title="Global switches · two independent controls"><div className="jrc-switches">{switches.map(([h,p,s])=><div key={h}><b>{h}</b><span>{p}</span><em>{s}</em></div>)}</div></Panel><Panel title="Campaign-configurable prize categories" subtitle="The outcome list is generated from that campaign’s genuine, published prize pool."><div className="jrc-categories">{categories.map(([h,v,p])=><div key={h}><b>{h} · {v}</b><span>{p}</span></div>)}</div></Panel></div><div className="jrc-stack"><Panel title="Independent campaign settings"><div className="jrc-campaigns">{campaigns.map(([h,p])=><div key={h}><b>{h}</b><span>{p}</span><em>DRAFT</em></div>)}</div></Panel><Panel title="Pause, off & closure rules"><div className="jrc-rules">{rules.map(([h,p])=><div key={h}><b>{h}</b><span>{p}</span></div>)}</div></Panel></div></div>
  <Panel className="jrc-testing" title="Mandatory implementation and testing requirements"><div>{tests.map(text=><p key={text}>□ &nbsp; {text}</p>)}</div></Panel>
  <div className="jrc-footer"><b>SECURE OPERATION REQUIRED</b><span>Runtime toggles, allocation logic and compliant messaging must be enforced in backend services and independently reviewed.</span></div>
</AdminLayout>}
