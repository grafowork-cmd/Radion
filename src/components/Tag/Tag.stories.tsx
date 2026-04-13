import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import '../../tokens/tokens.css'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  argTypes: {
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    action:  { control: 'select', options: ['text-only', 'x-close', 'count'] },
    icon:    { control: 'select', options: ['none', 'dot'] },
    onClose: { control: false },
    onCheck: { control: false },
  },
}
export default meta
type Story = StoryObj<typeof Tag>

// ── Basic variants ────────────────────────────────────────────

export const Default: Story = {
  args: { size: 'md', action: 'text-only', label: 'Label' },
}

export const WithClose: Story = {
  name: 'With X Close',
  args: { size: 'md', action: 'x-close', label: 'Label' },
}

export const WithCount: Story = {
  name: 'With Count',
  args: { size: 'md', action: 'count', label: 'Label', count: 5 },
}

export const WithDot: Story = {
  name: 'With Dot',
  args: { size: 'md', action: 'text-only', icon: 'dot', label: 'Label' },
}

export const WithCheckbox: Story = {
  name: 'With Checkbox',
  args: { size: 'md', action: 'text-only', checkbox: true, label: 'Label' },
}

export const CheckboxAndDot: Story = {
  name: 'Checkbox + Dot',
  args: { size: 'md', action: 'text-only', checkbox: true, icon: 'dot', label: 'Label' },
}

// ── Sizes ─────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Size / Small',
  args: { size: 'sm', action: 'text-only', label: 'Label' },
}

export const SizeMedium: Story = {
  name: 'Size / Medium',
  args: { size: 'md', action: 'text-only', label: 'Label' },
}

export const SizeLarge: Story = {
  name: 'Size / Large',
  args: { size: 'lg', action: 'text-only', label: 'Label' },
}

// ── Controlled checkbox ───────────────────────────────────────

export const ControlledCheckbox: Story = {
  name: 'Controlled Checkbox',
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: 13, color: '#4d5761' }}>
          Checked: <strong>{String(checked)}</strong>
        </div>
        <Tag
          size="md"
          action="text-only"
          checkbox
          checked={checked}
          onCheck={setChecked}
          label="Click checkbox"
        />
      </div>
    )
  },
}

// ── Full matrix ───────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => {
    const sizes    = ['sm', 'md', 'lg'] as const
    const actions  = ['text-only', 'x-close', 'count'] as const
    const icons    = ['none', 'dot'] as const

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 24, fontFamily: 'Inter, sans-serif' }}>

        {/* Sizes × Actions */}
        <section>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
            Sizes × Actions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sizes.map(size => (
              <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 20, fontSize: 11, color: '#9da3af', fontWeight: 600 }}>{size}</span>
                {actions.map(action => (
                  <Tag key={action} size={size} action={action} label="Label" count={5} />
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* With dot */}
        <section>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
            With Dot Icon
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sizes.map(size => (
              <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 20, fontSize: 11, color: '#9da3af', fontWeight: 600 }}>{size}</span>
                {actions.map(action => (
                  <Tag key={action} size={size} action={action} icon="dot" label="Label" count={5} />
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* With checkbox */}
        <section>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
            With Checkbox
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sizes.map(size => (
              <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 20, fontSize: 11, color: '#9da3af', fontWeight: 600 }}>{size}</span>
                {icons.map(icon => (
                  <Tag key={icon} size={size} action="text-only" checkbox icon={icon} label="Label" />
                ))}
                <Tag size={size} action="text-only" checkbox defaultChecked label="Checked" />
              </div>
            ))}
          </div>
        </section>

      </div>
    )
  },
}
