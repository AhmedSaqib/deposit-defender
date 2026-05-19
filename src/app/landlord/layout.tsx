import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Property Inspection Report Generator",
  description:
    "Upload before and after photos of your rental property. AI identifies damage versus normal wear and tear and generates a formal, defensible inspection report PDF.",
  alternates: { canonical: "/landlord" },
  openGraph: {
    title: "AI Property Inspection Report Generator | RentProof.ai",
    description:
      "Compare move-in and move-out photos with AI. Get a formal inspection report distinguishing chargeable damage from wear and tear — ready for disputes or records.",
    url: "/landlord",
  },
};

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
