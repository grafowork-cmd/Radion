import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import '../../tokens/tokens.css'
import { DropdownFilterMultiSelect, type DropdownOption } from './Dropdown'

const SAMPLE_OPTIONS: DropdownOption[] = [
  { value: 'apple',      label: 'Apple' },
  { value: 'banana',     label: 'Banana' },
  { value: 'cherry',     label: 'Cherry' },
  { value: 'durian',     label: 'Durian', disabled: true },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig',        label: 'Fig' },
]

const meta: Meta<typeof DropdownFilterMultiSelect> = {
  title: 'Components/Dropdown/Filter Multi Select',
  component: DropdownFilterMultiSelect,
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
type Story = StoryObj<typeof DropdownFilterMultiSelect>

const defaults = {
  options:     SAMPLE_OPTIONS,
  label:       'Fruit',
  showLabel:   true,
  placeholder: 'All',
}

export const Default: Story = { args: { ...defaults } }

export const WithValues: Story = {
  args: { ...defaults, defaultValue: ['apple', 'cherry'] },
}

export const WithFieldnote: Story = {
  args: { ...defaults, showFieldnote: true, fieldnote: 'Filter by fruit type.' },
}

export const ErrorState: Story = {
  args: { ...defaults, state: 'error', errorText: 'Please select at least one filter.' },
}

export const WarningState: Story = {
  args: { ...defaults, state: 'warning', warningText: 'Some filters may not apply.' },
}

export const Disabled: Story = {
  args: { ...defaults, state: 'disabled' },
}

export const DisabledWithValues: Story = {
  args: { ...defaults, state: 'disabled', defaultValue: ['apple'] },
}

export const Loading: Story = {
  args: { ...defaults, state: 'loading', showFieldnote: true },
}

export const Small: Story = { args: { ...defaults, size: 'small' } }
export const Medium: Story = { args: { ...defaults, size: 'medium' } }

export const Controlled: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: 13, color: '#4d5761' }}>
          Filters: <strong>{values.length === 0 ? '(none)' : values.join(', ')}</strong>
        </div>
        <DropdownFilterMultiSelect
          options={SAMPLE_OPTIONS}
          label="Fruit"
          placeholder="All"
          value={values}
          onChange={setValues}
          showFieldnote
          fieldnote="Controlled — filters shown above"
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
                  <DropdownFilterMultiSelect
                    options={SAMPLE_OPTIONS}
                    label="Fruit"
                    placeholder="All"
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
