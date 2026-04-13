import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import '../../tokens/tokens.css'
import { CheckboxGroup } from './Checkbox'

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/Checkbox',
  component: CheckboxGroup,
  parameters: { layout: 'padded' },
  argTypes: {
    state:        { control: 'select', options: ['default', 'error', 'warning', 'disabled', 'loading'] },
    label:        { control: 'text' },
    notation:     { control: 'text' },
    fieldnote:    { control: 'text' },
    errorText:    { control: 'text' },
    warningText:  { control: 'text' },
    checked:      { control: 'boolean' },
    indeterminate:{ control: 'boolean' },
    showLabel:    { control: 'boolean' },
    showNotation: { control: 'boolean' },
    showFieldnote:{ control: 'boolean' },
    focused:      { control: 'boolean' },
    onChange:     { control: false },
  },
}
export default meta
type Story = StoryObj<typeof CheckboxGroup>

const defaultArgs = {
  label: 'Checkbox label',
  showLabel: true,
}

// ── Basic selection states ────────────────────────────────────

export const Unselected: Story = {
  args: { ...defaultArgs },
}

export const Selected: Story = {
  args: { ...defaultArgs, checked: true },
}

export const Indeterminate: Story = {
  args: { ...defaultArgs, indeterminate: true },
}

// ── Visual/forced states ──────────────────────────────────────

export const Focused: Story = {
  args: { ...defaultArgs, focused: true },
}

export const FocusedSelected: Story = {
  args: { ...defaultArgs, checked: true, focused: true },
}

// ── Semantic states ───────────────────────────────────────────

export const Error: Story = {
  args: { ...defaultArgs, state: 'error', showFieldnote: true, errorText: 'Error message.' },
}

export const ErrorSelected: Story = {
  args: { ...defaultArgs, checked: true, state: 'error', showFieldnote: true, errorText: 'Error message.' },
}

export const Warning: Story = {
  args: { ...defaultArgs, state: 'warning', warningText: 'Warning message.' },
}

export const Disabled: Story = {
  args: { ...defaultArgs, state: 'disabled' },
}

export const DisabledSelected: Story = {
  args: { ...defaultArgs, checked: true, state: 'disabled' },
}

export const DisabledIndeterminate: Story = {
  args: { ...defaultArgs, indeterminate: true, state: 'disabled' },
}

export const Loading: Story = {
  args: { state: 'loading', showFieldnote: true },
}

// ── With extras ───────────────────────────────────────────────

export const WithFieldnote: Story = {
  args: { ...defaultArgs, showFieldnote: true, fieldnote: 'Fieldnote' },
}

export const WithNotation: Story = {
  args: { ...defaultArgs, showNotation: true, notation: '(required)' },
}

// ── Controlled ───────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: 13, color: '#4d5761' }}>
          Value: <strong>{checked ? 'checked' : 'unchecked'}</strong>
        </div>
        <CheckboxGroup
          label="Controlled checkbox"
          checked={checked}
          onChange={setChecked}
          showFieldnote
          fieldnote="Click to toggle"
        />
      </div>
    )
  },
}

// ── Full matrix ───────────────────────────────────────────────

export const FullMatrix: Story = {
  render: () => {
    type SelectionKey = 'unselected' | 'selected' | 'indeterminate'
    const selections: { key: SelectionKey; label: string }[] = [
      { key: 'unselected',    label: 'Unselected' },
      { key: 'selected',      label: 'Selected' },
      { key: 'indeterminate', label: 'Indeterminate' },
    ]
    const states = ['default', 'error', 'warning', 'disabled', 'loading'] as const

    const selProps = (key: SelectionKey) => ({
      checked:       key === 'selected',
      indeterminate: key === 'indeterminate',
    })

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, padding: 32, fontFamily: 'Inter, sans-serif' }}>
        {states.map(state => (
          <section key={state}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
              {state}
            </div>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {selections.map(({ key, label }) => (
                <div key={key}>
                  <div style={{ fontSize: 10, color: '#c4c9d4', marginBottom: 6 }}>{label}</div>
                  <CheckboxGroup
                    label="Checkbox label"
                    state={state}
                    showFieldnote={state !== 'loading'}
                    fieldnote="Fieldnote"
                    errorText="Error message."
                    warningText="Warning message."
                    {...selProps(key)}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Focused states */}
        <section>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
            focused (forced)
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {selections.map(({ key, label }) => (
              <div key={key}>
                <div style={{ fontSize: 10, color: '#c4c9d4', marginBottom: 6 }}>{label}</div>
                <CheckboxGroup label="Checkbox label" focused {...selProps(key)} />
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  },
}
