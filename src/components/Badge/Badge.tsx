import React from 'react'
import { X, Check, BadgeAlert, Info } from 'lucide-react'
import './Badge.css'

export type BadgeType    = 'default' | 'success' | 'warning' | 'error' | 'information' | 'disabled'
export type BadgeStyle   = 'filled' | 'outlined'
export type BadgeShape   = 'rounded' | 'pill'
export type BadgeSize    = 'small' | 'medium' | 'large' | 'x-large'

export interface BadgeProps {
  /** Badge text */
  label: string
  /** Color / semantic type */
  type?: BadgeType
  /** Filled = solid bg, Outlined = border only */
  badgeStyle?: BadgeStyle
  /** Rounded = size-based radius, Pill = full pill */
  shape?: BadgeShape
  /** Size variant */
  size?: BadgeSize
  /** Show icon on the left */
  showLeftIcon?: boolean
  /** Custom left icon — overrides the type's default icon */
  leftIcon?: React.ReactNode
  /** Show icon on the right */
  showRightIcon?: boolean
  /** Custom right icon — overrides the type's default icon */
  rightIcon?: React.ReactNode
  /** Show the counter pill */
  showCount?: boolean
  /** Value shown in the counter pill (defaults to "99+") */
  count?: number | string
  /** If provided the badge renders as a <button> */
  onClick?: () => void
}

// ── Default icons per type ─────────────────────────────────────────────────────

const defaultIcon: Record<BadgeType, (size: number) => React.ReactNode> = {
  default:     (s) => <X size={s} strokeWidth={1.5} />,
  success:     (s) => <Check size={s} strokeWidth={1.5} />,
  warning:     (s) => <BadgeAlert size={s} strokeWidth={1.5} />,
  error:       (s) => <X size={s} strokeWidth={1.5} />,
  information: (s) => <Info size={s} strokeWidth={1.5} />,
  disabled:    (s) => <X size={s} strokeWidth={1.5} />,
}

const iconSize: Record<BadgeSize, number> = {
  small:   12,
  medium:  16,
  large:   16,
  'x-large': 16,
}

// ── Component ─────────────────────────────────────────────────────────────────
export function Badge({
  label,
  type = 'default',
  badgeStyle = 'filled',
  shape = 'rounded',
  size = 'medium',
  showLeftIcon = false,
  leftIcon,
  showRightIcon = false,
  rightIcon,
  showCount = false,
  count = '99+',
  onClick,
}: BadgeProps) {
  const sz = iconSize[size]
  const resolvedLeftIcon  = leftIcon  ?? defaultIcon[type](sz)
  const resolvedRightIcon = rightIcon ?? defaultIcon[type](sz)

  const rootClass = [
    'badge',
    `badge--size-${size}`,
    `badge--type-${type}`,
    `badge--style-${badgeStyle}`,
    shape === 'pill' ? 'badge--pill' : '',
    onClick ? 'badge--interactive' : '',
  ].filter(Boolean).join(' ')

  const content = (
    <>
      {showLeftIcon  && <span className="badge__icon">{resolvedLeftIcon}</span>}
      <span className="badge__label">{label}</span>
      {showRightIcon && <span className="badge__icon">{resolvedRightIcon}</span>}
      {showCount && (
        <span className="badge__count">{count}</span>
      )}
    </>
  )

  if (onClick) {
    return <button className={rootClass} onClick={onClick}>{content}</button>
  }
  return <span className={rootClass}>{content}</span>
}
