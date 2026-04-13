import type { Meta, StoryObj } from '@storybook/react'
import '../../tokens/tokens.css'
import { ButtonGroup, ButtonGroupItem } from './ButtonGroup'

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
}
export default meta
type Story = StoryObj<typeof ButtonGroup>

// ── Individual stories ────────────────────────────────────────
export const Default: Story = {
  args: { size: 'medium' },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
      <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
      <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
    </ButtonGroup>
  ),
}

export const WithDisabled: Story = {
  args: { size: 'medium' },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
      <ButtonGroupItem iconLeft iconRight disabled>Button</ButtonGroupItem>
      <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
    </ButtonGroup>
  ),
}

export const TwoItems: Story = {
  args: { size: 'medium' },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
      <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
    </ButtonGroup>
  ),
}

export const SingleItem: Story = {
  args: { size: 'medium' },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
    </ButtonGroup>
  ),
}

// ── Full matrix — sizes × states ─────────────────────────────
export const FullMatrix: Story = {
  render: () => {
    const sizes = ['large', 'medium', 'small'] as const
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 32, fontFamily: 'Inter, sans-serif' }}>
        {sizes.map(size => (
          <div key={size}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{size}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

              {/* Default */}
              <ButtonGroup size={size}>
                <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
                <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
                <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
              </ButtonGroup>

              {/* Hover — shown via CSS in browser, here we render same */}
              <ButtonGroup size={size}>
                <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
                <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
                <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
              </ButtonGroup>

              {/* Disabled */}
              <ButtonGroup size={size}>
                <ButtonGroupItem iconLeft iconRight disabled>Button</ButtonGroupItem>
                <ButtonGroupItem iconLeft iconRight disabled>Button</ButtonGroupItem>
                <ButtonGroupItem iconLeft iconRight disabled>Button</ButtonGroupItem>
              </ButtonGroup>

              {/* Mixed disabled */}
              <ButtonGroup size={size}>
                <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
                <ButtonGroupItem iconLeft iconRight disabled>Button</ButtonGroupItem>
                <ButtonGroupItem iconLeft iconRight>Button</ButtonGroupItem>
              </ButtonGroup>

            </div>
          </div>
        ))}
      </div>
    )
  },
}
