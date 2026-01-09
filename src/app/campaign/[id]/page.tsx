import CampaignDetailClient from "./CampaignDetailClient";

// For static export, we need to generate at least one param
export async function generateStaticParams() {
  // Return a dummy param to satisfy static export requirements
  // Actual pages will be generated on-demand via client-side routing
  return [{ id: "placeholder" }];
}

export default function CampaignDetailPage() {
  return <CampaignDetailClient />;
}
