import { useState } from "react";
import { AccountNav, PageShell } from "../CommonPages/CommonPages";
import "./AccountSetting.css";

const fields = [
  ["Full name", "Enter full name", "text"],
  ["Email address", "Enter email address", "email"],
  ["Password", "Enter password", "password"],
  ["Participation controls", "Enter participation controls", "text"],
  ["Newsletter preferences", "Enter newsletter preferences", "text"],
];

export default function AccountSetting() {
  const [saved, setSaved] = useState(false);
  return (
    <PageShell eyebrow="MY WINJOLT / ACCOUNT SETTINGS" title="ACCOUNT SETTINGS" subtitle="Manage your personal data, password and preferences." className="account-setting-page">
      <section className="info-content dashboard-layout account-setting-content">
        <AccountNav active="settings" />
        <form className="settings-form account-page-panel" onSubmit={(event) => { event.preventDefault(); setSaved(true); }}>
          <small>YOUR PROFILE</small><h2>ACCOUNT SETTINGS</h2><p>Keep your account and communication preferences up to date.</p>
          {fields.map(([label, placeholder, type]) => (
            <label className="form-field" key={label}>{label}<input type={type} placeholder={placeholder} /></label>
          ))}
          <button type="submit">SAVE SETTINGS →</button>
          {saved && <div className="info-note" role="status">Your settings have been saved locally for this demo.</div>}
        </form>
      </section>
    </PageShell>
  );
}
