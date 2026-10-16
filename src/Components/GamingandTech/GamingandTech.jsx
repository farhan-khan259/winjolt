import PrizeDetail from "../PrizeDetail/PrizeDetail";
import gamingImage from "../../Assets/Pictures/gaming-card.jpg";
import "./GamingandTech.css";

export default function GamingandTech() {
  return (
    <PrizeDetail
      prize={{
        slug: "gaming-and-tech",
        title: "Gaming & Tech Bundle",
        category: "Tech",
        image: gamingImage,
      }}
    />
  );
}
