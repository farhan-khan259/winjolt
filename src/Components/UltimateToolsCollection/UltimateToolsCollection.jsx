import PrizeDetail from "../PrizeDetail/PrizeDetail";
import toolsImage from "../../Assets/Pictures/tools-card.jpg";
import "./UltimateToolsCollection.css";

export default function UltimateToolsCollection() {
  return (
    <PrizeDetail
      prize={{
        title: "Ultimate Tools Collection",
        category: "Tools",
        image: toolsImage,
      }}
    />
  );
}
