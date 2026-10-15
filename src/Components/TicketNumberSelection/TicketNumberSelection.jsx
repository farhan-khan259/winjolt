import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer, Header } from "../Homepage/Homepage";
import "./TicketNumberSelection.css";

const numbers=[12,47,109,215,318,403,506,619,723,854,952,1004,1149,1281,1426,1507,1631,1785,1944,2103,2217,2329,2654,2870,3045,3218,3409,3781,3924,4136,4285,4529,4687,4912,5367,5789,6015,6214,6670,7088,7301,7555,7836,8123,8476,8609,8910,9123,9471,9987];
const unavailable=new Set([109,1785,3409,7088]);
const fmt=n=>String(n).padStart(5,"0");

export default function TicketNumberSelection(){
  const navigate=useNavigate(); const [count,setCount]=useState(10); const [selected,setSelected]=useState([47,318,952]);
  const chosen=useMemo(()=>selected.slice(0,count),[selected,count]);
  const toggle=n=>{if(unavailable.has(n))return;setSelected(s=>s.includes(n)?s.filter(x=>x!==n):s.length<count?[...s,n]:s)};
  const lucky=()=>setSelected(numbers.filter(n=>!unavailable.has(n)).slice(0,count));
  const fill=()=>setSelected(s=>[...s,...numbers.filter(n=>!unavailable.has(n)&&!s.includes(n))].slice(0,count));
  return <div className="tickets-page" id="top"><Header/><main>
    <section className="ticket-hero"><div><p>COMPETITIONS / CAR DRAW / CHOOSE TICKETS</p><h1>CHOOSE YOUR NUMBERS</h1><span>Select available numbers yourself, or let Lucky Dip choose distinct random numbers from all available tickets.</span></div><i aria-hidden="true"/></section>
    <section className="ticket-content">
      <div className="ticket-heading"><div><h2>YOUR {count} TICKET ENTRIES</h2><p>Choose your ticket numbers from those currently available.</p></div><div className="count-control"><button onClick={()=>setCount(Math.max(1,count-1))}>−</button><b>{count} TICKETS</b><button onClick={()=>setCount(Math.min(20,count+1))}>+</button></div></div>
      <div className="ticket-columns"><article className="ticket-card picker"><header><div><h3>PICK YOUR OWN NUMBERS</h3><p>Available numbers from the full ticket pool</p></div><input placeholder="⌕ Search ticket number..." aria-label="Search ticket number"/></header><div className="legend"><span>Available</span><span>Selected</span><span>Unavailable</span></div><div className="number-grid">{numbers.map(n=><button key={n} disabled={unavailable.has(n)} className={selected.includes(n)?"selected":""} onClick={()=>toggle(n)}>{fmt(n)}</button>)}</div><footer><button>← Previous</button><span>Page 1</span><button className="next">Next →</button></footer></article>
        <div className="ticket-side"><article className="ticket-card lucky"><h3>⚡ LUCKY DIP</h3><p>Get unique numbers selected randomly from all available ticket numbers.</p><button className="yellow" onClick={lucky}>LUCKY DIP ALL {count} NUMBERS →</button><button className="blue" onClick={fill}>FILL REMAINING {Math.max(0,count-selected.length)} RANDOMLY →</button><small>Your ticket numbers are securely assigned and reserved during checkout.</small></article><article className="ticket-card selections"><h3>YOUR {count} SELECTED NUMBERS</h3><p>{Math.min(3,chosen.length)} manually chosen + {Math.max(0,chosen.length-3)} randomly selected</p><div>{chosen.map(n=><b key={n}>{fmt(n)}</b>)}</div><button onClick={()=>setSelected([])}>CLEAR SELECTION</button>{chosen.length===count&&<button className="blue">SAVE SELECTION</button>}</article><article className="ticket-card reservation"><h4>CHECKOUT RESERVATIONS</h4><p>Ticket numbers are temporarily reserved during checkout and permanently issued after verified payment or a qualifying free entry.</p></article></div>
      </div>
      <div className="continue-bar"><div><h3>{chosen.length} DISTINCT NUMBERS SELECTED</h3><p>No duplicates · final ticket assignment confirmed securely</p></div><button onClick={()=>navigate("/your-basket")} disabled={chosen.length!==count}>CONTINUE TO BASKET →</button></div>
    </section>
  </main><Footer/></div>;
}
