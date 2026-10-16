import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Header, Footer } from "../Homepage/Homepage";
import { Link } from "react-router-dom";
import "./WinnersAndResults.css";
export default function WinnersAndResults() {
  const [results,setResults]=useState([]); const [error,setError]=useState("");
  useEffect(()=>{api.get("/results").then((response)=>setResults(response.items)).catch((requestError)=>setError(requestError.message));},[]);
  const cards = [
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
  ];
  return (
    <div className="experience-page winners-page" id="top">
      <Header />
      <main>
        <section className="experience-hero">
          <div>
            <p>WINJOLT / WINNERS &amp; RESULTS</p>
            <h1>WINNERS &amp; RESULTS</h1>
            <span>See real, verified winners when WinJolt launches.</span>
          </div>
          <b>ϟ</b>
        </section>
        <section className="content-page">
          <article className="winner-empty">
            <b>🏆</b>
            <h2>{results.length?`${results.length} verified result${results.length===1?"":"s"}`:"No winners have been drawn."}</h2>
            <p>
              Only independently verified and published draw records appear here.
            </p>
            {error&&<p role="alert">{error}</p>}
            {results.map((result)=><div className="xp-notice" key={result.draw_id}><b>{result.competition?.title}</b><p>Winning ticket {String(result.winning_ticket?.number).padStart(5,"0")} · Published {new Date(result.published_at).toLocaleString("en-GB")}</p></div>)}
            <Link className="xp-button" to="/how-it-works">HOW DRAWS WORK →</Link>
          </article>
          <div className="standard-cards">
            {cards.map(([title, text], i) => (
              <article key={title}>
                <b>{i + 1}</b>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
