import { Header, Footer } from "../Homepage/Homepage";
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
          <p>WINJOLT / {eyebrow}</p>
          <h1>{title}</h1>
          <span>{subtitle}</span>
          <i aria-hidden="true">ϟ</i>
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
  <a className={`info-action${outline ? " outline" : ""}`} href={href}>
    {children} →
  </a>
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
