import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@heroui/react'
import { supabase } from '../lib/supabaseClient'
import AdminTable from '../components/AdminTable'
import PageTransition from '../components/PageTransition'

export default function Admin() {
  const navigate = useNavigate()
  const [count, setCount] = useState(null)

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">
        {/* Navbar */}
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--accent)' }}>
              waitlist.io
            </span>
            <Button
              onPress={handleLogout}
              className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm text-muted hover:text-foreground hover:border-foreground transition"
            >
              Logout
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          {/* Total count */}
          <div className="mb-8 sm:mb-10">
            <p className="text-xs font-medium text-muted uppercase tracking-widest mb-1">Total Signups</p>
            <p className="text-5xl font-extrabold tracking-tight sm:text-6xl" style={{ color: 'var(--accent)' }}>
              {count === null ? '—' : count.toLocaleString()}
            </p>
          </div>

          {/* Table */}
          <AdminTable onCountChange={setCount} />
        </main>
      </div>
    </PageTransition>
  )
}
