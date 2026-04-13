import React, { useRef, useState, useCallback } from 'react'
import {
  UploadCloud, Upload, FileText,
  XCircle, Trash2, RefreshCw,
  CheckCircle2, AlertTriangle, AlertCircle,
} from 'lucide-react'
import './FileUpload.css'

// ─── Prompt types ─────────────────────────────────────────────────────────────
export type FileUploadPromptType = 'drop-drag' | 'browse-files' | 'drag-or-browse'

export interface FileUploadPromptProps {
  type?:      FileUploadPromptType
  hint?:      string
  accept?:    string
  disabled?:  boolean
  onChange?:  (files: FileList) => void
}

// ─── Upload item types ────────────────────────────────────────────────────────
export type FileUploadItemStyle = 'blanked' | 'lined' | 'outlined'
export type FileUploadItemState = 'uploading' | 'uploaded' | 'error'

export interface FileUploadItemProps {
  style?:         FileUploadItemStyle
  state?:         FileUploadItemState
  filename?:      string
  fileSize?:      string
  /** 0–100 */
  progress?:      number
  errorMessage?:  string
  onCancel?:      () => void
  onDelete?:      () => void
  onRetry?:       () => void
}

// ─── FileUploadPrompt ─────────────────────────────────────────────────────────
export function FileUploadPrompt({
  type     = 'drop-drag',
  hint     = 'PNG, JPG, GIF up to 5MB',
  accept,
  disabled = false,
  onChange,
}: FileUploadPromptProps) {
  const inputRef   = useRef<HTMLInputElement>(null)
  const [dragging, setDragging]  = useState(false)
  const [focused,  setFocused]   = useState(false)

  const visualState = disabled ? 'disabled'
    : dragging        ? 'hovered'
    : focused         ? 'focused'
    : 'default'

  const handleFiles = useCallback((files: FileList | null) => {
    if (files && files.length > 0) onChange?.(files)
  }, [onChange])

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    if (!disabled) setDragging(true)
  }
  function handleDragLeave() { setDragging(false) }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    if (!disabled) handleFiles(e.dataTransfer.files)
  }
  function handleClick() {
    if (!disabled) inputRef.current?.click()
  }
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') handleClick()
  }
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFiles(e.target.files)
    e.target.value = ''
  }

  const rootClass = [
    'fu-prompt',
    `fu-prompt--${type}`,
    `fu-prompt--${visualState}`,
  ].join(' ')

  // ── Drop and Drag ──
  if (type === 'drop-drag') {
    return (
      <div
        className={rootClass}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <UploadCloud
          size={32}
          strokeWidth={2}
          className="fu-prompt__icon"
        />
        <div className="fu-prompt__text">
          <span className="fu-prompt__title">Upload a file or drag and drop</span>
          <span className="fu-prompt__hint">{hint}</span>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          multiple
          className="fu-prompt__input"
          onChange={handleInputChange}
          tabIndex={-1}
        />
      </div>
    )
  }

  // ── Browse Files ──
  if (type === 'browse-files') {
    return (
      <div
        className={rootClass}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="fu-prompt__content">
          <span className="fu-prompt__title fu-prompt__title--brand">Browse files to upload</span>
          <span className="fu-prompt__hint">{hint}</span>
        </div>
        <button
          className="fu-prompt__browse-btn"
          onClick={handleClick}
          disabled={disabled}
        >
          <Upload size={20} strokeWidth={2} />
          <span>Browse Files</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          multiple
          className="fu-prompt__input"
          onChange={handleInputChange}
          tabIndex={-1}
        />
      </div>
    )
  }

  // ── Drag or Browse ──
  return (
    <div
      className={rootClass}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="fu-prompt__upload-area">
        <UploadCloud size={70} strokeWidth={1.75} className="fu-prompt__icon fu-prompt__icon--lg" />
        <div className="fu-prompt__content fu-prompt__content--centered">
          <span className="fu-prompt__title fu-prompt__title--brand">Drag and drop a file to upload</span>
          <span className="fu-prompt__hint">{hint}</span>
        </div>
      </div>
      <span className="fu-prompt__or">OR</span>
      <button
        className="fu-prompt__browse-btn"
        onClick={handleClick}
        disabled={disabled}
      >
        <Upload size={20} strokeWidth={2} />
        <span>Browse Files</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        multiple
        className="fu-prompt__input"
        onChange={handleInputChange}
        tabIndex={-1}
      />
    </div>
  )
}

