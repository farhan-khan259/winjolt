import { useState } from 'react';
import { Action, PageShell } from '../CommonPages/CommonPages';
import './YourBasket.css';

export default function YourBasket() {
  const [item, setItem] = useState(() => {
    try { return JSON.parse(localStorage.getItem('winjoltBasket')); } catch { return null; }
  });
  const clearBasket = () => { localStorage.removeItem('winjoltBasket'); setItem(null); };
  const total = item ? ((item.quantity * (item.unitPriceMinor || 0)) / 100).toFixed(2) : '0.00';
  return <PageShell preview className="basket-page" eyebrow="YOUR BASKET" title="YOUR BASKET" subtitle="Review your selected entries before checkout.">
    <section className="info-content two-column">
      <article className="basket-box"><h2>REVIEW YOUR ORDER</h2>
        {item ? <div className="empty-box"><strong>{item.title}</strong><p>{item.quantity} {item.quantity === 1 ? 'entry' : 'entries'} · £{total}</p><p>{item.ticketNumbers?.map((number) => String(number).padStart(5, '0')).join(', ')}</p><button className="remove-entry" type="button" onClick={clearBasket}><span aria-hidden="true">×</span> REMOVE ENTRY</button></div> : <p className="empty-box">Your basket is empty.</p>}
        <Action outline href="/competitions">CONTINUE BROWSING</Action>
      </article>
      <aside className="summary-box"><h2>ORDER SUMMARY</h2><p className="summary-line"><b>Entries</b><span>{item?.quantity || 0}</span></p><p className="summary-line"><b>Subtotal</b><span>£{total}</span></p><p className="summary-line"><b>Total</b><span>£{total}</span></p><hr/>{item?.reservationId ? <Action href="/secure-checkout">CONTINUE TO CHECKOUT</Action> : <Action href="/competitions">ADD AN ENTRY</Action>}<p className="summary-help">Payments and tickets are processed securely.</p><Action outline href="/free-entry">VIEW FREE ENTRY OPTION</Action></aside>
    </section>
  </PageShell>;
}
