import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import '../../tokens/tokens.css'
import {
  ProgressStepper,
  StepNode,
  StepLabelText,
} from './ProgressStepper'
import type { StepItem, StepperSize } from './ProgressStepper'

// ── Meta ──────────────────────────────────────────────────────

const meta: Meta<typeof ProgressStepper> = {
  title: 'Components/ProgressStepper',
  component: ProgressStepper,
  parameters: { layout: 'padded' },
  argTypes: {
    style:     { control: 'select', options: ['lined', 'step', 'boxed'] },
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
    size:      { control: 'select', options: ['lg', 'md', 'sm'] },
    steps:     { control: false },
  },
}
export default meta
type Story = StoryObj<typeof ProgressStepper>

// ── Shared step sets ──────────────────────────────────────────

const STEPS_DEFAULT: StepItem[] = [
  { label: 'Personal Info',    description: 'Name and contact',   state: 'completed' },
  { label: 'Address',          description: 'Shipping details',   state: 'completed' },
  { label: 'Payment',          description: 'Card or bank',       state: 'active'    },
  { label: 'Review',           description: 'Check your order',   state: 'inactive'  },
  { label: 'Confirmation',     description: 'All done',           state: 'disabled'  },
]

const STEPS_NUMBER: StepItem[] = STEPS_DEFAULT.map((s, i) => ({
  ...s,
  indicator: 'number' as const,
  number: String(i + 1).padStart(2, '0'),
}))

const STEPS_WITH_ERROR: StepItem[] = [
  { label: 'Personal Info',  description: 'Name and contact',  state: 'completed'   },
  { label: 'Address',        description: 'Shipping details',  state: 'destructive' },
  { label: 'Payment',        description: 'Card or bank',      state: 'inactive'    },
  { label: 'Review',         description: 'Check your order',  state: 'inactive'    },
]

// ── Atom: StepNode ────────────────────────────────────────────

