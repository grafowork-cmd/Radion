import React, { createContext, useContext } from 'react'
import './ButtonGroup.css'

export type ButtonGroupSize = 'small' | 'medium' | 'large'

// ── Context ─────────────────────────────────────────────────────────────────
const ButtonGroupContext = createContext<{ size: ButtonGroupSize }>({ size: 'medium' })

// ── Types ────────────────────────────────────────────────────────────────────
export interface ButtonGroupProps {
  /** Applies to all items unless overridden */
  size?: ButtonGroupSize
  children: React.ReactNode
}

export interface ButtonGroupItemProps {
  /** Disabled state */
  disabled?: boolean
  /** Show left icon */
  iconLeft?: boolean
  /** Show right icon */
  iconRight?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

// ── Icon sizes ────────────────────────────────────────────────────────────────
const iconSizePx: Record<ButtonGroupSize, number> = {
  small: 16, medium: 20, large: 24,
}

const AddIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

// ── ButtonGroup wrapper ───────────────────────────────────────────────────────
export function ButtonGroup({ size = 'medium', children }: ButtonGroupProps) {
  return (
    <ButtonGroupContext.Provider value={{ size }}>
      <div className={`bgrp bgrp--${size}`} role="group">
        {children}
      </div>
    </ButtonGroupContext.Provider>
  )
}

// ── ButtonGroupItem ───────────────────────────────────────────────────────────
export function ButtonGroupItem({
  disabled  = false,
  iconLeft  = false,
  iconRight = false,
  children  = 'Button',
  onClick,
}: ButtonGroupItemProps) {
  const { size } = useContext(ButtonGroupContext)
  const iconSz = iconSizePx[size]

  return (
    <button
      className="bgrp__item"
      disabled={disabled}
      onClick={onClick}
    >
      {iconLeft  && <span className="bgrp__icon"><AddIcon size={iconSz} /></span>}
      <span className="bgrp__label">{children}</span>
      {iconRight && <span className="bgrp__icon"><AddIcon size={iconSz} /></span>}
    </button>
  )
}
