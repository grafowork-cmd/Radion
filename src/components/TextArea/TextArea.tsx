import React, { useId, useState, useCallback } from 'react'
import './TextArea.css'

// ─────────────────────────────────────────────────────────────
// TextArea — from Figma node 1783:24802
//
// Sizes: medium | large
//   medium — label above the field box (external)
//   large  — label pinned inside field at the top
//
// States: default | hover | focus | filled | disabled |
//         error | warning | read-only
// ─────────────────────────────────────────────────────────────

export type TextAreaSize  = 'medium' | 'large'
export type TextAreaState = 'default' | 'hover' | 'focus' | 'filled' | 'disabled' | 'error' | 'warning' | 'read-only'

export interface TextAreaProps {
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
  icon?: React.ReactNode
  rows?: number
  state?: TextAreaState
  size?: TextAreaSize
  id?: string
  name?: string
  /** Force focus ring for Storybook demo */
  focused?: boolean
}

export function TextArea({
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
  maxLength = 100,
  icon,
  rows = 5,
  state = 'default',
  size = 'medium',
  id: externalId,
  name,
  focused = false,
}: TextAreaProps) {
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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }, [isControlled, onChange])

  const fieldClass = [
    'ta__field',
    `ta__field--${size}`,
    `ta__field--${state}`,
    isFocus ? 'ta__field--focused' : '',
  ].filter(Boolean).join(' ')

  const showNote = showFieldnote && fieldnote && !isError && !isWarning

  return (
    <div className={`ta-group ta-group--${size}`}>

      {/* ── Medium: external label ────────────────────────────── */}
      {showLabel && (
        <div className={`ta__label-row${isDisabled ? ' ta__label-row--disabled' : ''}`}>
          <label className="ta__label" htmlFor={inputId}>
            <span className="ta__label-text">{label}</span>
            {showNotation && notation && (
              <span className="ta__notation">{notation}</span>
            )}
          </label>
          {showCount && (
            <span className="ta__count">{value.length}/{maxLength}</span>
          )}
        </div>
      )}

      {/* ── Field box ─────────────────────────────────────────── */}
      <div className={fieldClass}>

        {/* Large: label row pinned inside field at top */}
        {size === 'large' && showLabel && (
          <div className={`ta__inner-header${isDisabled ? ' ta__inner-header--disabled' : ''}`}>
            <div className="ta__inner-label">
              <span className="ta__label-text--inner">{label}</span>
              {showNotation && notation && (
                <span className="ta__notation">{notation}</span>
              )}
            </div>
            {showCount && (
              <span className="ta__count">{value.length}/{maxLength}</span>
            )}
          </div>
        )}

        {/* Textarea */}
        <div className="ta__content">
          <textarea
            id={inputId}
            name={name}
            className="ta__textarea"
            value={value}
            placeholder={['default', 'hover', 'focus'].includes(state) ? placeholder : undefined}
            disabled={isDisabled}
            readOnly={isReadOnly}
            rows={rows}
            maxLength={maxLength || undefined}
            onChange={handleChange}
            aria-invalid={isError}
          />
          {icon && <span className="ta__icon" aria-hidden="true">{icon}</span>}
        </div>

        {/* Resize handle (decorative) */}
        {!isDisabled && !isReadOnly && (
          <span className="ta__resize-handle" aria-hidden="true" />
        )}

        {/* Focus outline overlay */}
        {isFocus && <span className={`ta__focus-outline ta__focus-outline--${size}`} aria-hidden="true" />}
      </div>

      {/* ── Below-field messages ───────────────────────────────── */}
      {showNote && (
        <p className={`ta__fieldnote${isDisabled ? ' ta__fieldnote--disabled' : ''}`}>{fieldnote}</p>
      )}
      {isError && errorText && (
        <p className="ta__message ta__message--error">{errorText}</p>
      )}
      {isWarning && warningText && (
        <p className="ta__message ta__message--warning">{warningText}</p>
      )}
    </div>
  )
}
