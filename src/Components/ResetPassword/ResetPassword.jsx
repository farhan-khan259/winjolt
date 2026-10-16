import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
import { Logo, PageShell } from "../CommonPages/CommonPages";
import "./ResetPassword.css";
export default function ResetPassword(){
  const [params]=useSearchParams(); const token=params.get("token"); const [message,setMessage]=useState(""); const [error,setError]=useState("");
  const submit=async(event)=>{event.preventDefault();const data=new FormData(event.currentTarget);try{setError("");if(token){if(data.get("password")!==data.get("confirm"))throw new Error("The passwords do not match.");const result=await api.post("/accounts/password-reset/confirm",{token,password:data.get("password")});setMessage(result.message);}else{const result=await api.post("/accounts/password-reset/request",{email:data.get("email")});setMessage(result.message);}}catch(requestError){setError(requestError.message);}};
  return <PageShell className="reset-page" eyebrow="ACCOUNT SECURITY" title="RESET PASSWORD" subtitle="Use a short-lived, single-use reset link."><section className="auth-wrap"><form className="auth-card" onSubmit={submit}><Logo/><h2>{token?"CHOOSE A NEW PASSWORD":"REQUEST A RESET LINK"}</h2>{token?<><label className="form-field">NEW PASSWORD<input name="password" type="password" minLength="10" required/></label><label className="form-field">CONFIRM PASSWORD<input name="confirm" type="password" minLength="10" required/></label></>:<label className="form-field">EMAIL ADDRESS<input name="email" type="email" placeholder="you@example.com" required/></label>}<button className="info-action" type="submit">{token?"UPDATE PASSWORD →":"SEND RESET LINK →"}</button>{message&&<div className="info-note" role="status">{message}</div>}{error&&<div className="info-note" role="alert">{error}</div>}</form></section></PageShell>;
}
