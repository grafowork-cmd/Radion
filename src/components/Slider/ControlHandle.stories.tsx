import type { Meta, StoryObj } from '@storybook/react'
import '../../tokens/tokens.css'
import { ControlHandle } from './ControlHandle'

const meta: Meta<typeof ControlHandle> = {
  title: 'Components/Slider/ControlHandle',
  component: ControlHandle,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['x-small', 'small', 'medium', 'large'] },
    state: { control: 'select', options: ['default', 'hover', 'pressed', 'disabled'] },
    showValue: { control: 'boolean' },
    value: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof ControlHandle>

// ── Individual states ─────────────────────────────────────────

export const Default: Story = {
  args: { size: 'small', state: 'default', value: '20%' },
}

export const Hover: Story = {
  args: { size: 'small', state: 'hover', value: '20%' },
}

export const Pressed: Story = {
  args: {
    size: 'small',
    state: 'pressed',
    value: '20%',
    tooltipLeft: 'Default Label',
    tooltipRight: 'Default Label',
  },
}

export const Disabled: Story = {
  args: { size: 'small', state: 'disabled', value: '20%' },
}

export const MediumDefault: Story = {
  args: { size: 'medium', state: 'default', value: '20%' },
}

export const LargeDefault: Story = {
  args: { size: 'large', state: 'default', value: '20%' },
}

// ── Full matrix: sizes × states ───────────────────────────────
export const FullMatrix: Story = {
  render: () => {
    const sizes = ['x-small', 'small', 'medium', 'large'] as const
    const states = ['default', 'hover', 'pressed', 'disabled'] as const

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 48,
          padding: '64px 32px 32px',
          fontFamily: 'Inter, sans-serif',
          background: '#f9fafb',
          minWidth: 600,
        }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', gap: 0 }}>
          <div style={{ width: 80 }} />
          {sizes.map(size => (
            <div
              key={size}
              style={{
                flex: 1,
                fontSize: 10,
                fontWeight: 700,
                color: '#9da3af',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              {size.replace('-', '\u2011')}
            </div>
          ))}
        </div>

        {/* State rows */}
        {states.map(state => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {/* Row label */}
            <div
              style={{
                width: 80,
                fontSize: 10,
                fontWeight: 700,
                color: '#9da3af',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {state}
            </div>

            {/* One handle per size */}
            {sizes.map(size => (
              <div
                key={size}
                style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
              >
                <ControlHandle
                  size={size}
                  state={state}
                  value="20%"
                  tooltipLeft="Default Label"
                  tooltipRight="Default Label"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  },
}
