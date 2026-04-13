import type { Meta, StoryObj } from '@storybook/react'
import '../../tokens/tokens.css'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  argTypes: {
    variant:     { control: 'select', options: ['primary','secondary','default','symbol'] },
    size:        { control: 'select', options: ['small','medium','large'] },
    shape:       { control: 'select', options: ['square','round'] },
    destructive: { control: 'boolean' },
    disabled:    { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof IconButton>

export const Primary:            Story = { args: { variant: 'primary',   size: 'medium', shape: 'square' } }
export const Secondary:          Story = { args: { variant: 'secondary', size: 'medium', shape: 'square' } }
export const Default:            Story = { args: { variant: 'default',   size: 'medium', shape: 'square' } }
export const Symbol:             Story = { args: { variant: 'symbol',    size: 'medium', shape: 'square' } }
export const Round:              Story = { args: { variant: 'primary',   size: 'medium', shape: 'round'  } }
export const DestructivePrimary: Story = { args: { variant: 'primary',   size: 'medium', destructive: true } }
export const Disabled:           Story = { args: { variant: 'primary',   size: 'medium', disabled: true } }
export const DestructiveDisabled:Story = { args: { variant: 'primary',   size: 'medium', destructive: true, disabled: true } }

// Full matrix — rows: sizes | cols: variants + disabled | divider | destructive variants + disabled
// Repeated for square and round shapes
export const FullMatrix: Story = {
  render: () => {
    const variants            = ['primary','secondary','default','symbol'] as const
    const destructiveVariants = ['primary','secondary','symbol'] as const
    const sizes               = ['large','medium','small'] as const
    const shapes              = ['square','round'] as const

    return (
      <div style={{ display:'flex', flexDirection:'column', gap:40, padding:32, fontFamily:'Inter,sans-serif' }}>
        {shapes.map(shape => (
          <div key={shape}>
            <div style={{ fontSize:10, fontWeight:700, color:'#9da3af', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:16 }}>{shape}</div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {sizes.map(size => (
                <div key={size} style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <span style={{ fontSize:10, color:'#9da3af', width:44, flexShrink:0 }}>{size}</span>

                  {/* Non-destructive */}
                  {variants.map(v => (
                    <IconButton key={v} variant={v} size={size} shape={shape} />
                  ))}
                  {/* Non-destructive disabled */}
                  <IconButton variant="primary" size={size} shape={shape} disabled />

                  <div style={{ width:1, height:20, background:'#e5e7eb', margin:'0 4px' }} />

                  {/* Destructive */}
                  {destructiveVariants.map(v => (
                    <IconButton key={`d-${v}`} variant={v} size={size} shape={shape} destructive />
                  ))}
                  {/* Destructive disabled */}
                  <IconButton variant="primary" size={size} shape={shape} destructive disabled />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}
