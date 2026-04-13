import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar, ChevronDown } from 'lucide-react'
import './DatePicker.css'

// ─── Types ────────────────────────────────────────────────────────────────────
export type DatePickerMode = 'single' | 'range'

type DayState =
  | 'header'
  | 'default'
  | 'outside'
  | 'today'
  | 'selected'
  | 'range-start'
  | 'range-end'
  | 'in-range'
  | 'range-single'   // start === end

export interface DatePickerProps {
  mode?:            DatePickerMode
  /** Controlled selected date (single mode) */
  value?:           Date | null
  /** Controlled range start (range mode) */
  startDate?:       Date | null
  /** Controlled range end (range mode) */
  endDate?:         Date | null
  onChange?:        (date: Date | null) => void
  onRangeChange?:   (start: Date | null, end: Date | null) => void
  showInput?:       boolean
  showTimePicker?:  boolean
  showActions?:     boolean
  onCancel?:        () => void
  onApply?:         () => void
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAY_HEADERS = ['Su','Mo','Tu','We','Th','Fr','Sa']

function isSameDay(a: Date | null | undefined, b: Date | null | undefined) {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate()
  )
}

function isToday(d: Date) {
  return isSameDay(d, new Date())
}

/** Returns 42 Date objects covering 6 weeks for the given year/month view. */
function getCalendarDays(year: number, month: number): Date[] {
  const firstDay   = new Date(year, month, 1)
  const startOffset = firstDay.getDay() // 0 = Sunday
  const days: Date[] = []

  for (let i = startOffset - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i))
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d))
  }

  const remaining = 42 - days.length
  for (let d = 1; d <= remaining; d++) {
    days.push(new Date(year, month + 1, d))
  }

  return days
}

