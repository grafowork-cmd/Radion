import React, {
  useId,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { ChevronDown, X, Search } from 'lucide-react'
import { CheckboxGroup } from '../Checkbox/Checkbox'
import './Dropdown.css'

// ─────────────────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────────────────

export type DropdownSize  = 'small' | 'medium' | 'large'
export type DropdownState = 'default' | 'error' | 'warning' | 'disabled' | 'loading'

export interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
}

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────

function SkeletonLine({ width }: { width: number }) {
  return <span className="dd__skeleton" style={{ width }} />
}

// ─────────────────────────────────────────────────────────
// 1. Dropdown (single-select)
// ─────────────────────────────────────────────────────────

export interface DropdownProps {
  options: DropdownOption[]
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
  state?: DropdownState
  size?: DropdownSize
  id?: string
  name?: string
}

export function Dropdown({
  options,
  value: controlledValue,
  defaultValue = '',
  onChange,
  placeholder = 'Select an option',
  label = 'Label',
  showLabel = true,
  notation,
  showNotation = false,
  fieldnote,
  showFieldnote = false,
  errorText = 'Error message.',
  warningText = 'Warning message.',
  state = 'default',
  size = 'medium',
  id: externalId,
}: DropdownProps) {
  const autoId = useId()
  const inputId = externalId ?? autoId
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)

  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const selected = isControlled ? controlledValue : internalValue

  const [open, setOpen] = useState(false)

  const isDisabled = state === 'disabled' || state === 'loading'
  const isLoading  = state === 'loading'
  const isError    = state === 'error'
  const isWarning  = state === 'warning'

  const selectedLabel = options.find(o => o.value === selected)?.label ?? ''

  const handleSelect = useCallback((val: string) => {
    if (!isControlled) setInternalValue(val)
    onChange?.(val)
    setOpen(false)
    triggerRef.current?.focus()
  }, [isControlled, onChange])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Keyboard nav
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDisabled) return
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o) }
    if (e.key === 'Escape') setOpen(false)
  }

  const triggerClass = [
    'dd__trigger',
    `dd__trigger--${size}`,
    open      ? 'dd__trigger--open'     : '',
    isError   ? 'dd__trigger--error'    : '',
    isWarning ? 'dd__trigger--warning'  : '',
    isDisabled? 'dd__trigger--disabled' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={`dd-group dd-group--${size}`}>
      {/* Label row */}
      {showLabel && !isLoading && (
        <label className="dd__label" htmlFor={inputId}>
          <span className="dd__label-text">{label}</span>
          {showNotation && notation && <span className="dd__notation">{notation}</span>}
        </label>
      )}
      {isLoading && <SkeletonLine width={80} />}

      {/* Trigger */}
      <div className="dd__wrap">
        <button
          ref={triggerRef}
          id={inputId}
          type="button"
          className={triggerClass}
          disabled={isDisabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onKeyDown={handleKeyDown}
          onClick={() => !isDisabled && setOpen(o => !o)}
        >
          {isLoading
            ? <SkeletonLine width={120} />
            : <span className={`dd__value${!selectedLabel ? ' dd__value--placeholder' : ''}`}>
                {selectedLabel || placeholder}
              </span>
          }
          <ChevronDown
            size={size === 'small' ? 16 : size === 'large' ? 20 : 18}
            strokeWidth={1.5}
            className={`dd__chevron${open ? ' dd__chevron--open' : ''}`}
          />
        </button>

        {/* Menu */}
        {open && (
          <ul
            ref={menuRef}
            className="dd__menu"
            role="listbox"
            aria-label={label}
          >
            {options.map(opt => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === selected}
                aria-disabled={opt.disabled}
                className={[
                  'dd__item',
                  `dd__item--${size}`,
                  opt.value === selected ? 'dd__item--selected' : '',
                  opt.disabled           ? 'dd__item--disabled' : '',
                ].filter(Boolean).join(' ')}
                onMouseDown={e => { e.preventDefault(); if (!opt.disabled) handleSelect(opt.value) }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Fieldnote */}
      {showFieldnote && fieldnote && !isError && !isWarning && !isLoading && (
        <p className="dd__fieldnote">{fieldnote}</p>
      )}
      {isError && errorText && (
        <p className="dd__message dd__message--error">{errorText}</p>
      )}
      {isWarning && warningText && (
        <p className="dd__message dd__message--warning">{warningText}</p>
      )}
      {isLoading && showFieldnote && <SkeletonLine width={100} />}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// 2. DropdownMultiSelect
// ─────────────────────────────────────────────────────────

export interface DropdownMultiSelectProps {
  options: DropdownOption[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (values: string[]) => void
  placeholder?: string
  label?: string
  showLabel?: boolean
  notation?: string
  showNotation?: boolean
  fieldnote?: string
  showFieldnote?: boolean
  errorText?: string
  warningText?: string
  state?: DropdownState
  size?: DropdownSize
  id?: string
}

export function DropdownMultiSelect({
  options,
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = 'Select options',
  label = 'Label',
  showLabel = true,
  notation,
  showNotation = false,
  fieldnote,
  showFieldnote = false,
  errorText = 'Error message.',
  warningText = 'Warning message.',
  state = 'default',
  size = 'medium',
  id: externalId,
}: DropdownMultiSelectProps) {
  const autoId = useId()
  const inputId = externalId ?? autoId
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue)
  const selected = isControlled ? controlledValue : internalValue

  const [open, setOpen] = useState(false)

  const isDisabled = state === 'disabled' || state === 'loading'
  const isLoading  = state === 'loading'
  const isError    = state === 'error'
  const isWarning  = state === 'warning'

  const handleToggle = useCallback((val: string) => {
    const next = selected.includes(val)
      ? selected.filter(v => v !== val)
      : [...selected, val]
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }, [selected, isControlled, onChange])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const displayValue = selected.length === 0
    ? placeholder
    : selected.length === 1
      ? options.find(o => o.value === selected[0])?.label ?? selected[0]
      : `${selected.length} selected`

  const triggerClass = [
    'dd__trigger',
    `dd__trigger--${size}`,
    open      ? 'dd__trigger--open'     : '',
    isError   ? 'dd__trigger--error'    : '',
    isWarning ? 'dd__trigger--warning'  : '',
    isDisabled? 'dd__trigger--disabled' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={`dd-group dd-group--${size}`}>
      {showLabel && !isLoading && (
        <label className="dd__label" htmlFor={inputId}>
          <span className="dd__label-text">{label}</span>
          {showNotation && notation && <span className="dd__notation">{notation}</span>}
        </label>
      )}
      {isLoading && <SkeletonLine width={80} />}

      <div className="dd__wrap">
        <button
          ref={triggerRef}
          id={inputId}
          type="button"
          className={triggerClass}
          disabled={isDisabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-multiselectable="true"
          onClick={() => !isDisabled && setOpen(o => !o)}
        >
          {isLoading
            ? <SkeletonLine width={120} />
            : <span className={`dd__value${selected.length === 0 ? ' dd__value--placeholder' : ''}`}>
                {displayValue}
              </span>
          }
          <ChevronDown
            size={size === 'small' ? 16 : size === 'large' ? 20 : 18}
            strokeWidth={1.5}
            className={`dd__chevron${open ? ' dd__chevron--open' : ''}`}
          />
        </button>

        {open && (
          <div ref={menuRef} className="dd__menu dd__menu--multi" role="listbox" aria-multiselectable="true" aria-label={label}>
            {options.map(opt => (
              <div
                key={opt.value}
                className={[
                  'dd__item dd__item--checkbox',
                  `dd__item--${size}`,
                  opt.disabled ? 'dd__item--disabled' : '',
                ].filter(Boolean).join(' ')}
                role="option"
                aria-selected={selected.includes(opt.value)}
                onMouseDown={e => { e.preventDefault(); if (!opt.disabled) handleToggle(opt.value) }}
              >
                <CheckboxGroup
                  label={opt.label}
                  checked={selected.includes(opt.value)}
                  onChange={() => { if (!opt.disabled) handleToggle(opt.value) }}
                  state={opt.disabled ? 'disabled' : 'default'}
                  showLabel
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {showFieldnote && fieldnote && !isError && !isWarning && !isLoading && (
        <p className="dd__fieldnote">{fieldnote}</p>
      )}
      {isError && errorText && <p className="dd__message dd__message--error">{errorText}</p>}
      {isWarning && warningText && <p className="dd__message dd__message--warning">{warningText}</p>}
      {isLoading && showFieldnote && <SkeletonLine width={100} />}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// 3. DropdownFilterMultiSelect
//    Label floats inside trigger, clear button, checkbox menu
// ─────────────────────────────────────────────────────────

export interface DropdownFilterMultiSelectProps {
  options: DropdownOption[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (values: string[]) => void
  placeholder?: string
  label?: string
  showLabel?: boolean
  fieldnote?: string
  showFieldnote?: boolean
  errorText?: string
  warningText?: string
  state?: DropdownState
  size?: DropdownSize
  id?: string
}

export function DropdownFilterMultiSelect({
  options,
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = 'All',
  label = 'Filter',
  showLabel = true,
  fieldnote,
  showFieldnote = false,
  errorText = 'Error message.',
  warningText = 'Warning message.',
  state = 'default',
  size = 'large',
  id: externalId,
}: DropdownFilterMultiSelectProps) {
  const autoId = useId()
  const inputId = externalId ?? autoId
  const triggerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue)
  const selected = isControlled ? controlledValue : internalValue

  const [open, setOpen] = useState(false)

  const isDisabled = state === 'disabled' || state === 'loading'
  const isLoading  = state === 'loading'
  const isError    = state === 'error'
  const isWarning  = state === 'warning'

  const handleToggle = useCallback((val: string) => {
    const next = selected.includes(val)
      ? selected.filter(v => v !== val)
      : [...selected, val]
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }, [selected, isControlled, onChange])

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const next: string[] = []
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }, [isControlled, onChange])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const displayValue = selected.length === 0
    ? placeholder
    : selected.length === 1
      ? options.find(o => o.value === selected[0])?.label ?? selected[0]
      : `${selected.length} selected`

  const iconSize = size === 'small' ? 16 : 20

  const triggerClass = [
    'dd__trigger dd__trigger--float',
    `dd__trigger--${size}`,
    open      ? 'dd__trigger--open'     : '',
    isError   ? 'dd__trigger--error'    : '',
    isDisabled? 'dd__trigger--disabled' : '',
    selected.length > 0 || open ? 'dd__trigger--has-value' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={`dd-group dd-group--${size}`}>
      <div className="dd__wrap">
        <div
          ref={triggerRef}
          id={inputId}
          className={triggerClass}
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => !isDisabled && setOpen(o => !o)}
          onKeyDown={e => {
            if (isDisabled) return
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o) }
            if (e.key === 'Escape') setOpen(false)
          }}
        >
          {/* Floating label inside */}
          {showLabel && (
            <span className={`dd__float-label${(selected.length > 0 || open) ? ' dd__float-label--up' : ''}`}>
              {label}
            </span>
          )}

          {/* Value */}
          {isLoading
            ? <SkeletonLine width={100} />
            : <span className={`dd__float-value${selected.length === 0 ? ' dd__value--placeholder' : ''}`}>
                {(selected.length > 0 || open) ? displayValue : ''}
              </span>
          }

          {/* Icon cluster */}
          <div className="dd__icon-cluster">
            {selected.length > 0 && !isDisabled && (
              <button
                type="button"
                className="dd__clear"
                aria-label="Clear selection"
                tabIndex={-1}
                onMouseDown={handleClear}
              >
                <X size={iconSize} strokeWidth={1.5} />
              </button>
            )}
            <span className="dd__divider" aria-hidden="true" />
            <ChevronDown
              size={iconSize}
              strokeWidth={1.5}
              className={`dd__chevron${open ? ' dd__chevron--open' : ''}`}
            />
          </div>
        </div>

        {open && (
          <div ref={menuRef} className="dd__menu dd__menu--multi" role="listbox" aria-multiselectable="true" aria-label={label}>
            {options.map(opt => (
              <div
                key={opt.value}
                className={[
                  'dd__item dd__item--checkbox dd__item--large',
                  opt.disabled ? 'dd__item--disabled' : '',
                ].filter(Boolean).join(' ')}
                role="option"
                aria-selected={selected.includes(opt.value)}
                onMouseDown={e => { e.preventDefault(); if (!opt.disabled) handleToggle(opt.value) }}
              >
                <CheckboxGroup
                  label={opt.label}
                  checked={selected.includes(opt.value)}
                  onChange={() => { if (!opt.disabled) handleToggle(opt.value) }}
                  state={opt.disabled ? 'disabled' : 'default'}
                  showLabel
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {showFieldnote && fieldnote && !isError && !isWarning && !isLoading && (
        <p className="dd__fieldnote">{fieldnote}</p>
      )}
      {isError && errorText && <p className="dd__message dd__message--error">{errorText}</p>}
      {isWarning && warningText && <p className="dd__message dd__message--warning">{warningText}</p>}
      {isLoading && showFieldnote && <SkeletonLine width={100} />}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// 4. DropdownTypehead (type-to-search, single select)
//    Label floats inside trigger, search input in menu
// ─────────────────────────────────────────────────────────

export interface DropdownTypeheadProps {
  options: DropdownOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  showLabel?: boolean
  fieldnote?: string
  showFieldnote?: boolean
  errorText?: string
  warningText?: string
  state?: DropdownState
  size?: DropdownSize
  id?: string
}

export function DropdownTypehead({
  options,
  value: controlledValue,
  defaultValue = '',
  onChange,
  placeholder = 'Search…',
  label = 'Label',
  showLabel = true,
  fieldnote,
  showFieldnote = false,
  errorText = 'Error message.',
  warningText = 'Warning message.',
  state = 'default',
  size = 'large',
  id: externalId,
}: DropdownTypeheadProps) {
  const autoId = useId()
  const inputId = externalId ?? autoId
  const triggerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const selected = isControlled ? controlledValue : internalValue

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const isDisabled = state === 'disabled' || state === 'loading'
  const isLoading  = state === 'loading'
  const isError    = state === 'error'
  const isWarning  = state === 'warning'

  const filtered = useMemo(() =>
    query.trim() === ''
      ? options
      : options.filter(o => o.label.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  )

  const selectedLabel = options.find(o => o.value === selected)?.label ?? ''

  const handleSelect = useCallback((val: string) => {
    if (!isControlled) setInternalValue(val)
    onChange?.(val)
    setOpen(false)
    setQuery('')
  }, [isControlled, onChange])

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isControlled) setInternalValue('')
    onChange?.('')
    setQuery('')
  }, [isControlled, onChange])

  useEffect(() => {
    if (!open) return
    // Focus search input when menu opens
    setTimeout(() => searchRef.current?.focus(), 10)
    const handler = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) { setOpen(false); setQuery('') }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const iconSize = size === 'small' ? 16 : 20

  const triggerClass = [
    'dd__trigger dd__trigger--float',
    `dd__trigger--${size}`,
    open      ? 'dd__trigger--open'     : '',
    isError   ? 'dd__trigger--error'    : '',
    isDisabled? 'dd__trigger--disabled' : '',
    selected || open ? 'dd__trigger--has-value' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={`dd-group dd-group--${size}`}>
      <div className="dd__wrap">
        <div
          ref={triggerRef}
          id={inputId}
          className={triggerClass}
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => !isDisabled && setOpen(o => !o)}
          onKeyDown={e => {
            if (isDisabled) return
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o) }
            if (e.key === 'Escape') { setOpen(false); setQuery('') }
          }}
        >
          {showLabel && (
            <span className={`dd__float-label${(selected || open) ? ' dd__float-label--up' : ''}`}>
              {label}
            </span>
          )}

          {isLoading
            ? <SkeletonLine width={100} />
            : <span className={`dd__float-value${!selectedLabel ? ' dd__value--placeholder' : ''}`}>
                {(selected || open) ? (selectedLabel || '') : ''}
              </span>
          }

          <div className="dd__icon-cluster">
            {selected && !isDisabled && (
              <button
                type="button"
                className="dd__clear"
                aria-label="Clear selection"
                tabIndex={-1}
                onMouseDown={handleClear}
              >
                <X size={iconSize} strokeWidth={1.5} />
              </button>
            )}
            <span className="dd__divider" aria-hidden="true" />
            <ChevronDown
              size={iconSize}
              strokeWidth={1.5}
              className={`dd__chevron${open ? ' dd__chevron--open' : ''}`}
            />
          </div>
        </div>

        {open && (
          <div ref={menuRef} className="dd__menu" role="listbox" aria-label={label}>
            {/* Search input inside menu */}
            <div className="dd__search-wrap">
              <Search size={16} strokeWidth={1.5} className="dd__search-icon" />
              <input
                ref={searchRef}
                type="text"
                className="dd__search-input"
                placeholder={placeholder}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Escape') { setOpen(false); setQuery('') }
                }}
                onClick={e => e.stopPropagation()}
              />
            </div>

            <ul className="dd__search-list" role="presentation">
              {filtered.length === 0 && (
                <li className="dd__item dd__item--empty">No results</li>
              )}
              {filtered.map(opt => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === selected}
                  aria-disabled={opt.disabled}
                  className={[
                    'dd__item dd__item--large',
                    opt.value === selected ? 'dd__item--selected' : '',
                    opt.disabled           ? 'dd__item--disabled' : '',
                  ].filter(Boolean).join(' ')}
                  onMouseDown={e => { e.preventDefault(); if (!opt.disabled) handleSelect(opt.value) }}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {showFieldnote && fieldnote && !isError && !isWarning && !isLoading && (
        <p className="dd__fieldnote">{fieldnote}</p>
      )}
      {isError && errorText && <p className="dd__message dd__message--error">{errorText}</p>}
      {isWarning && warningText && <p className="dd__message dd__message--warning">{warningText}</p>}
      {isLoading && showFieldnote && <SkeletonLine width={100} />}
    </div>
  )
}
