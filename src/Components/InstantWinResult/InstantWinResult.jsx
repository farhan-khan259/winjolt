import { Header, Footer } from "../Homepage/Homepage";
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
            <span>Demo only; no result is awarded.</span>
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
              <button className="xp-button">HOW IT WORKS →</button>
            </div>
          </article>
          <article className="info-strip">
            <h2>NO INSTANT RESULT ASSIGNED</h2>
            <p>
              This example does not represent a real outcome or award any
              prizes.
            </p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
