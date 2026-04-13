import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import '../../tokens/tokens.css'
import { DropdownMultiSelect, type DropdownOption } from './Dropdown'

const SAMPLE_OPTIONS: DropdownOption[] = [
  { value: 'apple',      label: 'Apple' },
  { value: 'banana',     label: 'Banana' },
  { value: 'cherry',     label: 'Cherry' },
  { value: 'durian',     label: 'Durian', disabled: true },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig',        label: 'Fig' },
]

const meta: Meta<typeof DropdownMultiSelect> = {
  title: 'Components/Dropdown/Multi Select',
  component: DropdownMultiSelect,
  parameters: { layout: 'padded' },
  argTypes: {
    options:  { control: false },
    onChange: { control: false },
    value:    { control: false },
    state:    { control: 'select', options: ['default', 'error', 'warning', 'disabled', 'loading'] },
    size:     { control: 'select', options: ['small', 'medium', 'large'] },
  },
}
export default meta
type Story = StoryObj<typeof DropdownMultiSelect>

const defaults = {
  options:     SAMPLE_OPTIONS,
  label:       'Fruits',
  showLabel:   true,
  placeholder: 'Select fruits',
}

export const Default: Story = { args: { ...defaults } }

export const WithValues: Story = {
  args: { ...defaults, defaultValue: ['apple', 'cherry'] },
}

export const WithFieldnote: Story = {
  args: { ...defaults, showFieldnote: true, fieldnote: 'You can select multiple fruits.' },
}

export const ErrorState: Story = {
  args: { ...defaults, state: 'error', errorText: 'Please select at least one option.' },
}

export const WarningState: Story = {
  args: { ...defaults, state: 'warning', warningText: 'Some options may be unavailable.' },
}

export const Disabled: Story = {
  args: { ...defaults, state: 'disabled' },
}

export const Loading: Story = {
  args: { ...defaults, state: 'loading', showFieldnote: true },
}

export const Small: Story = { args: { ...defaults, size: 'small' } }
export const Large: Story = { args: { ...defaults, size: 'large' } }

export const Controlled: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: 13, color: '#4d5761' }}>
          Selected: <strong>{values.length === 0 ? '(none)' : values.join(', ')}</strong>
        </div>
        <DropdownMultiSelect
          options={SAMPLE_OPTIONS}
          label="Fruits"
          placeholder="Select fruits"
          value={values}
          onChange={setValues}
          showFieldnote
          fieldnote="Controlled — values shown above"
        />
      </div>
    )
  },
}

export const FullMatrix: Story = {
  render: () => {
    const states = ['default', 'error', 'warning', 'disabled', 'loading'] as const
    const sizes  = ['small', 'medium', 'large'] as const
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, padding: 32, fontFamily: 'Inter, sans-serif' }}>
        {states.map(state => (
          <section key={state}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
              {state}
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {sizes.map(size => (
                <div key={size}>
                  <div style={{ fontSize: 10, color: '#c4c9d4', marginBottom: 6 }}>{size}</div>
                  <DropdownMultiSelect
                    options={SAMPLE_OPTIONS}
                    label="Fruits"
                    placeholder="Select fruits"
                    state={state}
                    size={size}
                    showFieldnote={state !== 'loading'}
                    fieldnote="Helper text"
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
