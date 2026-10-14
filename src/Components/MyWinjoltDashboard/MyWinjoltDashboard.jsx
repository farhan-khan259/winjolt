import { AccountNav, Action, PageShell } from "../CommonPages/CommonPages";
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
        <AccountNav active="dashboard" />
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
              Your account dashboard displays your current
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
                  <p>No active entry</p>
                </div>
                <Action outline href="/competitions">DETAILS</Action>
              </article>
            ))}
          </section>
        </div>
      </section>
    </PageShell>
  );
}
