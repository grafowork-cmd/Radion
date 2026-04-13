import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import '../../tokens/tokens.css'
import { DatePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  argTypes: {
    mode:           { control: 'select', options: ['single', 'range'] },
    showInput:      { control: 'boolean' },
    showTimePicker: { control: 'boolean' },
    showActions:    { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof DatePicker>

// ── Single Date ───────────────────────────────────────────────────────────────

export const SingleDate: Story = {
  args: {
    mode:        'single',
    showInput:   true,
    showActions: true,
  },
}

// ── Date Range ────────────────────────────────────────────────────────────────

export const DateRange: Story = {
  args: {
    mode:        'range',
    showInput:   true,
    showActions: true,
  },
}

// ── With Pre-selected Date ─────────────────────────────────────────────────────

export const WithPreselected: Story = {
  args: {
    mode:        'single',
    value:       new Date(2025, 0, 15),   // Jan 15 2025
    showInput:   true,
    showActions: true,
  },
}

// ── With Time Picker ──────────────────────────────────────────────────────────

export const WithTimePicker: Story = {
  args: {
    mode:           'single',
    showInput:      true,
    showTimePicker: true,
    showActions:    true,
  },
}

// ── No Input ──────────────────────────────────────────────────────────────────

export const CalendarOnly: Story = {
  args: {
    mode:        'single',
    showInput:   false,
    showActions: false,
  },
}

// ── Range With Pre-selected Dates ─────────────────────────────────────────────

export const RangePreselected: Story = {
  args: {
    mode:        'range',
    startDate:   new Date(2025, 0, 8),    // Jan 8
    endDate:     new Date(2025, 0, 21),   // Jan 21
    showInput:   true,
    showActions: true,
  },
}

// ── All Variants ──────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9da4ae', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
          Single Date
        </div>
        <DatePicker mode="single" showInput showActions />
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9da4ae', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
          Date Range
        </div>
        <DatePicker mode="range" showInput showActions />
      </div>
    </div>
  ),
}

// ── Interactive ───────────────────────────────────────────────────────────────

export const Interactive: Story = {
  args: {
    mode:           'single',
    showInput:      true,
    showTimePicker: false,
    showActions:    true,
  },
  decorators: [(Story) => (
    <div style={{ width: 360, padding: 24, background: '#f9fafb', borderRadius: 12 }}>
      <Story />
    </div>
  )],
}
