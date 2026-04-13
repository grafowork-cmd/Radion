import React from 'react'
import { X } from 'lucide-react'
import { CheckboxGroup } from '../Checkbox/Checkbox'
import './Tag.css'

// ─────────────────────────────────────────────────────────────
// Tag — from Figma node 1770:21097
//
// Props:
//   size     — 'sm' | 'md' | 'lg'
//   action   — 'text-only' | 'x-close' | 'count'
//   icon     — 'none' | 'dot'
//   checkbox — show checkbox on left
//   label    — text label
//   count    — number shown in count badge
//   dotColor — color for dot icon
//   checked  — checkbox checked state (controlled)
//   defaultChecked — checkbox default state
//   onClose  — callback for X close button
//   onCheck  — callback for checkbox change
// ─────────────────────────────────────────────────────────────

export type TagSize   = 'sm' | 'md' | 'lg'
export type TagAction = 'text-only' | 'x-close' | 'count'
export type TagIcon   = 'none' | 'dot'

export interface TagProps {
  size?:           TagSize
  action?:         TagAction
  icon?:           TagIcon
  checkbox?:       boolean
  label?:          string
  count?:          number
  dotColor?:       string
  checked?:        boolean
  defaultChecked?: boolean
  onClose?:        () => void
  onCheck?:        (checked: boolean) => void
}

export function Tag({
  size           = 'md',
  action         = 'text-only',
  icon           = 'none',
  checkbox       = false,
  label          = 'Label',
  count          = 5,
  dotColor       = 'rgb(0, 102, 255)',
  checked,
  defaultChecked = false,
  onClose,
  onCheck,
}: TagProps) {

  const iconSize = size === 'lg' ? 20 : 16

  return (
    <div className={`tag tag--${size}`}>

      {/* Checkbox — reuses the CheckboxGroup atom with label hidden.
          The cbx__box outer is 26×26 (4px hover-bg padding around 18×18 visual).
          A -4px margin wrapper trims that transparent space from layout. */}
      {checkbox && (
        <span className="tag__checkbox-wrap">
          <CheckboxGroup
            showLabel={false}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onCheck}
          />
        </span>
      )}

      {/* Dot icon */}
      {icon === 'dot' && (
        <span
          className={`tag__dot`}
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
      )}

      {/* Label */}
      <span className="tag__label">{label}</span>

      {/* Count badge */}
      {action === 'count' && (
        <span className={`tag__count tag__count--${size}`}>{count}</span>
      )}

      {/* X close */}
      {action === 'x-close' && (
        <button
          type="button"
          className="tag__close"
          onClick={onClose}
          aria-label="Remove tag"
        >
          <X size={iconSize} strokeWidth={1.5} />
        </button>
      )}

    </div>
  )
}
