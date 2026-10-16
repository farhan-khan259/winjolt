import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authenticateAdmin, isAdminAuthenticated } from "../../../auth";
import logo from "../../../Assets/Pictures/winjolt-logo-transparent.png";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const destination = location.state?.from || "/admin/command-centre";
  if (isAdminAuthenticated())
    return <Navigate to="/admin/command-centre" replace />;
  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try { setSubmitting(true); setError(""); await authenticateAdmin(data.get("email"), data.get("password"), data.get("mfaCode")); navigate(destination, { replace: true }); }
    catch (requestError) { setError(requestError.message); }
    finally { setSubmitting(false); }
  };
  return (
    <main className="admin-login-page">
      <section className="admin-login-brand">
        <img src={logo} alt="WinJolt Competitions" />
        <p>SECURE OPERATIONS PORTAL</p>
        <h1>ADMINISTRATION</h1>
        <span>Restricted access for authorised WinJolt operations staff.</span>
      </section>
      <section className="admin-login-panel">
        <form onSubmit={submit}>
          <small>WINJOLT / STAFF ACCESS</small>
          <h2>ADMIN SIGN IN</h2>
          <p>Enter your authorised administrator credentials.</p>
          <label>
            EMAIL ADDRESS
            <input
              name="email"
              type="email"
              autoComplete="username"
              placeholder="Admin email address"
              required
              autoFocus
            />
          </label>
          <label>
            MFA CODE
            <input name="mfaCode" inputMode="numeric" autoComplete="one-time-code" placeholder="6-digit code" pattern="[0-9]{6}" required />
          </label>
          <label>
            PASSWORD
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Admin password"
              required
            />
          </label>
          {error && (
            <div className="admin-login-error" role="alert">
              {error}
            </div>
          )}
          <button type="submit" disabled={submitting}>{submitting ? "SIGNING IN…" : "SIGN IN TO ADMIN →"}</button>
          <a href="/">← Return to WinJolt</a>
        </form>
      </section>
    </main>
  );
}
