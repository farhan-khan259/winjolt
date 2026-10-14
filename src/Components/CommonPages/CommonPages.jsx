import { Header, Footer } from "../Homepage/Homepage";
import { Link } from "react-router-dom";
import logo from "../../Assets/Pictures/winjolt-logo-transparent.png";
import "./CommonPages.css";

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}) {
  return (
    <div className={`info-page ${className}`} id="top">
      <Header />
      <main>
        <section className="info-hero">
          <div className="info-hero-inner">
            <p>WINJOLT / {eyebrow}</p>
            <h1>{title}</h1>
            <span className="info-subtitle">{subtitle}</span>
          </div>
          <i aria-hidden="true" />
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export const Action = ({
  children,
  href = "/competitions",
  outline = false,
}) => (
  <Link className={`info-action${outline ? " outline" : ""}`} to={href}>
    {children} →
  </Link>
);
export const Logo = () => (
  <img className="form-logo" src={logo} alt="WinJolt Competitions" />
);
export const PlaceholderCards = ({
  items,
  text = "Full legally reviewed and verified information required before launch",
}) => (
  <div className="placeholder-cards">
    {items.map((item) => (
      <article key={item}>
        <h2>{item}</h2>
        <p>{text}</p>
      </article>
    ))}
  </div>
);

const accountLinks = [
  ["dashboard", "▣", "Dashboard", "/my-winjolt-dashboard"],
  ["entries", "◆", "My Entries", "/my-entries"],
  ["orders", "▤", "Order History", "/my-orders"],
  ["prizes", "🏆", "Prize Claims", "/my-prizes"],
  ["settings", "⚙", "Account Settings", "/account-settings"],
  ["controls", "♡", "Spending Controls", "/responsible-participation"],
  ["support", "✉", "Support", "/help-centre"],
];

export function AccountNav({ active }) {
  return (
    <nav className="dashboard-nav" aria-label="Account navigation">
      {accountLinks.map(([key, icon, label, to]) => (
        <Link
          className={active === key ? "active" : ""}
          aria-current={active === key ? "page" : undefined}
          key={key}
          to={to}
        >
          <span aria-hidden="true">{icon}</span> {label}
        </Link>
      ))}
    </nav>
  );
}
