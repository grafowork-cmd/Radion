import React, { useId, useRef, useState, useCallback } from 'react'
import { CircleAlert, TriangleAlert } from 'lucide-react'
import './Input.css'

// ─────────────────────────────────────────────────────────────
// Text Input — from Figma node 1788:17083
//
// Size:
//   small  — 32px field, no label
//   medium — 40px field, label above
//   large  — 48px field, label pinned inside field (top-left)
// ─────────────────────────────────────────────────────────────

export type InputSize  = 'small' | 'medium' | 'large'
export type InputState = 'default' | 'hover' | 'focus' | 'filled' | 'disabled' | 'error' | 'warning' | 'read-only'

export interface InputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  showLabel?: boolean
  notation?: string
  showNotation?: boolean
  fieldnote?: string
  showFieldnote?: boolean
  errorText?: string
  warningText?: string
  showCount?: boolean
  maxLength?: number
  /** Icon shown on the right side of the input */
  icon?: React.ReactNode
  type?: 'text' | 'email' | 'password' | 'search' | 'url' | 'number'
  state?: InputState
  size?: InputSize
  id?: string
  name?: string
  /** Force focus ring (Storybook demo) */
  focused?: boolean
}

export function Input({
  value: controlledValue,
  defaultValue = '',
  onChange,
  placeholder = 'Placeholder',
  label = 'Label',
  showLabel = true,
  notation = '(required)',
  showNotation = false,
  fieldnote,
  showFieldnote = false,
  errorText = 'Error message.',
  warningText = 'Warning message.',
  showCount = false,
  maxLength,
  icon,
  type = 'text',
  state = 'default',
  size = 'medium',
  id: externalId,
  name,
  focused = false,
}: InputProps) {
  const autoId  = useId()
  const inputId = externalId ?? autoId

  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const value = isControlled ? controlledValue : internalValue

  const isDisabled = state === 'disabled'
  const isReadOnly = state === 'read-only'
  const isError    = state === 'error'
  const isWarning  = state === 'warning'
  const isFocus    = state === 'focus' || focused

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }, [isControlled, onChange])

  const fieldClass = [
    'inp__field',
    `inp__field--${size}`,
    `inp__field--${state}`,
    isFocus ? 'inp__field--focused' : '',
  ].filter(Boolean).join(' ')

  const showMessage = isError || isWarning
  const showNote    = showFieldnote && fieldnote && !showMessage

  return (
    <div className={`inp-group inp-group--${size}`}>

      {/* External label (small: hidden, medium/large-external: shown) */}
      {size !== 'large' && showLabel && (
        <div className={`inp__label-row${isDisabled ? ' inp__label-row--disabled' : ''}`}>
          <label className="inp__label" htmlFor={inputId}>
            <span className="inp__label-text">{label}</span>
            {showNotation && notation && (
              <span className="inp__notation">{notation}</span>
            )}
          </label>
          {showCount && maxLength && (
            <span className="inp__count">{value.length}/{maxLength}</span>
          )}
        </div>
      )}

      {/* Field box */}
      <div className={fieldClass}>

        {/* Large: label inside field at top */}
        {size === 'large' && showLabel && (
          <div className={`inp__inner-label-row${isDisabled ? ' inp__inner-label-row--disabled' : ''}`}>
            <div className="inp__inner-label">
              <span className="inp__label-text--inner">{label}</span>
              {showNotation && notation && (
                <span className="inp__notation">{notation}</span>
              )}
            </div>
            {showCount && maxLength && (
              <span className="inp__count">{value.length}/{maxLength}</span>
            )}
          </div>
        )}

        {/* Input row */}
        <div className="inp__input-row">
          <input
            id={inputId}
            name={name}
            type={type}
            className="inp__input"
            value={value}
            placeholder={['default', 'hover', 'focus'].includes(state) ? placeholder : undefined}
            disabled={isDisabled}
            readOnly={isReadOnly}
            maxLength={maxLength}
            onChange={handleChange}
            aria-invalid={isError}
          />
          {isError && (
            <span className="inp__state-icon inp__state-icon--error" aria-hidden="true">
              <CircleAlert size={size === 'small' ? 14 : 16} strokeWidth={1.5} />
            </span>
          )}
          {icon && !isError && (
            <span className="inp__icon" aria-hidden="true">{icon}</span>
          )}
        </div>
      </div>

      {/* Below-field text */}
      {showNote && (
        <p className={`inp__fieldnote${isDisabled ? ' inp__fieldnote--disabled' : ''}`}>{fieldnote}</p>
      )}
      {isError && errorText && (
        <p className="inp__message inp__message--error">{errorText}</p>
      )}
      {isWarning && warningText && (
        <p className="inp__message inp__message--warning">{warningText}</p>
      )}
    </div>
  )
}
