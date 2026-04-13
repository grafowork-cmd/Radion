import React from 'react'
import { Check, AlertCircle } from 'lucide-react'
import './ProgressStepper.css'

// ─────────────────────────────────────────────────────────────
// Progress Stepper — from Figma nodes:
//   Node       3963-103172
//   LabelText  3963-103310
//   Stepper    3963-102341
//   Group      3963-103055
//
// Atoms:
//   StepNode        — the circle indicator
//   StepLabelText   — label + description text block
//
// Parent:
//   ProgressStepper — composes atoms into a full stepper
//     style:     lined | step | boxed
//     direction: horizontal | vertical
//     size:      lg | md | sm
// ─────────────────────────────────────────────────────────────

/* ── Types ──────────────────────────────────────────────────── */

export type StepState     = 'inactive' | 'active' | 'completed' | 'destructive' | 'disabled'
export type StepIndicator = 'dot' | 'number' | 'icon'
export type StepperStyle  = 'lined' | 'step' | 'boxed'
export type StepperDir    = 'horizontal' | 'vertical'
export type StepperSize   = 'lg' | 'md' | 'sm'

export interface StepItem {
  label?:       string
  description?: string
  state?:       StepState
  indicator?:   StepIndicator
  /** Number text shown when indicator='number' */
  number?:      string
  /** Icon shown inside the node circle (indicator='icon')
   *  or at the top of a boxed card */
  icon?:        React.ReactNode
}

export interface ProgressStepperProps {
  steps?:           StepItem[]
  style?:           StepperStyle
  direction?:       StepperDir
  size?:            StepperSize
  showDescription?: boolean
}

/* ── Size maps ──────────────────────────────────────────────── */

const NODE_PX: Record<StepperSize, number> = { lg: 36, md: 32, sm: 28 }
const ICON_PX: Record<StepperSize, number> = { lg: 20, md: 18, sm: 14 }

/* ── StepNode atom ──────────────────────────────────────────── */

export interface StepNodeProps {
  state?:     StepState
  indicator?: StepIndicator
  size?:      StepperSize
  number?:    string
  icon?:      React.ReactNode
}

export function StepNode({
  state     = 'inactive',
  indicator = 'dot',
  size      = 'lg',
  number    = '01',
  icon,
}: StepNodeProps) {
  const px = NODE_PX[size]
  const ix = ICON_PX[size]

  return (
    <div
      className={`psn psn--${size} psn--${state} psn--${indicator}`}
      style={{ width: px, height: px }}
    >
      {/* Dot indicator */}
      {indicator === 'dot' && state === 'completed' && (
        <Check size={ix} strokeWidth={2.5} className="psn__icon" />
      )}
      {indicator === 'dot' && state === 'destructive' && (
        <AlertCircle size={ix} strokeWidth={2} className="psn__icon" />
      )}
      {indicator === 'dot' &&
        state !== 'completed' &&
        state !== 'destructive' && (
          <span className="psn__inner-dot" />
        )}

      {/* Number indicator */}
      {indicator === 'number' && (
        <span className="psn__number">{number}</span>
      )}

      {/* Icon indicator */}
      {indicator === 'icon' && (
        icon ?? <span className="psn__icon-placeholder" />
      )}
    </div>
  )
}

/* ── StepLabelText atom ─────────────────────────────────────── */

export interface StepLabelTextProps {
  label?:           string
  description?:     string
  size?:            StepperSize
  state?:           StepState
  /** Blue label variant — used by the Step style for active/completed steps */
  blue?:            boolean
  showDescription?: boolean
}

export function StepLabelText({
  label           = 'Label',
  description     = 'Description Text',
  size            = 'lg',
  state           = 'inactive',
  blue            = false,
  showDescription = true,
}: StepLabelTextProps) {
  const isDisabled = state === 'disabled'
  return (
    <div
      className={[
        'psl',
        `psl--${size}`,
        isDisabled ? 'psl--disabled' : '',
        blue        ? 'psl--blue'    : '',
      ].filter(Boolean).join(' ')}
    >
      <p className="psl__label">{label}</p>
      {showDescription && (
        <p className="psl__description">{description}</p>
      )}
    </div>
  )
}

/* ── Connector helpers ──────────────────────────────────────── */

function connectorColor(active: boolean) {
  return active ? 'rgb(0, 102, 255)' : 'rgb(229, 231, 235)'
}

function stepBarColor(state: StepState) {
  if (state === 'completed')   return 'rgb(0, 102, 255)'
  if (state === 'active')      return 'rgb(204, 224, 255)'
  if (state === 'destructive') return 'rgb(218, 0, 0)'
  return 'rgb(229, 231, 235)'
}

/* ── ProgressStepper parent ─────────────────────────────────── */

const DEFAULT_STEPS: StepItem[] = [
  { label: 'Label', description: 'Description Text', state: 'completed' },
  { label: 'Label', description: 'Description Text', state: 'completed' },
  { label: 'Label', description: 'Description Text', state: 'active'    },
  { label: 'Label', description: 'Description Text', state: 'inactive'  },
  { label: 'Label', description: 'Description Text', state: 'disabled'  },
]

