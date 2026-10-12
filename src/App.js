import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Homepage from './Components/Homepage/Homepage';

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
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
