import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
import "./Homepage.css";

import gamingImage from "../../Assets/Pictures/gaming-card.jpg";
import heroImage from "../../Assets/Pictures/hero-prize-montage.jpg";
import wheelImage from "../../Assets/Pictures/jolt-wheel.png";
import logoImage from "../../Assets/Pictures/winjolt-logo-transparent.png";

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
        <Link to="/">Home</Link>
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
        {competition.images?.[0] ? <img src={competition.images[0]} alt={competition.title} /> : <div className="competition-image-missing">Image unavailable</div>}
      </div>
      <p className="card-kicker">FEATURED COMPETITION</p>
      <h3>{competition.title}</h3>
      <div className="price-row">
        <span>FROM</span>
        <strong>{new Intl.NumberFormat("en-GB",{style:"currency",currency:competition.currency||"GBP"}).format((competition.priceMinor||0)/100)}</strong>
      </div>
      <p className="card-note">COMPETITIONS OPEN · ENTER NOW</p>
      <div className="card-rule" />
      <ArrowButton href={competition.path || `/competitions/${competition.slug}`}>VIEW COMPETITION</ArrowButton>
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
            Big prizes. Big buzz. UK competitions with transparent results.
          </p>
          <p className="footer-disclaimer">
            Review every prize, price and
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
          <span>© 2026 WinJolt. All rights reserved.</span>
          <span>18+ · Free-entry options · Fair results · UK</span>
        </div>
      </footer>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <Link to="/">
          <NavIcon type="home" />
          HOME
        </Link>
        <Link to="/competitions">
          <NavIcon type="prizes" />
          PRIZES
        </Link>
        <Link to="/instant-wins">
          <span className="instant-nav-icon">⚡</span>INSTANT
        </Link>
        <Link to="/your-basket">
          <NavIcon type="basket" />
          BASKET
        </Link>
        <Link to="/my-winjolt-dashboard">
          <NavIcon type="account" />
          ACCOUNT
        </Link>
      </nav>
    </>
  );
}

export default function Homepage() {
  const [searchParams]=useSearchParams();
  const [newsletterJoined, setNewsletterJoined] = useState(false);
  const [newsletterError,setNewsletterError]=useState("");
  const [competitions,setCompetitions]=useState([]); const [catalogueError,setCatalogueError]=useState("");
  useEffect(()=>{api.get("/competitions?limit=4").then((result)=>setCompetitions(result.items)).catch((error)=>setCatalogueError(error.message));},[]);
  useEffect(()=>{const token=searchParams.get("newsletter_token");if(token)api.post("/newsletter/confirm",{token}).then(()=>setNewsletterJoined(true)).catch((error)=>setNewsletterError(error.message));},[searchParams]);
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
            <p>Featured prizes · View entry details</p>
          </div>
        </section>
        <div className="trust-bar">
          <span>✦ 18+ only</span>
          <span>✦ Free entry available</span>
          <span>✦ Fair, recorded results</span>
          <span>✦ Secure checkout</span>
        </div>

        <section className="section competitions" id="competitions">
          <h2>
            <span>⚡</span> FEATURED COMPETITIONS
          </h2>
          <div className="competition-grid">
            {competitions.map((item) => (
              <CompetitionCard key={item.publicId} competition={item} />
            ))}
          </div>
          {competitions.length===0&&<p>{catalogueError||"No live or scheduled competitions are currently available."}</p>}
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
            <ArrowButton href="/instant-wins">EXPLORE INSTANT WINS</ArrowButton>
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
              <p className="yellow-label">WINNERS &amp; RESULTS</p>
              <h2>REAL WINNERS. REAL RESULTS.</h2>
              <p>
                View verified winners, draw records and prize handover updates.
              </p>
            <ArrowButton variant="blue" href="/winners-and-results">LEARN ABOUT RESULTS</ArrowButton>
            </article>
            <figure>
              <img src={gamingImage} alt="Gaming and technology prize bundle" />
              <figcaption>
                Prize imagery represents the listed competitions.
              </figcaption>
            </figure>
          </div>
          <form
            className="newsletter"
            onSubmit={async(event) => { event.preventDefault(); const form=event.currentTarget;try{setNewsletterError("");await api.post("/newsletter/subscribe",{email:new FormData(form).get("email"),consent:true,source:"HOMEPAGE"});setNewsletterJoined(true);form.reset();}catch(error){setNewsletterError(error.message);} }}
          >
            <div>
              <p className="yellow-label">JOIN THE WINJOLT CLUB</p>
              <h2>Get the latest WinJolt updates.</h2>
              <p>
                Receive competition news, prize announcements and winner updates.
              </p>
            </div>
            <div className="newsletter-form">
              <input
                type="email"
                name="email"
                aria-label="Email address"
                placeholder="Enter your email address"
                required
              />
              <button className="action-button yellow" type="submit">JOIN THE LIST <span aria-hidden="true">→</span></button>
            </div>
            {newsletterJoined && <p role="status">Thanks — check your email to confirm.</p>}
            {newsletterError && <p role="alert">{newsletterError}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
