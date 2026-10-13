import { Header, Footer } from "../Homepage/Homepage";
import wheel from "../../Assets/Pictures/jolt-wheel.svg";
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
                independently. No prize is awarded in this prototype.
              </p>
              <button className="xp-button">READ THE GAME RULES →</button>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
