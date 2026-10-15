import { useState } from "react";
import { PageShell } from "../CommonPages/CommonPages";
import "./ContactUs.css";
export default function ContactUs() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell
      className="contact-page"
      eyebrow="CONTACT US"
      title="CONTACT US"
      subtitle="Talk to the WinJolt support team."
    >
      <section className="info-content contact-content">
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); e.currentTarget.reset(); }}>
          {[
            ["Your name", "Enter your name"],
            ["Email address", "Enter email address"],
            ["Enquiry category", "Enter enquiry category"],
            ["Message", "Enter message"],
          ].map(([l, p]) => (
            <label className="form-field" key={l}>
              {l}
              <input type={l === "Email address" ? "email" : "text"} placeholder={p} required />
            </label>
          ))}
          <button className="info-action" type="submit">SEND MESSAGE →</button>
          {sent && <div className="info-note" role="status">Your message has been sent.</div>}
        </form>
        <article className="info-panel">
          <h2>SECURITY &amp; PRIVACY</h2>
          <p>
            No login, payments or personal information are submitted in this
            website.
          </p>
        </article>
      </section>
    </PageShell>
  );
}
