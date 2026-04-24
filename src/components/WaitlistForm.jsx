import { useState } from 'react'
import { Button, TextField, Input, Label, FieldError, Checkbox } from '@heroui/react'
import { supabase } from '../lib/supabaseClient'

const UNIQUE_ERROR_CODE = '23505'

function validate({ name, email, gdpr }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Name is required.'
  if (!email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!gdpr) errors.gdpr = 'You must agree to continue.'
  return errors
}

export default function WaitlistForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gdpr, setGdpr] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError('')

    const validationErrors = validate({ name, email, gdpr })
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setLoading(true)

    const { error } = await supabase
      .from('waitlist')
      .insert({ name: name.trim(), email: email.trim(), gdpr_consent: true })

    setLoading(false)

    if (error) {
      if (error.code === UNIQUE_ERROR_CODE) {
        setServerError("Looks like you're already on the list!")
      } else {
        setServerError('Something went wrong. Please try again.')
      }
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <p className="text-xl font-semibold text-foreground">
          You're in! We'll be in touch.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 w-full max-w-md mx-auto">
      {/* Name */}
      <TextField
        isRequired
        isInvalid={!!errors.name}
        value={name}
        onChange={setName}
        className="flex flex-col gap-1"
      >
        <Label className="text-sm font-medium text-foreground">Name</Label>
        <Input
          placeholder="Your name"
          className="w-full rounded-xl border border-border bg-field-background px-4 py-2.5 text-field-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent transition"
        />
        {errors.name && (
          <FieldError className="text-xs text-danger">{errors.name}</FieldError>
        )}
      </TextField>

      {/* Email */}
      <TextField
        isRequired
        type="email"
        isInvalid={!!errors.email}
        value={email}
        onChange={setEmail}
        className="flex flex-col gap-1"
      >
        <Label className="text-sm font-medium text-foreground">Email</Label>
        <Input
          placeholder="you@example.com"
          className="w-full rounded-xl border border-border bg-field-background px-4 py-2.5 text-field-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent transition"
        />
        {errors.email && (
          <FieldError className="text-xs text-danger">{errors.email}</FieldError>
        )}
      </TextField>

      {/* GDPR Checkbox */}
      <div className="flex flex-col gap-1">
        <Checkbox
          isSelected={gdpr}
          onChange={setGdpr}
          isInvalid={!!errors.gdpr}
          className="flex items-start gap-2 cursor-pointer w-full"
        >
          <Checkbox.Control className="mt-0.5 shrink-0 w-4 h-4 rounded border border-border bg-field-background data-[selected=true]:bg-accent data-[selected=true]:border-accent transition">
            <Checkbox.Indicator />
          </Checkbox.Control>
          <span className="text-sm text-muted leading-snug">
            I agree to the{' '}
            <a href="/privacy" target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2 hover:opacity-80">Privacy Policy</a>{' '}
            and{' '}
            <a href="/terms" target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2 hover:opacity-80">Terms &amp; Conditions</a>
          </span>
        </Checkbox>
        {errors.gdpr && (
          <p className="text-xs text-danger pl-6">{errors.gdpr}</p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-center text-danger">{serverError}</p>
      )}

      <Button
        type="submit"
        isDisabled={loading || submitted}
        className="w-full rounded-full bg-accent text-accent-foreground font-semibold py-3 hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Joining…' : 'Join the Waitlist'}
      </Button>
    </form>
  )
}
