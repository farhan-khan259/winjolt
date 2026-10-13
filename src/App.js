import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Homepage from './Components/Homepage/Homepage';
import Competetions from './Components/Competetions/Competetions';
import PerformanceCar from './Components/PerformanceCar/PerformanceCar';
import CashPrize from './Components/CashPrize/CashPrize';
import GamingandTech from './Components/GamingandTech/GamingandTech';
import UltimateToolsCollection from './Components/UltimateToolsCollection/UltimateToolsCollection';
import InstantWins from './Components/InstantWins/InstantWins';
import GamesAndExperiences from './Components/GamesAndExperiences/GamesAndExperiences';
import BingoFutureLicense from './Components/BingoFutureLicense/BingoFutureLicense';
import JoltRevealWheel from './Components/JoltRevealWheel/JoltRevealWheel';
import InstantWinResult from './Components/InstantWinResult/InstantWinResult';
import WinnersAndResults from './Components/WinnersAndResults/WinnersAndResults';
import TicketChecker from './Components/TicketChecker/TicketChecker';
import LiveDraws from './Components/LiveDraws/LiveDraws';
import HowItWorks from './Components/HowItWorks/HowItWorks';

function ScrollToLocation() {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		const frame = window.requestAnimationFrame(() => {
			if (hash) {
				document.getElementById(hash.slice(1))?.scrollIntoView();
			} else {
				window.scrollTo(0, 0);
			}
		});

		return () => window.cancelAnimationFrame(frame);
	}, [pathname, hash]);

	return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToLocation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/competitions" element={<Competetions />} />
        <Route path="/competitions/performance-car" element={<PerformanceCar />} />
        <Route path="/competitions/cash-prize" element={<CashPrize />} />
        <Route path="/competitions/gaming-and-tech" element={<GamingandTech />} />
        <Route path="/competitions/ultimate-tools-collection" element={<UltimateToolsCollection />} />
        <Route path="/instant-wins" element={<InstantWins />} />
        <Route path="/games-and-experiences" element={<GamesAndExperiences />} />
        <Route path="/bingo-future-license" element={<BingoFutureLicense />} />
        <Route path="/jolt-reveal-wheel" element={<JoltRevealWheel />} />
        <Route path="/instant-win-result" element={<InstantWinResult />} />
        <Route path="/winners-and-results" element={<WinnersAndResults />} />
        <Route path="/ticket-checker" element={<TicketChecker />} />
        <Route path="/live-draws" element={<LiveDraws />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
