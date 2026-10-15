import { useLocation, useNavigate } from "react-router-dom";
import { createAuthenticatedSession } from "../../auth";
import { Logo, PageShell } from "../CommonPages/CommonPages";
import "./SignIn.css";
export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from || "/my-winjolt-dashboard";
  return (
    <PageShell
      className="sign-in-page"
      eyebrow="SIGN IN"
      title="WELCOME BACK"
      subtitle="Sign in to track your entries, orders and prizes."
    >
      <section className="auth-wrap">
        <form className="auth-card" onSubmit={(e) => {
          e.preventDefault();
          createAuthenticatedSession();
          navigate(destination, { replace: true });
        }}>
          <Logo />
          <h2>SIGN IN</h2>
          <label className="form-field">
            EMAIL ADDRESS
            <input type="email" placeholder="you@example.com" required />
          </label>
          <label className="form-field">
            PASSWORD
            <input type="password" placeholder="Password" required />
          </label>
          <button className="info-action" type="submit">SIGN IN →</button>
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
