import { useState } from "react";
import "./Homepage.css";

import carImage from "../../Assets/Pictures/car-card.jpg";
import cashImage from "../../Assets/Pictures/cash-card.jpg";
import gamingImage from "../../Assets/Pictures/gaming-card.jpg";
import heroImage from "../../Assets/Pictures/hero-prize-montage.jpg";
import toolsImage from "../../Assets/Pictures/tools-card.jpg";
import wheelImage from "../../Assets/Pictures/jolt-wheel.png";
import logoImage from "../../Assets/Pictures/winjolt-logo-transparent.png";

const competitions = [
  { title: "Performance Car + Cash", image: carImage },
  { title: "£10,000 Cash Prize", image: cashImage },
  { title: "Gaming & Tech Bundle", image: gamingImage },
  { title: "Ultimate Tools Collection", image: toolsImage },
];

const steps = [
  [
    "1",
    "CHOOSE YOUR PRIZE",
    "Explore competitions, prize photographs and full terms.",
  ],
  [
    "2",
    "CHOOSE AN ENTRY ROUTE",
    "Use an eligible free route or a paid-entry route.",
  ],
  ["3", "SEE THE RESULT", "Instantly or through a transparent recorded draw."],
  [
    "4",
    "CLAIM YOUR PRIZE",
    "Verify eligibility and arrange collection or delivery.",
  ],
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="WinJolt home">
      <img src={logoImage} alt="WinJolt Competitions" />
    </a>
  );
}

function NavIcon({ type }) {
  const icons = {
    home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />,
    prizes: <path d="m12 3 9 9-9 9-9-9z" />,
    basket: (
      <>
        <path d="M4 4h2l1.7 11.2a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 1.9-1.5L21 8H7" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </>
    ),
    account: <circle cx="12" cy="12" r="9" />,
  };

  return (
    <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      {icons[type]}
    </svg>
  );
}

