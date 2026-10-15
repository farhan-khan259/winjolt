import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { isAdminAuthenticated, isAuthenticated } from './auth';

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
import AboutWinJolt from './Components/AboutWinJolt/AboutWinJolt';
import ResponsibleParticipation from './Components/ResponsibleParticipation/ResponsibleParticipation';
import FrequentlyAskedQuestions from './Components/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import ContactUs from './Components/ContactUs/ContactUs';
import HelpCentre from './Components/HelpCentre/HelpCentre';
import MyOrders from './Components/MyOrders/MyOrders';
import MyPrizes from './Components/MyPrizes/MyPrizes';
import AccountSetting from './Components/AccountSetting/AccountSetting';
import ClaimPrize from './Components/ClaimPrize/ClaimPrize';
import TermsAndConditions from './Components/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy';
import CookiePolicy from './Components/CookiePolicy/CookiePolicy';
import ComplaintsProcedure from './Components/ComplaintsProcedure/ComplaintsProcedure';
import AdministrationDashboard from './Components/AdministrationDashboard/AdministrationDashboard';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import YourBasket from './Components/YourBasket/YourBasket';
import SecureCheckout from './Components/SecureCheckout/SecureCheckout';
import PaymentStatus from './Components/PaymentStatus/PaymentStatus';
import OrderConfirmation from './Components/OrderConfirmation/OrderConfirmation';
import MyWinjoltDashboard from './Components/MyWinjoltDashboard/MyWinjoltDashboard';
import MyEntries from './Components/MyEntries/MyEntries';
import TicketNumberSelection from './Components/TicketNumberSelection/TicketNumberSelection';
import RegistrationConfirmation from './Components/RegistrationConfirmation/RegistrationConfirmation';
import AdminLogin from './Components/Admin/AdminLogin/AdminLogin';

import CommandCentre from './Components/Admin/CommandCentre/CommandCentre';
import OperationsCalendar from './Components/Admin/OperationsCalendar/OperationsCalendar';
import CompetitionManagement from './Components/Admin/CompetitionManagement/CompetitionManagement';
import CreateCompetition from './Components/Admin/CreateCompetition/CreateCompetition';
import CampaignControlCentre from './Components/Admin/CampaignControlCentre/CampaignControlCentre';
import InstantWinOperations from './Components/Admin/InstantWinOperations/InstantWinOperations';
import GamesBingoControls from './Components/Admin/GamesBingoControls/GamesBingoControls';
import EntryTicketLedger from './Components/Admin/EntryTicketLedger/EntryTicketLedger';
import FreeEntryProcessing from './Components/Admin/FreeEntryProcessing/FreeEntryProcessing';
import DrawsResults from './Components/Admin/DrawsResults/DrawsResults';
import OrdersPayments from './Components/Admin/OrdersPayments/OrdersPayments';
import PrizeInventory from './Components/Admin/PrizeInventory/PrizeInventory';
import WinnersClaims from './Components/Admin/WinnersClaims/WinnersClaims';
import Customers from './Components/Admin/Customers/Customers';
import SupportComplaints from './Components/Admin/SupportComplaints/SupportComplaints';
import AnalyticsReports from './Components/Admin/AnalyticsReports/AnalyticsReports';
import WebsiteContent from './Components/Admin/WebsiteContent/WebsiteContent';
import StaffPermissions from './Components/Admin/StaffPermissions/StaffPermissions';
import AuditCompliance from './Components/Admin/AuditCompliance/AuditCompliance';
import PlatformSettings from './Components/Admin/PlatformSettings/PlatformSettings';
import CompetitionLaunchApproval from './Components/Admin/CompetitionLaunchApproval/CompetitionLaunchApproval';
import PaymentRefundRecord from './Components/Admin/PaymentRefundRecord/PaymentRefundRecord';
import CustomerProfile from './Components/Admin/CustomerProfile/CustomerProfile';
import ComplaintInvestigation from './Components/Admin/ComplaintInvestigation/ComplaintInvestigation';
import PrizeAssetVerification from './Components/Admin/PrizeAssetVerification/PrizeAssetVerification';
import DrawResultRelease from './Components/Admin/DrawResultRelease/DrawResultRelease';
import JoltCreditPrizes from './Components/Admin/JoltCreditPrizes/JoltCreditPrizes';
import JoltRevealControls from './Components/Admin/JoltRevealControls/JoltRevealControls';
import CompetitionInstantWins from './Components/Admin/CompetitionInstantWins/CompetitionInstantWins';
import AutomaticAgeChecks from './Components/Admin/AutomaticAgeChecks/AutomaticAgeChecks';


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

function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    const from = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate to="/sign-in" replace state={{ from }} />;
  }

  return children;
}

