import React, { useState, useCallback } from 'react'
import { TriangleAlert } from 'lucide-react'
import './Slider.css'
import type { ControlHandleSize } from './ControlHandle'

export type SliderType = 'website' | 'mobile'

export interface SliderProps {
  /** Slider field label shown above the track */
  label?: string
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Controlled value */
  value?: number
  /** Uncontrolled initial value */
  defaultValue?: number
  /** Callback when value changes */
  onChange?: (value: number) => void
  /** Custom content for the left placeholder slot */
  leftSlot?: React.ReactNode
  /** Custom content for the right placeholder slot */
  rightSlot?: React.ReactNode
  /** Label below the left placeholder */
  leftLabel?: string
  /** Label below the right placeholder */
  rightLabel?: string
  /** Error message — if set, renders in error state */
  errorMessage?: string
  /** Disabled state */
  disabled?: boolean
  /** Website shows 12px track; Mobile shows 8px track */
  type?: SliderType
  /**
   * Control handle size — matches ControlHandle sizes.
   * Defaults: website → medium (32px), mobile → small (24px)
   */
  handleSize?: ControlHandleSize
  /** Show min/max value labels below the track */
  showMinMax?: boolean
  /** Format function for the min/max labels */
  formatValue?: (value: number) => string
  /** Force the focus ring on the thumb — use to demonstrate the focus state in Storybook */
  focused?: boolean
}


// ── Component ─────────────────────────────────────────────────────────────────
export function Slider({
  label,
  min = 0,
  max = 100,
  value: controlledValue,
  defaultValue = 50,
  onChange,
  leftSlot,
  rightSlot,
  leftLabel,
  rightLabel,
  errorMessage,
  disabled = false,
  type = 'website',
  handleSize,
  showMinMax = true,
  formatValue = (v) => `${v}%`,
  focused = false,
}: SliderProps) {
  // Resolve effective handle size: explicit prop wins, else type default
  const effectiveHandleSize = handleSize ?? (type === 'mobile' ? 'small' : 'medium')
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      const next = Number(e.target.value)
      if (!isControlled) setInternalValue(next)
      onChange?.(next)
    },
    [disabled, isControlled, onChange]
  )

  const percentage = ((value - min) / (max - min)) * 100
  const isError = Boolean(errorMessage) && !disabled

  const rootClass = [
    'slider',
    `slider--${type}`,
    `slider--handle-${effectiveHandleSize}`,
    isError ? 'slider--error' : '',
    disabled ? 'slider--disabled' : '',
    focused && !disabled ? 'slider--focused' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const placeholderClass = [
    'slider__placeholder',
    isError ? 'slider__placeholder--error' : '',
    disabled ? 'slider__placeholder--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const sideLabelClass = [
    'slider__side-label',
    disabled ? 'slider__side-label--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass}>
      {/* ── Left side ────────────────────────────────────────── */}
      <div className="slider__side">
        {leftSlot ?? (
          <div className={placeholderClass}>
            <span className="slider__placeholder-text">Placeholder</span>
          </div>
        )}
        {leftLabel && <span className={sideLabelClass}>{leftLabel}</span>}
      </div>

      {/* ── Track area ───────────────────────────────────────── */}
      <div className="slider__track-area">
        {label && (
          <span className={`slider__name${disabled ? ' slider__name--disabled' : ''}`}>
            {label}
          </span>
        )}

        <div className="slider__rail-wrapper">
          {/* Visual track (gradient fill) */}
          <div
            className="slider__rail"
            style={{ '--progress': `${percentage}%` } as React.CSSProperties}
          />
          {/* Native range input */}
          <input
            type="range"
            className="slider__input"
            min={min}
            max={max}
            value={value}
            disabled={disabled}
            onChange={handleChange}
            aria-label={label}
          />
        </div>

        {/* Footer row: left-value | error message | right-value */}
        {showMinMax && (
          <div className="slider__footer">
            <div className="slider__footer-left">
              <span className={`slider__value${disabled ? ' slider__value--disabled' : ''}`}>
                {formatValue(value)}
              </span>
              {isError && (
                <span className="slider__error-row">
                  <TriangleAlert size={16} strokeWidth={1.5} className="slider__warning-icon" />
                  <span className="slider__error-text">{errorMessage}</span>
                </span>
              )}
            </div>
            <span className={`slider__value${disabled ? ' slider__value--disabled' : ''}`}>
              {formatValue(max)}
            </span>
          </div>
        )}
      </div>

      {/* ── Right side ───────────────────────────────────────── */}
      <div className="slider__side">
        {rightSlot ?? (
          <div className={placeholderClass}>
            <span className="slider__placeholder-text">Placeholder</span>
          </div>
        )}
        {rightLabel && <span className={sideLabelClass}>{rightLabel}</span>}
      </div>
    </div>
  )
}
