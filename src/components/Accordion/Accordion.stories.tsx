import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import '../../tokens/tokens.css'
import { Accordion } from './Accordion'
import type { AccordionProps } from './Accordion'

// ── Meta ──────────────────────────────────────────────────────

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'padded' },
  argTypes: {
    style:     { control: 'select', options: ['outlined', 'filled', 'rounded'] },
    open:      { control: 'boolean' },
    showIcon:  { control: 'boolean' },
    showBadge: { control: 'boolean' },
    disabled:  { control: 'boolean' },
    focused:   { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Accordion>

// ── Default (Outlined) ────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: {
    style:     'outlined',
    title:     'Insert an informative title text here',
    showIcon:  true,
    showBadge: true,
  },
}

// ── Styles ────────────────────────────────────────────────────

export const Outlined: Story = {
  name: 'Outlined',
  args: {
    style:       'outlined',
    title:       'Outlined Accordion',
    defaultOpen: true,
    showIcon:    true,
    showBadge:   true,
  },
}

export const Filled: Story = {
  name: 'Filled',
  args: {
    style:       'filled',
    title:       'Filled Accordion',
    defaultOpen: true,
    showIcon:    true,
    showBadge:   true,
  },
}

export const Rounded: Story = {
  name: 'Rounded',
  args: {
    style:       'rounded',
    title:       'Rounded Accordion',
    defaultOpen: true,
    showIcon:    true,
    showBadge:   true,
  },
}

// ── States ────────────────────────────────────────────────────

export const Collapsed: Story = {
  name: 'State / Collapsed',
  args: {
    style:       'outlined',
    title:       'Collapsed (default)',
    defaultOpen: false,
    showIcon:    true,
    showBadge:   true,
  },
}

export const Expanded: Story = {
  name: 'State / Expanded',
  args: {
    style:       'outlined',
    title:       'Expanded',
    defaultOpen: true,
    showIcon:    true,
    showBadge:   true,
  },
}

export const Focused: Story = {
  name: 'State / Focused',
  args: {
    style:     'outlined',
    title:     'Focused (forced via prop)',
    focused:   true,
    showIcon:  true,
    showBadge: true,
  },
}

export const Disabled: Story = {
  name: 'State / Disabled',
  args: {
    style:     'outlined',
    title:     'Disabled accordion',
    disabled:  true,
    showIcon:  true,
    showBadge: true,
  },
}

// ── No icon / No badge ────────────────────────────────────────

export const NoIcon: Story = {
  name: 'Slots / No Icon',
  args: {
    style:       'outlined',
    title:       'No icon slot',
    defaultOpen: true,
    showIcon:    false,
    showBadge:   true,
  },
}

export const NoBadge: Story = {
  name: 'Slots / No Badge',
  args: {
    style:       'outlined',
    title:       'No badge',
    defaultOpen: true,
    showIcon:    true,
    showBadge:   false,
  },
}

export const NoIconNoBadge: Story = {
  name: 'Slots / No Icon + No Badge',
  args: {
    style:       'outlined',
    title:       'Minimal — no icon or badge',
    defaultOpen: true,
    showIcon:    false,
    showBadge:   false,
  },
}

// ── All states per style ──────────────────────────────────────

const STATES: Array<Partial<AccordionProps> & { label: string }> = [
  { label: 'Default (closed)',  defaultOpen: false  },
  { label: 'Expanded',          defaultOpen: true   },
  { label: 'Focused',           focused: true       },
  { label: 'Disabled',          disabled: true      },
]

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 24, fontFamily: 'Inter, sans-serif', maxWidth: 560 }}>
      {(['outlined', 'filled', 'rounded'] as const).map(style => (
        <section key={style}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
            {style}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {STATES.map(({ label, ...props }) => (
              <div key={label}>
                <div style={{ fontSize: 11, color: '#9da3af', marginBottom: 4 }}>{label}</div>
                <Accordion
                  style={style}
                  title="Insert an informative title text here"
                  showIcon
                  showBadge
                  {...props}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
}

// ── Interactive ───────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ padding: 24, maxWidth: 560, fontFamily: 'Inter, sans-serif' }}>
        <Accordion
          style="outlined"
          title="Controlled accordion"
          open={open}
          onOpenChange={setOpen}
          showIcon
          showBadge
        />
        <p style={{ marginTop: 16, fontSize: 13, color: '#4d5761' }}>
          State: <strong>{open ? 'expanded' : 'collapsed'}</strong>
        </p>
        <button
          style={{ marginTop: 8, padding: '8px 16px', border: '1px solid #0066ff', borderRadius: 8, background: '#0066ff', color: 'white', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13 }}
          onClick={() => setOpen(o => !o)}
        >
          Toggle externally
        </button>
      </div>
    )
  },
}

// ── FAQ example ───────────────────────────────────────────────

const FAQ_ITEMS = [
  { title: 'What is included in the free plan?',    content: 'The free plan includes up to 3 projects, 5 GB of storage, and access to basic components. No credit card required.' },
  { title: 'How do I upgrade my account?',          content: 'Go to Settings → Billing and select a paid plan. Changes take effect immediately and you will be billed pro-rata.' },
  { title: 'Can I cancel my subscription anytime?', content: 'Yes. You can cancel at any time from the Billing page. Your plan will remain active until the end of the current period.' },
  { title: 'Is my data backed up automatically?',   content: 'All data is backed up continuously across multiple regions. You can also export your data at any time from Settings.' },
]

export const FAQExample: Story = {
  name: 'Example / FAQ',
  render: () => (
    <div style={{ padding: 24, maxWidth: 600, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700, color: '#111927' }}>Frequently Asked Questions</h2>
      {FAQ_ITEMS.map((item, i) => (
        <Accordion
          key={i}
          style="outlined"
          title={item.title}
          content={item.content}
          showIcon={false}
          showBadge={false}
        />
      ))}
    </div>
  ),
}

// ── Rounded FAQ example ───────────────────────────────────────

export const RoundedFAQ: Story = {
  name: 'Example / Rounded FAQ',
  render: () => (
    <div style={{ padding: 24, maxWidth: 600, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {FAQ_ITEMS.map((item, i) => (
        <Accordion
          key={i}
          style="rounded"
          title={item.title}
          content={item.content}
          showIcon={false}
          showBadge={false}
        />
      ))}
    </div>
  ),
}
