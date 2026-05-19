import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Security Deposit Demand Letter Generator",
  description:
    "Generate a formal demand letter to dispute unfair deposit deductions. Enter your details, add each charge you're disputing, and get a professional letter ready to send in minutes. Free.",
  alternates: { canonical: "/tools/demand" },
  openGraph: {
    title: "Free Security Deposit Demand Letter Generator | MoveProof.ai",
    description:
      "Create a professional demand letter for your security deposit. Cite specific deductions, state your legal position, and send it with confidence.",
    url: "/tools/demand",
  },
};

export default function DemandLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
