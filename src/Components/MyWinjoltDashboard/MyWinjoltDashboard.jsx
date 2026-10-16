import { useEffect, useState } from "react";
import { api } from "../../services/api";
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
  const [stats, setStats] = useState({ entries: 0, orders: 0, prizes: 0, wallet_balance_minor: 0 });
  const [error, setError] = useState("");
  useEffect(() => { api.get("/accounts/dashboard").then(setStats).catch((requestError) => setError(requestError.message)); }, []);
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
                [String(stats.entries), "Actual entries"],
                [String(stats.orders), "Orders"],
                [String(stats.prizes), "Prize claims"],
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
            {error && <div className="info-note" role="alert">{error}</div>}
            <p>Website credit balance: £{(stats.wallet_balance_minor / 100).toFixed(2)}</p>
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
