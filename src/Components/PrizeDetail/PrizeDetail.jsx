import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { Footer, Header } from "../Homepage/Homepage";
import "./PrizeDetail.css";

function EntryPanel({ prize }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(5);
  const [quantity, setQuantity] = useState(5);
  const unitPrice = Number.isInteger(prize.priceMinor) ? prize.priceMinor : 99;
  const money = (minor) => new Intl.NumberFormat("en-GB", { style: "currency", currency: prize.currency || "GBP" }).format(minor / 100);
  const prices = { 1: money(unitPrice), 5: money(unitPrice * 5), 10: money(unitPrice * 10) };
  return (
    <aside className="entry-panel">
      <p className="featured-label">FEATURED COMPETITION</p>
      <h2>{prize.title}</h2>
      <p className="demo-copy">Select your entries and continue to checkout.</p>
      <div className="entry-price">
        <span>ENTRY FROM</span>
        <strong>{money(unitPrice)}</strong>
      </div>
      <div className="closing-date">
        <span>DRAW CLOSING DATE</span>
        <strong>{prize.closesAt ? new Date(prize.closesAt).toLocaleString("en-GB", { timeZone: prize.timezone || "Europe/London" }) : "TO BE ANNOUNCED"}</strong>
      </div>
      <div className="entry-benefits">
        <div>
          <strong>18+</strong>
          <span>Adults only</span>
        </div>
        <div>
          <strong>FREE</strong>
          <span>Eligible route</span>
        </div>
        <div>
          <strong>FAIR</strong>
          <span>Auditable result</span>
        </div>
      </div>
      <h3>SELECT YOUR ENTRIES</h3>
      <div className="entry-options">
        {[1, 5, 10].map((amount) => (
          <button
            key={amount}
            className={selected === amount ? "active" : ""}
            onClick={() => {
              setSelected(amount);
              setQuantity(amount);
            }}
          >
            <b>
              {amount} {amount === 1 ? "ENTRY" : "ENTRIES"}
            </b>
            <span>{prices[amount]}</span>
          </button>
        ))}
      </div>
      <div className="quantity">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
          −
        </button>
        <b>
          {quantity} {quantity === 1 ? "ENTRY" : "ENTRIES"}
        </b>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <div className="entry-divider" />
      <button className="add-basket" onClick={() => {
        localStorage.setItem("winjoltBasket", JSON.stringify({ competitionId: prize.publicId || prize.slug, slug: prize.slug, title: prize.title, quantity, unitPriceMinor: unitPrice, currency: prize.currency || "GBP" }));
        navigate("/ticket-number-selection", { state: { quantity } });
      }}>
        CHOOSE TICKET NUMBERS <span>→</span>
      </button>
      <button className="free-route" onClick={() => navigate("/free-entry")}>
        VIEW FREE ENTRY ROUTE <span>→</span>
      </button>
      <p className="entry-disclaimer">
        Both routes must be presented fairly. Actual payments and server-side
        ticket assignment are processed securely.
      </p>
    </aside>
  );
}

export default function PrizeDetail({ prize }) {
  const params = useParams();
  const [livePrize, setLivePrize] = useState(prize);
  const [loadError, setLoadError] = useState("");
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState("OVERVIEW");
  const identifier = params.slug || prize.slug;
  useEffect(() => { if (!identifier) { setChecking(false); return; } api.get(`/competitions/${identifier}`).then(({ item }) => setLivePrize({ ...prize, ...item, image: item.images?.[0] || prize.image })).catch((error) => setLoadError(error.message)).finally(()=>setChecking(false)); }, [identifier]); // eslint-disable-line react-hooks/exhaustive-deps
  const displayed = livePrize || prize;
  return (
    <div className="prize-detail-page" id="top">
      <Header />
      <main>
        <section className="detail-hero">
          <div>
            <p>
              HOME&nbsp; / &nbsp;COMPETITIONS&nbsp; / &nbsp;
              {displayed.category.toUpperCase()}
            </p>
            <h1>{displayed.title}</h1>
            <span>
              Everything you need to know about this prize, eligibility and your
              entry options.
            </span>
          </div>
          <b aria-hidden="true">ϟ</b>
        </section>
        <section className="detail-layout">
          <div className="detail-left">
            <figure className="prize-gallery">
              <img src={displayed.image} alt={displayed.title} />
              <div>
                {[1, 2, 3, 4].map((item) => (
                  <button key={item} aria-label={`View prize image ${item}`}>
                    <img src={displayed.image} alt="" />
                  </button>
                ))}
              </div>
              <figcaption>
                Prize photography. Prize details and
                provenance will be confirmed before launch.
              </figcaption>
            </figure>
            <article className="prize-information">
              <h2>THE PRIZE</h2>
              <p>
                This page shows the information WinJolt provides for
                each genuine competition, including exact prize specifications,
                draw arrangements and eligibility.
              </p>
              <nav>
                {["OVERVIEW", "SPECS", "DELIVERY", "RULES"].map((tab) => (
                  <button className={activeTab === tab ? "active" : ""} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>
                ))}
              </nav>
              <p className="demo-copy">Viewing {activeTab.toLowerCase()} information.</p>
              <ul>
                <li>
                  Full prize specifications and photographs supplied for real
                  campaigns
                </li>
                <li>Closing date and entry limit published in advance</li>
                <li>Fair, independently verifiable winner selection</li>
                <li>Eligible paid and free entry routes treated equally</li>
                <li>Delivery, collection and claim conditions disclosed</li>
              </ul>
            </article>
          </div>
          {checking ? <aside className="entry-panel"><h2>CHECKING AVAILABILITY…</h2></aside> : loadError ? <aside className="entry-panel"><h2>NOT OPEN FOR ENTRY</h2><p role="alert">{loadError}</p><button className="free-route" onClick={()=>window.location.assign("/competitions")}>VIEW CURRENT COMPETITIONS →</button></aside> : <EntryPanel prize={displayed} />}
        </section>
      </main>
      <Footer />
    </div>
  );
}
