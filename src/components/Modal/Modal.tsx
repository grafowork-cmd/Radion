import React, { useEffect, useState, useCallback } from 'react'
import { X, Box, CheckCircle2, LayoutGrid, Image } from 'lucide-react'
import { Button } from '../Button/Button'
import { CheckboxGroup } from '../Checkbox/Checkbox'
import { Input } from '../Input/Input'
import { Dropdown } from '../Dropdown/Dropdown'
import type { DropdownOption } from '../Dropdown/Dropdown'
import './Modal.css'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ModalType      = 'default' | 'checklist' | 'dropdown' | 'form' | 'media' | 'slot'
export type ModalAlignment = 'horizontal' | 'vertical'

export interface ModalChecklistItem {
  label:    string
  checked?: boolean
}

export interface ModalCardProps {
  type?:              ModalType
  alignment?:         ModalAlignment
  title?:             string
  description?:       string
  confirmLabel?:      string
  cancelLabel?:       string
  onClose?:           () => void
  onConfirm?:         () => void
  onCancel?:          () => void
  checklistItems?:    ModalChecklistItem[]
  onChecklistChange?: (index: number, checked: boolean) => void
  dropdownOptions?:   DropdownOption[]
  dropdownValue?:     string
  dropdownPlaceholder?: string
  onDropdownChange?:  (value: string) => void
  formEmail?:         string
  formPassword?:      string
  onFormEmailChange?:    (value: string) => void
  onFormPasswordChange?: (value: string) => void
  mediaContent?:      React.ReactNode
  children?:          React.ReactNode
}

export interface ModalProps extends ModalCardProps {
  /** Whether the modal and its overlay are visible */
  open?: boolean
}

// ─── Icon badge map ───────────────────────────────────────────────────────────

function HeaderIcon({ type }: { type: ModalType }) {
  if (type === 'checklist') return <CheckCircle2 size={24} strokeWidth={2} />
  if (type === 'dropdown')  return <LayoutGrid   size={24} strokeWidth={2} />
  return <Box size={24} strokeWidth={2} />
}

// ─── ModalCard (card without overlay) ────────────────────────────────────────

export function ModalCard({
  type             = 'default',
  alignment        = 'horizontal',
  title            = 'A short modal heading',
  description      = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  confirmLabel     = 'Confirm',
  cancelLabel      = 'Cancel',
  onClose,
  onConfirm,
  onCancel,
  checklistItems   = [
    { label: 'Checkbox label', checked: true },
    { label: 'Checkbox label', checked: true },
    { label: 'Checkbox label', checked: false },
  ],
  onChecklistChange,
  dropdownOptions  = [],
  dropdownValue,
  dropdownPlaceholder = 'Select your location',
  onDropdownChange,
  formEmail        = '',
  formPassword     = '',
  onFormEmailChange,
  onFormPasswordChange,
  mediaContent,
  children,
}: ModalCardProps) {
  const [internalItems, setInternalItems] = useState<ModalChecklistItem[]>(checklistItems)

  const handleChecklistChange = useCallback((index: number, checked: boolean) => {
    setInternalItems(prev => prev.map((item, i) => i === index ? { ...item, checked } : item))
    onChecklistChange?.(index, checked)
  }, [onChecklistChange])

  useEffect(() => { setInternalItems(checklistItems) }, [checklistItems])

  const isVertical   = alignment === 'vertical'
  const isMedia      = type === 'media'
  const isSlot       = type === 'slot'
  const hasIconBadge = !isMedia && !isSlot

  const cardClass = [
    'modal',
    `modal--${alignment}`,
    isMedia ? 'modal--media' : '',
  ].filter(Boolean).join(' ')

  const actionsClass = [
    'modal__actions',
    isVertical ? 'modal__actions--vertical' : '',
  ].filter(Boolean).join(' ')

  function Actions() {
    return (
      <div className={actionsClass}>
        {isVertical ? (
          <>
            <Button variant="primary" size="medium" onClick={onConfirm}>{confirmLabel}</Button>
            <Button variant="default" size="medium" onClick={onCancel}>{cancelLabel}</Button>
          </>
        ) : (
          <>
            <Button variant="default" size="medium" onClick={onCancel}>{cancelLabel}</Button>
            <Button variant="primary" size="medium" onClick={onConfirm}>{confirmLabel}</Button>
          </>
        )}
      </div>
    )
  }

  // ── Media ──
  if (isMedia) {
    return (
      <div className={cardClass} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal__media-image">
          {mediaContent ?? (
            <div className="modal__media-placeholder">
              <Image size={32} strokeWidth={1.5} color="rgba(255,255,255,0.5)" />
            </div>
          )}
        </div>
        <div className={`modal__media-body${isVertical ? ' modal__media-body--vertical' : ''}`}>
          <div className={`modal__text${isVertical ? ' modal__text--centered' : ''}`}>
            <span id="modal-title" className="modal__title">{title}</span>
            <span className="modal__description">{description}</span>
          </div>
          <Actions />
        </div>
      </div>
    )
  }

  // ── All other types ──
  return (
    <div className={cardClass} role="dialog" aria-modal="true" aria-labelledby="modal-title">

      {/* Header */}
      {isVertical ? (
        <>
          {hasIconBadge && (
            <div className="modal__icon-badge">
              <HeaderIcon type={type} />
            </div>
          )}
          <div className="modal__text modal__text--centered">
            <span id="modal-title" className="modal__title">{title}</span>
            <span className="modal__description">{description}</span>
          </div>
        </>
      ) : (
        <div className="modal__header">
          {isSlot ? (
            <div className="modal__text">
              <span id="modal-title" className="modal__title">{title}</span>
              <span className="modal__description">{description}</span>
            </div>
          ) : (
            <div className="modal__header-left">
              <div className="modal__icon-badge">
                <HeaderIcon type={type} />
              </div>
              <div className="modal__text">
                <span id="modal-title" className="modal__title">{title}</span>
                <span className="modal__description">{description}</span>
              </div>
            </div>
          )}
          <button className="modal__close" onClick={onClose} aria-label="Close modal">
            <X size={16} strokeWidth={2} />
          </button>
        </div>
      )}

      {/* Body */}
      {type === 'checklist' && (
        <div className="modal__checklist">
          {internalItems.map((item, i) => (
            <CheckboxGroup
              key={i}
              label={item.label}
              checked={item.checked ?? false}
              onChange={(checked) => handleChecklistChange(i, checked)}
            />
          ))}
        </div>
      )}

      {type === 'dropdown' && (
        <Dropdown
          options={dropdownOptions}
          value={dropdownValue}
          placeholder={dropdownPlaceholder}
          showLabel={false}
          onChange={onDropdownChange}
        />
      )}

      {type === 'form' && (
        <div className="modal__form">
          <Input
            label="Email"
            placeholder="Enter email"
            type="email"
            value={formEmail}
            onChange={onFormEmailChange}
            size="medium"
          />
          <Input
            label="Password"
            placeholder="Enter password"
            type="password"
            value={formPassword}
            onChange={onFormPasswordChange}
            size="medium"
          />
        </div>
      )}

      {type === 'slot' && (
        <div className="modal__slot">
          {children ?? <span className="modal__slot-placeholder">❖ Slot component</span>}
        </div>
      )}

      <Actions />
    </div>
  )
}

// ─── Modal (ModalCard + overlay) ──────────────────────────────────────────────

export function Modal({ open = true, onClose, ...rest }: ModalProps) {
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
    >
      <ModalCard onClose={onClose} {...rest} />
    </div>
  )
}
