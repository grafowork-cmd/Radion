import React from 'react'
import { Plus } from 'lucide-react'
import './Button.css'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outlined'
  | 'text'
  | 'text-secondary'
  | 'default'

export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps {
  /** Visual style — matches Figma Type axis */
  variant?: ButtonVariant
  /** Size — Large=48px, Medium=40px, Small=32px */
  size?: ButtonSize
  /** Destructive compatibility — turns the button red */
  destructive?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Show left icon */
  iconLeft?: boolean
  /** Show right icon */
  iconRight?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

const iconSize: Record<ButtonSize, number> = {
  large: 24, medium: 20, small: 16,
}


export function Button({
  variant = 'primary',
  size = 'large',
  destructive = false,
  disabled = false,
  iconLeft = false,
  iconRight = false,
  children = 'Button',
  onClick,
}: ButtonProps) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    destructive && variant !== 'text-secondary' ? 'btn--destructive' : '',
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {iconLeft && <span className="btn__icon"><Plus size={iconSize[size]} strokeWidth={1.5} /></span>}
      {children}
      {iconRight && <span className="btn__icon"><Plus size={iconSize[size]} strokeWidth={1.5} /></span>}
    </button>
  )
}
