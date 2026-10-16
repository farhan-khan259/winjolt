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
  const live = prize.status === "LIVE";
  return (
    <aside className="entry-panel">
      <p className="featured-label">FEATURED COMPETITION</p>
      <h2>{prize.title}</h2>
      <p className="demo-copy">{live ? "Select your entries and continue to checkout." : `This competition is scheduled to open ${new Date(prize.startsAt).toLocaleString("en-GB")}.`}</p>
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
      <button className="add-basket" disabled={!live} onClick={() => {
        localStorage.setItem("winjoltBasket", JSON.stringify({ competitionId: prize.publicId || prize.slug, slug: prize.slug, title: prize.title, quantity, unitPriceMinor: unitPrice, currency: prize.currency || "GBP" }));
        navigate("/ticket-number-selection", { state: { quantity } });
      }}>
        {live ? "CHOOSE TICKET NUMBERS" : "ENTRIES NOT OPEN"} <span>→</span>
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

export default function PrizeDetail() {
  const params = useParams();
  const [livePrize, setLivePrize] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState("OVERVIEW");
  const identifier = params.slug;
  useEffect(() => { if (!identifier) { setLoadError("Competition not found.");setChecking(false);return; } api.get(`/competitions/${identifier}`).then(({ item }) => setLivePrize({...item,image:item.images?.[0]})).catch((error) => setLoadError(error.message)).finally(()=>setChecking(false)); }, [identifier]);
  if(checking)return <div className="prize-detail-page"><Header/><main><section className="detail-hero"><div><p>WINJOLT / COMPETITION</p><h1>LOADING COMPETITION…</h1><span>Retrieving the current published campaign.</span></div></section></main><Footer/></div>;
  if(loadError||!livePrize)return <div className="prize-detail-page"><Header/><main><section className="detail-hero"><div><p>WINJOLT / COMPETITION</p><h1>COMPETITION UNAVAILABLE</h1><span>{loadError||"This competition is not published."}</span></div></section><section className="detail-layout"><aside className="entry-panel"><button className="free-route" onClick={()=>window.location.assign("/competitions")}>VIEW CURRENT COMPETITIONS →</button></aside></section></main><Footer/></div>;
  const displayed = livePrize;
  const gallery=displayed.images||[];
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
              {displayed.image&&<img src={displayed.image} alt={displayed.title} />}
              <div>
                {gallery.map((image,index) => (
                  <button key={image} aria-label={`View prize image ${index+1}`}>
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
              <figcaption>
                Published campaign photography and prize information.
              </figcaption>
            </figure>
            <article className="prize-information">
              <h2>THE PRIZE</h2>
              <p>{displayed.description}</p>
              <nav>
                {["OVERVIEW", "SPECS", "DELIVERY", "RULES"].map((tab) => (
                  <button className={activeTab === tab ? "active" : ""} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>
                ))}
              </nav>
              <p className="demo-copy">{activeTab==="RULES"?displayed.rulesText:activeTab==="DELIVERY"?(displayed.mainPrize?.fulfilmentTerms||"Delivery terms are included in the published competition rules."):activeTab==="SPECS"?(displayed.mainPrize?.title||displayed.description):displayed.description}</p>
              <ul>
                <li>Maximum {displayed.ticketRange.end-displayed.ticketRange.start+1} numbered entries</li>
                <li>Maximum {displayed.maxEntriesPerUser} entries per customer</li>
                <li>Rules version: {displayed.rulesVersion}</li>
                <li>Draw scheduled: {new Date(displayed.drawAt).toLocaleString("en-GB")}</li>
              </ul>
            </article>
          </div>
          <EntryPanel prize={displayed} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
