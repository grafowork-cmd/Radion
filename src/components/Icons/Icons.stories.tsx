import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import '../../tokens/tokens.css'

// ── Filter to only icon components (forwardRef objects with displayName), dedupe Icon suffix ──
const allIcons = (Object.entries(LucideIcons) as [string, LucideIcon][]).filter(
  ([name, value]) =>
    !name.endsWith('Icon') &&
    value !== null &&
    typeof value === 'object' &&
    typeof (value as unknown as { displayName?: string }).displayName === 'string'
)

// ── Icon Grid component ───────────────────────────────────────────────────────
function IconGrid({ size = 24, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = allIcons.filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  function handleCopy(name: string) {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(name)
      setTimeout(() => setCopied(null), 1500)
    })
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: 24, width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
        <input
          type="text"
          placeholder="Search icons…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            height: 36,
            padding: '0 12px',
            border: '1px solid #d2d6db',
            borderRadius: 8,
            fontSize: 14,
            fontFamily: 'inherit',
            background: '#f9fafb',
            outline: 'none',
            width: 240,
          }}
        />
        <span style={{ fontSize: 13, color: '#9da4ae' }}>
          {filtered.length} icon{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
          gap: 8,
        }}
      >
        {filtered.map(([name, Icon]) => (
          <button
            key={name}
            title={`Click to copy "${name}"`}
            onClick={() => handleCopy(name)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '12px 8px',
              border: '1px solid transparent',
              borderRadius: 10,
              background: copied === name ? '#e5f0ff' : 'transparent',
              cursor: 'pointer',
              transition: 'background 0.1s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
              if (copied !== name) (e.currentTarget as HTMLElement).style.background = '#f3f4f6'
            }}
            onMouseLeave={e => {
              if (copied !== name) (e.currentTarget as HTMLElement).style.background = 'transparent'
            }}
          >
            <Icon size={size} strokeWidth={strokeWidth} color={copied === name ? '#0052cc' : '#384250'} />
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: copied === name ? '#0052cc' : '#4d5761',
                textAlign: 'center',
                lineHeight: 1.3,
                wordBreak: 'break-word',
                maxWidth: '100%',
              }}
            >
              {copied === name ? 'Copied!' : name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Story meta ────────────────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Icons/Lucide',
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj

export const AllIcons: Story = {
  name: 'All Icons',
  render: () => <IconGrid size={24} strokeWidth={1.5} />,
}

export const SmallIcons: Story = {
  name: 'Small (16px)',
  render: () => <IconGrid size={16} strokeWidth={1.5} />,
}

export const MediumIcons: Story = {
  name: 'Medium (20px)',
  render: () => <IconGrid size={20} strokeWidth={1.5} />,
}
