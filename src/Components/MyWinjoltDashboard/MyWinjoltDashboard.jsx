import { Action, PageShell } from "../CommonPages/CommonPages";
import car from "../../Assets/Pictures/car-card.jpg";
import cash from "../../Assets/Pictures/cash-card.jpg";
import gaming from "../../Assets/Pictures/gaming-card.jpg";
import "./MyWinjoltDashboard.css";
const prizes = [
  ["Performance Car + Cash", car],
  ["£10,000 Cash Prize", cash],
  ["Gaming & Tech Bundle", gaming],
];
export default function MyWinjoltDashboard() {
  return (
    <PageShell
      preview
      className="dashboard-page"
      eyebrow="MY WINJOLT DASHBOARD"
      title="MY WINJOLT DASHBOARD"
      subtitle="A central home for entries, orders, prize claims and account settings."
    >
      <section className="info-content dashboard-layout">
        <nav className="dashboard-nav">
          <a href="/my-winjolt-dashboard">▣ Dashboard</a>
          <a href="/my-entries">◆ My Entries</a>
          <a href="#orders">▤ Order History</a>
          <a href="#claims">🏆 Prize Claims</a>
          <a href="#settings">⚙ Account Settings</a>
          <a href="#controls">♡ Spending Controls</a>
          <a href="/help-centre">✉ Support</a>
        </nav>
        <div>
          <article className="overview">
            <small>WELCOME TO WINJOLT</small>
            <h2>YOUR ACCOUNT OVERVIEW</h2>
            <div className="stats">
              {[
                ["0", "Actual entries"],
                ["0", "Instant results"],
                ["0", "Prizes claimed"],
              ].map(([n, l]) => (
                <div key={l}>
                  <b>{n}</b>
                  <span>{l}</span>
                </div>
              ))}
            </div>
            <div className="info-note">
              This is a demonstration dashboard. There is no login session or
              real customer information.
            </div>
          </article>
          <section className="prize-list">
            <h2>EXPLORE UPCOMING PRIZES</h2>
            {prizes.map(([name, image]) => (
              <article className="prize-row" key={name}>
                <img src={image} alt="" />
                <div>
                  <h3>{name}</h3>
                  <p>PRELAUNCH EXAMPLE · No active entry</p>
                </div>
                <Action outline>DETAILS</Action>
              </article>
            ))}
          </section>
        </div>
      </section>
    </PageShell>
  );
}
