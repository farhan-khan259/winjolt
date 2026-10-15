import { useState } from "react";
import { PageShell } from "../CommonPages/CommonPages";
import "./ComplaintsProcedure.css";

const fields = [
  ["Full name", "Enter full name", "text"],
  ["Email address", "Enter email address", "email"],
  ["Complaint reference", "Enter complaint reference", "text"],
  ["Describe the issue", "Enter describe the issue", "text"],
];

export default function ComplaintsProcedure() {
  const [submitted, setSubmitted] = useState(false);
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
          onSubmit={(event) => { event.preventDefault(); setSubmitted(true); event.currentTarget.reset(); }}
        >
          {fields.map(([label, placeholder, type]) => (
            <label className="form-field" key={label}>
              {label}
              <input type={type} placeholder={placeholder} required />
            </label>
          ))}
          <button type="submit">SUBMIT REQUEST →</button>
          {submitted && <div className="info-note" role="status">Your complaint has been submitted.</div>}
        </form>
      </section>
    </PageShell>
  );
}
