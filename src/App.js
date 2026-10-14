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
import FreeEntry from './Components/FreeEntry/FreeEntry';
// import AboutWinJolt from './Components/AboutWinJolt/AboutWinJolt';
// import ResponsibleParticipation from './Components/ResponsibleParticipation/ResponsibleParticipation';
// import FrequentlyAskedQuestions from './Components/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
// import ContactUs from './Components/ContactUs/ContactUs';
import HelpCentre from './Components/HelpCentre/HelpCentre';
// import MyOrders from './Components/MyOrders/MyOrders';
// import MyPrizes from './Components/MyPrizes/MyPrizes';
// import AccountSetting from './Components/AccountSetting/AccountSetting';
// import ClaimPrize from './Components/ClaimPrize/ClaimPrize';
// import TermsAndConditions from './Components/TermsAndConditions/TermsAndConditions';
// import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy';
// import CookiePolicy from './Components/CookiePolicy/CookiePolicy';
// import ComplaintsProcedure from './Components/ComplaintsProcedure/ComplaintsProcedure';
// import AdministrationDashboard from './Components/AdministrationDashboard/AdministrationDashboard';
// import SignIn from './Components/SignIn/SignIn';
// import SignUp from './Components/SignUp/SignUp';
// import ResetPassword from './Components/ResetPassword/ResetPassword';
// import YourBasket from './Components/YourBasket/YourBasket';
// import SecureCheckout from './Components/SecureCheckout/SecureCheckout';
// import PaymentStatus from './Components/PaymentStatus/PaymentStatus';
// import OrderConfirmation from './Components/OrderConfirmation/OrderConfirmation';
// import MyWinjoltDashboard from './Components/MyWinjoltDashboard/MyWinjoltDashboard';
// import MyEntries from './Components/MyEntries/MyEntries';

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
        <Route path="/free-entry" element={<FreeEntry />} />
        {/* <Route path="/about-winjolt" element={<AboutWinJolt />} />
        <Route path="/responsible-participation" element={<ResponsibleParticipation />} />
        <Route path="/frequently-asked-questions" element={<FrequentlyAskedQuestions />} />
        <Route path="/contact-us" element={<ContactUs />} />*/}
        <Route path="/help-centre" element={<HelpCentre />} /> 
        {/* <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-prizes" element={<MyPrizes />} />
        <Route path="/account-settings" element={<AccountSetting />} />
        <Route path="/claim-a-prize" element={<ClaimPrize />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/complaints-procedure" element={<ComplaintsProcedure />} />
        <Route path="/administration-dashboard" element={<AdministrationDashboard />} /> */}
        {/* <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/your-basket" element={<YourBasket />} />
        <Route path="/secure-checkout" element={<SecureCheckout />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/my-winjolt-dashboard" element={<MyWinjoltDashboard />} />
        <Route path="/my-entries" element={<MyEntries />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
