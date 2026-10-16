import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
import { Footer, Header } from "../Homepage/Homepage";
import "./RegistrationConfirmation.css";

const items = [
  ["DOB INDICATES 18+", "Account creation may proceed. Any further required assurance is handled separately.", "green"],
  ["BELOW 18 / INVALID DATE", "Registration is rejected automatically; no tickets, payments or entries."],
  ["FURTHER AGE ASSURANCE", "Only if required by a documented legal and risk-based compliance policy."],
];
const workings = [
  ["Automatic age calculation", "Backend compares the real birthday with the current UK calendar date."],
  ["No separate DOB verification page", "The 18+ calculation happens immediately during sign-up. Additional age or identity checks are distinct and risk-based."],
  ["Handling incorrect dates", "Customers can correct mistakes, subject to fraud-prevention rules."],
  ["Privacy-friendly records", "Store DOB and age-gate result securely; retain only evidence necessary for the approved policy."],
];

export default function RegistrationConfirmation() {
  const [params] = useSearchParams(); const [verification, setVerification] = useState(params.get("token") ? "Verifying your email…" : "Check your email to verify the address before entering a competition.");
  useEffect(() => { const token=params.get("token"); if(token) api.post("/accounts/verify-email",{token}).then(()=>setVerification("Email verified. Your account can now proceed to campaign eligibility checks.")).catch((error)=>setVerification(error.message)); }, [params]);
  return <div className="confirm-page" id="top"><Header/><main>
    <section className="confirm-hero"><div><p>WINJOLT ACCOUNT / REGISTRATION</p><h1>ACCOUNT CREATED · VERIFY YOUR EMAIL</h1><span>Your entered date of birth passed the server-side 18+ gate. Email verification and any campaign-specific checks remain separate.</span></div><i aria-hidden="true"/></section>
    <section className="confirm-content">
      <div className="confirm-steps"><article><b>1 · DETAILS ENTERED</b><span>Name, address, DOB, contacts</span></article><article><b>2 · AUTOMATIC AGE CHECK</b><span>Server calculates full years from DOB</span></article><article><b>3 · REGISTRATION COMPLETED</b><span>When DOB indicates adult age</span></article></div>
      <div className="confirm-columns">
        <article className="confirm-card result"><small>AUTOMATIC AGE CHECK RESULT</small><h2>REGISTRATION ACCEPTED</h2><p>{verification}</p><div className="pass-box"><b>18+ DATE-OF-BIRTH CHECK PASSED</b><span>Entered DOB gate: PASSED · Identity: not independently verified · Entry eligibility: subject to email, account and competition rules.</span></div>{items.map(([h,p,c])=><div className="confirm-row" key={h}><b className={c}>{h}</b><span>{p}</span></div>)}</article>
        <article className="confirm-card working"><h2>HOW THE DOB CHECK WORKS</h2>{workings.map(([h,p])=><div className="confirm-row" key={h}><b>{h}</b><span>{p}</span></div>)}<div className="pass-box"><b>WHY WE ASK FOR DETAILS</b><span>We collect information for eligibility, account security and prize fulfilment only when proportionate. Terms and privacy policies explain lawful purpose, retention and sharing.</span></div></article>
      </div>
    </section>
  </main><Footer/></div>;
}
