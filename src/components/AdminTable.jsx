import { useEffect, useState } from 'react'
import { Table, Spinner, Button } from '@heroui/react'
import { supabase } from '../lib/supabaseClient'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function AdminTable({ onCountChange }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [rowToDelete, setRowToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setError('Failed to load signups. Please refresh.')
        } else {
          setRows(data ?? [])
          onCountChange?.(data?.length ?? 0)
        }
        setLoading(false)
      })
  }, [])

  async function confirmDelete() {
    if (!rowToDelete?.id) return

    setDeleting(true)
    const { error } = await supabase.from('waitlist').delete().eq('id', rowToDelete.id)

    if (error) {
      setError('Failed to delete signup. Please try again.')
      setDeleting(false)
      setRowToDelete(null)
      return
    }

    setRows((currentRows) => {
      const updatedRows = currentRows.filter((row) => row.id !== rowToDelete.id)
      onCountChange?.(updatedRows.length)
      return updatedRows
    })
    setDeleting(false)
    setRowToDelete(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-danger/30 bg-danger/10 px-6 py-4 text-sm text-danger text-center">
        {error}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
    <Table className="w-full min-w-[720px] sm:min-w-0">
      <Table.ScrollContainer>
        <Table.Content aria-label="Waitlist signups">
          <Table.Header>
            <Table.Column isRowHeader>Name</Table.Column>
            <Table.Column>Email</Table.Column>
            <Table.Column>GDPR Consent</Table.Column>
            <Table.Column>Date Joined</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>
          <Table.Body
            items={rows}
            renderEmptyState={() => (
              <div className="py-12 text-center text-muted text-sm">
                No signups yet
              </div>
            )}
          >
            {(row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.email}</Table.Cell>
                <Table.Cell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      row.gdpr_consent
                        ? 'bg-success/15 text-success'
                        : 'bg-danger/15 text-danger'
                    }`}
                  >
                    {row.gdpr_consent ? 'Yes' : 'No'}
                  </span>
                </Table.Cell>
                <Table.Cell>{formatDate(row.created_at)}</Table.Cell>
                <Table.Cell>
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    onPress={() => setRowToDelete(row)}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
    {Boolean(rowToDelete) && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-entry-title"
      >
        <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 text-left shadow-xl">
          <h2 id="delete-entry-title" className="text-lg font-semibold text-foreground">
            Delete waitlist entry?
          </h2>
          <p className="mt-2 text-sm text-muted">
            This action cannot be undone. {rowToDelete?.email ? `Delete ${rowToDelete.email}?` : ''}
          </p>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="light" onPress={() => setRowToDelete(null)} isDisabled={deleting}>
              Cancel
            </Button>
            <Button color="danger" onPress={confirmDelete} isLoading={deleting}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}
