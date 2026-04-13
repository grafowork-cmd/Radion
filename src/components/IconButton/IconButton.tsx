import React from 'react'
import { Plus } from 'lucide-react'
import './IconButton.css'

export type IconButtonVariant = 'primary' | 'secondary' | 'default' | 'symbol'
export type IconButtonSize    = 'small' | 'medium' | 'large'
export type IconButtonShape   = 'square' | 'round'

export interface IconButtonProps {
  /** Visual style */
  variant?: IconButtonVariant
  /** Size — Large=48px, Medium=40px, Small=32px */
  size?: IconButtonSize
  /** Shape — square (rounded corners) or round (pill) */
  shape?: IconButtonShape
  /** Destructive — red palette. Supported on primary, secondary, symbol */
  destructive?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Icon content — defaults to a + icon */
  icon?: React.ReactNode
  onClick?: () => void
  'aria-label'?: string
}

const iconSizePx: Record<IconButtonSize, number> = {
  small: 16, medium: 20, large: 24,
}


export function IconButton({
  variant     = 'primary',
  size        = 'medium',
  shape       = 'square',
  destructive = false,
  disabled    = false,
  icon,
  onClick,
  'aria-label': ariaLabel,
}: IconButtonProps) {
  const classes = [
    'ibtn',
    `ibtn--${variant}`,
    `ibtn--${size}`,
    `ibtn--${shape}`,
    destructive && variant !== 'default' ? 'ibtn--destructive' : '',
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className="ibtn__icon">
        {icon ?? <Plus size={iconSizePx[size]} strokeWidth={1.5} />}
      </span>
    </button>
  )
}
