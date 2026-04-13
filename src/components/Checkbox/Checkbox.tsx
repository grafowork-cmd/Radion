import React, { useId, useRef, useEffect, useState, useCallback } from 'react'
import { Check, Minus, TriangleAlert, CircleAlert } from 'lucide-react'
import './Checkbox.css'

export type CheckboxState = 'default' | 'error' | 'warning' | 'disabled' | 'loading'

export interface CheckboxGroupProps {
  /** Label text */
  label?: string
  /** Controlled checked value */
  checked?: boolean
  /** Uncontrolled initial value */
  defaultChecked?: boolean
  /** Indeterminate state — overrides checked visually */
  indeterminate?: boolean
  /** Called when the user toggles the checkbox */
  onChange?: (checked: boolean) => void
  /** Semantic state */
  state?: CheckboxState
  /** Show the label */
  showLabel?: boolean
  /** Optional notation text appended to the label (e.g. "(required)") */
  notation?: string
  /** Show notation */
  showNotation?: boolean
  /** Helper text below the checkbox */
  fieldnote?: string
  /** Show fieldnote */
  showFieldnote?: boolean
  /** Error message — shown when state="error" */
  errorText?: string
  /** Warning message — shown when state="warning" */
  warningText?: string
  /** Unique id for the input (auto-generated if omitted) */
  id?: string
  /** Input name */
  name?: string
  /** Force focus ring (for Storybook) */
  focused?: boolean
}

export function CheckboxGroup({
  label = 'Checkbox label',
  checked: controlledChecked,
  defaultChecked = false,
  indeterminate = false,
  onChange,
  state = 'default',
  showLabel = true,
  notation,
  showNotation = false,
  fieldnote,
  showFieldnote = false,
  errorText = 'Error message.',
  warningText = 'Warning message.',
  id: externalId,
  name,
  focused = false,
}: CheckboxGroupProps) {
  const autoId = useId()
  const inputId = externalId ?? autoId
  const inputRef = useRef<HTMLInputElement>(null)

  const isControlled = controlledChecked !== undefined
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isChecked = isControlled ? controlledChecked : internalChecked

  const isDisabled = state === 'disabled' || state === 'loading'
  const isError    = state === 'error'
  const isWarning  = state === 'warning'
  const isLoading  = state === 'loading'

  // Sync indeterminate DOM property
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) return
      const next = e.target.checked
      if (!isControlled) setInternalChecked(next)
      onChange?.(next)
    },
    [isDisabled, isControlled, onChange]
  )

  // Visual box modifier classes
  const boxClass = [
    'cbx__box',
    isChecked || indeterminate ? 'cbx__box--checked' : '',
    isError                    ? 'cbx__box--error'   : '',
    isDisabled                 ? 'cbx__box--disabled' : '',
    focused                    ? 'cbx__box--focused'  : '',
  ].filter(Boolean).join(' ')

  const labelTextClass = [
    'cbx__label-text',
    isDisabled ? 'cbx__label-text--disabled' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={`cbx-group${isLoading ? ' cbx-group--loading' : ''}`}>
      <label className="cbx__field" htmlFor={inputId}>
        {/* Visually hidden native input — keeps accessibility */}
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="checkbox"
          className="cbx__input"
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          aria-invalid={isError}
        />

        {/* Custom visual box */}
        <span className={boxClass} aria-hidden="true">
          {indeterminate
            ? <Minus size={8} strokeWidth={2.5} className="cbx__icon" />
            : isChecked
              ? <Check size={10} strokeWidth={2.5} className="cbx__icon" />
              : null
          }
        </span>

        {/* Label + notation */}
        {showLabel && !isLoading && (
          <span className="cbx__label-area">
            <span className={labelTextClass}>{label}</span>
            {showNotation && notation && (
              <span className="cbx__notation">{notation}</span>
            )}
          </span>
        )}

        {/* Loading skeleton */}
        {isLoading && <span className="cbx__skeleton" />}
      </label>

      {/* Fieldnote */}
      {showFieldnote && fieldnote && !isError && !isWarning && !isLoading && (
        <p className="cbx__fieldnote">{fieldnote}</p>
      )}

      {/* Warning message */}
      {isWarning && warningText && (
        <p className="cbx__message cbx__message--warning">
          <TriangleAlert size={16} strokeWidth={1.5} />
          {warningText}
        </p>
      )}

      {/* Error message */}
      {isError && errorText && (
        <p className="cbx__message cbx__message--error">
          <CircleAlert size={16} strokeWidth={1.5} />
          {errorText}
        </p>
      )}

      {/* Loading fieldnote skeleton */}
      {isLoading && showFieldnote && (
        <span className="cbx__skeleton cbx__skeleton--fieldnote" />
      )}
    </div>
  )
}