function ArrowButton({ children, variant = "yellow", href = "#" }) {
  return (
    <a className={`action-button ${variant}`} href={href}>
      {children} <span aria-hidden="true">→</span>
    </a>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Brand />
      <nav
        className={menuOpen ? "main-nav open" : "main-nav"}
        aria-label="Main navigation"
      >
        <a href="/competitions">Competitions</a>
        <a href="/instant-wins">Instant Wins</a>
        <a href="/winners-and-results">Winners</a>
        <a href="/how-it-works">How It Works</a>
        <a href="/free-entry">Free Entry</a>
        <a href="/help-centre">Support</a>
      </nav>
      <div className="header-actions">
        <a className="basket-button" href="/your-basket" aria-label="Shopping cart">
          Basket
        </a>
        <a className="sign-in" href="/sign-in">
          Sign in
        </a>
        <a className="sign-up" href="/sign-up">
          Sign up
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function CompetitionCard({ competition }) {
  return (
    <article className="competition-card">
      <div className="competition-image">
        <img src={competition.image} alt="" />
      </div>
      <p className="card-kicker">COMING SOON · {competition.label}</p>
      <h3>{competition.title}</h3>
      <div className="price-row">
        <span>FROM</span>
        <strong>£0.99</strong>
      </div>
      <p className="card-note">DEMO · NO TICKETS ON SALE</p>
      <div className="card-rule" />
      <ArrowButton>VIEW COMPETITION</ArrowButton>
    </article>
  );
}

export function Footer() {
  return (
    <>
      <footer className="site-footer" id="support">
        <div className="footer-brand">
          <Brand />
          <p>
            Big prizes. Big buzz. A UK competitions platform design concept.
          </p>
          <p className="footer-disclaimer">
            Every prize and price shown here is illustrative. No live
            participation.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <h3>EXPLORE</h3>
            <a href="/competitions">Competitions</a>
            <a href="/instant-wins">Instant Wins</a>
            <a href="/games-and-experiences">Games &amp; Experiences</a>
            <a href="/winners-and-results">Winners</a>
            <a href="/live-draws">Live Draws</a>
            <a href="/ticket-checker">Ticket Checker</a>
          </div>
          <div>
            <h3>ABOUT</h3>
            <a href="/about-winjolt">About Us</a>
            <a href="/how-it-works">How It Works</a>
            <a href="/free-entry">Free Entry</a>
            <a href="/responsible-participation">Responsible Participation</a>
            <a href="/help-centre">Help Centre</a>
          </div>
          <div>
            <h3>LEGAL &amp; HELP</h3>
            <a href="/terms-and-conditions">Terms &amp; Conditions</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/cookie-policy">Cookie Policy</a>
            <a href="/complaints-procedure">Complaints</a>
            <a href="/contact-us">Contact Us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 WinJolt. No purchases, entries or prizes awarded.</span>
          <span>18+ · Free-entry options · Fair results · UK</span>
        </div>
      </footer>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <a href="/">
          <NavIcon type="home" />
          HOME
        </a>
        <a href="/competitions">
          <NavIcon type="prizes" />
          PRIZES
        </a>
        <a href="/instant-wins">
          <span className="instant-nav-icon">⚡</span>INSTANT
        </a>
        <a href="/your-basket">
          <NavIcon type="basket" />
          BASKET
        </a>
        <a href="/my-winjolt-dashboard">
          <NavIcon type="account" />
          ACCOUNT
        </a>
      </nav>
    </>
  );
}

export default function Homepage() {
  return (
    <div className="homepage" id="top">
      <Header />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">⚡ BIG PRIZES. BIG BUZZ.</p>
            <h1>
              AMAZING PRIZES.
              <br />
              <em>REAL PEOPLE.</em>
              <br />
              BRIGHTER DAYS.
            </h1>
            <p className="hero-text">
              Cars, cash, tech, tools and more. A UK competitions experience
              with transparent results.
            </p>
            <div className="hero-buttons">
              <ArrowButton href="#competitions">VIEW COMPETITIONS</ArrowButton>
              <ArrowButton variant="blue" href="#instant-wins">
                {" "}
                INSTANT WINS
              </ArrowButton>
            </div>
          </div>
          <div className="hero-visual">
            <img src={heroImage} alt="Blue car, cash and technology prizes" />
            <p>Illustrative prizes · No active entries</p>
          </div>
        </section>
        <div className="trust-bar">
          <span>✦ 18+ only</span>
          <span>✦ Free entry available</span>
          <span>✦ Fair, recorded results</span>
          <span>✦ Secure checkout planned</span>
        </div>

        <section className="section competitions" id="competitions">
          <h2>
            <span>⚡</span> FEATURED COMPETITIONS
          </h2>
          <div className="competition-grid">
            {competitions.map((item) => (
              <CompetitionCard key={item.label} competition={item} />
            ))}
          </div>
        </section>

        <section className="instant-section" id="instant-wins">
          <div>
            <h2>
              <span>⚡</span> INSTANT WINS
            </h2>
            <p>
              Selected competitions may award instant prizes through verifiable,
              fair results.
            </p>
            <ArrowButton>EXPLORE INSTANT WINS</ArrowButton>
          </div>
          <img src={wheelImage} alt="Instant wins prize wheel" />
        </section>

        <section className="section how-section" id="how-it-works">
          <h2>HOW WINJOLT WORKS</h2>
          <div className="steps">
            {steps.map(([number, title, text]) => (
              <article key={number}>
                <strong>{number}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="results-grid" id="winners">
            <article className="results-copy">
              <p className="yellow-label">THE FIRST WINNERS ARE YET TO COME</p>
              <h2>REAL WINNERS. REAL RESULTS.</h2>
              <p>
                Verified winners, draw records and prize handovers will appear
                here after launch—not made-up testimonials or prize statistics.
              </p>
              <ArrowButton variant="blue">LEARN ABOUT RESULTS</ArrowButton>
            </article>
            <figure>
              <img src={gamingImage} alt="Gaming and technology prize bundle" />
              <figcaption>
                Promotional prize imagery is illustrative.
              </figcaption>
            </figure>
          </div>
          <form
            className="newsletter"
            onSubmit={(event) => event.preventDefault()}
          >
            <div>
              <p className="yellow-label">JOIN THE WINJOLT CLUB</p>
              <h2>Be first to hear what's coming.</h2>
              <p>
                Launch updates and new prize previews. Newsletter integration
                pending.
              </p>
            </div>
            <div className="newsletter-form">
              <input
                type="email"
                aria-label="Email address"
                placeholder="Enter your email address"
              />
              <ArrowButton>JOIN THE LIST</ArrowButton>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
