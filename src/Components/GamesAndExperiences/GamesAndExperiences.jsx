import { Header, Footer } from "../Homepage/Homepage";
import { Link } from "react-router-dom";
import wheel from "../../Assets/Pictures/jolt-wheel.png";
import "./GamesAndExperiences.css";
export default function GamesAndExperiences() {
  return (
    <div className="experience-page games-page" id="top">
     
      <Header />
      <main>
        <section className="experience-hero">
          <div>
            <p>WINJOLT / GAMES &amp; EXPERIENCES</p>
            <h1>GAMES &amp; EXPERIENCES</h1>
            <span>Explore WinJolt prize-reveal experiences.</span>
          </div>
          <b>ϟ</b>
        </section>
        <section className="games-stage">
          <article className="wheel-feature">
            <img src={wheel} alt="Jolt reveal wheel" />
            <div>
              <h2>⚡ THE JOLT REVEAL</h2>
              <p>
                This animated wheel only reveals a result determined
                independently. Results are securely allocated before the reveal.
              </p>
              <Link className="xp-button" to="/how-it-works">READ THE GAME RULES →</Link>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
