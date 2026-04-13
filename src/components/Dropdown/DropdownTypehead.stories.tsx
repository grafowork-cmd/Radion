import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import '../../tokens/tokens.css'
import { DropdownTypehead, type DropdownOption } from './Dropdown'

const LONG_OPTIONS: DropdownOption[] = [
  { value: 'react',    label: 'React' },
  { value: 'vue',      label: 'Vue' },
  { value: 'angular',  label: 'Angular' },
  { value: 'svelte',   label: 'Svelte' },
  { value: 'solid',    label: 'SolidJS' },
  { value: 'preact',   label: 'Preact' },
  { value: 'qwik',     label: 'Qwik' },
  { value: 'ember',    label: 'Ember', disabled: true },
  { value: 'backbone', label: 'Backbone', disabled: true },
]

const meta: Meta<typeof DropdownTypehead> = {
  title: 'Components/Dropdown/Typehead',
  component: DropdownTypehead,
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
type Story = StoryObj<typeof DropdownTypehead>

const defaults = {
  options:     LONG_OPTIONS,
  label:       'Framework',
  showLabel:   true,
  placeholder: 'Search…',
}

export const Default: Story = { args: { ...defaults } }

export const WithValue: Story = {
  args: { ...defaults, value: 'react' },
}

export const WithFieldnote: Story = {
  args: { ...defaults, showFieldnote: true, fieldnote: 'Type to filter results.' },
}

export const ErrorState: Story = {
  args: { ...defaults, state: 'error', errorText: 'Please select a framework.' },
}

export const WarningState: Story = {
  args: { ...defaults, state: 'warning', warningText: 'Selected framework is deprecated.' },
}

export const Disabled: Story = {
  args: { ...defaults, state: 'disabled' },
}

export const DisabledWithValue: Story = {
  args: { ...defaults, state: 'disabled', value: 'vue' },
}

export const Loading: Story = {
  args: { ...defaults, state: 'loading', showFieldnote: true },
}

export const Small: Story = { args: { ...defaults, size: 'small' } }
export const Medium: Story = { args: { ...defaults, size: 'medium' } }

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: 13, color: '#4d5761' }}>
          Selected: <strong>{value || '(none)'}</strong>
        </div>
        <DropdownTypehead
          options={LONG_OPTIONS}
          label="Framework"
          placeholder="Search frameworks…"
          value={value}
          onChange={setValue}
          showFieldnote
          fieldnote="Type to search, click to select"
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
                  <DropdownTypehead
                    options={LONG_OPTIONS}
                    label="Framework"
                    placeholder="Search…"
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
