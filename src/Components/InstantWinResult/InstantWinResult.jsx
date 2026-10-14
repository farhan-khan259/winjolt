import { Header, Footer } from "../Homepage/Homepage";
import { Link } from "react-router-dom";
import wheel from "../../Assets/Pictures/jolt-wheel.png";
import "./InstantWinResult.css";
export default function InstantWinResult() {
  return (
    <div className="experience-page result-page" id="top">
     
      <Header />
      <main>
        <section className="experience-hero">
          <div>
            <p>WINJOLT / INSTANT WIN RESULT</p>
            <h1>INSTANT WIN RESULT</h1>
            <span>Your result will be displayed after verification.</span>
          </div>
          <b>ϟ</b>
        </section>
        <section className="games-stage">
          <article className="wheel-feature">
            <img src={wheel} alt="Jolt reveal wheel" />
            <div>
              <h2>⚡ JOLT REVEAL WHEEL</h2>
              <p>
                The secure result is assigned before the animation. The wheel
                does not choose winners.
              </p>
              <Link className="xp-button" to="/how-it-works">HOW IT WORKS →</Link>
            </div>
          </article>
          <article className="info-strip">
            <h2>NO INSTANT RESULT ASSIGNED</h2>
            <p>
              Results are securely verified and recorded before publication.
            </p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