// ─── FileUploadItem ───────────────────────────────────────────────────────────
export function FileUploadItem({
  style        = 'blanked',
  state        = 'uploading',
  filename     = 'Filename.png',
  fileSize     = '525KB',
  progress     = 30,
  errorMessage = 'Upload failed',
  onCancel,
  onDelete,
  onRetry,
}: FileUploadItemProps) {
  const rootClass = `fu-item fu-item--${style} fu-item--${state}`

  const pct = Math.min(100, Math.max(0, progress))

  // ── Blanked ──
  if (style === 'blanked') {
    return (
      <div className={rootClass}>
        <div className="fu-item__row">

          {/* Left: icon + text */}
          <div className="fu-item__left">
            <div className={`fu-item__file-icon${state === 'error' ? ' fu-item__file-icon--error' : ''}`}>
              <FileText size={16} strokeWidth={1.5} />
            </div>

            <div className="fu-item__info">
              <span className="fu-item__name">{filename}</span>

              {state === 'uploading' && (
                <>
                  <div className="fu-item__progress-bar fu-item__progress-bar--sm">
                    <div className="fu-item__progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="fu-item__status-row">
                    <span className="fu-item__status-text">{fileSize} • {pct}% uploading</span>
                    <span className="fu-item__pct">{pct}%</span>
                  </div>
                </>
              )}

              {state === 'uploaded' && (
                <span className="fu-item__meta">{fileSize} • 100% uploaded</span>
              )}

              {state === 'error' && (
                <span className="fu-item__error-text">{errorMessage}</span>
              )}
            </div>
          </div>

          {/* Right: action */}
          <div className="fu-item__action">
            {state === 'uploading' && (
              <button className="fu-item__action-btn" onClick={onCancel} aria-label="Cancel upload">
                <XCircle size={20} strokeWidth={1.5} />
              </button>
            )}
            {state === 'uploaded' && (
              <button className="fu-item__action-btn" onClick={onDelete} aria-label="Delete file">
                <Trash2 size={20} strokeWidth={1.5} />
              </button>
            )}
            {state === 'error' && (
              <button className="fu-item__action-btn fu-item__action-btn--error" onClick={onRetry} aria-label="Retry upload">
                <RefreshCw size={20} strokeWidth={1.5} />
              </button>
            )}
          </div>

        </div>
      </div>
    )
  }

  // ── Lined ──
  if (style === 'lined') {
    return (
      <div className={rootClass}>
        <div className="fu-item__row fu-item__row--lined">

          <div className={`fu-item__file-icon-lg fu-item__file-icon-lg--${state}`}>
            <FileText size={28} strokeWidth={2} />
          </div>

          <div className="fu-item__info fu-item__info--grow">
            <span className="fu-item__name fu-item__name--lg">{filename}</span>

            {state !== 'error' && (
              <span className="fu-item__meta">{fileSize}</span>
            )}

            {state === 'error' && (
              <div className="fu-item__error-row">
                <span className="fu-item__meta">{errorMessage}</span>
                <AlertTriangle size={16} strokeWidth={1.5} className="fu-item__error-icon" />
              </div>
            )}
          </div>

          <button
            className="fu-item__action-btn"
            onClick={state === 'error' ? onRetry : state === 'uploaded' ? onDelete : onCancel}
            aria-label={state === 'error' ? 'Retry' : state === 'uploaded' ? 'Delete' : 'Cancel'}
          >
            <XCircle size={20} strokeWidth={1.5} />
          </button>

        </div>

        {/* Linear progress at bottom */}
        {state !== 'error' && (
          <div className="fu-item__linear-track">
            <div
              className={`fu-item__linear-fill${state === 'uploaded' ? ' fu-item__linear-fill--success' : ''}`}
              style={{ width: state === 'uploaded' ? '100%' : `${pct}%` }}
            />
          </div>
        )}
      </div>
    )
  }

  // ── Outlined ──
  return (
    <div className={rootClass}>
      <div className={`fu-item__file-icon-lg fu-item__file-icon-lg--${state}`}>
        <FileText size={28} strokeWidth={2} />
      </div>

      {state !== 'error' && (
        <div className="fu-item__progress-section">
          <div className="fu-item__title-row">
            <span className="fu-item__name fu-item__name--lg">{filename}</span>
            {state === 'uploading' && (
              <button className="fu-item__action-btn" onClick={onCancel} aria-label="Cancel">
                <XCircle size={20} strokeWidth={1.5} />
              </button>
            )}
            {state === 'uploaded' && (
              <CheckCircle2 size={20} strokeWidth={1.5} className="fu-item__check-icon" />
            )}
          </div>
          <div className="fu-item__progress-bar fu-item__progress-bar--thick">
            <div
              className={`fu-item__progress-fill${state === 'uploaded' ? ' fu-item__progress-fill--success' : ''}`}
              style={{ width: state === 'uploaded' ? '100%' : `${pct}%` }}
            />
          </div>
          <div className="fu-item__bottom-row">
            <span className="fu-item__meta">
              {state === 'uploaded' ? fileSize : `${fileSize} uploaded`}
            </span>
            <span className="fu-item__pct fu-item__pct--lg">
              {state === 'uploaded' ? '100%' : `${pct}%`}
            </span>
          </div>
        </div>
      )}

      {state === 'error' && (
        <div className="fu-item__progress-section">
          <span className="fu-item__name fu-item__name--lg">{filename}</span>
          <div className="fu-item__error-row">
            <AlertCircle size={20} strokeWidth={2} className="fu-item__error-icon" />
            <span className="fu-item__error-text">{errorMessage}</span>
          </div>
        </div>
      )}

      {state === 'error' && (
        <button className="fu-item__action-btn fu-item__action-btn--error" onClick={onRetry} aria-label="Retry">
          <RefreshCw size={20} strokeWidth={2} />
        </button>
      )}
    </div>
  )
}
