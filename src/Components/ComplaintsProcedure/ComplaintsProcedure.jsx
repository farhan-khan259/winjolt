import { useState } from "react";
import { PageShell } from "../CommonPages/CommonPages";
import { api } from "../../services/api";
import "./ComplaintsProcedure.css";

const fields = [
  ["Full name", "Enter full name", "text"],
  ["Email address", "Enter email address", "email"],
  ["Complaint reference", "Enter complaint reference", "text"],
  ["Describe the issue", "Enter describe the issue", "text"],
];

export default function ComplaintsProcedure() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  return (
    <PageShell
      eyebrow="COMPLAINTS PROCEDURE"
      title={
        <>
          COMPLAINTS{" "}
          <span className="mobile-title-break">
            <br />
          </span>
          PROCEDURE
        </>
      }
      subtitle="How concerns are reviewed."
      className="complaints-page"
    >
      <section className="info-content complaints-content">
        <form
          className="complaints-form"
          onSubmit={async (event) => { event.preventDefault(); const form=event.currentTarget; const data=new FormData(form); try{setError(""); await api.post("/support-cases",{name:data.get("Full name"),email:data.get("Email address"),reference:data.get("Complaint reference"),message:data.get("Describe the issue"),type:"COMPLAINT"}); setSubmitted(true); form.reset();}catch(requestError){setError(requestError.message);} }}
        >
          {fields.map(([label, placeholder, type]) => (
            <label className="form-field" key={label}>
              {label}
              <input name={label} type={type} placeholder={placeholder} required />
            </label>
          ))}
          <button type="submit">SUBMIT REQUEST →</button>
          {submitted && <div className="info-note" role="status">Your complaint has been submitted.</div>}
          {error && <div className="info-note" role="alert">{error}</div>}
        </form>
      </section>
    </PageShell>
  );
}
