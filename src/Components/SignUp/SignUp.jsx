import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerCustomer } from "../../auth";
import logo from "../../Assets/Pictures/winjolt-logo-transparent.png";
import { Footer, Header } from "../Homepage/Homepage";
import "./SignUp.css";

const Field = ({ label, placeholder, type = "text", ...props }) => (
  <label className="signup-field">
    <span>{label}</span>
    <input
      type={type}
      placeholder={placeholder}
      required={!label.includes("OPTIONAL")}
      {...props}
    />
  </label>
);

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    if (data.get("password") !== data.get("confirmPassword")) {
      setError("The passwords you entered do not match.");
      return;
    }
    const dateOfBirth = `${data.get("year")}-${String(data.get("month")).padStart(2, "0")}-${String(data.get("day")).padStart(2, "0")}`;
    try {
      setSubmitting(true);
      await registerCustomer({
        first_name: data.get("firstName"), last_name: data.get("lastName"), date_of_birth: dateOfBirth,
        email: data.get("email"), phone: data.get("phone"), password: data.get("password"),
        address: { line1: data.get("address1"), line2: data.get("address2"), city: data.get("city"), county: data.get("county"), postcode: data.get("postcode"), country: data.get("country") },
        accept_terms: data.get("acceptTerms") === "on", marketing_consent: data.get("marketingConsent") === "on",
        terms_version: "prelaunch-v1", privacy_version: "prelaunch-v1",
      });
      navigate("/registration-confirmation");
    } catch (requestError) { setError(requestError.message); }
    finally { setSubmitting(false); }
  };
  return (
    <div className="signup-page" id="top">
      <Header />
      <main>
        <section className="signup-hero">
          <p>WINJOLT / CREATE ACCOUNT</p>
          <h1>CREATE YOUR WINJOLT ACCOUNT</h1>
          <span>
            Register with your name, date of birth, address, email and phone.
            Our system automatically rejects a date of birth indicating you are
            under 18.
          </span>
        </section>
        <section className="signup-stage">
          <form className="signup-card" onSubmit={submit}>
            <img src={logo} alt="WinJolt Competitions" />
            <h2>CREATE YOUR WINJOLT ACCOUNT</h2>
            <p className="signup-required">
              18+ only · All required fields marked *
            </p>
            <div className="signup-callout">
              <b>AUTOMATIC 18+ AGE CHECK</b>
              <span>
                WinJolt calculates your age automatically from the date of birth
                you enter. Under 18? Registration is refused. Age 18+?
                Registration may proceed. This checks the date you entered, not
                your identity.
              </span>
            </div>
            <fieldset>
              <legend>1. PERSONAL DETAILS</legend>
              <div className="signup-grid">
                <Field
                  name="firstName"
                  label="FIRST NAME *"
                  placeholder="As shown on official records"
                />
                <Field
                  name="lastName"
                  label="LAST NAME *"
                  placeholder="As shown on official records"
                />
              </div>
              <label className="signup-field">
                <span>DATE OF BIRTH *</span>
                <div className="dob-grid">
                  <input
                    name="day"
                    inputMode="numeric"
                    maxLength="2"
                    placeholder="DD"
                    required
                  />
                  <input
                    name="month"
                    inputMode="numeric"
                    maxLength="2"
                    placeholder="MM"
                    required
                  />
                  <input
                    name="year"
                    inputMode="numeric"
                    maxLength="4"
                    placeholder="YYYY"
                    required
                  />
                </div>
                <small>
                  Calculated immediately from your date of birth. Under 18 =
                  registration blocked. Your actual age is not independently
                  proven by this field.
                </small>
              </label>
            </fieldset>
            <fieldset>
              <legend>2. CONTACT &amp; RESIDENTIAL ADDRESS</legend>
              <div className="signup-grid">
                <Field
                  name="email"
                  label="EMAIL ADDRESS *"
                  type="email"
                  placeholder="you@example.com"
                />
                <Field
                  name="phone"
                  label="MOBILE PHONE *"
                  type="tel"
                  placeholder="UK contact number"
                />
              </div>
              <Field
                name="address1"
                label="ADDRESS LINE 1 *"
                placeholder="House number and street"
              />
              <Field
                name="address2"
                label="ADDRESS LINE 2 (OPTIONAL)"
                placeholder="Flat, apartment, building"
              />
              <div className="signup-grid">
                <Field name="city" label="TOWN OR CITY *" placeholder="Town / city" />
                <Field name="county" label="COUNTY (OPTIONAL)" placeholder="County" />
              </div>
              <div className="signup-grid">
                <Field name="postcode" label="POSTCODE *" placeholder="UK postcode" />
                <Field name="country" label="COUNTRY *" placeholder="United Kingdom" defaultValue="United Kingdom" />
              </div>
            </fieldset>
            <fieldset>
              <legend>3. ACCOUNT SECURITY</legend>
              <div className="signup-grid">
                <Field
                  name="password"
                  label="PASSWORD *"
                  type="password"
                  placeholder="Create a secure password"
                  minLength="8"
                />
                <Field
                  name="confirmPassword"
                  label="CONFIRM PASSWORD *"
                  type="password"
                  placeholder="Repeat password"
                  minLength="8"
                />
              </div>
              <label className="signup-check">
                <input name="acceptTerms" type="checkbox" required />
                <span>
                  I confirm I am 18+ and agree to the Terms &amp; Conditions and
                  acknowledge the Privacy Notice. *
                </span>
              </label>
              <label className="signup-check">
                <input name="marketingConsent" type="checkbox" />
                <span>
                  Optional: Email me WinJolt news and offers. This is not
                  required to register.
                </span>
              </label>
            </fieldset>
            {error && (
              <p className="signup-error" role="alert">
                {error}
              </p>
            )}
            <button className="signup-submit" type="submit" disabled={submitting}>
              {submitting ? "CREATING ACCOUNT…" : "CREATE ACCOUNT →"}
            </button>
            <p className="signup-login">
              Already registered? <Link to="/sign-in">Sign in</Link>
            </p>
            <div className="signup-callout privacy">
              <b>PRIVACY &amp; SECURITY</b>
              <span>
                We use necessary account information for eligibility,
                competition operations and prize fulfilment. Marketing is
                optional.
              </span>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
