import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import '../../tokens/tokens.css'
import { SideNavigation } from './SideNavigation'

const meta: Meta<typeof SideNavigation> = {
  title: 'Components/SideNavigation',
  component: SideNavigation,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['expanded', 'collapsed'] },
    activeItem: {
      control: 'select',
      options: [
        'home', 'analytics', 'reports',
        'messages', 'projects', 'calendar', 'files-library', 'campaign',
        'team', 'clients', 'integrations',
        'support', 'settings',
      ],
    },
    userName:  { control: 'text' },
    userEmail: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof SideNavigation>

export const Expanded: Story = {
  args: { variant: 'expanded', activeItem: 'home' },
}

export const Collapsed: Story = {
  args: { variant: 'collapsed', activeItem: 'home' },
}

export const ActiveMessages: Story = {
  args: { variant: 'expanded', activeItem: 'messages' },
}

export const Interactive: Story = {
  render: (args) => {
    const [active, setActive] = useState(args.activeItem ?? 'home')
    return <SideNavigation {...args} activeItem={active} onNavItemClick={setActive} />
  },
  args: { variant: 'expanded', activeItem: 'home' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Expanded</div>
        <SideNavigation variant="expanded" activeItem="home" />
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Collapsed</div>
        <SideNavigation variant="collapsed" activeItem="home" />
      </div>
    </div>
  ),
}
