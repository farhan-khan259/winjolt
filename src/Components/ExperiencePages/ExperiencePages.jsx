import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer, Header } from "../Homepage/Homepage";
import "./ExperiencePages.css";
import wheel from "../../Assets/Pictures/jolt-wheel.png";
import phone from "../../Assets/Pictures/instant-phone.jpg";
import earbuds from "../../Assets/Pictures/instant-earbuds.jpg";
import cash from "../../Assets/Pictures/instant-cash.jpg";
import giftcard from "../../Assets/Pictures/instant-giftcard.jpg";
import car from "../../Assets/Pictures/car-card.jpg";
import cashCard from "../../Assets/Pictures/cash-card.jpg";

function Page({ eyebrow, title, subtitle, children }) {
  return (
    <div className="experience-page" id="top">
      
      <Header />
      <main>
        <section className="experience-hero">
          <div>
            <p>{eyebrow}</p>
            <h1>{title}</h1>
            <span>{subtitle}</span>
          </div>
          <b aria-hidden="true">ϟ</b>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}
const Button = ({ children, blue = false, href, ...props }) => {
  const className = blue ? "xp-button blue" : "xp-button";
  return href ? (
    <Link className={className} to={href}>{children} <b>→</b></Link>
  ) : (
    <button type="button" {...props} className={className}>{children} <b>→</b></button>
  );
};
const instantItems = [
  ["Smartphone Instant Win", phone],
  ["Wireless Earbuds Instant Win", earbuds],
  ["£100 Cash Instant Win", cash],
  ["Gift Card Instant Win", giftcard],
];
function PrizeCard({ item }) {
  return (
    <article className="xp-card">
      <img src={item[1]} alt="" />
      <p>⚡ INSTANT WIN</p>
      <h3>{item[0]}</h3>
      <div>
        <span>ENTRY FROM</span>
        <b>£0.50</b>
      </div>
      <small>COMPETITIONS OPEN&nbsp; • &nbsp;ENTER NOW</small>
      <i />
      <Button href="/instant-win-result">VIEW COMPETITION</Button>
    </article>
  );
}
function WheelFeature({
  title = "JOLT REVEAL",
  text = "Reveal an already-determined result through the WinJolt visual wheel.",
}) {
  return (
    <section className="wheel-feature">
      <img src={wheel} alt="Jolt reveal prize wheel" />
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
        <Button blue href="/jolt-reveal-wheel">SEE THE WHEEL</Button>
      </div>
    </section>
  );
}
function StandardCards({ cards }) {
  return (
    <div className="standard-cards">
      {cards.map(([heading, text], index) => (
        <article key={heading}>
          <b>{index + 1}</b>
          <h2>{heading}</h2>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

export function InstantWinsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const visibleItems = instantItems.filter(([title]) =>
    title.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <Page
      eyebrow="WINJOLT / INSTANT WINS"
      title="INSTANT WINS"
      subtitle="Instant-win campaigns with exciting visual reveals. Browse available instant-win campaigns and published terms."
    >
      <section className="instant-catalogue" id="instant-prizes">
        <div className="catalogue-top">
          <div>
            <h2>EXPLORE INSTANT PRIZES</h2>
            <p>Select a category or search the competition catalogue.</p>
          </div>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search competitions..." aria-label="Search instant-win competitions" />
        </div>
        <div className="xp-filters">
          <button className={filter === "all" ? "selected" : ""} onClick={() => setFilter("all")}>All</button>
          <button className={filter === "instant" ? "selected" : ""} onClick={() => setFilter("instant")}>Instant Wins</button>
        </div>
        <div className="xp-grid">
          {visibleItems.map((item) => (
            <PrizeCard key={item[0]} item={item} />
          ))}
        </div>
        {visibleItems.length === 0 && <p className="xp-notice">No instant-win competitions match your search.</p>}
        <p className="xp-notice">
          Competition prices, images, entry limits and closing dates are shown
          on each competition page.
        </p>
      </section>
      <section className="instant-promo">
        <div>
          <small>⚡ EXPERIENCE THE BUZZ</small>
          <h2>INSTANT WINS</h2>
          <h3>INSTANT PRIZES. INSTANT FUN. INSTANT RESULTS.</h3>
          <p>
            Explore instant-win campaign designs and our Jolt Reveal animation.
            Eligible paid and free entries must be handled fairly and
            identically.
          </p>
          <Button
            onClick={() =>
              document
                .getElementById("instant-prizes")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          >
            EXPLORE INSTANT WINS
          </Button>
        </div>
        <WheelFeature />
      </section>
    </Page>
  );
}
export function GamesPage() {
  return (
    <Page
      eyebrow="WINJOLT / GAMES & EXPERIENCES"
      title="GAMES & EXPERIENCES"
      subtitle="Explore WinJolt prize-reveal experiences."
    >
      <section className="games-stage">
        <WheelFeature
          title="⚡ THE JOLT REVEAL"
          text="This animated wheel only reveals a result determined independently. Results are securely allocated before the reveal."
        />
        <Button href="/how-it-works">READ THE GAME RULES</Button>
      </section>
    </Page>
  );
}
export function BingoPage() {
  return (
    <Page
      eyebrow="WINJOLT / BINGO — FUTURE LICENSED CONCEPT"
      title="BINGO — FUTURE LICENSED CONCEPT"
      subtitle="Online bingo requires appropriate authorisation."
    >
      <section className="games-stage">
        <WheelFeature
          title="⚡ JOLT REVEAL WHEEL"
          text="The secure result is assigned before the animation. The wheel does not choose winners."
        />
        <Button href="/how-it-works">HOW IT WORKS</Button>
        <article className="info-strip">
          <h2>BINGO — FUTURE CONCEPT</h2>
          <p>
            Commercial remote bingo would require relevant Gambling Commission
            authorisation or licensed partnership. Not part of the active
            launch.
          </p>
        </article>
      </section>
    </Page>
  );
}
export function WheelPage() {
  const [played, setPlayed] = useState(false);
  return (
    <Page
      eyebrow="WINJOLT / JOLT REVEAL WHEEL"
      title="JOLT REVEAL WHEEL"
      subtitle="Website credit only: 50p to £10 or No Win. Outcomes are securely allocated before the animation."
    >
      <section className="wheel-page">
        <div className="wheel-visual">
          <img className={played ? "spin" : ""} src={wheel} alt="Prize wheel" />
          <p>
            Credit wheel; displayed sector sizes do not represent
            win probability. Prizes are allocated according to the published terms.
          </p>
        </div>
        <article className="spin-panel">
          <small>⚡ WEBSITE CREDIT ONLY · 50P TO £10</small>
          <h2>SPIN. REVEAL. FEEL THE BUZZ.</h2>
          <p>
            The 20 planned prizes are website credits only. No phones or Macs
            are on this wheel. Results would be securely committed before the
            animation; eligible paid/free entries require equal treatment.
          </p>
          <div className="commitments">
            <span>
              <b>1. Entry verified</b>Backend records a qualifying entry.
            </span>
            <span>
              <b>2. Result committed</b>Secure allocation and audit evidence
              established.
            </span>
          </div>
          <Button onClick={() => setPlayed(true)}>
            PLAY JOLT REVEAL ⚡
          </Button>
          <p className="fine">
            This animation does not select, display or award a prize.
          </p>
          <Button blue href="/free-entry">VIEW FREE-ENTRY RULES</Button>
        </article>
      </section>
      <section className="rewards">
        <h2>⚡ WEBSITE CREDIT REWARDS — THIS WHEEL ONLY</h2>
        <p>
          20 winning credits worth £35 in total. Possible outcomes: 50p, £1, £2,
          £5, £10 or No Win.
        </p>
        <div>
          {[
            ["£10", "1 planned winning credit"],
            ["£5", "2 planned winning credits"],
            ["£2", "3 planned winning credits"],
            ["£1", "4 planned winning credits"],
            ["50p", "10 planned winning credits"],
            ["NO WIN", "Non-winning result possible"],
          ].map(([a, b]) => (
            <article key={a}>
              <b>{a}</b>
              <span>{b}</span>
              <small>Promotional website credit</small>
            </article>
          ))}
        </div>
        <aside>
          CREDIT USE & TERMS WILL BE PUBLISHED BEFORE LAUNCH
          <br />
          <span>
            The credit’s permitted use, expiry, account eligibility and refunds
            must be clear. Credit is not represented as cash or a physical
            prize.
          </span>
        </aside>
      </section>
    </Page>
  );
}
export function InstantResultPage() {
  return (
    <Page
      eyebrow="WINJOLT / INSTANT WIN RESULT"
      title="INSTANT WIN RESULT"
      subtitle="Your result will be displayed after verification."
    >
      <section className="games-stage">
        <WheelFeature
          title="⚡ JOLT REVEAL WHEEL"
          text="The secure result is assigned before the animation. The wheel does not choose winners."
        />
        <Button href="/how-it-works">HOW IT WORKS</Button>
        <article className="info-strip">
          <h2>NO INSTANT RESULT ASSIGNED</h2>
          <p>
            Results are verified and recorded before publication.
          </p>
        </article>
      </section>
    </Page>
  );
}
export function WinnersPage() {
  return (
    <Page
      eyebrow="WINJOLT / WINNERS & RESULTS"
      title="WINNERS & RESULTS"
      subtitle="See real, verified winners when WinJolt launches."
    >
      <section className="content-page">
        <article className="winner-empty">
          <b>🏆</b>
          <h2>No winners have been drawn.</h2>
          <p>
            Live prize competitions have not started. Draw dates, winner
            verification and prize-delivery evidence will appear here when
            available.
          </p>
          <Button href="/how-it-works">HOW DRAWS WORK</Button>
        </article>
        <StandardCards
          cards={[
            [
              "Verified winner records",
              "Published results will be evidenced, not invented.",
            ],
            [
              "Independent verification",
              "Selection and campaign history require audit trails.",
            ],
            [
              "Clear fulfilment",
              "Prize collection and winner notifications will be documented.",
            ],
          ]}
        />
      </section>
    </Page>
  );
}
export function TicketPage() {
  const [competition, setCompetition] = useState("");
  const [ticket, setTicket] = useState("");
  const [message, setMessage] = useState("");
  const checkEntry = () => {
    if (!competition.trim() || !ticket.trim()) {
      setMessage("Enter both the competition reference and ticket number.");
      return;
    }
    setMessage("No matching published entry was found. Check the references and try again.");
  };
  return (
    <Page
      eyebrow="WINJOLT / TICKET CHECKER"
      title="TICKET CHECKER"
      subtitle="Find your eligible entries securely."
    >
      <section className="content-page ticket-page">
        <label>
          Competition reference
          <input value={competition} onChange={(event) => setCompetition(event.target.value)} placeholder="Enter competition reference" />
        </label>
        <label>
          Ticket or entry number
          <input value={ticket} onChange={(event) => setTicket(event.target.value)} placeholder="Enter ticket or entry number" />
        </label>
        <Button onClick={checkEntry}>CHECK MY ENTRY</Button>
        {message && <p className="xp-notice" role="status">{message}</p>}
        <article className="info-strip">
          <h2>PRIVACY FIRST</h2>
          <p>
            Ticket details can only be shown to the authorised account holder.
          </p>
        </article>
      </section>
    </Page>
  );
}
export function LiveDrawsPage() {
  return (
    <Page
      eyebrow="WINJOLT / LIVE DRAWS"
      title="LIVE DRAWS"
      subtitle="Scheduled and completed draw records."
    >
      <section className="content-page">
        <div className="draw-list">
          {[
            "UPCOMING DRAWS",
            "VERIFIED DRAW RECORDS",
            "PRIZE FULFILMENT",
            "RESULT SEARCH",
          ].map((x) => (
            <article key={x}>
              <h2>{x}</h2>
              <p>No published winners yet</p>
            </article>
          ))}
        </div>
        <div className="draw-prizes">
          <PrizeCard item={["Performance Car + Cash", car]} />
          <PrizeCard item={["£10,000 Cash Prize", cashCard]} />
        </div>
      </section>
    </Page>
  );
}
export function HowPage() {
  return (
    <Page
      eyebrow="WINJOLT / HOW IT WORKS"
      title="HOW IT WORKS"
      subtitle="Choose, enter, check and claim."
    >
      <section className="content-page">
        <div className="draw-list">
          {[
            "Choose your prize and review the rules",
            "Select an eligible entry route",
            "Check the immediate result or scheduled draw",
            "Verify eligibility and claim your prize",
          ].map((x, i) => (
            <article key={x}>
              <h2>
                {i + 1} · {x}
              </h2>
              <p>Process and requirements shown before taking part</p>
            </article>
          ))}
        </div>
        <div className="draw-prizes">
          <PrizeCard item={["Performance Car + Cash", car]} />
          <PrizeCard item={["£10,000 Cash Prize", cashCard]} />
        </div>
      </section>
    </Page>
  );
}
