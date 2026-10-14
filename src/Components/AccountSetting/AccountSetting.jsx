import { useState } from "react";
import { PageShell } from "../CommonPages/CommonPages";
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
    <PageShell eyebrow="ACCOUNT SETTINGS" title="ACCOUNT SETTINGS" subtitle="Personal data, password, limits." className="account-setting-page">
      <section className="info-content account-setting-content">
        <form className="settings-form" onSubmit={(event) => { event.preventDefault(); setSaved(true); }}>
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
