import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import '../../tokens/tokens.css'
import { Modal, ModalCard } from './Modal'

const meta: Meta<typeof ModalCard> = {
  title: 'Components/Modal',
  component: ModalCard,
  parameters: { layout: 'centered' },
  argTypes: {
    type:      { control: 'select', options: ['default', 'checklist', 'dropdown', 'form', 'media', 'slot'] },
    alignment: { control: 'select', options: ['horizontal', 'vertical'] },
  },
}
export default meta
type Story = StoryObj<typeof ModalCard>

// ── Single-card stories (no overlay) ─────────────────────────────────────────

export const Default: Story = {
  args: { type: 'default', alignment: 'horizontal' },
}

export const DefaultVertical: Story = {
  args: { type: 'default', alignment: 'vertical' },
}

export const Checklist: Story = {
  args: {
    type: 'checklist',
    alignment: 'horizontal',
    checklistItems: [
      { label: 'Checkbox label', checked: true },
      { label: 'Checkbox label', checked: true },
      { label: 'Checkbox label', checked: false },
    ],
  },
}

export const DropdownType: Story = {
  name: 'Dropdown',
  args: {
    type: 'dropdown',
    alignment: 'horizontal',
    dropdownOptions: [
      { value: 'us', label: 'United States' },
      { value: 'gb', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'au', label: 'Australia' },
    ],
    dropdownPlaceholder: 'Select your location',
  },
}

export const FormType: Story = {
  name: 'Form',
  args: {
    type: 'form',
    alignment: 'horizontal',
  },
}

export const MediaHorizontal: Story = {
  args: { type: 'media', alignment: 'horizontal' },
}

export const MediaVertical: Story = {
  args: { type: 'media', alignment: 'vertical' },
}

export const SlotType: Story = {
  name: 'Slot',
  args: { type: 'slot', alignment: 'horizontal' },
}

// ── All variants ──────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => {
    const types      = ['default', 'checklist', 'dropdown', 'form', 'media', 'slot'] as const
    const alignments = ['horizontal', 'vertical'] as const
    const checklistItems = [
      { label: 'Checkbox label', checked: true },
      { label: 'Checkbox label', checked: true },
      { label: 'Checkbox label', checked: false },
    ]
    const dropdownOptions = [
      { value: 'us', label: 'United States' },
      { value: 'gb', label: 'United Kingdom' },
    ]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 48 }}>
        {alignments.map(alignment => (
          <div key={alignment}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9da4ae', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>
              Alignment: {alignment}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
              {types.map(type => (
                <div key={type}>
                  <div style={{ fontSize: 10, color: '#c5c9d0', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {type}
                  </div>
                  <ModalCard
                    type={type}
                    alignment={alignment}
                    checklistItems={checklistItems}
                    dropdownOptions={dropdownOptions}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

// ── Interactive with overlay ──────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (with overlay)',
  render: () => {
    const [open, setOpen] = useState(false)
    const [modalType, setModalType] = useState<'default' | 'checklist' | 'dropdown' | 'form' | 'media' | 'slot'>('default')

    const types = ['default', 'checklist', 'dropdown', 'form', 'media', 'slot'] as const

    return (
      <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#4d5761', marginBottom: 4 }}>Select type:</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {types.map(t => (
            <button
              key={t}
              onClick={() => setModalType(t)}
              style={{
                padding: '6px 12px',
                background: modalType === t ? '#0066ff' : '#f3f4f6',
                color: modalType === t ? 'white' : '#4d5761',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '10px 20px',
            background: '#0066ff',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            alignSelf: 'flex-start',
          }}
        >
          Open Modal
        </button>
        <Modal
          open={open}
          type={modalType}
          alignment="horizontal"
          checklistItems={[
            { label: 'Send email notifications', checked: true },
            { label: 'Enable two-factor auth',   checked: true },
            { label: 'Subscribe to newsletter',  checked: false },
          ]}
          dropdownOptions={[
            { value: 'us', label: 'United States' },
            { value: 'gb', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
          ]}
          onClose={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          onConfirm={() => { alert('Confirmed!'); setOpen(false) }}
        />
      </div>
    )
  },
}
