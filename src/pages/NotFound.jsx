import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 text-center">
        <p className="text-8xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--accent)' }}>
          404
        </p>
        <h1 className="text-2xl font-semibold text-foreground mb-3">Page not found</h1>
        <p className="text-sm text-muted mb-8 max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'var(--accent)' }}
        >
          Back to home
        </Link>
      </div>
    </PageTransition>
  )
}
