import { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api";
import { Footer, Header } from "../Homepage/Homepage";
import "./Competetions.css";

import carImage from "../../Assets/Pictures/car-card.jpg";
import cashImage from "../../Assets/Pictures/cash-card.jpg";
import gamingImage from "../../Assets/Pictures/gaming-card.jpg";
import toolsImage from "../../Assets/Pictures/tools-card.jpg";
import phoneImage from "../../Assets/Pictures/instant-phone.jpg";
import earbudsImage from "../../Assets/Pictures/instant-earbuds.jpg";
import instantCashImage from "../../Assets/Pictures/instant-cash.jpg";
import giftcardImage from "../../Assets/Pictures/instant-giftcard.jpg";

const imageBySlug = { "performance-car": carImage, "cash-prize": cashImage, "gaming-and-tech": gamingImage, "ultimate-tools-collection": toolsImage, "smartphone-instant-win": phoneImage, "wireless-earbuds-instant-win": earbudsImage, "cash-instant-win": instantCashImage, "gift-card-instant-win": giftcardImage };

const categories = [
  "All",
  "Cars",
  "Cash",
  "Technology",
  "Tools",
  "Instant Wins",
];

function PrizeCard({ prize }) {
  return (
    <article className="catalogue-card">
      <div className="catalogue-image">
        <img src={prize.image || imageBySlug[prize.slug] || carImage} alt="" />
        
      </div>
      <p className="catalogue-kicker">
        {prize.instant
          ? "⚡ INSTANT WIN"
          : "FEATURED COMPETITION"}
      </p>
      <h2>{prize.title}</h2>
      <div className="catalogue-price">
        <span>ENTRY FROM</span>
        <strong>{new Intl.NumberFormat("en-GB", { style: "currency", currency: prize.currency || "GBP" }).format((prize.priceMinor || 0) / 100)}</strong>
      </div>
      <p className="catalogue-note">
        COMPETITIONS OPEN&nbsp; • &nbsp;ENTER NOW
      </p>
      <div className="catalogue-rule" />
      <a href={prize.path || `/competitions/${prize.slug}`} className="catalogue-button">
        VIEW COMPETITION <b>→</b>
      </a>
    </article>
  );
}

export default function Competetions() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/competitions?limit=50").then(({ items }) => setPrizes(items.map((item) => ({ ...item, instant: item.instant?.enabled, image: item.images?.[0] || imageBySlug[item.slug] })))).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false)); }, []);
  const displayedPrizes = useMemo(
    () =>
      prizes.filter(
        (prize) =>
          (category === "All" || prize.category === category) &&
          prize.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, query, prizes],
  );

  return (
    <div className="competitions-page" id="top">
      <Header />
      <main>
        <section className="catalogue-hero">
          <div>
            <p>WINJOLT / ALL COMPETITIONS</p>
            <h1>LIVE &amp; UPCOMING COMPETITIONS</h1>
            <span>
              Cars, cash, tech, tools and more. Browse the current competition
              catalogue.
            </span>
          </div>
          <b aria-hidden="true">ϟ</b>
        </section>
        <section className="catalogue-content" id="competitions">
          <div className="catalogue-heading">
            <div>
              <h1>EXPLORE ALL PRIZES</h1>
              <p>Select a category or search the competition catalogue.</p>
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search competitions..."
              aria-label="Search competitions"
            />
          </div>
          <div className="catalogue-filters">
            {categories.map((item) => (
              <button
                className={category === item ? "selected" : ""}
                key={item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="catalogue-grid">
            {displayedPrizes.map((prize) => (
              <PrizeCard prize={prize} key={prize.title} />
            ))}
          </div>
          {loading && <p className="no-results">Loading current competitions…</p>}
          {error && <p className="no-results" role="alert">{error}</p>}
          {displayedPrizes.length === 0 && (
            <p className="no-results">
              {loading ? "" : "No live or scheduled competitions match that search."}
            </p>
          )}
          <p className="prelaunch-notice" id="notice">
            Competition prices, images, entry limits and closing dates are shown
            on each competition page.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
