import { useState } from "react";
import { Logo, PageShell } from "../CommonPages/CommonPages";
import "./ResetPassword.css";
export default function ResetPassword() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell
      className="reset-page"
      eyebrow="RESET PASSWORD"
      title="RESET YOUR PASSWORD"
      subtitle="Enter your account email address to reset your password."
    >
      <section className="auth-wrap">
        <form className="auth-card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <Logo />
          <h2>RESET PASSWORD</h2>
          <label className="form-field">
            EMAIL ADDRESS
            <input type="email" placeholder="you@example.com" required />
          </label>
          <button className="info-action" type="submit">RESET PASSWORD →</button>
          {sent && <div className="info-note" role="status">If an account matches that email, reset instructions have been prepared.</div>}
          <p className="auth-links">
            New to WinJolt? <a href="/sign-up">Create an account</a>
            <br />
            Already registered? <a href="/sign-in">Sign in</a>
          </p>
          <div className="info-note">
            Registration and authentication require a secure production backend.
            No details entered here are stored or transmitted.
          </div>
        </form>
      </section>
    </PageShell>
  );
}
