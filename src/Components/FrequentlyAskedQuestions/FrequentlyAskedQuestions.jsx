import { PageShell } from "../CommonPages/CommonPages";
import "./FrequentlyAskedQuestions.css";
const questions = [
  "How do I enter competitions?",
  "Do you offer free entry?",
  "How are winners selected?",
  "How do instant-win outcomes work?",
  "How are prizes delivered?",
];
export default function FrequentlyAskedQuestions() {
  return (
    <PageShell
      className="faq-page"
      eyebrow="FREQUENTLY ASKED QUESTIONS"
      title="FREQUENTLY ASKED QUESTIONS"
      subtitle="Answers to questions about WinJolt."
    >
      <section className="info-content faq-plain">
        {questions.map((q) => (
          <article key={q}>
            <h2>{q}</h2>
            <p>
              Full legally reviewed and verified information required before
              launch
            </p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
