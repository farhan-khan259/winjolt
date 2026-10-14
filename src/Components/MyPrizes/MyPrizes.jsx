import { PageShell, PlaceholderCards } from "../CommonPages/CommonPages";
import "./MyPrizes.css";

export default function MyPrizes() {
  return (
    <PageShell
      eyebrow="MY PRIZES"
      title="MY PRIZES"
      subtitle="Prize claim and fulfilment records."
      className="my-prizes-page"
    >
      <section className="info-content my-prizes-content">
        <PlaceholderCards
          items={[
            "My confirmed prizes",
            "Verification and claims",
            "Delivery progress",
          ]}
          text="No records are available yet."
        />
      </section>
    </PageShell>
  );
}
