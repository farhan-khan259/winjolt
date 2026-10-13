import PrizeDetail from "../PrizeDetail/PrizeDetail";
import carImage from "../../Assets/Pictures/car-card.jpg";
import "./PerformanceCar.css";

export default function PerformanceCar() {
  return (
    <PrizeDetail
      prize={{
        title: "Performance Car + Cash",
        category: "Cars",
        image: carImage,
      }}
    />
  );
}
