import { useState } from "react";
import { Footer, Header } from "../Homepage/Homepage";
import "./PrizeDetail.css";

function EntryPanel({ prize }) {
  const [selected, setSelected] = useState(5);
  const [quantity, setQuantity] = useState(5);
  const prices = { 1: "£0.99", 5: "£4.95", 10: "£9.90" };
  return (
    <aside className="entry-panel">
      <p className="featured-label">FEATURED COMPETITION · PREVIEW</p>
      <h2>{prize.title}</h2>
      <p className="demo-copy">Demo only. Entries are not available to buy.</p>
      <div className="entry-price">
        <span>EXAMPLE ENTRY FROM</span>
        <strong>£0.99</strong>
      </div>
      <div className="closing-date">
        <span>DRAW CLOSING DATE</span>
        <strong>TO BE ANNOUNCED</strong>
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
      <h3>SELECT YOUR EXAMPLE ENTRIES</h3>
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
      <button className="add-basket">
        ADD DEMO ENTRIES TO BASKET <span>→</span>
      </button>
      <button className="free-route">
        VIEW FREE ENTRY ROUTE <span>→</span>
      </button>
      <p className="entry-disclaimer">
        Both routes must be presented fairly. Actual payments and server-side
        ticket assignment are disabled in this prototype.
      </p>
    </aside>
  );
}

export default function PrizeDetail({ prize }) {
  return (
    <div className="prize-detail-page" id="top">
      <Header />
      <main>
        <section className="detail-hero">
          <div>
            <p>
              HOME&nbsp; / &nbsp;COMPETITIONS&nbsp; / &nbsp;
              {prize.category.toUpperCase()}
            </p>
            <h1>{prize.title}</h1>
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
              <img src={prize.image} alt={prize.title} />
              <div>
                {[1, 2, 3, 4].map((item) => (
                  <button key={item} aria-label={`View prize image ${item}`}>
                    <img src={prize.image} alt="" />
                  </button>
                ))}
              </div>
              <figcaption>
                Illustrative prize photography. Actual prize details and
                provenance will be confirmed before launch.
              </figcaption>
            </figure>
            <article className="prize-information">
              <h2>THE PRIZE</h2>
              <p>
                This example showcases the information WinJolt will disclose for
                each genuine competition, including exact prize specifications,
                draw arrangements and eligibility.
              </p>
              <nav>
                <button>OVERVIEW</button>
                <button>SPECS</button>
                <button>DELIVERY</button>
                <button>RULES</button>
              </nav>
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
          <EntryPanel prize={prize} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
