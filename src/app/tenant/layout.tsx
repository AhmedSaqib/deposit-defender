import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dispute Unfair Deposit Deductions — AI Claim Analysis",
  description:
    "Paste your landlord's deduction letter and upload your photos. Our AI analyzes each claim against tenancy law principles and generates a formal rebuttal PDF — in minutes.",
  alternates: { canonical: "/tenant" },
  openGraph: {
    title: "Dispute Unfair Deposit Deductions | RentProof.ai",
    description:
      "AI-powered claim-by-claim analysis of landlord deposit deductions. Get a rebuttal PDF that cites wear and tear principles and photo evidence.",
    url: "/tenant",
  },
};

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
