import { useMemo, useState } from "react";
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

const prizes = [
  {
    title: "Performance Car + Cash",
    category: "Cars",
    image: carImage,
    price: "£0.99",
  },
  {
    title: "£10,000 Cash Prize",
    category: "Cash",
    image: cashImage,
   
    price: "£0.99",
  },
  {
    title: "Gaming & Tech Bundle",
    category: "Technology",
    image: gamingImage,
   
    price: "£0.99",
  },
  {
    title: "Ultimate Tools Collection",
    category: "Tools",
    image: toolsImage,
   
    price: "£0.99",
  },
  {
    title: "Smartphone Instant Win",
    category: "Instant Wins",
    image: phoneImage,
  
    price: "£0.50",
    instant: true,
  },
  {
    title: "Wireless Earbuds Instant Win",
    category: "Instant Wins",
    image: earbudsImage,

    price: "£0.50",
    instant: true,
  },
  {
    title: "£100 Cash Instant Win",
    category: "Instant Wins",
    image: instantCashImage,
   
    price: "£0.50",
    instant: true,
  },
  {
    title: "Gift Card Instant Win",
    category: "Instant Wins",
    image: giftcardImage,

    price: "£0.50",
    instant: true,
  },
];

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
        <img src={prize.image} alt="" />
        
      </div>
      <p className="catalogue-kicker">
        {prize.instant
          ? "⚡ INSTANT WIN · PREVIEW"
          : `COMING SOON · ${prize.label}`}
      </p>
      <h2>{prize.title}</h2>
      <div className="catalogue-price">
        <span>ENTRY FROM</span>
        <strong>{prize.price}</strong>
      </div>
      <p className="catalogue-note">
        DEMO ONLY&nbsp; • &nbsp;NO TICKETS ON SALE
      </p>
      <div className="catalogue-rule" />
      <a href="#notice" className="catalogue-button">
        VIEW COMPETITION <b>→</b>
      </a>
    </article>
  );
}

export default function Competetions() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const displayedPrizes = useMemo(
    () =>
      prizes.filter(
        (prize) =>
          (category === "All" || prize.category === category) &&
          prize.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, query],
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
              Cars, cash, tech, tools and more. Browse the prelaunch competition
              catalogue.
            </span>
          </div>
          <b aria-hidden="true">ϟ</b>
        </section>
        <section className="catalogue-content" id="competitions">
          <div className="catalogue-heading">
            <div>
              <h1>EXPLORE ALL PRIZES</h1>
              <p>Select a category or search the sample catalogue.</p>
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
          {displayedPrizes.length === 0 && (
            <p className="no-results">
              No sample competitions match that search.
            </p>
          )}
          <p className="prelaunch-notice" id="notice">
            Prelaunch notice: All example ticket prices, images and competitions
            are mock content. We do not currently accept entries.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
