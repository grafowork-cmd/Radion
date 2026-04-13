import React, { useState } from 'react'
import { ChevronRight, ArrowRight, Home } from 'lucide-react'
import './Breadcrumb.css'

// ─── Types ────────────────────────────────────────────────────────────────────
export type BreadcrumbStyle         = 'link' | 'box' | 'outlined' | 'filled'
export type BreadcrumbIndicatorType = 'chevron' | 'slash' | 'dot' | 'arrow'
export type BreadcrumbType          = 'default' | 'icon'

export interface BreadcrumbItem {
  label:     string
  href?:     string
  onClick?:  () => void
  disabled?: boolean
}

export interface BreadcrumbProps {
  items:        BreadcrumbItem[]
  /** Whether the first item is replaced with a home icon */
  type?:        BreadcrumbType
  /** Visual container style */
  style?:       BreadcrumbStyle
  /** Separator between items */
  indicator?:   BreadcrumbIndicatorType
  onItemClick?: (item: BreadcrumbItem, index: number) => void
}

// ─── Indicator ────────────────────────────────────────────────────────────────
function Indicator({ type }: { type: BreadcrumbIndicatorType }) {
  if (type === 'chevron') return (
    <span className="bc-sep" aria-hidden>
      <ChevronRight size={16} strokeWidth={2} />
    </span>
  )
  if (type === 'slash') return (
    <span className="bc-sep bc-sep--slash" aria-hidden>/</span>
  )
  if (type === 'dot') return (
    <span className="bc-sep bc-sep--dot" aria-hidden>
      <span className="bc-dot" />
    </span>
  )
  // arrow
  return (
    <span className="bc-sep" aria-hidden>
      <ArrowRight size={14} strokeWidth={2} />
    </span>
  )
}

// ─── Single breadcrumb item ───────────────────────────────────────────────────
function BreadcrumbLink({
  item,
  active,
  style,
  onClick,
}: {
  item:    BreadcrumbItem
  active:  boolean
  style:   BreadcrumbStyle
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const stateClass = item.disabled
    ? 'bc-item--disabled'
    : active
    ? 'bc-item--active'
    : hovered
    ? 'bc-item--hover'
    : 'bc-item--default'

  const styleClass = style === 'outlined'
    ? `bc-item--outlined${active ? ' bc-item--outlined-active' : ''}`
    : style === 'filled'
    ? `bc-item--filled${active ? ' bc-item--filled-active' : ''}`
    : ''

  const Tag = item.href && !item.disabled ? 'a' : 'button'

  return (
    <Tag
      className={`bc-item ${stateClass} ${styleClass}`}
      href={Tag === 'a' ? item.href : undefined}
      onClick={item.disabled ? undefined : onClick}
      onMouseEnter={() => !item.disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-current={active ? 'page' : undefined}
      aria-disabled={item.disabled}
      tabIndex={item.disabled ? -1 : undefined}
    >
      <span className="bc-item-text">{item.label}</span>
    </Tag>
  )
}

// ─── Home icon item ───────────────────────────────────────────────────────────
function HomeIcon({
  active,
  style,
  onClick,
}: {
  active:  boolean
  style:   BreadcrumbStyle
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const stateClass = active
    ? 'bc-item--active'
    : hovered
    ? 'bc-item--hover'
    : 'bc-item--default'

  const styleClass = style === 'outlined'
    ? `bc-item--outlined${active ? ' bc-item--outlined-active' : ''}`
    : style === 'filled'
    ? `bc-item--filled${active ? ' bc-item--filled-active' : ''}`
    : ''

  return (
    <button
      className={`bc-item bc-item--icon ${stateClass} ${styleClass}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Home"
    >
      <Home size={16} strokeWidth={1.75} />
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function Breadcrumb({
  items        = [],
  type         = 'default',
  style        = 'link',
  indicator    = 'chevron',
  onItemClick,
}: BreadcrumbProps) {
  if (!items.length) return null

  function handleClick(item: BreadcrumbItem, idx: number) {
    item.onClick?.()
    onItemClick?.(item, idx)
  }

  const nodes: React.ReactNode[] = []

  items.forEach((item, idx) => {
    const isFirst  = idx === 0
    const isActive = idx === items.length - 1

    if (isFirst && type === 'icon') {
      nodes.push(
        <HomeIcon
          key={`home`}
          active={isActive}
          style={style}
          onClick={() => handleClick(item, idx)}
        />
      )
    } else {
      nodes.push(
        <BreadcrumbLink
          key={idx}
          item={item}
          active={isActive}
          style={style}
          onClick={() => handleClick(item, idx)}
        />
      )
    }

    if (!isActive) {
      nodes.push(<Indicator key={`sep-${idx}`} type={indicator} />)
    }
  })

  return (
    <nav className={`bc-root bc-root--${style}`} aria-label="Breadcrumb">
      <ol className="bc-list">
        {nodes}
      </ol>
    </nav>
  )
}
