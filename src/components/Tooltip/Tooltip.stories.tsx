import type { Meta, StoryObj } from '@storybook/react'
import '../../tokens/tokens.css'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'dual-text', 'comprehensive'],
    },
    direction: {
      control: 'select',
      options: [
        'top-left', 'top-middle', 'top-right',
        'bottom-left', 'bottom-middle', 'bottom-right',
        'left', 'right',
      ],
    },
    content:       { control: false },
    onButtonClick: { control: false },
  },
}
export default meta
type Story = StoryObj<typeof Tooltip>

// ── Default type ──────────────────────────────────────────────

export const DefaultBottomLeft: Story = {
  name: 'Default / Bottom Left',
  args: { type: 'default', direction: 'bottom-left', label: 'Default Label' },
}

export const DefaultBottomMiddle: Story = {
  name: 'Default / Bottom Middle',
  args: { type: 'default', direction: 'bottom-middle', label: 'Default Label' },
}

export const DefaultBottomRight: Story = {
  name: 'Default / Bottom Right',
  args: { type: 'default', direction: 'bottom-right', label: 'Default Label' },
}

export const DefaultTopLeft: Story = {
  name: 'Default / Top Left',
  args: { type: 'default', direction: 'top-left', label: 'Default Label' },
}

export const DefaultTopMiddle: Story = {
  name: 'Default / Top Middle',
  args: { type: 'default', direction: 'top-middle', label: 'Default Label' },
}

export const DefaultTopRight: Story = {
  name: 'Default / Top Right',
  args: { type: 'default', direction: 'top-right', label: 'Default Label' },
}

export const DefaultLeft: Story = {
  name: 'Default / Left',
  args: { type: 'default', direction: 'left', label: 'Default Label' },
}

export const DefaultRight: Story = {
  name: 'Default / Right',
  args: { type: 'default', direction: 'right', label: 'Default Label' },
}

// ── Dual Text type ────────────────────────────────────────────

export const DualTextBottomLeft: Story = {
  name: 'Dual Text / Bottom Left',
  args: { type: 'dual-text', direction: 'bottom-left', label: 'Default Label', labelRight: 'Default Label' },
}

export const DualTextBottomMiddle: Story = {
  name: 'Dual Text / Bottom Middle',
  args: { type: 'dual-text', direction: 'bottom-middle', label: 'Default Label', labelRight: 'Default Label' },
}

export const DualTextTopLeft: Story = {
  name: 'Dual Text / Top Left',
  args: { type: 'dual-text', direction: 'top-left', label: 'Default Label', labelRight: 'Default Label' },
}

export const DualTextLeft: Story = {
  name: 'Dual Text / Left',
  args: { type: 'dual-text', direction: 'left', label: 'Default Label', labelRight: 'Default Label' },
}

export const DualTextRight: Story = {
  name: 'Dual Text / Right',
  args: { type: 'dual-text', direction: 'right', label: 'Default Label', labelRight: 'Default Label' },
}

// ── Comprehensive type ────────────────────────────────────────

const sampleContent = (
  <div style={{
    background: '#e5e7eb',
    border: '1px dashed #111927',
    borderRadius: 4,
    padding: 10,
    fontSize: 12,
    lineHeight: '16px',
    color: '#111927',
    fontFamily: 'Inter, sans-serif',
  }}>
    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Placeholder</div>
    This is a placeholder slot. Swap this with any component.
  </div>
)

export const ComprehensiveBottomLeft: Story = {
  name: 'Comprehensive / Bottom Left',
  args: {
    type: 'comprehensive',
    direction: 'bottom-left',
    title: 'Default Label',
    content: sampleContent,
    showButton: true,
    buttonLabel: 'Button',
  },
}

export const ComprehensiveBottomMiddle: Story = {
  name: 'Comprehensive / Bottom Middle',
  args: {
    type: 'comprehensive',
    direction: 'bottom-middle',
    title: 'Default Label',
    content: sampleContent,
    showButton: true,
    buttonLabel: 'Button',
  },
}

export const ComprehensiveTopRight: Story = {
  name: 'Comprehensive / Top Right',
  args: {
    type: 'comprehensive',
    direction: 'top-right',
    title: 'Default Label',
    content: sampleContent,
    showButton: true,
    buttonLabel: 'Button',
  },
}

export const ComprehensiveLeft: Story = {
  name: 'Comprehensive / Left',
  args: {
    type: 'comprehensive',
    direction: 'left',
    title: 'Default Label',
    content: sampleContent,
    showButton: true,
    buttonLabel: 'Button',
  },
}

export const ComprehensiveRight: Story = {
  name: 'Comprehensive / Right',
  args: {
    type: 'comprehensive',
    direction: 'right',
    title: 'Default Label',
    content: sampleContent,
    showButton: true,
    buttonLabel: 'Button',
  },
}

export const ComprehensiveNoButton: Story = {
  name: 'Comprehensive / No Button',
  args: {
    type: 'comprehensive',
    direction: 'bottom-left',
    title: 'Default Label',
    content: sampleContent,
    showButton: false,
  },
}

// ── All directions grid ───────────────────────────────────────

export const AllDirections: Story = {
  name: 'All Directions',
  render: () => {
    const directions = [
      'top-left', 'top-middle', 'top-right',
      'bottom-left', 'bottom-middle', 'bottom-right',
      'left', 'right',
    ] as const
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, padding: 64, fontFamily: 'Inter, sans-serif', alignItems: 'flex-start' }}>
        {directions.map(dir => (
          <div key={dir} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 10, color: '#9da3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{dir}</span>
            <Tooltip type="default" direction={dir} label="Default Label" />
          </div>
        ))}
      </div>
    )
  },
}

export const AllTypes: Story = {
  name: 'All Types',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, padding: 64, fontFamily: 'Inter, sans-serif', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, color: '#9da3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Default</span>
        <Tooltip type="default" direction="bottom-left" label="Default Label" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, color: '#9da3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Dual Text</span>
        <Tooltip type="dual-text" direction="bottom-left" label="Default Label" labelRight="Default Label" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, color: '#9da3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Comprehensive</span>
        <Tooltip
          type="comprehensive"
          direction="bottom-left"
          title="Default Label"
          content={
            <div style={{
              background: '#e5e7eb', border: '1px dashed #111927', borderRadius: 4,
              padding: 10, fontSize: 12, lineHeight: '16px', color: '#111927', fontFamily: 'Inter, sans-serif',
            }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Placeholder</div>
              This is a placeholder slot. Swap this with any component.
            </div>
          }
          showButton
          buttonLabel="Button"
        />
      </div>
    </div>
  ),
}
