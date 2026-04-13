import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import '../../tokens/tokens.css'
import { Breadcrumb } from './Breadcrumb'

const ITEMS = [
  { label: 'Home',        href: '#' },
  { label: 'Products',    href: '#' },
  { label: 'Electronics', href: '#' },
  { label: 'Laptops' },
]

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'centered' },
  argTypes: {
    type:      { control: 'select', options: ['default', 'icon'] },
    style:     { control: 'select', options: ['link', 'box', 'outlined', 'filled'] },
    indicator: { control: 'select', options: ['chevron', 'slash', 'dot', 'arrow'] },
  },
}
export default meta
type Story = StoryObj<typeof Breadcrumb>

// ── Basic ─────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { items: ITEMS, type: 'default', style: 'link', indicator: 'chevron' },
}

export const WithIcon: Story = {
  args: { items: ITEMS, type: 'icon', style: 'link', indicator: 'chevron' },
}

// ── Styles ────────────────────────────────────────────────────────────────────

export const BoxStyle: Story = {
  args: { items: ITEMS, type: 'default', style: 'box', indicator: 'chevron' },
}

export const OutlinedStyle: Story = {
  args: { items: ITEMS, type: 'default', style: 'outlined', indicator: 'chevron' },
}

export const FilledStyle: Story = {
  args: { items: ITEMS, type: 'default', style: 'filled', indicator: 'chevron' },
}

// ── Indicators ────────────────────────────────────────────────────────────────

export const SlashIndicator: Story = {
  args: { items: ITEMS, type: 'default', style: 'link', indicator: 'slash' },
}

export const DotIndicator: Story = {
  args: { items: ITEMS, type: 'default', style: 'link', indicator: 'dot' },
}

export const ArrowIndicator: Story = {
  args: { items: ITEMS, type: 'default', style: 'link', indicator: 'arrow' },
}

// ── All Variants ──────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => {
    const styles    = ['link', 'box', 'outlined', 'filled'] as const
    const indicators = ['chevron', 'slash', 'dot', 'arrow'] as const
    const types     = ['default', 'icon'] as const

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {types.map(type => (
          <div key={type}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9da4ae', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
              Type: {type}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {styles.map(style => (
                <div key={style} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#c5c9d0', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {style}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {indicators.map(indicator => (
                      <Breadcrumb
                        key={indicator}
                        items={ITEMS}
                        type={type}
                        style={style}
                        indicator={indicator}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

// ── Disabled item ─────────────────────────────────────────────────────────────

export const WithDisabledItem: Story = {
  args: {
    items: [
      { label: 'Home',        href: '#' },
      { label: 'Products',    href: '#', disabled: true },
      { label: 'Electronics', href: '#' },
      { label: 'Laptops' },
    ],
    type:      'default',
    style:     'link',
    indicator: 'chevron',
  },
}

// ── Interactive ───────────────────────────────────────────────────────────────

export const Interactive: Story = {
  args: {
    items:     ITEMS,
    type:      'default',
    style:     'link',
    indicator: 'chevron',
  },
}
