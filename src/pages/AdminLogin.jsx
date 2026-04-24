import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Input, Label } from '@heroui/react'
import { supabase } from '../lib/supabaseClient'
import PageTransition from '../components/PageTransition'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin', { replace: true })
    })
  }, [navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (error) {
      setError('Invalid credentials. Please try again.')
      return
    }

    navigate('/admin', { replace: true })
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
              waitlist.io
            </span>
            <p className="mt-2 text-sm text-muted">Admin access only</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <TextField
              isRequired
              type="email"
              value={email}
              onChange={setEmail}
              className="flex flex-col gap-1"
            >
              <Label className="text-sm font-medium text-foreground">Email</Label>
              <Input
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-border bg-field-background px-4 py-2.5 text-field-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent transition"
              />
            </TextField>

            <TextField
              isRequired
              type="password"
              value={password}
              onChange={setPassword}
              className="flex flex-col gap-1"
            >
              <Label className="text-sm font-medium text-foreground">Password</Label>
              <Input
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-field-background px-4 py-2.5 text-field-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent transition"
              />
            </TextField>

            {error && (
              <p className="text-sm text-center text-danger">{error}</p>
            )}

            <Button
              type="submit"
              isDisabled={loading}
              className="w-full rounded-xl bg-accent text-accent-foreground font-semibold py-3 hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </PageTransition>
  )
}
