import { useState } from "react";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../../Assets/Pictures/winjolt-logo-transparent.png";
import { clearAdminSession } from "../../../auth";
import "./AdminLayout.css";

const groups = [
  [
    "OVERVIEW",
    [
      ["◇", "Command Centre", "/admin/command-centre"],
      ["▦", "Operations Calendar", "/admin/operations-calendar"],
    ],
  ],
  [
    "COMPETITIONS",
    [
      ["◆", "Competitions", "/admin/competitions"],
      ["+", "Create Competition", "/admin/create-competition"],
      ["ϟ", "Instant Wins", "/admin/instant-wins"],
      ["◯", "Games & Bingo", "/admin/games-bingo"],
    ],
  ],
  [
    "OPERATIONS",
    [
      ["▤", "Entries & Tickets", "/admin/entries-tickets"],
      ["✉", "Free Entry Queue", "/admin/free-entry-processing"],
      ["◎", "Draws & Results", "/admin/draws-results"],
      ["£", "Orders & Payments", "/admin/orders-payments"],
      ["◇", "Prize Inventory", "/admin/prize-inventory"],
      ["★", "Winners & Claims", "/admin/winners-claims"],
    ],
  ],
  [
    "PEOPLE",
    [
      ["◉", "Customers", "/admin/customers"],
      ["?", "Support & Complaints", "/admin/support-complaints"],
    ],
  ],
  [
    "BUSINESS",
    [
      ["▥", "Analytics", "/admin/analytics"],
      ["⌁", "Website Content", "/admin/website-content"],
      ["♙", "Staff & Permissions", "/admin/staff-permissions"],
      ["▣", "Audit & Compliance", "/admin/audit-compliance"],
      ["⚙", "Settings", "/admin/settings"],
    ],
  ],
];

export function AdminLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [globalQuery, setGlobalQuery] = useState("");
  const navigate = useNavigate();
  const searchableLinks = groups.flatMap(([, links]) => links).filter(([, , to]) => to !== "#");
  const runGlobalSearch = (event) => {
    event.preventDefault();
    const match = searchableLinks.find(([, label]) => label.toLowerCase().includes(globalQuery.trim().toLowerCase()));
    navigate(match ? match[2] : `/admin/command-centre?q=${encodeURIComponent(globalQuery.trim())}`);
    setGlobalQuery("");
  };
  return (
    <div className="admin-app">
      <aside className={`admin-sidebar ${menuOpen ? "is-open" : ""}`}>
        <button
          className="sidebar-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>
        <img className="admin-logo" src={logo} alt="WinJolt Competitions" />
        <span className="logo-caption">COMPETITION OPERATIONS</span>
        <div className="demo-mode">
          <i /> LIVE OPERATIONS
        </div>
        <nav>
          {groups.map(([title, links]) => (
            <div className="nav-group" key={title}>
              <h3>{title}</h3>
              {links.map(([icon, label, to]) =>
                to === "#" ? (
                  <span className="nav-link disabled" key={label}>
                    <b>{icon}</b>
                    {label}
                  </span>
                ) : (
                  <NavLink
                    key={label}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className="nav-link"
                  >
                    <b>{icon}</b>
                    {label}
                  </NavLink>
                ),
              )}
            </div>
          ))}
        </nav>
        <div className="admin-role">
          <strong>ADMINISTRATOR</strong>
          <span>Role permissions required</span>
        </div>
      </aside>
      {menuOpen && (
        <button
          className="sidebar-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
      )}
      <div className="admin-stage">
        <header className="admin-header">
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
          <div className="admin-brand">
            <strong>WINJOLT&nbsp; / &nbsp;OPERATIONS</strong>
            <span>Internal management system</span>
          </div>
          <form className="global-search" onSubmit={runGlobalSearch}>
            <span>⌕</span>
            <input
              aria-label="Global search"
              placeholder="Search prizes, entries, users or orders..."
              value={globalQuery}
              onChange={(event) => setGlobalQuery(event.target.value)}
              list="admin-destinations"
            />
            <datalist id="admin-destinations">{searchableLinks.map(([,label])=><option value={label} key={label}/>)}</datalist>
          </form>
          <span className="demo-pill">LIVE SYSTEM</span>
          <div className="admin-user">
            <strong>OPERATIONS ADMIN</strong>
            <span>Restricted staff access</span>
            <button type="button" onClick={()=>{clearAdminSession();navigate("/admin/login",{replace:true})}}>SIGN OUT</button>
          </div>
        </header>
        <main className="admin-main">{children}</main>
        <nav className="mobile-admin-nav">
          <NavLink to="/admin/command-centre"><b>⌂</b><span>TODAY</span></NavLink>
          <NavLink to="/admin/competitions"><b>◆</b><span>CAMPAIGNS</span></NavLink>
          <NavLink to="/admin/competition-launch-approval"><b>✓</b><span>APPROVALS</span></NavLink>
          <NavLink to="/admin/free-entry-processing"><b>✉</b><span>FREE ENTRY</span></NavLink>
        </nav>
      </div>
    </div>
  );
}

