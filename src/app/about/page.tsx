import Link from "next/link";
import { InnerHeader } from "@/components/InnerHeader";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <InnerHeader title="About MoveProof.ai" />

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-10">

        {/* Mission */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Why MoveProof exists</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Deposit disputes are one of the most stressful and costly parts of renting. Landlords and
            tenants alike find themselves in disagreements where the outcome often comes down to who
            kept better records — not who was actually right.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Tenants lose deposits to deductions they can&apos;t effectively challenge. Landlords struggle
            to document legitimate damage in a way that holds up formally. Both sides waste time,
            money, and stress on disputes that clear documentation could have avoided entirely.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            MoveProof exists to level that playing field. We use AI to do the work of comparing
            photos, identifying what qualifies as damage versus normal wear and tear, and producing
            formal documentation — in minutes, not days, at a fraction of what a solicitor or property
            manager would charge.
          </p>
        </section>

        {/* Who built it */}
        <section className="space-y-4 border-t border-gray-100 pt-8">
          <h2 className="text-lg font-bold text-gray-900">Who built this</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            MoveProof was built by a software developer based in Kitchener, Ontario. It started as a
            personal project after seeing how one-sided deposit disputes tend to be — and how much
            better the outcome is for anyone who walks in with clear, well-organised evidence.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            This is an independent product, not a law firm. It is built and maintained by one person
            with the goal of making formal property documentation accessible to everyone, not just
            those who can afford professional help.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Questions, feedback, or issues — reach out at:{" "}
            <a href="mailto:hello@moveproof.app" className="text-blue-700 hover:underline font-medium">
              hello@moveproof.app
            </a>
          </p>
        </section>

        {/* What the AI does */}
        <section className="space-y-4 border-t border-gray-100 pt-8">
          <h2 className="text-lg font-bold text-gray-900">What the AI actually does</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            MoveProof uses a large language model with vision capabilities to compare before and after
            photos, read deduction letters, and apply widely-accepted tenancy principles — such as the
            difference between chargeable damage and normal wear and tear.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            The quality of the output depends heavily on the quality of the photos. Clear, well-lit,
            room-by-room photos taken at both move-in and move-out will produce a much more useful
            report than a handful of blurry images.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Important limitations</p>
            <ul className="text-sm text-amber-900 space-y-1.5 leading-relaxed">
              <li>• MoveProof is <strong>not a law firm</strong> and does not provide legal advice.</li>
              <li>• AI analysis is a starting point — not a legal conclusion. Tenancy law varies by jurisdiction and changes over time.</li>
              <li>• For disputes involving significant amounts of money, always consult a licensed legal professional in your area.</li>
              <li>• The free tools (deadline calculator, demand letter generator) are general guides. Verify deadlines and requirements with official sources before acting.</li>
            </ul>
          </div>
        </section>

        {/* Data */}
        <section className="space-y-4 border-t border-gray-100 pt-8">
          <h2 className="text-lg font-bold text-gray-900">Your data</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            We take privacy seriously. Photos and text you upload for AI analysis are transmitted
            directly to the AI provider for processing and are <strong>not stored by MoveProof</strong> on
            any database or server. The free tools (deadline calculator and demand letter generator)
            run entirely in your browser — that data never leaves your device.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Read our full{" "}
            <Link href="/privacy" className="text-blue-700 hover:underline font-medium">
              Privacy Policy
            </Link>{" "}
            for complete details on what is collected and how it is handled.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-3 border-t border-gray-100 pt-8">
          <h2 className="text-lg font-bold text-gray-900">Contact</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            For questions, feedback, bug reports, or partnership enquiries:
          </p>
          <a
            href="mailto:hello@moveproof.app"
            className="inline-block text-sm font-semibold text-blue-700 hover:underline"
          >
            hello@moveproof.app
          </a>
        </section>

      </main>
    </div>
  );
}
