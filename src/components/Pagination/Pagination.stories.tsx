import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import '../../tokens/tokens.css'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
  argTypes: {
    type: {
      control: 'select',
      options: ['web', 'mobile-items', 'mobile-pages'],
    },
    onPageChange:        { control: false },
    onRowsPerPageChange: { control: false },
    rowsPerPageOptions:  { control: false },
  },
}
export default meta
type Story = StoryObj<typeof Pagination>

// ── Web ───────────────────────────────────────────────────────

export const Web: Story = {
  args: {
    type:        'web',
    totalPages:  10,
    totalItems:  500,
    defaultPage: 1,
    defaultRowsPerPage: 50,
  },
}

export const WebMidPage: Story = {
  name: 'Web / Mid Page',
  args: {
    type:        'web',
    totalPages:  10,
    totalItems:  500,
    defaultPage: 5,
    defaultRowsPerPage: 50,
  },
}

export const WebLastPages: Story = {
  name: 'Web / Near Last Page',
  args: {
    type:        'web',
    totalPages:  10,
    totalItems:  500,
    defaultPage: 9,
    defaultRowsPerPage: 50,
  },
}

export const WebFewPages: Story = {
  name: 'Web / Few Pages',
  args: {
    type:        'web',
    totalPages:  5,
    totalItems:  50,
    defaultPage: 1,
    defaultRowsPerPage: 10,
  },
}

export const WebControlled: Story = {
  name: 'Web / Controlled',
  render: () => {
    const [page, setPage] = useState(1)
    const [rows, setRows] = useState(50)
    const totalItems = 500
    const totalPages = Math.ceil(totalItems / rows)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: 13, color: '#4d5761' }}>
          Page <strong>{page}</strong> of <strong>{totalPages}</strong> · {rows} rows/page
        </div>
        <Pagination
          type="web"
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          rowsPerPage={rows}
          onPageChange={setPage}
          onRowsPerPageChange={r => { setRows(r); setPage(1) }}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>
    )
  },
}

// ── Mobile Items ──────────────────────────────────────────────

export const MobileItems: Story = {
  name: 'Mobile / Items',
  args: {
    type:        'mobile-items',
    totalPages:  10,
    totalItems:  500,
    defaultPage: 1,
    defaultRowsPerPage: 50,
  },
}

export const MobileItemsMid: Story = {
  name: 'Mobile / Items Mid',
  args: {
    type:        'mobile-items',
    totalPages:  10,
    totalItems:  500,
    defaultPage: 5,
    defaultRowsPerPage: 50,
  },
}

// ── Mobile Pages ──────────────────────────────────────────────

export const MobilePages: Story = {
  name: 'Mobile / Pages',
  args: {
    type:        'mobile-pages',
    totalPages:  99999,
    totalItems:  999990,
    defaultPage: 1,
    defaultRowsPerPage: 10,
  },
}

export const MobilePagesControlled: Story = {
  name: 'Mobile / Pages Controlled',
  render: () => {
    const [page, setPage] = useState(1)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: 13, color: '#4d5761' }}>
          Current page: <strong>{page}</strong>
        </div>
        <Pagination
          type="mobile-pages"
          currentPage={page}
          totalPages={100}
          onPageChange={setPage}
        />
      </div>
    )
  },
}

// ── All three variants ────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 24, fontFamily: 'Inter, sans-serif' }}>
      <section>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Web</div>
        <div style={{ border: '1px solid #f3f4f6', borderRadius: 8 }}>
          <Pagination type="web" totalPages={10} totalItems={500} defaultPage={1} defaultRowsPerPage={50} />
        </div>
      </section>
      <section>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Mobile — Items</div>
        <div style={{ border: '1px solid #f3f4f6', borderRadius: 8, display: 'inline-block' }}>
          <Pagination type="mobile-items" totalPages={10} totalItems={500} defaultPage={1} defaultRowsPerPage={50} />
        </div>
      </section>
      <section>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Mobile — Pages</div>
        <div style={{ border: '1px solid #f3f4f6', borderRadius: 8, display: 'inline-block' }}>
          <Pagination type="mobile-pages" totalPages={99999} defaultPage={1} />
        </div>
      </section>
    </div>
  ),
}
