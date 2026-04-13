import React, { useId, useState, useCallback, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import './Pagination.css'

// ─────────────────────────────────────────────────────────────
// Pagination — from Figma node 3294:25410
//
// Types:
//   web           — rows-per-page dropdown + showing text +
//                   prev / page numbers / next
//   mobile-items  — prev / showing text / next
//   mobile-pages  — prev / page input / total / next
// ─────────────────────────────────────────────────────────────

export type PaginationType = 'web' | 'mobile-items' | 'mobile-pages'

export interface PaginationProps {
  type?:                 PaginationType
  /** Currently active page (1-based, controlled) */
  currentPage?:          number
  /** Default page for uncontrolled usage */
  defaultPage?:          number
  /** Total number of pages */
  totalPages?:           number
  /** Total number of items */
  totalItems?:           number
  /** Items shown per page (controlled) */
  rowsPerPage?:          number
  /** Default rows per page for uncontrolled usage */
  defaultRowsPerPage?:   number
  /** Options for rows-per-page dropdown */
  rowsPerPageOptions?:   number[]
  onPageChange?:         (page: number) => void
  onRowsPerPageChange?:  (rows: number) => void
}

// ── Page window helper ────────────────────────────────────────

function getPageWindows(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, '...', total]
  if (current >= total - 3) return [1, '...', total - 3, total - 2, total - 1, total]
  return [1, '...', current - 1, current, current + 1, '...', total]
}

// ── Page button atom ──────────────────────────────────────────

function PageBtn({
  label, active, disabled, onClick,
}: {
  label: string | number
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      className={[
        'pgn__page-btn',
        active    ? 'pgn__page-btn--active'   : '',
        disabled  ? 'pgn__page-btn--disabled' : '',
        label === '...' ? 'pgn__page-btn--ellipsis' : '',
      ].filter(Boolean).join(' ')}
      disabled={disabled || label === '...'}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      {typeof label === 'number' ? String(label).padStart(2, '0') : label}
    </button>
  )
}

// ── Chevron nav button ────────────────────────────────────────

function NavBtn({ dir, disabled, onClick }: {
  dir: 'prev' | 'next'
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      className={['pgn__nav-btn', disabled ? 'pgn__nav-btn--disabled' : ''].filter(Boolean).join(' ')}
      disabled={disabled}
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Previous page' : 'Next page'}
    >
      {dir === 'prev'
        ? <ChevronLeft  size={20} strokeWidth={1.5} />
        : <ChevronRight size={20} strokeWidth={1.5} />}
    </button>
  )
}

// ── Main component ────────────────────────────────────────────

