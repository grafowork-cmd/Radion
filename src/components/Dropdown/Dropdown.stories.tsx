import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import '../../tokens/tokens.css'
import { Dropdown, type DropdownOption } from './Dropdown'

const SAMPLE_OPTIONS: DropdownOption[] = [
  { value: 'apple',      label: 'Apple' },
  { value: 'banana',     label: 'Banana' },
  { value: 'cherry',     label: 'Cherry' },
  { value: 'durian',     label: 'Durian', disabled: true },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig',        label: 'Fig' },
]

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown/Single Select',
  component: Dropdown,
  parameters: { layout: 'padded' },
  argTypes: {
    options:  { control: false },
    onChange: { control: false },
    state:    { control: 'select', options: ['default', 'error', 'warning', 'disabled', 'loading'] },
    size:     { control: 'select', options: ['small', 'medium', 'large'] },
  },
}
export default meta
type Story = StoryObj<typeof Dropdown>

const defaults = {
  options:     SAMPLE_OPTIONS,
  label:       'Fruit',
  showLabel:   true,
  placeholder: 'Select a fruit',
}

export const Default: Story = { args: { ...defaults } }

export const WithValue: Story = {
  args: { ...defaults, value: 'banana' },
}

export const WithFieldnote: Story = {
  args: { ...defaults, showFieldnote: true, fieldnote: 'Pick your favourite fruit.' },
}

export const WithNotation: Story = {
  args: { ...defaults, showNotation: true, notation: '(required)' },
}

export const ErrorState: Story = {
  args: { ...defaults, state: 'error', showFieldnote: true, errorText: 'Please select an option.' },
}

export const WarningState: Story = {
  args: { ...defaults, state: 'warning', warningText: 'This option may not be available.' },
}

export const Disabled: Story = {
  args: { ...defaults, state: 'disabled' },
}

export const DisabledWithValue: Story = {
  args: { ...defaults, state: 'disabled', value: 'apple' },
}

export const Loading: Story = {
  args: { ...defaults, state: 'loading', showFieldnote: true },
}

export const Small: Story = { args: { ...defaults, size: 'small' } }
export const Large: Story = { args: { ...defaults, size: 'large' } }

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: 13, color: '#4d5761' }}>
          Selected: <strong>{value || '(none)'}</strong>
        </div>
        <Dropdown
          options={SAMPLE_OPTIONS}
          label="Fruit"
          placeholder="Select a fruit"
          value={value}
          onChange={setValue}
          showFieldnote
          fieldnote="Controlled — value shown above"
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
                  <Dropdown
                    options={SAMPLE_OPTIONS}
                    label="Fruit"
                    placeholder="Select a fruit"
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