function formatDate(d: Date | null) {
  if (!d) return ''
  const mm   = String(d.getMonth() + 1).padStart(2, '0')
  const dd   = String(d.getDate()).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${mm} / ${dd} / ${yyyy}`
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function InputField({ label, value }: { label: string; value: string }) {
  return (
    <div className="dp-input-group">
      <span className="dp-input-label">{label}</span>
      <div className="dp-input-field">
        <span className={`dp-input-text${value ? ' dp-input-text--filled' : ''}`}>
          {value || '00 / 00 / 0000'}
        </span>
        <Calendar size={20} strokeWidth={1.75} className="dp-input-icon" />
      </div>
    </div>
  )
}

function TimeSelect({
  label,
  value,
  options,
  onChange,
}: {
  label?: string
  value: string | number
  options: (string | number)[]
  onChange: (v: string) => void
}) {
  return (
    <div className="dp-time-group">
      {label && <span className="dp-time-label">{label}</span>}
      <div className="dp-time-select-wrap">
        <select
          className="dp-time-select"
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {options.map(o => (
            <option key={o} value={o}>
              {String(o).padStart(2, '0')}
            </option>
          ))}
        </select>
        <ChevronDown size={16} strokeWidth={1.75} className="dp-time-chevron" />
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function DatePicker({
  mode            = 'single',
  value           = null,
  startDate       = null,
  endDate         = null,
  onChange,
  onRangeChange,
  showInput       = true,
  showTimePicker  = false,
  showActions     = true,
  onCancel,
  onApply,
}: DatePickerProps) {
  const today = new Date()

  // ── View state — initialize to the provided date if given, else today ──
  const initialView = value ?? startDate ?? today
  const [viewYear,  setViewYear]  = useState(initialView.getFullYear())
  const [viewMonth, setViewMonth] = useState(initialView.getMonth())

  // ── Selection state (uncontrolled; ignores controlled props after mount) ──
  const [selectedDate, setSelectedDate] = useState<Date | null>(value)
  const [rangeStart,   setRangeStart]   = useState<Date | null>(startDate)
  const [rangeEnd,     setRangeEnd]     = useState<Date | null>(endDate)
  const [hoverDate,    setHoverDate]    = useState<Date | null>(null)
  const [selectingEnd, setSelectingEnd] = useState(false)

  // ── Time state ──
  const HOURS   = Array.from({ length: 12 }, (_, i) => i + 1)
  const MINS    = Array.from({ length: 60 }, (_, i) => i)
  const PERIODS = ['AM', 'PM']

  const [hours,   setHours]   = useState(12)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [period,  setPeriod]  = useState<'AM' | 'PM'>('AM')

  // ── Navigation ──
  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  // ── Day click ──
  function handleDayClick(day: Date, state: DayState) {
    if (state === 'outside') return

    if (mode === 'single') {
      setSelectedDate(day)
      onChange?.(day)
      return
    }

    // Range mode: first click = start, second click = end
    if (!selectingEnd) {
      setRangeStart(day)
      setRangeEnd(null)
      setSelectingEnd(true)
      onRangeChange?.(day, null)
    } else {
      let start = rangeStart!
      let end   = day
      if (day < start) { [start, end] = [day, start] }
      setRangeStart(start)
      setRangeEnd(end)
      setSelectingEnd(false)
      onRangeChange?.(start, end)
    }
  }

  // ── Day state ──
  function getDayState(day: Date): DayState {
    const inView = day.getMonth() === viewMonth && day.getFullYear() === viewYear
    if (!inView) return 'outside'

    if (mode === 'single') {
      if (isSameDay(day, selectedDate)) return 'selected'
      if (isToday(day)) return 'today'
      return 'default'
    }

    // Range mode — use hover preview while picking end
    const previewEnd = rangeEnd ?? (selectingEnd && hoverDate ? hoverDate : null)
    const rs = rangeStart
    const re = previewEnd

    if (isSameDay(day, rs) && isSameDay(day, re)) return 'range-single'
    if (isSameDay(day, rs)) return re ? 'range-start' : 'selected'
    if (isSameDay(day, re)) return 'range-end'

    if (rs && re) {
      const lo = rs < re ? rs : re
      const hi = rs < re ? re : rs
      if (day > lo && day < hi) return 'in-range'
    }

    if (isToday(day)) return 'today'
    return 'default'
  }

  const days = getCalendarDays(viewYear, viewMonth)

  return (
    <div className={`dp-root${mode === 'range' ? ' dp-root--range' : ''}`}>

      {/* ── Date input(s) ── */}
      {showInput && mode === 'single' && (
        <InputField label="Date" value={formatDate(selectedDate)} />
      )}

      {showInput && mode === 'range' && (
        <div className="dp-inputs-row">
          <InputField label="Start Date" value={formatDate(rangeStart)} />
          <InputField label="End Date"   value={formatDate(rangeEnd)}   />
        </div>
      )}

      {/* ── Calendar panel ── */}
      <div className="dp-calendar">

        {/* Header */}
        <div className="dp-header">
          <span className="dp-header-label">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <div className="dp-nav-group">
            <button className="dp-nav-btn" onClick={prevMonth} aria-label="Previous month">
              <ChevronLeft size={20} strokeWidth={1.75} />
            </button>
            <button className="dp-nav-btn" onClick={nextMonth} aria-label="Next month">
              <ChevronRight size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div className="dp-divider" />

        {/* Grid */}
        <div className="dp-grid">
          {/* Day headers */}
          {DAY_HEADERS.map(h => (
            <div key={h} className="dp-cell dp-cell--header">
              <span className="dp-cell-inner">{h}</span>
            </div>
          ))}

          {/* Day cells */}
          {days.map((day, idx) => {
            const state = getDayState(day)
            return (
              <div
                key={idx}
                className={`dp-cell dp-cell--${state}`}
                onClick={() => handleDayClick(day, state)}
                onMouseEnter={() => {
                  if (mode === 'range' && selectingEnd) setHoverDate(day)
                }}
                onMouseLeave={() => {
                  if (mode === 'range') setHoverDate(null)
                }}
              >
                <span className="dp-cell-inner">{day.getDate()}</span>
              </div>
            )
          })}
        </div>

        {/* Time picker */}
        {showTimePicker && (
          <>
            <div className="dp-divider" />
            <div className="dp-time">
              <TimeSelect
                label="Hours"
                value={hours}
                options={HOURS}
                onChange={v => setHours(Number(v))}
              />
              <span className="dp-time-colon">:</span>
              <TimeSelect
                label="Minutes"
                value={minutes}
                options={MINS}
                onChange={v => setMinutes(Number(v))}
              />
              <span className="dp-time-colon">:</span>
              <TimeSelect
                label="Seconds"
                value={seconds}
                options={MINS}
                onChange={v => setSeconds(Number(v))}
              />
              <TimeSelect
                value={period}
                options={PERIODS}
                onChange={v => setPeriod(v as 'AM' | 'PM')}
              />
            </div>
          </>
        )}

        {/* Actions */}
        {showActions && (
          <>
            <div className="dp-divider" />
            <div className="dp-actions">
              <button className="dp-btn dp-btn--cancel" onClick={onCancel}>
                Cancel
              </button>
              <button className="dp-btn dp-btn--apply" onClick={onApply}>
                Apply changes
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
