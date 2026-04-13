import React from 'react'
import { Zap } from 'lucide-react'
import './ControlHandle.css'

export type ControlHandleSize = 'x-small' | 'small' | 'medium' | 'large'
export type ControlHandleState = 'default' | 'hover' | 'pressed' | 'disabled'

export interface ControlHandleProps {
  /** Circle size */
  size?: ControlHandleSize
  /** Forced visual state — use for Storybook demos */
  state?: ControlHandleState
  /** Value label shown below the handle */
  value?: string
  /** Show the value label */
  showValue?: boolean
  /** Left column text in the pressed tooltip */
  tooltipLeft?: string
  /** Right column text in the pressed tooltip */
  tooltipRight?: string
  onClick?: () => void
}


// ── Tooltip (Pressed state) ────────────────────────────────────
const Tooltip = ({
  left = 'Default Label',
  right = 'Default Label',
}: {
  left?: string
  right?: string
}) => (
  <div className="chandle__tooltip" role="tooltip">
    <div className="chandle__tooltip-labels">
      <div className="chandle__tooltip-cell chandle__tooltip-cell--left">{left}</div>
      <div className="chandle__tooltip-cell chandle__tooltip-cell--right">{right}</div>
    </div>
    {/* Downward-pointing arrow */}
    <div className="chandle__tooltip-arrow-wrap">
      <div className="chandle__tooltip-arrow" />
    </div>
  </div>
)

// ── ControlHandle ─────────────────────────────────────────────
export function ControlHandle({
  size = 'x-small',
  state = 'default',
  value = '20%',
  showValue = true,
  tooltipLeft,
  tooltipRight,
  onClick,
}: ControlHandleProps) {
  const hasIcon = size === 'medium' || size === 'large'
  const iconSize = size === 'large' ? 20 : 16
  const isDisabled = state === 'disabled'
  const isPressed = state === 'pressed'
  const showValueLabel = showValue && state !== 'disabled' ? state !== 'disabled' : showValue

  const cls = [
    'chandle',
    `chandle--${size}`,
    `chandle--${state}`,
  ].join(' ')

  return (
    <div className="chandle__wrapper">
      {/* The circular handle — tooltip is absolute inside it so it
          positions relative to the circle, not the whole wrapper */}
      <button
        className={cls}
        disabled={isDisabled}
        onClick={onClick}
        aria-pressed={isPressed}
        type="button"
      >
        {/* Tooltip floats above the circle in pressed state */}
        {isPressed && (
          <Tooltip left={tooltipLeft} right={tooltipRight} />
        )}
        {hasIcon && (
          <span className="chandle__icon">
            <Zap size={iconSize} strokeWidth={1.5} />
          </span>
        )}
      </button>

      {/* Value label floats below */}
      {showValue && (
        <span className={`chandle__value${isDisabled ? ' chandle__value--disabled' : ''}`}>
          {value}
        </span>
      )}
    </div>
  )
}
