import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import WaitlistForm from '../components/WaitlistForm'
import Counter from '../components/Counter'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Home() {
  const steps = [
    {
      title: 'Capture demand',
      description: 'Collect qualified emails with consent and validation from day one.',
    },
    {
      title: 'Track momentum',
      description: 'Monitor signups in real time so you can measure launch readiness.',
    },
    {
      title: 'Launch confidently',
      description: 'Start with an audience that already asked to hear from you.',
    },
  ]

  const trustPoints = [
    'GDPR-ready consent built in',
    'Spam-resistant validation flow',
    'Fast setup with a clean admin view',
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Navbar */}
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
            <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--accent)' }}>
              waitlist.io
            </span>
            <nav className="flex items-center gap-4 text-sm text-muted sm:gap-6">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <main className="flex flex-1 flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-4 inline-flex items-center rounded-full border border-border bg-surface px-4 py-1 text-xs font-medium text-muted uppercase tracking-widest"
          >
            Coming Soon
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl"
          >
            The waitlist<br />
            <span style={{ color: 'var(--accent)' }}>that converts.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mb-2 max-w-xl text-base text-muted sm:text-lg"
          >
            waitlist.io helps you capture early interest, build anticipation, and
            launch to an audience that's already excited — all before day one.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mb-10 max-w-lg text-sm text-muted/70"
          >
            No spam. No noise. Just the signal you need.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="w-full max-w-md"
          >
            <WaitlistForm />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-6 w-full max-w-md"
          >
            <Counter />
          </motion.div>

          {/* Section: How it works */}
          <section className="mt-16 w-full max-w-5xl text-left sm:mt-24">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={6}
              className="mb-8 text-center"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-muted">How it works</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                From interest to launch in 3 steps
              </h2>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map((step, index) => (
                <motion.article
                  key={step.title}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  custom={7 + index}
                  className="rounded-2xl border border-border bg-background p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.description}</p>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Section: Trust */}
          <section className="mt-10 w-full max-w-5xl rounded-2xl border border-border bg-background p-6 text-left sm:mt-12 sm:p-8">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={10}>
              <p className="text-xs font-medium uppercase tracking-widest text-muted">Why teams choose waitlist.io</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Built for serious launches, not vanity signups
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {trustPoints.map((point, index) => (
                  <li
                    key={point}
                    className="rounded-xl border border-border/70 bg-background px-4 py-3 text-sm text-muted"
                  >
                    <span className="mr-2" style={{ color: 'var(--accent)' }}>
                      {index + 1}.
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-border px-4 py-6 sm:px-6">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-xs text-muted sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} waitlist.io. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="/admin/login" className="opacity-40 hover:opacity-70 hover:text-foreground transition-all">Admin</Link>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
