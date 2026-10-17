import carImage from "../Assets/Pictures/car-card.jpg";
import cashImage from "../Assets/Pictures/cash-card.jpg";
import gamingImage from "../Assets/Pictures/gaming-card.jpg";
import toolsImage from "../Assets/Pictures/tools-card.jpg";
import instantPhoneImage from "../Assets/Pictures/instant-phone.jpg";
import instantEarbudsImage from "../Assets/Pictures/instant-earbuds.jpg";
import instantCashImage from "../Assets/Pictures/instant-cash.jpg";
import instantGiftCardImage from "../Assets/Pictures/instant-giftcard.jpg";

const bundledImages = {
  "performance-car-cash": carImage,
  "10000-cash-prize": cashImage,
  "gaming-tech-bundle": gamingImage,
  "ultimate-tools-collection": toolsImage,
  "smartphone-instant-win": instantPhoneImage,
  "wireless-earbuds-instant-win": instantEarbudsImage,
  "100-cash-instant-win": instantCashImage,
  "gift-card-instant-win": instantGiftCardImage,
};

export function hydrateCompetitionImages(value) {
  if (Array.isArray(value)) return value.map(hydrateCompetitionImages);
  if (!value || typeof value !== "object") return value;

  const hydrated = Object.fromEntries(
    Object.entries(value).map(([key, child]) => [key, hydrateCompetitionImages(child)]),
  );
  const bundledImage = bundledImages[hydrated.slug];

  return bundledImage ? { ...hydrated, images: [bundledImage] } : hydrated;
}
