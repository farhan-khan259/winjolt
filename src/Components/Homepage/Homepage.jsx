import { useState } from 'react';
import './Homepage.css';

import carImage from '../../Assets/Pictures/car-card.jpg';
import cashImage from '../../Assets/Pictures/cash-card.jpg';
import gamingImage from '../../Assets/Pictures/gaming-card.jpg';
import heroImage from '../../Assets/Pictures/hero-prize-montage.jpg';
import toolsImage from '../../Assets/Pictures/tools-card.jpg';
import wheelImage from '../../Assets/Pictures/jolt-wheel.svg';
import logoImage from '../../Assets/Pictures/winjolt-logo-transparent.png';

const competitions = [
  { title: 'Performance Car + Cash', image: carImage },
  {  title: '£10,000 Cash Prize', image: cashImage },
  {  title: 'Gaming & Tech Bundle', image: gamingImage },
  { title: 'Ultimate Tools Collection', image: toolsImage },
];

const steps = [
  ['1', 'CHOOSE YOUR PRIZE', 'Explore competitions, prize photographs and full terms.'],
  ['2', 'CHOOSE AN ENTRY ROUTE', 'Use an eligible free route or a paid-entry route.'],
  ['3', 'SEE THE RESULT', 'Instantly or through a transparent recorded draw.'],
  ['4', 'CLAIM YOUR PRIZE', 'Verify eligibility and arrange collection or delivery.'],
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="WinJolt home">
      <img src={logoImage} alt="WinJolt Competitions" />
    </a>
  );
}

function ArrowButton({ children, variant = 'yellow', href = '#' }) {
  return <a className={`action-button ${variant}`} href={href}>{children} <span aria-hidden="true">→</span></a>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Brand />
      <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
        <a href="#competitions">Competitions</a>
        <a href="#instant-wins">Instant Wins</a>
        <a href="#winners">Winners</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#free-entry">Free Entry</a>
        <a href="#support">Support</a>
      </nav>
      <div className="header-actions">
        <a className="basket-button" href="#basket" aria-label="Shopping cart">
          <svg className="cart-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 1.9-1.4L21 8H7" />
            <circle cx="10" cy="19" r="1.4" />
            <circle cx="18" cy="19" r="1.4" />
          </svg>
        </a>
        <a className="sign-in" href="#sign-in">Sign in</a>
        <a className="sign-up" href="#sign-up">Sign up</a>
        <button className="menu-button" type="button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
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
        <span className="image-label">{competition.label}</span>
      </div>
      <p className="card-kicker">COMING SOON · {competition.label}</p>
      <h3>{competition.title}</h3>
      <div className="price-row"><span>FROM</span><strong>£0.99</strong></div>
      <p className="card-note">DEMO · NO TICKETS ON SALE</p>
      <div className="card-rule" />
      <ArrowButton>VIEW COMPETITION</ArrowButton>
    </article>
  );
}

function Footer() {
  return (
    <>
      <footer className="site-footer" id="support">
        <div className="footer-brand">
          <Brand />
          <p>Big prizes. Big buzz. A UK competitions platform design concept.</p>
          <p className="footer-disclaimer">Every prize and price shown here is illustrative. No live participation.</p>
        </div>
        <div className="footer-links">
          <div><h3>EXPLORE</h3><a href="#competitions">Competitions</a><a href="#instant-wins">Instant Wins</a><a href="#games">Games &amp; Experiences</a><a href="#competitions">Winners</a><a href="#draws">Live Draws</a><a href="#checker">Ticket Checker</a></div>
          <div><h3>ABOUT</h3><a href="#about">About Us</a><a href="#how-it-works">How It Works</a><a href="#free-entry">Free Entry</a><a href="#responsible">Responsible Participation</a><a href="#support">Help Centre</a></div>
          <div><h3>LEGAL &amp; HELP</h3><a href="#terms">Terms &amp; Conditions</a><a href="#privacy">Privacy Policy</a><a href="#cookies">Cookie Policy</a><a href="#complaints">Complaints</a><a href="#contact">Contact Us</a><a href="#designs">All Page Designs</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 WinJolt. No purchases, entries or prizes awarded.</span><span>18+ · Free-entry options · Fair results · UK</span></div>
      </footer>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <a href="#top"><span>⌂</span>HOME</a><a href="#competitions"><span>◇</span>PRIZES</a><a href="#instant-wins"><span>ϟ</span>INSTANT</a><a href="#basket"><span>▣</span>BASKET</a><a href="#account"><span>◉</span>ACCOUNT</a>
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
            <p className="eyebrow">ϟ BIG PRIZES. BIG BUZZ.</p>
            <h1>AMAZING PRIZES.<br /><em>REAL PEOPLE.</em><br />BRIGHTER DAYS.</h1>
            <p className="hero-text">Cars, cash, tech, tools and more. A UK competitions experience with transparent results.</p>
            <div className="hero-buttons"><ArrowButton href="#competitions">VIEW COMPETITIONS</ArrowButton><ArrowButton variant="blue" href="#instant-wins">ϟ INSTANT WINS</ArrowButton></div>
          </div>
          <div className="hero-visual"><img src={heroImage} alt="Blue car, cash and technology prizes" /><p>Illustrative prizes · No active entries</p></div>
        </section>
        <div className="trust-bar"><span>✦ 18+ only</span><span>✦ Free entry available</span><span>✦ Fair, recorded results</span><span>✦ Secure checkout planned</span></div>

        <section className="section competitions" id="competitions">
          <h2><span>ϟ</span> FEATURED COMPETITIONS</h2>
          <div className="competition-grid">{competitions.map((item) => <CompetitionCard key={item.label} competition={item} />)}</div>
        </section>

        <section className="instant-section" id="instant-wins">
          <div><h2><span>ϟ</span> INSTANT WINS</h2><p>Selected competitions may award instant prizes through verifiable, fair results.</p><ArrowButton>EXPLORE INSTANT WINS</ArrowButton></div>
          <img src={wheelImage} alt="Instant wins prize wheel" />
        </section>

        <section className="section how-section" id="how-it-works">
          <h2>HOW WINJOLT WORKS</h2>
          <div className="steps">{steps.map(([number, title, text]) => <article key={number}><strong>{number}</strong><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="results-grid" id="winners">
            <article className="results-copy"><p className="yellow-label">THE FIRST WINNERS ARE YET TO COME</p><h2>REAL WINNERS. REAL RESULTS.</h2><p>Verified winners, draw records and prize handovers will appear here after launch—not made-up testimonials or prize statistics.</p><ArrowButton variant="blue">LEARN ABOUT RESULTS</ArrowButton></article>
            <figure><img src={gamingImage} alt="Gaming and technology prize bundle" /><figcaption>Promotional prize imagery is illustrative.</figcaption></figure>
          </div>
          <form className="newsletter" onSubmit={(event) => event.preventDefault()}><div><p className="yellow-label">JOIN THE WINJOLT CLUB</p><h2>Be first to hear what's coming.</h2><p>Launch updates and new prize previews. Newsletter integration pending.</p></div><div className="newsletter-form"><input type="email" aria-label="Email address" placeholder="Enter your email address" /><ArrowButton>JOIN THE LIST</ArrowButton></div></form>
        </section>
      </main>
      <Footer />
    </div>
  );
}