import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Deposit Return Deadline Calculator — 15+ Jurisdictions",
  description:
    "Find out exactly when your security deposit must be returned. Covers UK, Australia (NSW, VIC, QLD, WA), Canada (Ontario, BC, Alberta), and 10 US states. Includes ready-to-send letter templates. Free.",
  alternates: { canonical: "/tools/deadline" },
  openGraph: {
    title: "Security Deposit Return Deadline Calculator | MoveProof.ai",
    description:
      "How long does your landlord have to return your deposit? Covers 15+ jurisdictions including UK, Australia, Canada, and the USA. Get your deadline instantly — free.",
    url: "/tools/deadline",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does a landlord have to return a security deposit in California?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In California, landlords must return a security deposit within 21 days of the tenant moving out, along with an itemized statement of any deductions. This is governed by California Civil Code §1950.5.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a landlord have to return a deposit in New York?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In New York, landlords must return a security deposit within 14 days of the tenant vacating, along with a written statement of any deductions. This is governed by General Obligations Law §7-108.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a landlord have to return a deposit in Texas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Texas, landlords must return a security deposit within 30 days of move-out or receipt of the tenant's forwarding address — whichever is later. This is governed by Texas Property Code §92.103.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a landlord have to return a deposit in Florida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Florida, landlords have 15 days to return the full deposit if making no deductions. If making deductions, they must send written notice of their intent to claim within 30 days of move-out. This is governed by Florida Statutes §83.49.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a landlord have to return a deposit in Washington state?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Washington state, landlords must return a security deposit within 30 days of move-out (amended in 2023 from the previous 21-day rule). This is governed by RCW 59.18.280. Seattle may have additional local requirements.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a landlord have to return a deposit in Illinois?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Illinois, landlords must provide an itemized statement of deductions within 30 days and return the remaining balance within 45 days of move-out. Chicago has separate, stricter local rules. This is governed by 765 ILCS 710.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a landlord have to return a deposit in the UK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In the UK, landlords must return a tenancy deposit within 10 days of both parties agreeing on the amount to be returned. Note this clock starts from agreement, not necessarily from the move-out date. This is governed by the Housing Act 2004 and the tenancy deposit scheme rules.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a landlord have to return a bond in New South Wales Australia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In New South Wales, Australia, landlords must return a rental bond within 14 days of the end of the tenancy, under the Residential Tenancies Act 2010.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a landlord have to return a bond in Victoria Australia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Victoria, Australia, landlords must return a rental bond within 14 days of the end of the tenancy, under the Residential Tenancies Act 1997.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a landlord have to return a deposit in British Columbia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In British Columbia, Canada, landlords must return a security deposit within 15 days of the end of the tenancy or receipt of the tenant's forwarding address — whichever is later. This is governed by the BC Residential Tenancy Act.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a landlord have to return a deposit in Alberta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Alberta, Canada, landlords must return a security deposit within 10 business days (not calendar days) after the tenancy ends. This is governed by the Alberta Residential Tenancies Act.",
      },
    },
    {
      "@type": "Question",
      name: "Can a landlord keep a security deposit for normal wear and tear?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. In virtually all jurisdictions, landlords cannot deduct from a security deposit for normal wear and tear. This includes minor scuffs, faded paint, small nail holes from picture hangers, and worn carpeting from ordinary foot traffic. Landlords can only deduct for damage beyond normal use.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if a landlord doesn't return a deposit on time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If a landlord misses the legal deadline for returning a security deposit, they may forfeit the right to make any deductions and could owe the tenant the full deposit plus statutory penalties — which in some jurisdictions can be 2–3 times the deposit amount. Tenants should send a formal written demand immediately once the deadline passes.",
      },
    },
  ],
};

export default function DeadlineLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
