import { PageShell } from "../CommonPages/CommonPages";
import "./ComplaintsProcedure.css";

const fields = [
  ["Full name", "Enter full name", "text"],
  ["Email address", "Enter email address", "email"],
  ["Complaint reference", "Enter complaint reference", "text"],
  ["Describe the issue", "Enter describe the issue", "text"],
];

export default function ComplaintsProcedure() {
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
          onSubmit={(event) => event.preventDefault()}
        >
          {fields.map(([label, placeholder, type]) => (
            <label className="form-field" key={label}>
              {label}
              <input type={type} placeholder={placeholder} />
            </label>
          ))}
          <button type="submit">SUBMIT REQUEST (DEMO) →</button>
        </form>
      </section>
    </PageShell>
  );
}
