import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import '../../tokens/tokens.css'
import { Slider } from './Slider'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider/Slider',
  component: Slider,
  parameters: { layout: 'padded' },
  argTypes: {
    type: { control: 'select', options: ['website', 'mobile'] },
    handleSize: { control: 'select', options: ['x-small', 'small', 'medium', 'large'] },
    min: { control: 'number' },
    max: { control: 'number' },
    defaultValue: { control: 'number' },
    disabled: { control: 'boolean' },
    errorMessage: { control: 'text' },
    label: { control: 'text' },
    leftLabel: { control: 'text' },
    rightLabel: { control: 'text' },
    leftSlot: { control: false },
    rightSlot: { control: false },
    onChange: { control: false },
    formatValue: { control: false },
  },
}
export default meta
type Story = StoryObj<typeof Slider>

// ── Basic variants ────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Slider Name',
    leftLabel: 'Descriptions',
    rightLabel: 'Description',
    defaultValue: 50,
    type: 'website',
  },
}

export const Error: Story = {
  args: {
    label: 'Slider Name',
    leftLabel: 'Descriptions',
    rightLabel: 'Description',
    defaultValue: 50,
    type: 'website',
    errorMessage: 'Error message written here',
  },
}

export const Focused: Story = {
  args: {
    label: 'Slider Name',
    leftLabel: 'Descriptions',
    rightLabel: 'Description',
    defaultValue: 50,
    type: 'website',
    focused: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Slider Name',
    leftLabel: 'Descriptions',
    rightLabel: 'Description',
    defaultValue: 50,
    type: 'website',
    disabled: true,
  },
}

export const Mobile: Story = {
  args: {
    label: 'Slider Name',
    leftLabel: 'Descriptions',
    rightLabel: 'Description',
    defaultValue: 30,
    type: 'mobile',
  },
}

export const MobileError: Story = {
  args: {
    label: 'Slider Name',
    leftLabel: 'Descriptions',
    rightLabel: 'Description',
    defaultValue: 30,
    type: 'mobile',
    errorMessage: 'Error message written here',
  },
}

export const MobileDisabled: Story = {
  args: {
    label: 'Slider Name',
    leftLabel: 'Descriptions',
    rightLabel: 'Description',
    defaultValue: 30,
    type: 'mobile',
    disabled: true,
  },
}

// ── Controlled ───────────────────────────────────────────────
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(25)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 13, color: '#4d5761', fontFamily: 'Inter, sans-serif' }}>
          Value: <strong>{value}%</strong>
        </div>
        <Slider
          label="Controlled Slider"
          leftLabel="Min"
          rightLabel="Max"
          value={value}
          onChange={setValue}
          type="website"
        />
      </div>
    )
  },
}

// ── Full matrix ───────────────────────────────────────────────
export const FullMatrix: Story = {
  render: () => {
    const states: Array<{
      label: string
      props: Partial<React.ComponentProps<typeof Slider>>
    }> = [
      { label: 'Default', props: { defaultValue: 50 } },
      { label: 'Focus',   props: { defaultValue: 50, focused: true } },
      { label: 'Error',   props: { defaultValue: 50, errorMessage: 'Error message written here' } },
      { label: 'Disabled',props: { defaultValue: 50, disabled: true } },
    ]

    const handleSizes = ['x-small', 'small', 'medium', 'large'] as const

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 32, fontFamily: 'Inter, sans-serif' }}>
        {handleSizes.map(size => (
          <section key={size}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
              Handle: {size}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {states.map(({ label, props }) => (
                <div key={label}>
                  <div style={{ fontSize: 11, color: '#9da3af', marginBottom: 8, fontWeight: 500 }}>{label}</div>
                  <Slider
                    label="Slider Name"
                    leftLabel="Descriptions"
                    rightLabel="Description"
                    type="website"
                    handleSize={size}
                    {...props}
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
