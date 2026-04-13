import React from 'react'
import { Info, CircleCheck, TriangleAlert, CircleAlert, X } from 'lucide-react'
import './Toast.css'

export type ToastState = 'default' | 'success' | 'warning' | 'error'

export interface ToastProps {
  /** Severity / intent */
  state?: ToastState
  /** Primary message */
  title: string
  /** Optional secondary message below title */
  description?: string
  /** Show dismiss × button (default true) */
  dismissable?: boolean
  /** Called when dismiss button is clicked */
  onDismiss?: () => void
  /** Show action buttons row */
  showActions?: boolean
  /** Show a link-style action (text-only, blue) */
  link?: boolean
  /** Label for the link action */
  linkLabel?: string
  /** Called when link action is clicked */
  onLinkClick?: () => void
  /** Label for the primary outlined button */
  primaryLabel?: string
  /** Called when primary button is clicked */
  onPrimaryClick?: () => void
  /** Label for the secondary text button */
  secondaryLabel?: string
  /** Called when secondary button is clicked */
  onSecondaryClick?: () => void
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const stateIcon: Record<ToastState, React.ReactNode> = {
  default: <Info size={16} strokeWidth={1.5} />,
  success: <CircleCheck size={16} strokeWidth={1.5} />,
  warning: <TriangleAlert size={16} strokeWidth={1.5} />,
  error:   <CircleAlert size={16} strokeWidth={1.5} />,
}

// ── Component ─────────────────────────────────────────────────────────────────
export function Toast({
  state = 'default',
  title,
  description,
  dismissable = true,
  onDismiss,
  showActions = false,
  link = false,
  linkLabel = 'Button',
  onLinkClick,
  primaryLabel = 'Button',
  onPrimaryClick,
  secondaryLabel = 'Button',
  onSecondaryClick,
}: ToastProps) {
  const rootClass = ['toast', `toast--${state}`].join(' ')

  return (
    <div className={rootClass} role="alert">
      {/* State icon */}
      <span className="toast__icon">{stateIcon[state]}</span>

      {/* Content */}
      <div className="toast__content">
        <div className="toast__text">
          <p className="toast__title">{title}</p>
          {description && <p className="toast__description">{description}</p>}
        </div>

        {showActions && (
          <div className="toast__actions">
            {link && (
              <button className="toast__action-link" onClick={onLinkClick}>
                {linkLabel}
              </button>
            )}
            <button className="toast__action-primary" onClick={onPrimaryClick}>
              {primaryLabel}
            </button>
            <button className="toast__action-secondary" onClick={onSecondaryClick}>
              {secondaryLabel}
            </button>
          </div>
        )}
      </div>

      {/* Dismiss */}
      {dismissable && (
        <button className="toast__dismiss" onClick={onDismiss} aria-label="Dismiss">
          <X size={16} strokeWidth={1.5} />
        </button>
      )}
    </div>
  )
}
