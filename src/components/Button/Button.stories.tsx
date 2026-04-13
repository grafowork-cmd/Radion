import type { Meta, StoryObj } from '@storybook/react'
import '../../tokens/tokens.css'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant:     { control: 'select', options: ['primary','secondary','outlined','text','text-secondary','default'] },
    size:        { control: 'select', options: ['small','medium','large'] },
    destructive: { control: 'boolean' },
    disabled:    { control: 'boolean' },
    iconLeft:    { control: 'boolean' },
    iconRight:   { control: 'boolean' },
    children:    { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary:        Story = { args: { variant: 'primary',   size: 'large', iconLeft: true, iconRight: true } }
export const Secondary:      Story = { args: { variant: 'secondary', size: 'large', iconLeft: true, iconRight: true } }
export const Outlined:       Story = { args: { variant: 'outlined',  size: 'large', iconLeft: true, iconRight: true } }
export const Text:           Story = { args: { variant: 'text',           size: 'large', iconLeft: true, iconRight: true } }
export const TextSecondary:  Story = { args: { variant: 'text-secondary', size: 'large', iconLeft: true, iconRight: true } }
export const Default:        Story = { args: { variant: 'default',        size: 'large', iconLeft: true, iconRight: true } }
export const DestructivePrimary: Story = { args: { variant: 'primary', size: 'large', destructive: true, iconLeft: true, iconRight: true } }
export const DestructiveDisabled: Story = { args: { variant: 'primary', size: 'large', destructive: true, disabled: true, iconLeft: true, iconRight: true } }
export const NonDestructiveDisabled: Story = { args: { variant: 'primary', size: 'large', disabled: true, iconLeft: true, iconRight: true } }

// Full matrix — matches Figma layout exactly
// Rows: Large / Medium / Small
// Cols: Primary / Secondary / Outlined / Text / Default | same 5 destructive | disabled
export const FullMatrix: Story = {
  render: () => {
    const variants             = ['primary','secondary','outlined','text','text-secondary','default'] as const
    const destructiveVariants  = ['primary','secondary','outlined','text','default'] as const
    const sizes    = ['large','medium','small'] as const
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:24, padding:32, fontFamily:'Inter,sans-serif' }}>
        {sizes.map(size => (
          <div key={size}>
            <div style={{ fontSize:10, fontWeight:700, color:'#9da3af', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:10 }}>{size}</div>
            <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
              {/* Non-destructive */}
              {variants.map(v => (
                <Button key={v} variant={v} size={size} iconLeft iconRight>Button</Button>
              ))}
              {/* Disabled non-destructive */}
              <Button variant="primary" size={size} disabled iconLeft iconRight>Button</Button>

              <div style={{ width:1, height:32, background:'#e5e7eb', margin:'0 4px' }} />

              {/* Destructive */}
              {destructiveVariants.map(v => (
                <Button key={`d-${v}`} variant={v} size={size} destructive iconLeft iconRight>Button</Button>
              ))}
              {/* Disabled destructive — stays red-tinted */}
              <Button variant="primary" size={size} destructive disabled iconLeft iconRight>Button</Button>
            </div>
          </div>
        ))}
      </div>
    )
  },
}
