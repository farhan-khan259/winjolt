import PrizeDetail from '../PrizeDetail/PrizeDetail';
import cashImage from '../../Assets/Pictures/cash-card.jpg';
import './CashPrize.css';

export default function CashPrize() {
  return <PrizeDetail prize={{ title: '£10,000 Cash Prize', category: 'Cash', image: cashImage }} />;
}
