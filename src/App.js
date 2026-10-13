import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Homepage from './Components/Homepage/Homepage';
import Competetions from './Components/Competetions/Competetions';
import PerformanceCar from './Components/PerformanceCar/PerformanceCar';
import CashPrize from './Components/CashPrize/CashPrize';
import GamingandTech from './Components/GamingandTech/GamingandTech';
import UltimateToolsCollection from './Components/UltimateToolsCollection/UltimateToolsCollection';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
