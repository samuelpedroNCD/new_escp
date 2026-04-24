import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

const LAST_UPDATED = 'April 24, 2026'

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By submitting your details to join the waitlist you confirm that you have read, understood, and agreed to these Terms & Conditions and our Privacy Policy.\n\nIf you do not agree to these terms, please do not submit your information. We reserve the right to update these terms at any time, and continued participation in the waitlist following any update constitutes acceptance of the revised terms.`,
  },
  {
    title: '2. Use of Service',
    body: `The waitlist is provided as a free, pre-launch service with no guarantees of a future product release. By joining you agree that:\n• You will provide accurate and truthful information\n• You will not use the service to submit spam, false identities, or malicious data\n• You will not attempt to reverse-engineer, scrape, or abuse the service in any way\n\nWe reserve the right to remove any entry from the waitlist at our discretion.`,
  },
  {
    title: '3. Limitation of Liability',
    body: `The waitlist and any associated communications are provided "as is" without warranty of any kind. We make no guarantees regarding:\n• The availability or uptime of the waitlist form\n• The launch date or feature set of any future product\n• The accuracy of any product descriptions or timelines shared in connection with the waitlist\n\nTo the fullest extent permitted by applicable law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of this service.`,
  },
  {
    title: '4. Changes to Terms',
    body: `We may update these Terms & Conditions from time to time. When we do, we will revise the "Last updated" date at the top of this page.\n\nIf the changes are material, we will make reasonable efforts to notify waitlist members via the email address provided. Your continued participation in the waitlist after any changes constitutes your acceptance of the new terms.`,
  },
  {
    title: '5. Governing Law',
    body: `These Terms & Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which the product operator is registered, without regard to its conflict of law provisions.\n\nAny disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of that jurisdiction.`,
  },
]

export default function Terms() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to home
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2 sm:text-4xl">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm text-muted">Last updated: {LAST_UPDATED}</p>
          </div>

          <p className="text-muted mb-10 leading-relaxed text-sm sm:text-base">
            These Terms &amp; Conditions govern your use of this waitlist service. Please read them
            carefully before submitting your information.
          </p>

          <div className="flex flex-col gap-8">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-base font-semibold text-foreground mb-3 sm:text-lg">{s.title}</h2>
                <p className="text-muted leading-relaxed whitespace-pre-line text-sm">{s.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-border pt-8 text-xs text-muted">
            <Link to="/" className="hover:text-foreground transition-colors">← Back to home</Link>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