export function ProgressStepper({
  steps           = DEFAULT_STEPS,
  style           = 'lined',
  direction       = 'horizontal',
  size            = 'lg',
  showDescription = true,
}: ProgressStepperProps) {
  return (
    <div className={`pss pss--${style} pss--${direction} pss--${size}`}>
      {steps.map((step, i) => {
        const state     = step.state     ?? 'inactive'
        const indicator = step.indicator ?? 'dot'
        const isFirst   = i === 0
        const isLast    = i === steps.length - 1

        // Line before node = blue if this step is active or completed
        //   (meaning the previous step was completed)
        const beforeActive = state === 'active' || state === 'completed'
        // Line after node = blue only if this step is completed
        const afterActive  = state === 'completed'

        // In Step style, active/completed labels are brand blue
        const isBlueLabel = style === 'step' &&
          (state === 'active' || state === 'completed')

        // Auto-number if not provided
        const num = step.number ?? String(i + 1).padStart(2, '0')

        const node = (
          <StepNode
            state={state}
            indicator={indicator}
            size={size}
            number={num}
            icon={step.icon}
          />
        )

        const label = (
          <StepLabelText
            label={step.label}
            description={step.description}
            size={size}
            state={state}
            blue={isBlueLabel}
            showDescription={showDescription}
          />
        )

        // ── LINED ──────────────────────────────────────────────
        if (style === 'lined') {
          if (direction === 'vertical') {
            return (
              <div key={i} className="pss__step pss__step--v-lined">
                {/* Progress column: top-line | node | bottom-line */}
                <div className="pss__prog-col">
                  <div className="pss__vline">
                    {!isFirst && (
                      <div
                        className="pss__vline-fill"
                        style={{ background: connectorColor(beforeActive) }}
                      />
                    )}
                  </div>
                  {node}
                  <div className="pss__vline">
                    {!isLast && (
                      <div
                        className="pss__vline-fill"
                        style={{ background: connectorColor(afterActive) }}
                      />
                    )}
                  </div>
                </div>
                {/* Text column */}
                <div className="pss__text-col">{label}</div>
              </div>
            )
          }

          // Horizontal lined
          return (
            <div key={i} className="pss__step pss__step--h-lined">
              <div className="pss__prog-row">
                <div className="pss__hline">
                  {!isFirst && (
                    <div
                      className="pss__hline-fill"
                      style={{ background: connectorColor(beforeActive) }}
                    />
                  )}
                </div>
                {node}
                <div className="pss__hline">
                  {!isLast && (
                    <div
                      className="pss__hline-fill"
                      style={{ background: connectorColor(afterActive) }}
                    />
                  )}
                </div>
              </div>
              {label}
            </div>
          )
        }

        // ── STEP ───────────────────────────────────────────────
        if (style === 'step') {
          if (direction === 'vertical') {
            return (
              <div key={i} className="pss__step pss__step--v-step">
                {/* Vertical bar on left edge */}
                <div
                  className="pss__step-bar pss__step-bar--v"
                  style={{ background: stepBarColor(state) }}
                />
                {/* Node + label inline */}
                <div className="pss__step-content">
                  {node}
                  {label}
                </div>
              </div>
            )
          }

          // Horizontal step
          return (
            <div key={i} className="pss__step pss__step--h-step">
              {/* Full-width bar at top */}
              <div
                className="pss__step-bar"
                style={{ background: stepBarColor(state) }}
              />
              {/* Node + label inline */}
              <div className="pss__step-content">
                {node}
                {label}
              </div>
            </div>
          )
        }

        // ── BOXED ───────────────────────────────────────────────
        if (style === 'boxed') {
          const cardCls = `pss__card pss__card--${state}`
          // Only show the card icon slot when the consumer explicitly provides one.
          // (The node indicator handles its own icon; this is a separate decorative slot.)
          const showCardIcon = step.icon !== undefined

          if (direction === 'vertical') {
            return (
              <div key={i} className="pss__step pss__step--v-boxed">
                {/* Top connector */}
                <div className="pss__box-vline">
                  {!isFirst && (
                    <div
                      className="pss__vline-fill"
                      style={{ background: connectorColor(beforeActive) }}
                    />
                  )}
                </div>
                {/* Card */}
                <div className={cardCls}>
                  {showCardIcon && (
                    <div className="pss__card-icon-slot">
                      {step.icon ?? <span className="psn__icon-placeholder" />}
                    </div>
                  )}
                  {label}
                  {node}
                </div>
                {/* Bottom connector */}
                <div className="pss__box-vline">
                  {!isLast && (
                    <div
                      className="pss__vline-fill"
                      style={{ background: connectorColor(afterActive) }}
                    />
                  )}
                </div>
              </div>
            )
          }

          // Horizontal boxed
          return (
            <div key={i} className="pss__step pss__step--h-boxed">
              {/* Left connector */}
              <div className="pss__box-hline">
                {!isFirst && (
                  <div
                    className="pss__hline-fill"
                    style={{ background: connectorColor(beforeActive) }}
                  />
                )}
              </div>
              {/* Card */}
              <div className={cardCls}>
                {showCardIcon && (
                  <div className="pss__card-icon-slot">
                    {step.icon ?? <span className="psn__icon-placeholder" />}
                  </div>
                )}
                {label}
                {node}
              </div>
              {/* Right connector */}
              <div className="pss__box-hline">
                {!isLast && (
                  <div
                    className="pss__hline-fill"
                    style={{ background: connectorColor(afterActive) }}
                  />
                )}
              </div>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