function AdminProtectedRoute({ children }) {
  const location = useLocation();

  if (!isAdminAuthenticated()) {
    const from = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate to="/admin/login" replace state={{ from }} />;
  }

  return children;
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
        <Route path="/about-winjolt" element={<AboutWinJolt />} />
        <Route path="/responsible-participation" element={<ResponsibleParticipation />} />
        <Route path="/frequently-asked-questions" element={<FrequentlyAskedQuestions />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/help-centre" element={<HelpCentre />} /> 
        <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/my-prizes" element={<ProtectedRoute><MyPrizes /></ProtectedRoute>} />
        <Route path="/account-settings" element={<ProtectedRoute><AccountSetting /></ProtectedRoute>} />
        <Route path="/claim-a-prize" element={<ProtectedRoute><ClaimPrize /></ProtectedRoute>} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/complaints-procedure" element={<ComplaintsProcedure />} />
        {/* Admin access is temporarily disabled. */}
        <Route path="/administration-dashboard" element={<AdminProtectedRoute><AdministrationDashboard /></AdminProtectedRoute>} />
       
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/ticket-number-selection" element={<TicketNumberSelection />} />
        <Route path="/registration-confirmation" element={<RegistrationConfirmation />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/your-basket" element={<YourBasket />} />
        <Route path="/secure-checkout" element={<SecureCheckout />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/my-winjolt-dashboard" element={<ProtectedRoute><MyWinjoltDashboard /></ProtectedRoute>} />
        <Route path="/my-entries" element={<ProtectedRoute><MyEntries /></ProtectedRoute>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminProtectedRoute><CommandCentre /></AdminProtectedRoute>} />
        <Route path="/admin/command-centre" element={<AdminProtectedRoute><CommandCentre /></AdminProtectedRoute>} />
        <Route path="/admin/operations-calendar" element={<AdminProtectedRoute><OperationsCalendar /></AdminProtectedRoute>} />
        <Route path="/admin/competitions" element={<AdminProtectedRoute><CompetitionManagement /></AdminProtectedRoute>} />
        <Route path="/admin/create-competition" element={<AdminProtectedRoute><CreateCompetition /></AdminProtectedRoute>} />
        <Route path="/admin/campaign-control-centre" element={<AdminProtectedRoute><CampaignControlCentre /></AdminProtectedRoute>} />
        <Route path="/admin/instant-wins" element={<AdminProtectedRoute><InstantWinOperations /></AdminProtectedRoute>} />
        <Route path="/admin/games-bingo" element={<AdminProtectedRoute><GamesBingoControls /></AdminProtectedRoute>} />
        <Route path="/admin/entries-tickets" element={<AdminProtectedRoute><EntryTicketLedger /></AdminProtectedRoute>} />
        <Route path="/admin/free-entry-processing" element={<AdminProtectedRoute><FreeEntryProcessing /></AdminProtectedRoute>} />
        <Route path="/admin/draws-results" element={<AdminProtectedRoute><DrawsResults /></AdminProtectedRoute>} />
        <Route path="/admin/orders-payments" element={<AdminProtectedRoute><OrdersPayments /></AdminProtectedRoute>} />
        <Route path="/admin/prize-inventory" element={<AdminProtectedRoute><PrizeInventory /></AdminProtectedRoute>} />
        <Route path="/admin/winners-claims" element={<AdminProtectedRoute><WinnersClaims /></AdminProtectedRoute>} />
        <Route path="/admin/customers" element={<AdminProtectedRoute><Customers /></AdminProtectedRoute>} />
        <Route path="/admin/support-complaints" element={<AdminProtectedRoute><SupportComplaints /></AdminProtectedRoute>} />
        <Route path="/admin/analytics" element={<AdminProtectedRoute><AnalyticsReports /></AdminProtectedRoute>} />
        <Route path="/admin/website-content" element={<AdminProtectedRoute><WebsiteContent /></AdminProtectedRoute>} />
        <Route path="/admin/staff-permissions" element={<AdminProtectedRoute><StaffPermissions /></AdminProtectedRoute>} />
        <Route path="/admin/audit-compliance" element={<AdminProtectedRoute><AuditCompliance /></AdminProtectedRoute>} />
        <Route path="/admin/settings" element={<AdminProtectedRoute><PlatformSettings /></AdminProtectedRoute>} />
        <Route path="/admin/competition-launch-approval" element={<AdminProtectedRoute><CompetitionLaunchApproval /></AdminProtectedRoute>} />
        <Route path="/admin/payment-refund-record" element={<AdminProtectedRoute><PaymentRefundRecord /></AdminProtectedRoute>} />
        <Route path="/admin/customer-profile" element={<AdminProtectedRoute><CustomerProfile /></AdminProtectedRoute>} />
        <Route path="/admin/complaint-investigation" element={<AdminProtectedRoute><ComplaintInvestigation /></AdminProtectedRoute>} />
        <Route path="/admin/prize-asset-verification" element={<AdminProtectedRoute><PrizeAssetVerification /></AdminProtectedRoute>} />
        <Route path="/admin/draw-result-release" element={<AdminProtectedRoute><DrawResultRelease /></AdminProtectedRoute>} />
        <Route path="/admin/jolt-credit-prizes" element={<AdminProtectedRoute><JoltCreditPrizes /></AdminProtectedRoute>} />
        <Route path="/admin/jolt-reveal-controls" element={<AdminProtectedRoute><JoltRevealControls /></AdminProtectedRoute>} />
        <Route path="/admin/competition-instant-wins" element={<AdminProtectedRoute><CompetitionInstantWins /></AdminProtectedRoute>} />
        <Route path="/admin/automatic-age-checks" element={<AdminProtectedRoute><AutomaticAgeChecks /></AdminProtectedRoute>} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
