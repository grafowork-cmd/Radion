import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import './Accordion.css'

// ─────────────────────────────────────────────────────────────
// Accordion — from Figma node 8369:4560
//
// Style:  outlined | filled | rounded
// States: default · expanded · hover · focused · disabled
//
// Props:
//   open / defaultOpen / onOpenChange — controlled/uncontrolled
//   showIcon  — show the left icon slot
//   icon      — custom icon (defaults to blue placeholder square)
//   showBadge — show badge pill in header
//   badge     — custom badge content
//   disabled  — disabled state
//   focused   — force focus ring (Storybook)
//   children  — body content slot
// ─────────────────────────────────────────────────────────────

export type AccordionStyle = 'outlined' | 'filled' | 'rounded'

export interface AccordionProps {
  style?:          AccordionStyle
  title?:          string
  /** Controlled open state */
  open?:           boolean
  /** Default open for uncontrolled usage */
  defaultOpen?:    boolean
  onOpenChange?:   (open: boolean) => void
  /** Show left icon slot */
  showIcon?:       boolean
  /** Custom icon — defaults to blue placeholder square */
  icon?:           React.ReactNode
  /** Show badge pill */
  showBadge?:      boolean
  /** Custom badge — defaults to "Badge Label" pill */
  badge?:          React.ReactNode
  disabled?:       boolean
  /** Force focused ring (Storybook only) */
  focused?:        boolean
  /** Body content */
  children?:       React.ReactNode
  /** Default body text when no children */
  content?:        string
}

export function Accordion({
  style        = 'outlined',
  title        = 'Insert an informative title text here',
  open:        controlledOpen,
  defaultOpen  = false,
  onOpenChange,
  showIcon     = true,
  icon,
  showBadge    = true,
  badge,
  disabled     = false,
  focused      = false,
  children,
  content      = 'This is the accordion content. It can contain any text or additional information relevant to the header above.',
}: AccordionProps) {

  // Controlled / uncontrolled open state
  const isControlled = controlledOpen !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = isControlled ? controlledOpen : internalOpen

  const toggle = () => {
    if (disabled) return
    const next = !isOpen
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  const headerCls = [
    'acd__header',
    `acd__header--${style}`,
    isOpen && !disabled ? 'acd__header--open' : '',
    disabled            ? 'acd__header--disabled' : '',
    focused             ? 'acd__header--focused' : '',
  ].filter(Boolean).join(' ')

  const bodyCls = [
    'acd__body',
    `acd__body--${style}`,
  ].join(' ')

  return (
    <div className="acd">
      {/* ── Header ─────────────────────────────────────────── */}
      <button
        type="button"
        className={headerCls}
        onClick={toggle}
        disabled={disabled}
        aria-expanded={isOpen}
      >
        {/* Left icon slot */}
        {showIcon && (
          <span className="acd__icon" aria-hidden="true">
            {icon ?? <span className="acd__icon-placeholder" />}
          </span>
        )}

        {/* Title + badge */}
        <div className="acd__left">
          <span className={`acd__title${disabled ? ' acd__title--disabled' : ''}`}>
            {title}
          </span>
          {showBadge && (
            <span className={`acd__badge${disabled ? ' acd__badge--disabled' : ''}`}>
              {badge ?? <span className="acd__badge-label">Badge Label</span>}
            </span>
          )}
        </div>

        {/* Chevron */}
        <ChevronDown
          size={20}
          strokeWidth={1.5}
          className={`acd__chevron${isOpen ? ' acd__chevron--open' : ''}`}
        />
      </button>

      {/* ── Body ───────────────────────────────────────────── */}
      {isOpen && (
        <div className={bodyCls}>
          <div className="acd__divider" />
          <div className="acd__body-content">
            {children ?? <p className="acd__body-text">{content}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
