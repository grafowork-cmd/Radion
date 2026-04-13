import type { Meta, StoryObj } from '@storybook/react'
import '../../tokens/tokens.css'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
  argTypes: {
    state: { control: 'select', options: ['default', 'success', 'warning', 'error'] },
    title: { control: 'text' },
    description: { control: 'text' },
    dismissable: { control: 'boolean' },
    showActions: { control: 'boolean' },
    link: { control: 'boolean' },
    linkLabel: { control: 'text' },
    primaryLabel: { control: 'text' },
    secondaryLabel: { control: 'text' },
    onDismiss: { control: false },
    onLinkClick: { control: false },
    onPrimaryClick: { control: false },
    onSecondaryClick: { control: false },
  },
}
export default meta
type Story = StoryObj<typeof Toast>

const defaultTitle = 'All servers are now up and running again!'
const defaultDescription = 'Description text'

// ── Basic states ──────────────────────────────────────────────

export const Default: Story = {
  args: {
    state: 'default',
    title: defaultTitle,
    dismissable: true,
  },
}

export const Success: Story = {
  args: {
    state: 'success',
    title: defaultTitle,
    dismissable: true,
  },
}

export const Warning: Story = {
  args: {
    state: 'warning',
    title: defaultTitle,
    dismissable: true,
  },
}

export const Error: Story = {
  args: {
    state: 'error',
    title: defaultTitle,
    dismissable: true,
  },
}

// ── Feature variants ──────────────────────────────────────────

export const WithDescription: Story = {
  args: {
    state: 'default',
    title: defaultTitle,
    description: defaultDescription,
    dismissable: true,
  },
}

export const WithActions: Story = {
  args: {
    state: 'default',
    title: defaultTitle,
    description: defaultDescription,
    showActions: true,
    primaryLabel: 'Confirm',
    secondaryLabel: 'Dismiss',
    dismissable: true,
  },
}

export const WithLink: Story = {
  args: {
    state: 'default',
    title: defaultTitle,
    description: defaultDescription,
    showActions: true,
    link: true,
    linkLabel: 'Undo',
    primaryLabel: 'Confirm',
    secondaryLabel: 'Cancel',
    dismissable: true,
  },
}

export const NoDismiss: Story = {
  args: {
    state: 'default',
    title: defaultTitle,
    dismissable: false,
  },
}

// ── Full matrix ───────────────────────────────────────────────

export const FullMatrix: Story = {
  render: () => {
    const states = ['default', 'success', 'warning', 'error'] as const
    const variants: Array<{ label: string; props: Partial<React.ComponentProps<typeof Toast>> }> = [
      { label: 'Title only', props: {} },
      { label: 'With description', props: { description: defaultDescription } },
      {
        label: 'With actions',
        props: {
          description: defaultDescription,
          showActions: true,
          primaryLabel: 'Confirm',
          secondaryLabel: 'Cancel',
        },
      },
      {
        label: 'With link + actions',
        props: {
          description: defaultDescription,
          showActions: true,
          link: true,
          linkLabel: 'Undo',
          primaryLabel: 'Confirm',
          secondaryLabel: 'Cancel',
        },
      },
      { label: 'No dismiss', props: { dismissable: false } },
    ]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 32, fontFamily: 'Inter, sans-serif' }}>
        {states.map(state => (
          <section key={state}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
              {state}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {variants.map(({ label, props }) => (
                <div key={label}>
                  <div style={{ fontSize: 11, color: '#9da3af', marginBottom: 6, fontWeight: 500 }}>{label}</div>
                  <Toast
                    state={state}
                    title={defaultTitle}
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
