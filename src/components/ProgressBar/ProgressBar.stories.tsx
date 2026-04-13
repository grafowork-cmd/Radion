import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import '../../tokens/tokens.css'
import { ProgressBar } from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'centered' },
  argTypes: {
    value:           { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size:            { control: 'select', options: ['large', 'medium', 'small'] },
    position:        { control: 'select', options: ['top', 'center', 'bottom'] },
    label:           { control: 'text' },
    description:     { control: 'text' },
    showLabel:       { control: 'boolean' },
    showPercentage:  { control: 'boolean' },
    showDescription: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof ProgressBar>

// ── Basic stories ─────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { value: 50, size: 'large', position: 'top' },
}

export const Empty: Story = {
  args: { value: 0, size: 'large', position: 'top' },
}

export const Complete: Story = {
  args: { value: 100, size: 'large', position: 'top' },
}

// ── Positions ─────────────────────────────────────────────────────────────────

export const PositionTop: Story = {
  args: { value: 60, size: 'large', position: 'top' },
}

export const PositionCenter: Story = {
  args: { value: 60, size: 'large', position: 'center' },
}

export const PositionBottom: Story = {
  args: { value: 60, size: 'large', position: 'bottom' },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 380 }}>
      {(['large', 'medium', 'small'] as const).map(size => (
        <div key={size}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9da4ae', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{size}</div>
          <ProgressBar value={60} size={size} position="top" />
        </div>
      ))}
    </div>
  ),
}

// ── All Variants matrix ───────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, width: 380 }}>
      {(['top', 'center', 'bottom'] as const).map(position => (
        <div key={position}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9da4ae', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            Position: {position}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {([0, 25, 50, 75, 100] as const).map(v => (
              <ProgressBar key={v} value={v} size="large" position={position} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ── Interactive ───────────────────────────────────────────────────────────────

export const Interactive: Story = {
  args: {
    value: 65,
    size: 'large',
    position: 'top',
    label: 'Progress Bar Label',
    description: 'Description goes here',
    showLabel: true,
    showPercentage: true,
    showDescription: true,
  },
  decorators: [(Story) => (
    <div style={{ width: 380 }}>
      <Story />
    </div>
  )],
}