export function PageHeading({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary = "Export preview",
  primaryTo,
  secondaryTo,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [saved, setSaved] = useState(false);
  const destinations = {
    "create competition": "/admin/create-competition", "draft instant campaign": "/admin/jolt-credit-prizes",
    "review for publication": "/admin/competition-launch-approval", "review readiness": "/admin/competition-launch-approval",
    "create draw plan": "/admin/draw-result-release", "open claims workflow": "/admin/winners-claims",
    "create case": "/admin/complaint-investigation", "add prize": "/admin/prize-asset-verification",
    "campaign overview": "/admin/campaign-control-centre", "payments ledger": "/admin/orders-payments",
    "customers": "/admin/customers", "support inbox": "/admin/support-complaints", "prize inventory": "/admin/prize-inventory",
    "draws & results": "/admin/draws-results", "instant wins": "/admin/instant-wins", "help & policies": "/help-centre",
    "view reports": "/admin/analytics", "view licence checklist": "/admin/audit-compliance",
    "review entry rules": "/admin/free-entry-processing", "review configuration": "/admin/settings",
    "create content": "/admin/website-content", "invite staff": "/admin/staff-permissions",
  };
  const clean = (label) => label.toLowerCase().replace(/[+←→]/g, "").trim();
  const downloadExport = (label) => {
    const content = `WinJolt Operations\n${title}\n${subtitle}\nGenerated: ${new Date().toLocaleString()}.`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a");
    anchor.href = url; anchor.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${clean(label).replace(/\s+/g,"-")}.txt`;
    anchor.click(); URL.revokeObjectURL(url);
  };
  const act = (label, explicitTo) => {
    const key = clean(label);
    if (explicitTo || destinations[key]) return navigate(explicitTo || destinations[key]);
    if (key.includes("export") || key.includes("report")) return downloadExport(label);
    if (key.includes("save")) { const form=document.querySelector(".admin-main form"); if(form){form.requestSubmit();setSaved(true);window.setTimeout(()=>setSaved(false),1800);} return; }
    navigate(`${location.pathname}?action=${encodeURIComponent(key)}`);
  };
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="heading-actions">
        <button className="btn secondary" onClick={() => act(secondary, secondaryTo)}>{secondary}</button>
        <button className="btn primary" onClick={() => act(primary, primaryTo)}>{saved ? "Saved ✓" : primary}</button>
      </div>
    </div>
  );
}

export function StatGrid({ items }) {
  return (
    <section className="stat-grid">
      {items.map(({ label, value, note, icon }) => (
        <article className="stat-card" key={label}>
          <div className="stat-label">
            {label}
            <span>{icon}</span>
          </div>
          <strong>{value}</strong>
          <p>{note}</p>
        </article>
      ))}
    </section>
  );
}

export function FilterBar({
  filters = ["All statuses", "Category", "Date range"],
}) {
  const [params, setParams] = useSearchParams();
  const update = (key, value) => { const next = new URLSearchParams(params); value ? next.set(key, value) : next.delete(key); setParams(next); };
  return (
    <section className="filter-bar">
      <label>
        <span>⌕</span>
        <input placeholder="Search campaigns, references or records..." value={params.get("q") || ""} onChange={(e)=>update("q",e.target.value)} />
      </label>
      {filters.map((item, index) => <select aria-label={item} key={item} value={params.get(`filter${index}`)||""} onChange={(e)=>update(`filter${index}`,e.target.value)}>
        <option value="">{item}</option><option value="draft">Draft</option><option value="pending">Pending</option><option value="blocked">Blocked</option><option value="complete">Complete</option>
      </select>)}
      {[...params.keys()].length > 0 && <button className="filter-reset" onClick={() => setParams({})}>Reset</button>}
    </section>
  );
}

export function Panel({ title, subtitle, children, className = "" }) {
  return (
    <section className={`admin-panel ${className}`}>
      <h2>{title}</h2>
      {subtitle && <p className="panel-subtitle">{subtitle}</p>}
      {children}
    </section>
  );
}

export function DesignFooter() {
  return null;
}
