import React from 'react'
import './ProgressBar.css'

// ─── Types ────────────────────────────────────────────────────────────────────
export type ProgressBarSize     = 'large' | 'medium' | 'small'
export type ProgressBarPosition = 'top' | 'center' | 'bottom'

export interface ProgressBarProps {
  /** Progress value 0–100 */
  value?:           number
  size?:            ProgressBarSize
  /** Where the percentage label appears relative to the bar */
  position?:        ProgressBarPosition
  label?:           string
  description?:     string
  showLabel?:       boolean
  showPercentage?:  boolean
  showDescription?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ProgressBar({
  value           = 0,
  size            = 'large',
  position        = 'top',
  label           = 'Progress Bar Label',
  description     = 'Description goes here',
  showLabel       = true,
  showPercentage  = true,
  showDescription = true,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value))

  const bar = (
    <div className={`pb-track pb-track--${size}`}>
      <div
        className="pb-fill"
        style={{ width: `${pct}%` }}
      />
    </div>
  )

  const labelEl = showLabel && (
    <span className="pb-label">{label}</span>
  )

  const pctEl = showPercentage && (
    <span className="pb-pct">{pct}%</span>
  )

  const descEl = showDescription && (
    <div className="pb-description">
      <span className="pb-desc-text">{description}</span>
    </div>
  )

  return (
    <div className={`pb-root pb-root--${size}`}>

      {/* ── Top: label+pct row above bar ── */}
      {position === 'top' && (
        <>
          {(showLabel || showPercentage) && (
            <div className="pb-header">
              {labelEl}
              {pctEl}
            </div>
          )}
          {bar}
          {descEl}
        </>
      )}

      {/* ── Center: label above, pct inline right of bar ── */}
      {position === 'center' && (
        <>
          {showLabel && (
            <div className="pb-header">
              {labelEl}
            </div>
          )}
          <div className="pb-bar-row">
            {bar}
            {pctEl}
          </div>
          {descEl}
        </>
      )}

      {/* ── Bottom: bar first, then label+pct below ── */}
      {position === 'bottom' && (
        <>
          {bar}
          {(showLabel || showPercentage) && (
            <div className="pb-header">
              {labelEl}
              {pctEl}
            </div>
          )}
          {descEl}
        </>
      )}

    </div>
  )
}
