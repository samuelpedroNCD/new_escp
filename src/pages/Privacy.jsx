import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

const LAST_UPDATED = 'April 24, 2026'

const sections = [
  {
    title: '1. What Data We Collect',
    body: `When you join our waitlist we collect the following personal data:\n• Your name\n• Your email address\n• A consent timestamp recording when you agreed to this policy and our Terms & Conditions\n\nWe do not collect any additional personal data, and we do not use cookies or tracking technologies on this page.`,
  },
  {
    title: '2. Why We Collect It',
    body: `We collect your data solely for waitlist management purposes — specifically to:\n• Notify you when we launch or when early access becomes available\n• Send occasional product updates that are directly relevant to the waitlist\n\nWe will never sell your data to third parties, and we will never use it for purposes beyond those stated above.`,
  },
  {
    title: '3. How Long We Keep It',
    body: `We retain your personal data for as long as the waitlist is active, or until you request deletion — whichever comes first.\n\nIf the product does not launch, or if you are no longer interested, you may request that your data be deleted at any time. Upon a valid deletion request we will remove your record from our systems within 30 days.`,
  },
  {
    title: '4. Your Rights',
    body: `Under applicable data protection law (including the GDPR where relevant) you have the following rights:\n• Access — you may request a copy of the personal data we hold about you\n• Deletion — you may request that we delete your data at any time\n• Portability — you may request your data in a structured, machine-readable format\n• Rectification — you may ask us to correct inaccurate data\n\nTo exercise any of these rights, contact us at the address below. We will respond within 30 days.`,
  },
  {
    title: '5. Contact',
    body: `If you have any questions about this Privacy Policy or how we handle your data, please contact us at:\n\nprivacy@yourproduct.com\n\nWe take privacy seriously and will do our best to address your concerns promptly.`,
  },
]

export default function Privacy() {
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
              Privacy Policy
            </h1>
            <p className="text-sm text-muted">Last updated: {LAST_UPDATED}</p>
          </div>

          <p className="text-muted mb-10 leading-relaxed text-sm sm:text-base">
            This Privacy Policy explains how we collect, use, and protect your personal data when
            you join our waitlist. By submitting the form you agree to the practices described below.
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
