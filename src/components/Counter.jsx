import { useEffect, useState } from 'react'
import { Spinner } from '@heroui/react'
import { supabase } from '../lib/supabaseClient'

export default function Counter() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .then(({ count }) => setCount(count ?? 0))
  }, [])

  if (count === null) {
    return (
      <div className="flex justify-center py-2">
        <Spinner size="sm" />
      </div>
    )
  }

  return (
    <p className="text-sm text-muted text-center">
      Join{' '}
      <span className="font-semibold text-accent">{count.toLocaleString()}</span>{' '}
      {count === 1 ? 'other' : 'others'} already waiting
    </p>
  )
}
