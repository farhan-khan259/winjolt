import PrizeDetail from "../PrizeDetail/PrizeDetail";
import toolsImage from "../../Assets/Pictures/tools-card.jpg";
import "./UltimateToolsCollection.css";

export default function UltimateToolsCollection() {
  return (
    <PrizeDetail
      prize={{
        slug: "ultimate-tools-collection",
        title: "Ultimate Tools Collection",
        category: "Tools",
        image: toolsImage,
      }}
    />
  );
}
