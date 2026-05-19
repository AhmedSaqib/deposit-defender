import Link from "next/link";
import { InnerHeader } from "@/components/InnerHeader";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <InnerHeader title="Privacy Policy" subtitle="Last updated: 18 May 2025" />

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-10 text-sm text-gray-700 leading-relaxed">

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-800 leading-relaxed">
          <strong>Plain-English summary:</strong> When you use the AI analysis features, your photos and text are
          sent to an AI provider for processing — we do not store them ourselves. The free tools (deadline calculator,
          demand letter generator) run entirely in your browser and no data ever leaves your device. We do not
          sell your data. We do not create accounts or profiles.
        </section>

        {/* Who we are */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-gray-900">1. Who we are</h2>
          <p>
            MoveProof (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is an independent software product operated by a software
            developer based in Kitchener, Ontario, Canada. You can contact us at{" "}
            <a href="mailto:hello@moveproof.app" className="text-blue-700 hover:underline">hello@moveproof.app</a>.
          </p>
          <p>
            This policy explains what information we collect, how we use it, and what rights you have over it. It
            applies to all visitors and users of moveproof.app and its subpages.
          </p>
        </section>

        {/* What data we collect */}
        <section className="space-y-4 border-t border-gray-100 pt-8">
          <h2 className="text-base font-bold text-gray-900">2. What data we collect and why</h2>

          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">Photos you upload (AI analysis features)</p>
              <p>
                When you use the Tenant Dispute Analysis or Landlord Inspection features, photos you upload are
                transmitted over an encrypted connection to our AI provider (Anthropic, Inc.) for processing.
                They are held in server memory only for the duration of the request and are{" "}
                <strong>not written to any database or file storage by MoveProof</strong>.
              </p>
              <p>
                Anthropic may retain inputs to their API for up to 30 days for trust and safety monitoring, as
                described in their{" "}
                <a
                  href="https://www.anthropic.com/legal/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  Privacy Policy
                </a>
                {" "}and{" "}
                <a
                  href="https://www.anthropic.com/legal/aup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  Usage Policy
                </a>
                . Anthropic does not use API customer data to train their models by default.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">Text you submit (deduction letters, notes)</p>
              <p>
                Text you paste or type into the AI analysis forms (e.g. your landlord&apos;s deduction letter,
                inspection notes) is transmitted to Anthropic&apos;s API under the same conditions as photos above.
                It is not stored by MoveProof.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">Free tools — deadline calculator &amp; demand letter generator</p>
              <p>
                These tools run <strong>entirely in your browser</strong>. No data you enter (dates, names,
                addresses, dispute details) is ever transmitted to MoveProof servers or any third party. It does
                not leave your device.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">Server logs</p>
              <p>
                MoveProof is hosted on Vercel. Vercel automatically collects standard server log data, including
                IP addresses, browser type, operating system, request timestamps, and pages visited. This data is
                used for security monitoring and service performance. It is governed by{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  Vercel&apos;s Privacy Policy
                </a>
                . We do not use this data to identify individual users.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">Cookies</p>
              <p>
                MoveProof does not set any tracking or advertising cookies. Vercel may set a minimal session
                cookie for infrastructure purposes. No third-party analytics scripts (e.g. Google Analytics) are
                loaded on this site.
              </p>
            </div>
          </div>
        </section>

        {/* What we don't do */}
        <section className="space-y-3 border-t border-gray-100 pt-8">
          <h2 className="text-base font-bold text-gray-900">3. What we do not do</h2>
          <ul className="space-y-2">
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">✗</span> We do not sell, rent, or share your data with advertisers or data brokers.</li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">✗</span> We do not create user accounts or build profiles linked to your identity.</li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">✗</span> We do not store your photos or submitted text in any database.</li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">✗</span> We do not run advertising networks or retargeting on this site.</li>
          </ul>
        </section>

        {/* Third parties */}
        <section className="space-y-3 border-t border-gray-100 pt-8">
          <h2 className="text-base font-bold text-gray-900">4. Third-party services</h2>
          <p>MoveProof relies on two third-party infrastructure providers:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700 border-b border-gray-200">Provider</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border-b border-gray-200">Purpose</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border-b border-gray-200">Data transferred</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="bg-white">
                  <td className="p-3 font-medium">Anthropic, Inc.</td>
                  <td className="p-3 text-gray-600">AI analysis of photos and text</td>
                  <td className="p-3 text-gray-600">Photos and text submitted to AI features only</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-medium">Vercel, Inc.</td>
                  <td className="p-3 text-gray-600">Application hosting</td>
                  <td className="p-3 text-gray-600">Standard server log data (IP, browser, timestamp)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500">
            Both providers are incorporated in the United States. Data transfers are conducted under standard
            contractual protections. For UK and EU users, this constitutes a transfer to a third country.
          </p>
        </section>

        {/* Legal bases and rights */}
        <section className="space-y-3 border-t border-gray-100 pt-8">
          <h2 className="text-base font-bold text-gray-900">5. Your rights</h2>
          <p>
            Depending on where you are located, you may have rights under applicable privacy law including:
          </p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">•</span><span><strong>UK &amp; EU (UK GDPR / GDPR):</strong> Right to access, erasure, restriction, and portability of personal data. Right to object to processing. Right to lodge a complaint with the ICO (UK) or your national supervisory authority (EU).</span></li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">•</span><span><strong>Canada (PIPEDA):</strong> Right to access personal information we hold about you and to request correction.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">•</span><span><strong>Australia (Privacy Act 1988):</strong> Right to access and correct personal information, and to make a complaint to the OAIC.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">•</span><span><strong>USA (varies by state):</strong> Certain states (e.g. California under CCPA) grant rights to know, delete, and opt out of sale of personal information. We do not sell personal information.</span></li>
          </ul>
          <p>
            Because MoveProof does not store your submitted content, most erasure or access requests relate to
            server log data held by Vercel. For Anthropic data retention queries, contact Anthropic directly at{" "}
            <a href="mailto:privacy@anthropic.com" className="text-blue-700 hover:underline">privacy@anthropic.com</a>.
          </p>
          <p>
            To exercise any privacy rights with MoveProof, contact us at{" "}
            <a href="mailto:hello@moveproof.app" className="text-blue-700 hover:underline">hello@moveproof.app</a>.
            We will respond within 30 days.
          </p>
        </section>

        {/* Data security */}
        <section className="space-y-3 border-t border-gray-100 pt-8">
          <h2 className="text-base font-bold text-gray-900">6. Security</h2>
          <p>
            All data in transit between your browser, MoveProof servers, and Anthropic is encrypted using TLS
            (HTTPS). Uploaded files are held in server memory only for the duration of the API request and are
            not written to disk. We do not store payment information — any future payment processing will be
            handled by a PCI-compliant third party.
          </p>
        </section>

        {/* Children */}
        <section className="space-y-3 border-t border-gray-100 pt-8">
          <h2 className="text-base font-bold text-gray-900">7. Children&apos;s privacy</h2>
          <p>
            MoveProof is not directed at children under the age of 16. We do not knowingly collect personal
            information from anyone under 16. If you believe a child has submitted information through this
            service, contact us at{" "}
            <a href="mailto:hello@moveproof.app" className="text-blue-700 hover:underline">hello@moveproof.app</a>{" "}
            and we will take appropriate action.
          </p>
        </section>

        {/* Changes */}
        <section className="space-y-3 border-t border-gray-100 pt-8">
          <h2 className="text-base font-bold text-gray-900">8. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. When we do, we will update the &ldquo;Last updated&rdquo; date at
            the top of this page. If changes are material, we will note them prominently. Continued use of
            MoveProof after changes are posted constitutes acceptance of the updated policy.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-3 border-t border-gray-100 pt-8">
          <h2 className="text-base font-bold text-gray-900">9. Contact</h2>
          <p>
            For any privacy-related questions or requests:
          </p>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm space-y-1">
            <p className="font-semibold text-gray-900">MoveProof</p>
            <p className="text-gray-600">Kitchener, Ontario, Canada</p>
            <a href="mailto:hello@moveproof.app" className="text-blue-700 hover:underline font-medium">hello@moveproof.app</a>
          </div>
        </section>

      </main>
    </div>
  );
}
