import { useState } from "react";
import { PageShell } from "../CommonPages/CommonPages";
import { api } from "../../services/api";
import "./ContactUs.css";
export default function ContactUs() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  return (
    <PageShell
      className="contact-page"
      eyebrow="CONTACT US"
      title="CONTACT US"
      subtitle="Talk to the WinJolt support team."
    >
      <section className="info-content contact-content">
        <form onSubmit={async (e) => { e.preventDefault(); const form=e.currentTarget; const data=new FormData(form); try{setError(""); await api.post("/support-cases",{name:data.get("Your name"),email:data.get("Email address"),category:data.get("Enquiry category"),message:data.get("Message"),type:"ENQUIRY"}); setSent(true); form.reset();}catch(requestError){setError(requestError.message);} }}>
          {[
            ["Your name", "Enter your name"],
            ["Email address", "Enter email address"],
            ["Enquiry category", "Enter enquiry category"],
            ["Message", "Enter message"],
          ].map(([l, p]) => (
            <label className="form-field" key={l}>
              {l}
              <input name={l} type={l === "Email address" ? "email" : "text"} placeholder={p} required />
            </label>
          ))}
          <button className="info-action" type="submit">SEND MESSAGE →</button>
          {sent && <div className="info-note" role="status">Your message has been sent.</div>}
          {error && <div className="info-note" role="alert">{error}</div>}
        </form>
        <article className="info-panel">
          <h2>SECURITY &amp; PRIVACY</h2>
          <p>
            Your enquiry is stored securely for the support team and handled under the published privacy policy.
          </p>
        </article>
      </section>
    </PageShell>
  );
}
