import type { Meta, StoryObj } from '@storybook/react'
import '../../tokens/tokens.css'
import { Badge } from './Badge'
import type { BadgeType, BadgeStyle, BadgeShape, BadgeSize } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'padded' },
  argTypes: {
    type:       { control: 'select', options: ['default', 'success', 'warning', 'error', 'information', 'disabled'] },
    badgeStyle: { control: 'select', options: ['filled', 'outlined'] },
    shape:      { control: 'select', options: ['rounded', 'pill'] },
    size:       { control: 'select', options: ['small', 'medium', 'large', 'x-large'] },
    label:      { control: 'text' },
    showLeftIcon:  { control: 'boolean' },
    showRightIcon: { control: 'boolean' },
    showCount:     { control: 'boolean' },
    count:         { control: 'text' },
    leftIcon:  { control: false },
    rightIcon: { control: false },
    onClick:   { control: false },
  },
}
export default meta
type Story = StoryObj<typeof Badge>

// ── Basic variants ────────────────────────────────────────────

export const Default: Story = {
  args: { label: 'Badge Label', type: 'default', badgeStyle: 'filled', shape: 'rounded', size: 'medium' },
}

export const Success: Story = {
  args: { label: 'Badge Label', type: 'success', badgeStyle: 'filled', size: 'medium' },
}

export const Warning: Story = {
  args: { label: 'Badge Label', type: 'warning', badgeStyle: 'filled', size: 'medium' },
}

export const Error: Story = {
  args: { label: 'Badge Label', type: 'error', badgeStyle: 'filled', size: 'medium' },
}

export const Information: Story = {
  args: { label: 'Badge Label', type: 'information', badgeStyle: 'filled', size: 'medium' },
}

export const Disabled: Story = {
  args: { label: 'Badge Label', type: 'disabled', badgeStyle: 'filled', size: 'medium' },
}

// ── With icons + count ────────────────────────────────────────

export const WithLeftIcon: Story = {
  args: { label: 'Badge Label', type: 'success', badgeStyle: 'filled', size: 'medium', showLeftIcon: true },
}

export const WithBothIcons: Story = {
  args: { label: 'Badge Label', type: 'error', badgeStyle: 'filled', size: 'medium', showLeftIcon: true, showRightIcon: true },
}

export const WithCount: Story = {
  args: { label: 'Badge Label', type: 'default', badgeStyle: 'filled', size: 'medium', showLeftIcon: true, showRightIcon: true, showCount: true, count: '99+' },
}

export const Outlined: Story = {
  args: { label: 'Badge Label', type: 'default', badgeStyle: 'outlined', size: 'medium' },
}

export const Pill: Story = {
  args: { label: 'Badge Label', type: 'success', badgeStyle: 'filled', shape: 'pill', size: 'medium', showLeftIcon: true },
}

export const Interactive: Story = {
  args: { label: 'Clickable', type: 'information', badgeStyle: 'filled', size: 'medium', showLeftIcon: true, onClick: () => alert('clicked') },
}

// ── Full matrix ───────────────────────────────────────────────

export const FullMatrix: Story = {
  render: () => {
    const types: BadgeType[]   = ['default', 'success', 'warning', 'error', 'information', 'disabled']
    const styles: BadgeStyle[] = ['filled', 'outlined']
    const sizes: BadgeSize[]   = ['small', 'medium', 'large', 'x-large']
    const shapes: BadgeShape[] = ['rounded', 'pill']

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 32, fontFamily: 'Inter, sans-serif' }}>
        {shapes.map(shape => (
          <section key={shape}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>
              Shape: {shape}
            </div>

            {styles.map(badgeStyle => (
              <div key={badgeStyle} style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#c4c9d4', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                  Style: {badgeStyle}
                </div>

                {sizes.map(size => (
                  <div key={size} style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 10, color: '#c4c9d4', marginBottom: 8 }}>{size}</div>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                      {types.map(type => (
                        <Badge
                          key={type}
                          label="Badge Label"
                          type={type}
                          badgeStyle={badgeStyle}
                          shape={shape}
                          size={size}
                          showLeftIcon
                          showRightIcon
                          showCount
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </section>
        ))}
      </div>
    )
  },
}
