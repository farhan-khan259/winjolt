import { Action, PageShell } from "../CommonPages/CommonPages";
import "./ContactUs.css";
export default function ContactUs() {
  return (
    <PageShell
      className="contact-page"
      eyebrow="CONTACT US"
      title="CONTACT US"
      subtitle="Talk to the WinJolt support team."
    >
      <section className="info-content contact-content">
        <form onSubmit={(e) => e.preventDefault()}>
          {[
            ["Your name", "Enter your name"],
            ["Email address", "Enter email address"],
            ["Enquiry category", "Enter enquiry category"],
            ["Message", "Enter message"],
          ].map(([l, p]) => (
            <label className="form-field" key={l}>
              {l}
              <input placeholder={p} />
            </label>
          ))}
          <Action>CONTINUE (DEMO ONLY)</Action>
        </form>
        <article className="info-panel">
          <h2>SECURITY &amp; PRIVACY</h2>
          <p>
            No login, payments or personal information are submitted in this
            design prototype.
          </p>
        </article>
      </section>
    </PageShell>
  );
}
