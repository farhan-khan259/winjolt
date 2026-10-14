import { AdminLayout, DesignFooter, FilterBar, PageHeading, Panel, StatGrid } from './AdminLayout';
import './AdminPatterns.css';

export function Steps({ items }) { return <div className="admin-steps">{items.map((x,i)=><div key={x}><b>{String(i+1).padStart(2,'0')}</b><strong>{x}</strong></div>)}</div> }
export function SoftItems({ items }) { return <div className="soft-list">{items.map(x=><div className="soft-row" key={x[0] || x}><strong>{Array.isArray(x)?x[0]:x}</strong>{Array.isArray(x)&&<p>{x[1]}</p>}</div>)}</div> }

export function StandardAdminPage({ heading, stats, filters, mainTitle, mainSubtitle, tabs, empty, details=[], sideTitle, sideSubtitle='Approval gates and controls for the production system', sideItems=[], children }) {
 return <AdminLayout><PageHeading {...heading}/><StatGrid items={stats}/>{filters!==false&&<FilterBar filters={filters}/>}<div className="two-col standard-cols"><Panel title={mainTitle} subtitle={mainSubtitle}>{tabs&&<div className="admin-tabs">{tabs.map(x=><span key={x}>{x}</span>)}</div>}{empty&&<div className="admin-empty"><strong>{empty[0]}</strong><p>{empty[1]}</p></div>}{children}{details.length>0&&<div className="detail-list">{details.map(x=><div key={x[0]}><strong>{x[0]}</strong><span>{x[1]}</span></div>)}</div>}</Panel><Panel title={sideTitle} subtitle={sideSubtitle}><SoftItems items={sideItems}/></Panel></div><DesignFooter/></AdminLayout>
}

export function RecordReviewPage({ heading, notice, fields, reviews }) {
 return <AdminLayout><PageHeading {...heading}/><div className="record-notice"><strong>● &nbsp; REVIEW REQUIRED</strong><span>{notice}</span></div><div className="two-col record-cols"><Panel title="RECORD DETAILS" subtitle="Review and maintain the operational record fields below."><div className="record-fields">{fields.map(x=><label key={x[0]}>{x[0]}<span>{x[1]}</span></label>)}</div></Panel><Panel title="REVIEW & AUTHORISATION" subtitle="Track reviewers, evidence and outstanding controls"><SoftItems items={reviews.map((x,i)=>[`${String(i+1).padStart(2,'0')}  ${x}`,'Pending · Requires evidence and permitted reviewer'])}/></Panel></div><Panel className="history-panel" title="Record history & evidence" subtitle="All edits, authorisations and status changes include actor, timestamp and immutable evidence."><div className="history-line">Record history will appear here as actions are completed.</div></Panel></AdminLayout>
}
