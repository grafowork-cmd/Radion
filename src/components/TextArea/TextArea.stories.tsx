import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import '../../tokens/tokens.css'
import { TextArea } from './TextArea'

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: { layout: 'padded' },
  argTypes: {
    onChange: { control: false },
    icon:     { control: false },
    state: {
      control: 'select',
      options: ['default', 'hover', 'focus', 'filled', 'disabled', 'error', 'warning', 'read-only'],
    },
    size: {
      control: 'select',
      options: ['medium', 'large'],
    },
  },
}
export default meta
type Story = StoryObj<typeof TextArea>

const defaults = {
  label:        'Label',
  showLabel:    true,
  notation:     '(required)',
  showNotation: true,
  placeholder:  'Placeholder',
}

// ── States ────────────────────────────────────────────────────

export const Default: Story = { args: { ...defaults } }
export const Hover: Story   = { args: { ...defaults, state: 'hover' } }
export const Focus: Story   = { args: { ...defaults, state: 'focus' } }

export const Filled: Story = {
  args: { ...defaults, state: 'filled', defaultValue: 'Filled text' },
}

export const Disabled: Story = {
  args: { ...defaults, state: 'disabled', defaultValue: 'Filled text' },
}

export const ErrorState: Story = {
  args: { ...defaults, state: 'error', defaultValue: 'Filled text', errorText: 'Error message.' },
}

export const WarningState: Story = {
  args: { ...defaults, state: 'warning', defaultValue: 'Filled text', warningText: 'Warning message.' },
}

export const ReadOnly: Story = {
  args: { ...defaults, state: 'read-only', defaultValue: 'Filled text' },
}

// ── With extras ───────────────────────────────────────────────

export const WithFieldnote: Story = {
  args: { ...defaults, showFieldnote: true, fieldnote: 'Field note text here.' },
}

export const WithCount: Story = {
  args: { ...defaults, showCount: true, maxLength: 100 },
}

// ── Sizes ─────────────────────────────────────────────────────

export const Medium: Story = { args: { ...defaults, size: 'medium' } }

export const Large: Story = { args: { ...defaults, size: 'large' } }

export const LargeFilled: Story = {
  args: { ...defaults, size: 'large', state: 'filled', defaultValue: 'Filled text' },
}

export const LargeError: Story = {
  args: { ...defaults, size: 'large', state: 'error', defaultValue: 'Filled text', errorText: 'Error message.' },
}

export const LargeDisabled: Story = {
  args: { ...defaults, size: 'large', state: 'disabled', defaultValue: 'Filled text' },
}

// ── Controlled ───────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: 13, color: '#4d5761' }}>
          Characters: <strong>{value.length}</strong>
        </div>
        <TextArea
          label="Message"
          showLabel
          notation="(required)"
          showNotation
          placeholder="Type something…"
          value={value}
          onChange={setValue}
          showCount
          maxLength={200}
          showFieldnote
          fieldnote="Max 200 characters."
        />
      </div>
    )
  },
}

// ── Full matrix ───────────────────────────────────────────────

export const FullMatrix: Story = {
  render: () => {
    const states = ['default', 'hover', 'focus', 'filled', 'disabled', 'error', 'warning', 'read-only'] as const
    const sizes  = ['medium', 'large'] as const
    const filledStates = new Set(['filled', 'disabled', 'error', 'warning', 'read-only'])

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 32, fontFamily: 'Inter, sans-serif' }}>
        {sizes.map(size => (
          <section key={size}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
              {size}
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {states.map(state => (
                <div key={state} style={{ minWidth: 200 }}>
                  <div style={{ fontSize: 10, color: '#c4c9d4', marginBottom: 6 }}>{state}</div>
                  <TextArea
                    label="Label"
                    showLabel
                    notation="(required)"
                    showNotation
                    placeholder="Placeholder"
                    defaultValue={filledStates.has(state) ? 'Filled text' : ''}
                    state={state}
                    size={size}
                    showFieldnote={!['error', 'warning'].includes(state)}
                    fieldnote="Field note"
                    errorText="Error message."
                    warningText="Warning message."
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    )
  },
}
