import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authenticateAdmin, isAdminAuthenticated, requestAdminOtp } from "../../../auth";
import logo from "../../../Assets/Pictures/winjolt-logo-transparent.png";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const destination = location.state?.from || "/admin/command-centre";
  if (isAdminAuthenticated())
    return <Navigate to="/admin/command-centre" replace />;
  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      setSubmitting(true); setError("");
      if (!otpRequested) {
        const nextCredentials = { email: data.get("email"), password: data.get("password") };
        await requestAdminOtp(nextCredentials.email, nextCredentials.password);
        setCredentials(nextCredentials); setOtpRequested(true); return;
      }
      await authenticateAdmin(credentials.email, credentials.password, data.get("mfaCode"));
      navigate(destination, { replace: true });
    }
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
          <p>{otpRequested ? `Enter the six-digit code sent to ${credentials.email}. It expires in 10 minutes.` : "Enter your authorised administrator credentials. We will email you a single-use sign-in code."}</p>
          {!otpRequested ? <>
            <label>
              EMAIL ADDRESS
              <input name="email" type="email" autoComplete="username" placeholder="Admin email address" required autoFocus />
            </label>
            <label>
              PASSWORD
              <input name="password" type="password" autoComplete="current-password" placeholder="Admin password" required />
            </label>
          </> : <label>
            EMAIL SIGN-IN CODE
            <input name="mfaCode" inputMode="numeric" autoComplete="one-time-code" placeholder="6-digit code" pattern="[0-9]{6}" maxLength="6" required autoFocus />
          </label>}
          {error && (
            <div className="admin-login-error" role="alert">
              {error}
            </div>
          )}
          <button type="submit" disabled={submitting}>{submitting ? (otpRequested ? "VERIFYING…" : "SENDING CODE…") : (otpRequested ? "VERIFY & SIGN IN →" : "EMAIL SIGN-IN CODE →")}</button>
          {otpRequested && <button className="admin-login-back" type="button" disabled={submitting} onClick={()=>{setOtpRequested(false);setError("");}}>← Change email or password</button>}
          <a href="/">← Return to WinJolt</a>
        </form>
      </section>
    </main>
  );
}
