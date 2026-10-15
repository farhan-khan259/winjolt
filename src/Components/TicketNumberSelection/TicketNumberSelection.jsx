import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer, Header } from "../Homepage/Homepage";
import "./TicketNumberSelection.css";

const firstPage=[12,47,109,215,318,403,506,619,723,854,952,1004,1149,1281,1426,1507,1631,1785,1944,2103,2217,2329,2654,2870,3045,3218,3409,3781,3924,4136,4285,4529,4687,4912,5367,5789,6015,6214,6670,7088,7301,7555,7836,8123,8476,8609,8910,9123,9471,9987];
const ticketPages=[firstPage,firstPage.map(n=>n+10000),firstPage.map(n=>n+20000)];
const allNumbers=ticketPages.flat();
const unavailable=new Set([109,1785,3409,7088,10109,11785,13409,17088,20109,21785,23409,27088]);
const formatTicket=n=>String(n).padStart(5,"0");
const clampCount=value=>Math.min(20,Math.max(1,value));
const shuffle=items=>{
  const result=[...items];
  for(let i=result.length-1;i>0;i-=1){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
  return result;
};

export default function TicketNumberSelection(){
  const navigate=useNavigate();
  const location=useLocation();
  const initialCount=clampCount(Number(location.state?.quantity)||10);
  const initialSelection=[47,318,952].slice(0,initialCount);
  const [count,setCount]=useState(initialCount);
  const [selected,setSelected]=useState(initialSelection);
  const [randomNumbers,setRandomNumbers]=useState(new Set());
  const [query,setQuery]=useState("");
  const [page,setPage]=useState(0);
  const [status,setStatus]=useState("");

  const visibleNumbers=useMemo(()=>{
    const search=query.trim();
    return search ? allNumbers.filter(n=>formatTicket(n).includes(search)) : ticketPages[page];
  },[page,query]);
  const selectedRandom=selected.filter(n=>randomNumbers.has(n)).length;
  const selectedManual=selected.length-selectedRandom;

  const changeCount=next=>{
    const value=clampCount(next);
    setCount(value);
    setSelected(current=>current.slice(0,value));
    setRandomNumbers(current=>new Set([...current].filter(n=>selected.slice(0,value).includes(n))));
    setStatus("");
  };
  const toggle=n=>{
    if(unavailable.has(n))return;
    setStatus("");
    setSelected(current=>{
      if(current.includes(n)){setRandomNumbers(random=>{const next=new Set(random);next.delete(n);return next});return current.filter(item=>item!==n);}
      if(current.length>=count){setStatus(`You can select up to ${count} ticket${count===1?"":"s"}.`);return current;}
      setRandomNumbers(random=>{const next=new Set(random);next.delete(n);return next});
      return [...current,n];
    });
  };
  const luckyDip=()=>{
    const choices=shuffle(allNumbers.filter(n=>!unavailable.has(n))).slice(0,count);
    setSelected(choices);setRandomNumbers(new Set(choices));setStatus(`${count} ticket number${count===1?"":"s"} selected by Lucky Dip.`);
  };
  const fillRemaining=()=>{
    const remaining=count-selected.length;
    if(remaining<=0){setStatus("Your selection is already complete.");return;}
    const additions=shuffle(allNumbers.filter(n=>!unavailable.has(n)&&!selected.includes(n))).slice(0,remaining);
    setSelected(current=>[...current,...additions]);
    setRandomNumbers(current=>new Set([...current,...additions]));
    setStatus(`${additions.length} remaining ticket number${additions.length===1?"":"s"} selected.`);
  };
  const clearSelection=()=>{setSelected([]);setRandomNumbers(new Set());setStatus("Selection cleared.");};
  const saveSelection=()=>{
    localStorage.setItem("winjoltTicketSelection",JSON.stringify({count,numbers:selected}));
    setStatus("Your ticket-number selection has been saved.");
  };
  const continueToBasket=()=>{
    if(selected.length!==count){setStatus(`Select ${count-selected.length} more ticket number${count-selected.length===1?"":"s"} to continue.`);return;}
    const existing=JSON.parse(localStorage.getItem("winjoltBasket")||"{}");
    localStorage.setItem("winjoltBasket",JSON.stringify({...existing,quantity:count,ticketNumbers:selected}));
    saveSelection();
    navigate("/your-basket");
  };

  return <div className="tickets-page" id="top"><Header/><main>
    <section className="ticket-hero"><div><p>COMPETITIONS / CAR DRAW / CHOOSE TICKETS</p><h1>CHOOSE YOUR NUMBERS</h1><span>Select available numbers yourself, or let Lucky Dip choose distinct random numbers from all available tickets.</span></div><i aria-hidden="true"/></section>
    <section className="ticket-content">
      <div className="ticket-heading"><div><h2>YOUR {count} TICKET {count===1?"ENTRY":"ENTRIES"}</h2><p>Choose your ticket numbers from those currently available.</p></div><div className="count-control"><button type="button" aria-label="Remove one ticket" onClick={()=>changeCount(count-1)} disabled={count===1}>−</button><b>{count} {count===1?"TICKET":"TICKETS"}</b><button type="button" aria-label="Add one ticket" onClick={()=>changeCount(count+1)} disabled={count===20}>+</button></div></div>
      <div className="ticket-columns"><article className="ticket-card picker"><header><div><h3>PICK YOUR OWN NUMBERS</h3><p>Available numbers from the full ticket pool</p></div><input value={query} onChange={event=>{setQuery(event.target.value.replace(/\D/g,"").slice(0,5));setPage(0)}} placeholder="⌕ Search ticket number..." aria-label="Search ticket number"/></header><div className="legend"><span>Available</span><span>Selected</span><span>Unavailable</span></div><div className="number-grid">{visibleNumbers.map(n=><button type="button" key={n} disabled={unavailable.has(n)} aria-pressed={selected.includes(n)} className={selected.includes(n)?"selected":""} onClick={()=>toggle(n)}>{formatTicket(n)}</button>)}</div>{visibleNumbers.length===0&&<p className="ticket-empty">No ticket numbers match your search.</p>}<footer><button type="button" onClick={()=>setPage(value=>Math.max(0,value-1))} disabled={page===0||Boolean(query)}>← Previous</button><span>{query?`${visibleNumbers.length} result${visibleNumbers.length===1?"":"s"}`:`Page ${page+1} of ${ticketPages.length}`}</span><button type="button" className="next" onClick={()=>setPage(value=>Math.min(ticketPages.length-1,value+1))} disabled={page===ticketPages.length-1||Boolean(query)}>Next →</button></footer></article>
        <div className="ticket-side"><article className="ticket-card lucky"><h3>⚡ LUCKY DIP</h3><p>Get unique numbers selected randomly from all available ticket numbers.</p><button type="button" className="yellow" onClick={luckyDip}>LUCKY DIP ALL {count} {count===1?"NUMBER":"NUMBERS"} →</button><button type="button" className="blue" onClick={fillRemaining} disabled={selected.length===count}>FILL REMAINING {Math.max(0,count-selected.length)} RANDOMLY →</button><small>Your ticket numbers are securely assigned and reserved during checkout.</small></article><article className="ticket-card selections"><h3>YOUR {count} SELECTED {count===1?"NUMBER":"NUMBERS"}</h3><p>{selectedManual} manually chosen + {selectedRandom} randomly selected</p><div>{selected.map(n=><b key={n}>{formatTicket(n)}</b>)}</div><button type="button" onClick={clearSelection} disabled={!selected.length}>CLEAR SELECTION</button><button type="button" className="blue" onClick={saveSelection} disabled={selected.length!==count}>SAVE SELECTION</button></article><article className="ticket-card reservation"><h4>CHECKOUT RESERVATIONS</h4><p>Ticket numbers are temporarily reserved during checkout and permanently issued after verified payment or a qualifying free entry.</p></article></div>
      </div>
      {status&&<p className="ticket-status" role="status">{status}</p>}
      <div className="continue-bar"><div><h3>{selected.length} DISTINCT {selected.length===1?"NUMBER":"NUMBERS"} SELECTED</h3><p>No duplicates · final ticket assignment confirmed securely</p></div><button type="button" onClick={continueToBasket} disabled={selected.length!==count}>CONTINUE TO BASKET →</button></div>
    </section>
  </main><Footer/></div>;
}