export function Pagination({
  type               = 'web',
  currentPage:       controlledPage,
  defaultPage        = 1,
  totalPages         = 10,
  totalItems         = 500,
  rowsPerPage:       controlledRows,
  defaultRowsPerPage = 50,
  rowsPerPageOptions = [10, 25, 50, 100],
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) {

  // ── Controlled / uncontrolled page ─────────────────────────
  const isPageControlled = controlledPage !== undefined
  const [internalPage, setInternalPage] = useState(defaultPage)
  const page = isPageControlled ? controlledPage : internalPage

  // ── Controlled / uncontrolled rows ─────────────────────────
  const isRowsControlled = controlledRows !== undefined
  const [internalRows, setInternalRows] = useState(defaultRowsPerPage)
  const rows = isRowsControlled ? controlledRows : internalRows

  // ── Rows dropdown open state ────────────────────────────────
  const [rowsOpen, setRowsOpen] = useState(false)
  const rowsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rowsOpen) return
    const handler = (e: MouseEvent) => {
      if (!rowsRef.current?.contains(e.target as Node)) setRowsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [rowsOpen])

  // ── Mobile-pages input state ────────────────────────────────
  const [pageInput, setPageInput] = useState(String(page))
  useEffect(() => { setPageInput(String(page)) }, [page])

  const goTo = useCallback((p: number) => {
    const clamped = Math.max(1, Math.min(p, totalPages))
    if (!isPageControlled) setInternalPage(clamped)
    onPageChange?.(clamped)
  }, [isPageControlled, totalPages, onPageChange])

  const setRows = useCallback((r: number) => {
    if (!isRowsControlled) setInternalRows(r)
    onRowsPerPageChange?.(r)
    setRowsOpen(false)
    goTo(1) // reset to page 1 on rows change
  }, [isRowsControlled, onRowsPerPageChange, goTo])

  // ── Derived ─────────────────────────────────────────────────
  const showFrom  = (page - 1) * rows + 1
  const showTo    = Math.min(page * rows, totalItems)
  const pages     = getPageWindows(page, totalPages)

  // ── Render ──────────────────────────────────────────────────

  return (
    <div className={`pgn pgn--${type}`}>

      {/* ── WEB ─────────────────────────────────────────────── */}
      {type === 'web' && (
        <>
          {/* Left side: rows-per-page + showing text */}
          <div className="pgn__details">
            {/* Rows per page */}
            <div className="pgn__rows-wrap" ref={rowsRef}>
              <span className="pgn__rows-label">Rows Per Page</span>
              <div
                className={`pgn__rows-select${rowsOpen ? ' pgn__rows-select--open' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => setRowsOpen(o => !o)}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setRowsOpen(o => !o)}
              >
                <span className="pgn__rows-value">{rows}</span>
                <ChevronDown size={16} strokeWidth={1.5} className={`pgn__rows-chevron${rowsOpen ? ' pgn__rows-chevron--open' : ''}`} />

                {rowsOpen && (
                  <ul className="pgn__rows-menu" role="listbox">
                    {rowsPerPageOptions.map(opt => (
                      <li
                        key={opt}
                        role="option"
                        aria-selected={opt === rows}
                        className={`pgn__rows-option${opt === rows ? ' pgn__rows-option--selected' : ''}`}
                        onMouseDown={e => { e.preventDefault(); setRows(opt) }}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Showing results */}
            <p className="pgn__showing">Showing <strong>{showFrom}–{showTo}</strong> of <strong>{totalItems}</strong></p>
          </div>

          {/* Right side: prev + page numbers + next */}
          <div className="pgn__controls">
            <NavBtn dir="prev" disabled={page <= 1} onClick={() => goTo(page - 1)} />
            <div className="pgn__pages">
              {pages.map((p, i) => (
                <PageBtn
                  key={`${p}-${i}`}
                  label={p}
                  active={p === page}
                  onClick={p !== '...' ? () => goTo(p as number) : undefined}
                />
              ))}
            </div>
            <NavBtn dir="next" disabled={page >= totalPages} onClick={() => goTo(page + 1)} />
          </div>
        </>
      )}

      {/* ── MOBILE — ITEMS ──────────────────────────────────── */}
      {type === 'mobile-items' && (
        <>
          <NavBtn dir="prev" disabled={page <= 1} onClick={() => goTo(page - 1)} />
          <p className="pgn__showing pgn__showing--mobile">Showing <strong>{showFrom}–{showTo}</strong> of <strong>{totalItems}</strong></p>
          <NavBtn dir="next" disabled={page >= totalPages} onClick={() => goTo(page + 1)} />
        </>
      )}

      {/* ── MOBILE — PAGES ──────────────────────────────────── */}
      {type === 'mobile-pages' && (
        <>
          <NavBtn dir="prev" disabled={page <= 1} onClick={() => goTo(page - 1)} />
          <div className="pgn__page-input-wrap">
            <input
              type="text"
              inputMode="numeric"
              className="pgn__page-input"
              value={pageInput}
              onChange={e => setPageInput(e.target.value)}
              onBlur={() => {
                const n = parseInt(pageInput, 10)
                if (!isNaN(n)) goTo(n)
                else setPageInput(String(page))
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const n = parseInt(pageInput, 10)
                  if (!isNaN(n)) goTo(n)
                  else setPageInput(String(page))
                }
              }}
              aria-label="Go to page"
            />
            <span className="pgn__page-total">/ {totalPages}</span>
          </div>
          <NavBtn dir="next" disabled={page >= totalPages} onClick={() => goTo(page + 1)} />
        </>
      )}

    </div>
  )
}
