import React from 'react'
import './Tooltip.css'

// ─────────────────────────────────────────────────────────────
// Tooltip — from Figma node 1838:16801
//
// Types:
//   default      — small label text, 91px wide body
//   dual-text    — two columns (left | right), 91px each
//   comprehensive — large title + content slot + optional button
//
// Directions (where the arrow appears on the tooltip body):
//   top-left    top-middle    top-right
//   bottom-left bottom-middle bottom-right
//   left        right
// ─────────────────────────────────────────────────────────────

export type TooltipType      = 'default' | 'dual-text' | 'comprehensive'
export type TooltipDirection =
  | 'top-left'    | 'top-middle'    | 'top-right'
  | 'bottom-left' | 'bottom-middle' | 'bottom-right'
  | 'left'        | 'right'

export interface TooltipProps {
  type?:          TooltipType
  direction?:     TooltipDirection
  /** Label text — default type, or left column in dual-text */
  label?:         string
  /** Right column label — dual-text only */
  labelRight?:    string
  /** Large heading — comprehensive only */
  title?:         string
  /** Content slot — comprehensive only */
  content?:       React.ReactNode
  /** Show action button — comprehensive only */
  showButton?:    boolean
  /** Button label — comprehensive only */
  buttonLabel?:   string
  onButtonClick?: () => void
}

// ── Arrow helpers ────────────────────────────────────────────

type ArrowAlign = 'left' | 'middle' | 'right'
type ArrowEdge  = 'top' | 'bottom' | 'left-side' | 'right-side'

function Arrow({ edge, align }: { edge: ArrowEdge; align?: ArrowAlign }) {
  if (edge === 'top' || edge === 'bottom') {
    return (
      <div
        className={[
          'tt__arrow-row',
          `tt__arrow-row--${edge}`,
          align ? `tt__arrow-row--${align}` : '',
        ].filter(Boolean).join(' ')}
      >
        <div className={`tt__arrow tt__arrow--${edge}`} />
      </div>
    )
  }
  return (
    <div className={`tt__arrow-side tt__arrow-side--${edge}`}>
      <div className={`tt__arrow tt__arrow--${edge}`} />
    </div>
  )
}

// ── Main component ───────────────────────────────────────────

export function Tooltip({
  type      = 'default',
  direction = 'bottom-left',
  label     = 'Default Label',
  labelRight = 'Default Label',
  title     = 'Default Label',
  content,
  showButton  = true,
  buttonLabel = 'Button',
  onButtonClick,
}: TooltipProps) {

  const isHorizontal = direction === 'left' || direction === 'right'
  const isTop        = direction.startsWith('top')
  const isBottom     = direction.startsWith('bottom')
  const isLeft       = direction === 'left'
  const isRight      = direction === 'right'

  const align: ArrowAlign =
    direction.endsWith('left')   ? 'left'   :
    direction.endsWith('middle') ? 'middle' : 'right'

  const outerClass = [
    'tt',
    `tt--${type}`,
    `tt--${direction}`,
    isHorizontal ? 'tt--horizontal' : 'tt--vertical',
  ].join(' ')

  return (
    <div className={outerClass}>
      {/* Arrow above body (top directions) */}
      {isTop  && <Arrow edge="top" align={align} />}
      {/* Arrow left of body (left direction) */}
      {isLeft && <Arrow edge="left-side" />}

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="tt__body">

        {/* Default: single label */}
        {type === 'default' && (
          <p className="tt__label">{label}</p>
        )}

        {/* Dual Text: two columns */}
        {type === 'dual-text' && (
          <div className="tt__dual">
            <div className="tt__dual-col tt__dual-col--left">
              <p className="tt__label">{label}</p>
            </div>
            <div className="tt__dual-col tt__dual-col--right">
              <p className="tt__label">{labelRight}</p>
            </div>
          </div>
        )}

        {/* Comprehensive: title + content + button */}
        {type === 'comprehensive' && (
          <div className="tt__comprehensive">
            <p className="tt__title">{title}</p>
            {content && (
              <div className="tt__content">{content}</div>
            )}
            {showButton && (
              <button
                type="button"
                className="tt__action-btn"
                onClick={onButtonClick}
              >
                {buttonLabel}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Arrow right of body (right direction) */}
      {isRight  && <Arrow edge="right-side" />}
      {/* Arrow below body (bottom directions) */}
      {isBottom && <Arrow edge="bottom" align={align} />}
    </div>
  )
}
