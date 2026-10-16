import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authenticateCustomer } from "../../auth";
import { Logo, PageShell } from "../CommonPages/CommonPages";
import "./SignIn.css";
export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const destination = location.state?.from || "/my-winjolt-dashboard";
  return (
    <PageShell
      className="sign-in-page"
      eyebrow="SIGN IN"
      title="WELCOME BACK"
      subtitle="Sign in to track your entries, orders and prizes."
    >
      <section className="auth-wrap">
        <form className="auth-card" onSubmit={async (e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          try { setSubmitting(true); setError(""); await authenticateCustomer(data.get("email"), data.get("password")); navigate(destination, { replace: true }); }
          catch (requestError) { setError(requestError.message); }
          finally { setSubmitting(false); }
        }}>
          <Logo />
          <h2>SIGN IN</h2>
          <label className="form-field">
            EMAIL ADDRESS
            <input name="email" type="email" placeholder="you@example.com" required />
          </label>
          <label className="form-field">
            PASSWORD
            <input name="password" type="password" placeholder="Password" required />
          </label>
          {error && <div className="info-note" role="alert">{error}</div>}
          <button className="info-action" type="submit" disabled={submitting}>{submitting ? "SIGNING IN…" : "SIGN IN →"}</button>
          <p className="auth-links">
            New to WinJolt? <a href="/sign-up">Create an account</a>
            <br />
            <a href="/reset-password">Forgot your password?</a>
          </p>
          <div className="info-note">
            Your account details and sign-in session are protected securely.
          </div>
        </form>
      </section>
    </PageShell>
  );
}
