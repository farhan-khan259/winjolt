import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { isAuthenticated } from "../../auth";
import { Footer, Header } from "../Homepage/Homepage";
import "./TicketNumberSelection.css";

const clampCount = (value) => Math.min(20, Math.max(1, value));
const toNumber = (value) => Number(value);

export default function TicketNumberSelection() {
  const navigate = useNavigate(); const location = useLocation();
  const basket = useMemo(() => { try { return JSON.parse(localStorage.getItem("winjoltBasket") || "{}"); } catch { return {}; } }, []);
  const initialCount = clampCount(Number(location.state?.quantity || basket.quantity) || 1);
  const [count, setCount] = useState(initialCount); const [selected, setSelected] = useState([]); const [randomNumbers, setRandomNumbers] = useState(new Set());
  const [numbers, setNumbers] = useState([]); const [query, setQuery] = useState(""); const [cursor, setCursor] = useState(null); const [history, setHistory] = useState([]);
  const [nextCursor, setNextCursor] = useState(null); const [status, setStatus] = useState(""); const [loading, setLoading] = useState(true); const [reservation, setReservation] = useState(null);
  const competitionId = basket.competitionId || basket.slug;

  const loadNumbers = async (next = null, search = query) => {
    if (!competitionId) { setStatus("Choose a competition before selecting ticket numbers."); setLoading(false); return; }
    try { setLoading(true); const params = new URLSearchParams({ limit: "50" }); if (next) params.set("cursor", next); if (search) params.set("search", search); const result = await api.get(`/competitions/${competitionId}/tickets?${params}`); setNumbers(result.numbers); setNextCursor(result.next_cursor); setCursor(next); }
    catch (error) { setStatus(error.message); } finally { setLoading(false); }
  };
  useEffect(() => { loadNumbers(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedRandom = selected.filter((number) => randomNumbers.has(number)).length;
  const changeCount = (next) => { if (reservation) return; const value = clampCount(next); setCount(value); setSelected((current) => current.slice(0, value)); setStatus(""); };
  const toggle = (number, state) => { if (state !== "AVAILABLE" || reservation) return; setStatus(""); setSelected((current) => current.includes(number) ? current.filter((item) => item !== number) : current.length >= count ? current : [...current, number]); };

  const reserve = async (luckyDipCount, manualNumbers = selected) => {
    if (!isAuthenticated()) { navigate("/sign-in", { state: { from: "/ticket-number-selection" } }); return null; }
    try {
      setLoading(true); setStatus("");
      const result = await api.post("/ticket-reservations", { competition_id: competitionId, manual_numbers: manualNumbers, lucky_dip_count: luckyDipCount, expected_total_count: count }, { headers: { "Idempotency-Key": api.idempotencyKey() } });
      const selectedNumbers = result.numbers.map(toNumber); setSelected(selectedNumbers); setRandomNumbers(new Set(selectedNumbers.filter((number) => !manualNumbers.includes(number)))); setReservation(result);
      localStorage.setItem("winjoltTicketSelection", JSON.stringify({ count, numbers: selectedNumbers, reservationId: result.reservation_id, expiresAt: result.expires_at }));
      localStorage.setItem("winjoltBasket", JSON.stringify({ ...basket, quantity: count, ticketNumbers: selectedNumbers, reservationId: result.reservation_id, expiresAt: result.expires_at }));
      setStatus(`Your ${count} ticket number${count === 1 ? " is" : "s are"} reserved until ${new Date(result.expires_at).toLocaleTimeString("en-GB")}.`); return result;
    } catch (error) { setStatus(error.message); return null; } finally { setLoading(false); }
  };
  const luckyDip = () => { setSelected([]); setRandomNumbers(new Set()); reserve(count, []); };
  const fillRemaining = () => reserve(count - selected.length);
  const clearSelection = () => { if (reservation) { setStatus("This selection is already reserved. Let it expire before choosing a different set."); return; } setSelected([]); setRandomNumbers(new Set()); setStatus("Selection cleared."); };
  const continueToBasket = async () => { let active = reservation; if (!active) { if (selected.length !== count) { setStatus(`Select ${count - selected.length} more number${count - selected.length === 1 ? "" : "s"} or use Lucky Dip.`); return; } active = await reserve(0); } if (active) navigate("/your-basket"); };
  const search = (event) => { event.preventDefault(); setHistory([]); loadNumbers(null, query); };
  const next = () => { setHistory((items) => [...items, cursor]); loadNumbers(nextCursor, ""); };
  const previous = () => { const prior = history.at(-1) || null; setHistory((items) => items.slice(0, -1)); loadNumbers(prior, ""); };

  return <div className="tickets-page" id="top"><Header/><main>
    <section className="ticket-hero"><div><p>COMPETITIONS / {basket.title || "COMPETITION"} / CHOOSE TICKETS</p><h1>CHOOSE YOUR NUMBERS</h1><span>Choose available numbers yourself, ask the server for a secure Lucky Dip, or combine both methods.</span></div><i aria-hidden="true"/></section>
    <section className="ticket-content">
      <div className="ticket-heading"><div><h2>YOUR {count} TICKET {count===1?"ENTRY":"ENTRIES"}</h2><p>Availability is advisory until the server creates your reservation.</p></div><div className="count-control"><button type="button" aria-label="Remove one ticket" onClick={()=>changeCount(count-1)} disabled={count===1||Boolean(reservation)}>−</button><b>{count} {count===1?"TICKET":"TICKETS"}</b><button type="button" aria-label="Add one ticket" onClick={()=>changeCount(count+1)} disabled={count===20||Boolean(reservation)}>+</button></div></div>
      <div className="ticket-columns"><article className="ticket-card picker"><header><div><h3>PICK YOUR OWN NUMBERS</h3><p>Available numbers from the authoritative ticket pool</p></div><form onSubmit={search}><input value={query} onChange={(event)=>setQuery(event.target.value.replace(/\D/g,"").slice(0,12))} placeholder="⌕ Exact ticket number..." aria-label="Search ticket number"/></form></header><div className="legend"><span>Available</span><span>Selected</span><span>Unavailable</span></div><div className="number-grid">{numbers.map((item)=><button type="button" key={item.number} disabled={item.state!=="AVAILABLE"||Boolean(reservation)} aria-pressed={selected.includes(toNumber(item.number))} className={selected.includes(toNumber(item.number))?"selected":""} onClick={()=>toggle(toNumber(item.number),item.state)}>{item.number}</button>)}</div>{!loading&&numbers.length===0&&<p className="ticket-empty">No ticket number matches that search.</p>}<footer><button type="button" onClick={previous} disabled={!history.length||loading}>← Previous</button><span>{loading?"Refreshing availability…":"Live availability"}</span><button type="button" className="next" onClick={next} disabled={!nextCursor||loading}>Next →</button></footer></article>
        <div className="ticket-side"><article className="ticket-card lucky"><h3>⚡ LUCKY DIP</h3><p>The server samples distinct numbers securely from the entire available pool.</p><button type="button" className="yellow" onClick={luckyDip} disabled={loading||Boolean(reservation)}>LUCKY DIP ALL {count} {count===1?"NUMBER":"NUMBERS"} →</button><button type="button" className="blue" onClick={fillRemaining} disabled={loading||selected.length===count||Boolean(reservation)}>FILL REMAINING {Math.max(0,count-selected.length)} RANDOMLY →</button><small>Ticket numbers are held atomically and issued only after authoritative settlement or an approved qualifying free entry.</small></article><article className="ticket-card selections"><h3>YOUR {count} SELECTED {count===1?"NUMBER":"NUMBERS"}</h3><p>{selected.length-selectedRandom} manually chosen + {selectedRandom} randomly selected</p><div>{selected.map((number)=><b key={number}>{String(number).padStart(5,"0")}</b>)}</div><button type="button" onClick={clearSelection} disabled={!selected.length}>CLEAR SELECTION</button></article><article className="ticket-card reservation"><h4>CHECKOUT RESERVATION</h4><p>{reservation?`Active until ${new Date(reservation.expires_at).toLocaleString("en-GB")}.`:"Numbers are not guaranteed until the secure server reservation succeeds."}</p></article></div>
      </div>
      {status&&<p className="ticket-status" role="status">{status}</p>}
      <div className="continue-bar"><div><h3>{selected.length} DISTINCT {selected.length===1?"NUMBER":"NUMBERS"} SELECTED</h3><p>No duplicates · exact manual choices are never silently substituted</p></div><button type="button" onClick={continueToBasket} disabled={loading||(!reservation&&selected.length!==count)}>CONTINUE TO BASKET →</button></div>
    </section>
  </main><Footer/></div>;
}
