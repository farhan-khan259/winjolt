import { Action, Logo, PageShell } from "../CommonPages/CommonPages";
import "./ResetPassword.css";
export default function ResetPassword() {
  return (
    <PageShell
      className="reset-page"
      eyebrow="RESET PASSWORD"
      title="RESET YOUR PASSWORD"
      subtitle="Enter your account email address to preview the recovery journey."
    >
      <section className="auth-wrap">
        <form className="auth-card" onSubmit={(e) => e.preventDefault()}>
          <Logo />
          <h2>RESET PASSWORD</h2>
          <label className="form-field">
            EMAIL ADDRESS
            <input type="email" placeholder="you@example.com" />
          </label>
          <Action>PREVIEW PASSWORD RESET</Action>
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