export const AtomStepNode: Story = {
  name: 'Atom / Step Node',
  render: () => {
    const states   = ['inactive', 'active', 'completed', 'destructive', 'disabled'] as const
    const indicators = ['dot', 'number', 'icon'] as const
    const sizes    = ['lg', 'md', 'sm'] as const
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, fontFamily: 'Inter, sans-serif' }}>
        {sizes.map(size => (
          <div key={size}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{size}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {indicators.map(indicator => (
                <div key={indicator} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ width: 48, fontSize: 11, color: '#9da3af' }}>{indicator}</span>
                  {states.map(state => (
                    <StepNode key={state} state={state} indicator={indicator} size={size} number="02" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

// ── Atom: StepLabelText ───────────────────────────────────────

export const AtomLabelText: Story = {
  name: 'Atom / Label Text',
  render: () => {
    const sizes  = ['lg', 'md', 'sm'] as const
    const states = ['inactive', 'active', 'completed', 'destructive', 'disabled'] as const
    return (
      <div style={{ display: 'flex', gap: 48, padding: 24, flexWrap: 'wrap', fontFamily: 'Inter, sans-serif' }}>
        {sizes.map(size => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{size}</div>
            {states.map(state => (
              <div key={state} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 10, color: '#9da3af' }}>{state}</span>
                <StepLabelText
                  size={size}
                  state={state}
                  blue={state === 'active' || state === 'completed'}
                  label="Label"
                  description="Description Text"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  },
}

// ── Lined ─────────────────────────────────────────────────────

export const LinedHorizontal: Story = {
  name: 'Lined / Horizontal',
  args: {
    steps:     STEPS_DEFAULT,
    style:     'lined',
    direction: 'horizontal',
    size:      'lg',
  },
}

export const LinedHorizontalNumber: Story = {
  name: 'Lined / Horizontal / Number',
  args: {
    steps:     STEPS_NUMBER,
    style:     'lined',
    direction: 'horizontal',
    size:      'lg',
  },
}

export const LinedHorizontalError: Story = {
  name: 'Lined / Horizontal / Destructive',
  args: {
    steps:     STEPS_WITH_ERROR,
    style:     'lined',
    direction: 'horizontal',
    size:      'lg',
  },
}

export const LinedVertical: Story = {
  name: 'Lined / Vertical',
  args: {
    steps:     STEPS_DEFAULT,
    style:     'lined',
    direction: 'vertical',
    size:      'lg',
  },
}

export const LinedVerticalNumber: Story = {
  name: 'Lined / Vertical / Number',
  args: {
    steps:     STEPS_NUMBER,
    style:     'lined',
    direction: 'vertical',
    size:      'lg',
  },
}

// ── Step ──────────────────────────────────────────────────────

export const StepHorizontal: Story = {
  name: 'Step / Horizontal',
  args: {
    steps:     STEPS_DEFAULT,
    style:     'step',
    direction: 'horizontal',
    size:      'lg',
  },
}

export const StepVertical: Story = {
  name: 'Step / Vertical',
  args: {
    steps:     STEPS_DEFAULT,
    style:     'step',
    direction: 'vertical',
    size:      'lg',
  },
}

export const StepHorizontalNumber: Story = {
  name: 'Step / Horizontal / Number',
  args: {
    steps:     STEPS_NUMBER,
    style:     'step',
    direction: 'horizontal',
    size:      'lg',
  },
}

// ── Boxed ─────────────────────────────────────────────────────

export const BoxedHorizontal: Story = {
  name: 'Boxed / Horizontal',
  args: {
    steps:     STEPS_DEFAULT,
    style:     'boxed',
    direction: 'horizontal',
    size:      'lg',
  },
}

export const BoxedVertical: Story = {
  name: 'Boxed / Vertical',
  args: {
    steps:     STEPS_DEFAULT,
    style:     'boxed',
    direction: 'vertical',
    size:      'lg',
  },
}

// ── Sizes ─────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => {
    const sizes: StepperSize[] = ['lg', 'md', 'sm']
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 24, fontFamily: 'Inter, sans-serif' }}>
        {sizes.map(size => (
          <div key={size}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              Lined Horizontal — {size}
            </div>
            <div style={{ border: '1px solid #f3f4f6', borderRadius: 8 }}>
              <ProgressStepper steps={STEPS_DEFAULT} style="lined" direction="horizontal" size={size} />
            </div>
          </div>
        ))}
      </div>
    )
  },
}

// ── Interactive ───────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    const [current, setCurrent] = useState(2)
    const stepDefs = ['Personal Info', 'Address', 'Payment', 'Review', 'Confirm']

    const steps: StepItem[] = stepDefs.map((label, i) => ({
      label,
      description: `Step ${i + 1} of ${stepDefs.length}`,
      state: i < current ? 'completed' : i === current ? 'active' : 'inactive',
    }))

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, fontFamily: 'Inter, sans-serif' }}>
        <ProgressStepper steps={steps} style="lined" direction="horizontal" size="lg" />
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            style={{ padding: '8px 16px', border: '1px solid #d2d6db', borderRadius: 8, cursor: 'pointer', background: 'white', fontFamily: 'Inter, sans-serif' }}
            onClick={() => setCurrent(c => Math.max(0, c - 1))}
          >
            ← Back
          </button>
          <button
            style={{ padding: '8px 16px', border: '1px solid #0066ff', borderRadius: 8, cursor: 'pointer', background: '#0066ff', color: 'white', fontFamily: 'Inter, sans-serif' }}
            onClick={() => setCurrent(c => Math.min(stepDefs.length - 1, c + 1))}
          >
            Next →
          </button>
          <span style={{ fontSize: 13, color: '#4d5761', display: 'flex', alignItems: 'center' }}>
            Step {current + 1} of {stepDefs.length}
          </span>
        </div>
      </div>
    )
  },
}

// ── All variants ──────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 24, fontFamily: 'Inter, sans-serif' }}>

      {/* Lined */}
      <section>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Lined — Horizontal</div>
        <div style={{ border: '1px solid #f3f4f6', borderRadius: 8 }}>
          <ProgressStepper steps={STEPS_DEFAULT} style="lined" direction="horizontal" size="lg" />
        </div>
      </section>

      <section>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Lined — Vertical</div>
        <div style={{ border: '1px solid #f3f4f6', borderRadius: 8, display: 'inline-block', minWidth: 320 }}>
          <ProgressStepper steps={STEPS_DEFAULT} style="lined" direction="vertical" size="lg" />
        </div>
      </section>

      {/* Step */}
      <section>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Step — Horizontal</div>
        <div style={{ border: '1px solid #f3f4f6', borderRadius: 8 }}>
          <ProgressStepper steps={STEPS_DEFAULT} style="step" direction="horizontal" size="lg" />
        </div>
      </section>

      <section>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Step — Vertical</div>
        <div style={{ border: '1px solid #f3f4f6', borderRadius: 8, display: 'inline-block', minWidth: 320 }}>
          <ProgressStepper steps={STEPS_DEFAULT} style="step" direction="vertical" size="lg" />
        </div>
      </section>

      {/* Boxed */}
      <section>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Boxed — Horizontal</div>
        <div style={{ border: '1px solid #f3f4f6', borderRadius: 8 }}>
          <ProgressStepper steps={STEPS_DEFAULT} style="boxed" direction="horizontal" size="lg" />
        </div>
      </section>

      <section>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#9da3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Boxed — Vertical</div>
        <div style={{ border: '1px solid #f3f4f6', borderRadius: 8, display: 'inline-block', minWidth: 320 }}>
          <ProgressStepper steps={STEPS_DEFAULT} style="boxed" direction="vertical" size="lg" />
        </div>
      </section>

    </div>
  ),
}
