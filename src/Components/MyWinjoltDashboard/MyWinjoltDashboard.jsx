import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { AccountNav, Action, PageShell } from "../CommonPages/CommonPages";
import "./MyWinjoltDashboard.css";
export default function MyWinjoltDashboard() {
  const [stats, setStats] = useState({ entries: 0, orders: 0, prizes: 0, wallet_balance_minor: 0 });
  const [competitions, setCompetitions] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => { Promise.all([api.get("/accounts/dashboard"), api.get("/competitions?limit=3")]).then(([dashboard, catalogue]) => { setStats(dashboard); setCompetitions(catalogue.items); }).catch((requestError) => setError(requestError.message)); }, []);
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
            {competitions.map((competition) => (
              <article className="prize-row" key={competition.publicId}>
                {competition.images?.[0] && <img src={competition.images[0]} alt={competition.title} />}
                <div>
                  <h3>{competition.title}</h3>
                  <p>{competition.status === "LIVE" ? "Open for entries" : `Opens ${new Date(competition.startsAt).toLocaleDateString("en-GB")}`}</p>
                </div>
                <Action outline href={`/competitions/${competition.slug}`}>DETAILS</Action>
              </article>
            ))}
            {!error && competitions.length === 0 && <div className="info-note">No live or upcoming competitions are available.</div>}
          </section>
        </div>
      </section>
    </PageShell>
  );
}
