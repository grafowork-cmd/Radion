import React, { useState } from 'react'
import './tokens/tokens.css'
import './App.css'

import { Accordion } from './components/Accordion/Accordion'
import { Badge } from './components/Badge/Badge'
import { Button } from './components/Button/Button'
import { ButtonGroup, ButtonGroupItem } from './components/ButtonGroup/ButtonGroup'
import { CheckboxGroup } from './components/Checkbox/Checkbox'
import { Dropdown } from './components/Dropdown/Dropdown'
import { IconButton } from './components/IconButton/IconButton'
import { Input } from './components/Input/Input'
import { Pagination } from './components/Pagination/Pagination'
import { ProgressStepper } from './components/ProgressStepper/ProgressStepper'
import { Slider } from './components/Slider/Slider'
import { Tag } from './components/Tag/Tag'
import { TextArea } from './components/TextArea/TextArea'
import { Toast } from './components/Toast/Toast'
import { Tooltip } from './components/Tooltip/Tooltip'
import { Breadcrumb } from './components/Breadcrumb/Breadcrumb'
import { DatePicker } from './components/DatePicker/DatePicker'
import { FileUploadPrompt } from './components/FileUpload/FileUpload'
import { ModalCard } from './components/Modal/Modal'

// ─── Types ────────────────────────────────────────────────────────────────────

type ComponentId =
  | 'overview'
  | 'accordion'
  | 'badge'
  | 'button'
  | 'button-group'
  | 'checkbox'
  | 'dropdown'
  | 'icon-button'
  | 'input'
  | 'pagination'
  | 'progress-stepper'
  | 'slider'
  | 'tag'
  | 'textarea'
  | 'toast'
  | 'tooltip'
  | 'breadcrumb'
  | 'date-picker'
  | 'file-upload'
  | 'modal'

interface NavItem {
  id: ComponentId
  label: string
}

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { id: 'overview',        label: 'Overview' },
  { id: 'accordion',       label: 'Accordion' },
  { id: 'badge',           label: 'Badge' },
  { id: 'button',          label: 'Button' },
  { id: 'button-group',    label: 'Button Group' },
  { id: 'checkbox',        label: 'Checkbox' },
  { id: 'dropdown',        label: 'Dropdown' },
  { id: 'icon-button',     label: 'Icon Button' },
  { id: 'input',           label: 'Input' },
  { id: 'pagination',      label: 'Pagination' },
  { id: 'progress-stepper',label: 'Progress Stepper' },
  { id: 'slider',          label: 'Slider' },
  { id: 'tag',             label: 'Tag' },
  { id: 'textarea',        label: 'TextArea' },
  { id: 'toast',           label: 'Toast' },
  { id: 'tooltip',         label: 'Tooltip' },
  { id: 'breadcrumb',      label: 'Breadcrumb' },
  { id: 'date-picker',     label: 'Date Picker' },
  { id: 'file-upload',     label: 'File Upload' },
  { id: 'modal',           label: 'Modal' },
]

// ─── Shared sub-components ────────────────────────────────────────────────────

function VariantTabs<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: T[]
  active: T
  onChange: (v: T) => void
}) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            padding: '6px 16px',
            borderRadius: 999,
            border: active === tab ? 'none' : '1px solid #e2e2e2',
            background: active === tab ? '#111' : 'transparent',
            color: active === tab ? '#fff' : '#555',
            fontSize: 13,
            fontWeight: active === tab ? 600 : 400,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#f7f7f7',
        border: '1px dashed #d0d0d0',
        borderRadius: 10,
        padding: '48px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 160,
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 32,
      }}
    >
      {children}
    </div>
  )
}

function InstallBlock({ pkg }: { pkg: string }) {
  return (
    <div>
      <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 10, color: '#111' }}>
        Installation
      </p>
      <div
        style={{
          background: '#1a1a1a',
          borderRadius: 8,
          padding: '14px 20px',
          fontFamily: 'monospace',
          fontSize: 13,
          color: '#e8e8e8',
          letterSpacing: '0.01em',
        }}
      >
        <span style={{ color: '#888' }}>$</span>{' '}
        <span style={{ color: '#79c0ff' }}>npm install</span>{' '}
        <span style={{ color: '#7ee787' }}>{pkg}</span>
      </div>
    </div>
  )
}

function ComponentPage({
  title,
  children,
  pkg,
}: {
  title: string
  children: React.ReactNode
  pkg: string
}) {
  return (
    <div style={{ maxWidth: 780 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 28, color: '#111' }}>
        {title}
      </h1>
      {children}
      <InstallBlock pkg={pkg} />
    </div>
  )
}

// ─── Overview page ────────────────────────────────────────────────────────────

function OverviewPage({ onNavigate }: { onNavigate: (id: ComponentId) => void }) {
  const components = NAV_ITEMS.filter((n) => n.id !== 'overview')
  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Radion Design System</h1>
      <p style={{ fontSize: 15, color: '#555', marginBottom: 40, lineHeight: 1.7 }}>
        A comprehensive React component library with accessible, customisable UI primitives.
        Browse the components below to explore variants and live examples.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 12,
        }}
      >
        {components.map((c) => (
          <button
            key={c.id}
            onClick={() => onNavigate(c.id)}
            style={{
              padding: '20px 16px',
              borderRadius: 10,
              border: '1px solid #e4e4e4',
              background: '#fafafa',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              color: '#111',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#aaa'
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 2px 8px rgba(0,0,0,0.08)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#e4e4e4'
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Accordion page ───────────────────────────────────────────────────────────

function AccordionPage() {
  type V = 'Outlined' | 'Filled' | 'Rounded'
  const [variant, setVariant] = useState<V>('Outlined')
  const styleMap: Record<V, 'outlined' | 'filled' | 'rounded'> = {
    Outlined: 'outlined',
    Filled: 'filled',
    Rounded: 'rounded',
  }
  return (
    <ComponentPage title="Accordion example" pkg="@radion/accordion">
      <VariantTabs<V>
        tabs={['Outlined', 'Filled', 'Rounded']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        <div style={{ width: '100%', maxWidth: 520 }}>
          <Accordion
            style={styleMap[variant]}
            title="What is the Radion design system?"
            showBadge
            showIcon
            content="Radion is a component library built with React and CSS custom properties. It provides accessible, composable UI primitives aligned with a shared Figma design spec."
          />
        </div>
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Badge page ───────────────────────────────────────────────────────────────

function BadgePage() {
  type V = 'Default' | 'Success' | 'Warning' | 'Error' | 'Information'
  const [variant, setVariant] = useState<V>('Default')
  const typeMap: Record<V, 'default' | 'success' | 'warning' | 'error' | 'information'> = {
    Default: 'default',
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
    Information: 'information',
  }
  return (
    <ComponentPage title="Badge example" pkg="@radion/badge">
      <VariantTabs<V>
        tabs={['Default', 'Success', 'Warning', 'Error', 'Information']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        <Badge label={variant} type={typeMap[variant]} size="large" showLeftIcon />
        <Badge label={variant} type={typeMap[variant]} badgeStyle="outlined" size="large" showLeftIcon />
        <Badge label={variant} type={typeMap[variant]} shape="pill" size="large" showCount count={12} />
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Button page ─────────────────────────────────────────────────────────────

function ButtonPage() {
  type V = 'Primary' | 'Secondary' | 'Outlined' | 'Text' | 'Destructive'
  const [variant, setVariant] = useState<V>('Primary')
  return (
    <ComponentPage title="Button example" pkg="@radion/button">
      <VariantTabs<V>
        tabs={['Primary', 'Secondary', 'Outlined', 'Text', 'Destructive']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        {variant === 'Primary' && (
          <>
            <Button variant="primary" size="large">Large</Button>
            <Button variant="primary" size="medium">Medium</Button>
            <Button variant="primary" size="small">Small</Button>
            <Button variant="primary" size="medium" iconLeft>With Icon</Button>
          </>
        )}
        {variant === 'Secondary' && (
          <>
            <Button variant="secondary" size="large">Large</Button>
            <Button variant="secondary" size="medium">Medium</Button>
            <Button variant="secondary" size="small">Small</Button>
            <Button variant="secondary" size="medium" iconRight>With Icon</Button>
          </>
        )}
        {variant === 'Outlined' && (
          <>
            <Button variant="outlined" size="large">Large</Button>
            <Button variant="outlined" size="medium">Medium</Button>
            <Button variant="outlined" size="small">Small</Button>
            <Button variant="outlined" size="medium" disabled>Disabled</Button>
          </>
        )}
        {variant === 'Text' && (
          <>
            <Button variant="text" size="large">Large</Button>
            <Button variant="text" size="medium">Medium</Button>
            <Button variant="text" size="small">Small</Button>
            <Button variant="text-secondary" size="medium">Text Secondary</Button>
          </>
        )}
        {variant === 'Destructive' && (
          <>
            <Button variant="primary" size="large" destructive>Delete</Button>
            <Button variant="secondary" size="large" destructive>Remove</Button>
            <Button variant="outlined" size="large" destructive>Cancel</Button>
          </>
        )}
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── ButtonGroup page ─────────────────────────────────────────────────────────

function ButtonGroupPage() {
  type V = 'Small' | 'Medium' | 'Large'
  const [variant, setVariant] = useState<V>('Medium')
  const sizeMap: Record<V, 'small' | 'medium' | 'large'> = {
    Small: 'small',
    Medium: 'medium',
    Large: 'large',
  }
  return (
    <ComponentPage title="Button Group example" pkg="@radion/button-group">
      <VariantTabs<V> tabs={['Small', 'Medium', 'Large']} active={variant} onChange={setVariant} />
      <PreviewBox>
        <ButtonGroup size={sizeMap[variant]}>
          <ButtonGroupItem>Day</ButtonGroupItem>
          <ButtonGroupItem>Week</ButtonGroupItem>
          <ButtonGroupItem>Month</ButtonGroupItem>
          <ButtonGroupItem>Year</ButtonGroupItem>
        </ButtonGroup>
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Checkbox page ────────────────────────────────────────────────────────────

function CheckboxPage() {
  type V = 'Default' | 'With Fieldnote' | 'Error' | 'Warning'
  const [variant, setVariant] = useState<V>('Default')
  const [checked, setChecked] = useState(false)
  return (
    <ComponentPage title="Checkbox example" pkg="@radion/checkbox">
      <VariantTabs<V>
        tabs={['Default', 'With Fieldnote', 'Error', 'Warning']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        {variant === 'Default' && (
          <CheckboxGroup
            label="Accept terms and conditions"
            checked={checked}
            onChange={setChecked}
          />
        )}
        {variant === 'With Fieldnote' && (
          <CheckboxGroup
            label="Subscribe to newsletter"
            checked={checked}
            onChange={setChecked}
            showFieldnote
            fieldnote="You can unsubscribe at any time."
          />
        )}
        {variant === 'Error' && (
          <CheckboxGroup
            label="I agree to the privacy policy"
            checked={false}
            onChange={setChecked}
            state="error"
            errorText="You must accept the privacy policy."
          />
        )}
        {variant === 'Warning' && (
          <CheckboxGroup
            label="Enable experimental features"
            checked={checked}
            onChange={setChecked}
            state="warning"
            warningText="Experimental features may be unstable."
          />
        )}
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Dropdown page ────────────────────────────────────────────────────────────

const FRUIT_OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian', disabled: true },
  { value: 'elderberry', label: 'Elderberry' },
]

function DropdownPage() {
  type V = 'Default' | 'With Label' | 'Error' | 'Disabled'
  const [variant, setVariant] = useState<V>('Default')
  const [value, setValue] = useState('')
  return (
    <ComponentPage title="Dropdown example" pkg="@radion/dropdown">
      <VariantTabs<V>
        tabs={['Default', 'With Label', 'Error', 'Disabled']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        <div style={{ width: 280 }}>
          {variant === 'Default' && (
            <Dropdown
              options={FRUIT_OPTIONS}
              value={value}
              onChange={setValue}
              placeholder="Select a fruit"
              showLabel={false}
            />
          )}
          {variant === 'With Label' && (
            <Dropdown
              options={FRUIT_OPTIONS}
              value={value}
              onChange={setValue}
              placeholder="Select a fruit"
              label="Favourite fruit"
              showLabel
              showFieldnote
              fieldnote="This will appear on your profile."
            />
          )}
          {variant === 'Error' && (
            <Dropdown
              options={FRUIT_OPTIONS}
              value={value}
              onChange={setValue}
              placeholder="Select a fruit"
              label="Favourite fruit"
              showLabel
              state="error"
              errorText="Please select a fruit."
            />
          )}
          {variant === 'Disabled' && (
            <Dropdown
              options={FRUIT_OPTIONS}
              value=""
              placeholder="Unavailable"
              label="Favourite fruit"
              showLabel
              state="disabled"
            />
          )}
        </div>
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Icon Button page ─────────────────────────────────────────────────────────

function IconButtonPage() {
  type V = 'Primary' | 'Secondary' | 'Default' | 'Symbol' | 'Destructive'
  const [variant, setVariant] = useState<V>('Primary')
  return (
    <ComponentPage title="Icon Button example" pkg="@radion/icon-button">
      <VariantTabs<V>
        tabs={['Primary', 'Secondary', 'Default', 'Symbol', 'Destructive']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        {variant === 'Primary' && (
          <>
            <IconButton variant="primary" size="large" aria-label="Add large" />
            <IconButton variant="primary" size="medium" aria-label="Add medium" />
            <IconButton variant="primary" size="small" aria-label="Add small" />
            <IconButton variant="primary" size="medium" shape="round" aria-label="Add round" />
          </>
        )}
        {variant === 'Secondary' && (
          <>
            <IconButton variant="secondary" size="large" aria-label="Add large" />
            <IconButton variant="secondary" size="medium" aria-label="Add medium" />
            <IconButton variant="secondary" size="small" aria-label="Add small" />
            <IconButton variant="secondary" size="medium" shape="round" aria-label="Add round" />
          </>
        )}
        {variant === 'Default' && (
          <>
            <IconButton variant="default" size="large" aria-label="Add large" />
            <IconButton variant="default" size="medium" aria-label="Add medium" />
            <IconButton variant="default" size="small" aria-label="Add small" />
          </>
        )}
        {variant === 'Symbol' && (
          <>
            <IconButton variant="symbol" size="large" aria-label="Add large" />
            <IconButton variant="symbol" size="medium" aria-label="Add medium" />
            <IconButton variant="symbol" size="small" aria-label="Add small" />
          </>
        )}
        {variant === 'Destructive' && (
          <>
            <IconButton variant="primary" size="large" destructive aria-label="Delete large" />
            <IconButton variant="secondary" size="large" destructive aria-label="Delete medium" />
            <IconButton variant="symbol" size="large" destructive aria-label="Delete small" />
          </>
        )}
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Input page ───────────────────────────────────────────────────────────────

function InputPage() {
  type V = 'Small' | 'Medium' | 'Large' | 'Error' | 'Warning'
  const [variant, setVariant] = useState<V>('Medium')
  const [val, setVal] = useState('')
  return (
    <ComponentPage title="Input example" pkg="@radion/input">
      <VariantTabs<V>
        tabs={['Small', 'Medium', 'Large', 'Error', 'Warning']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        <div style={{ width: 320 }}>
          {variant === 'Small' && (
            <Input
              size="small"
              placeholder="Search…"
              value={val}
              onChange={setVal}
              showLabel={false}
            />
          )}
          {variant === 'Medium' && (
            <Input
              size="medium"
              label="Email address"
              showLabel
              placeholder="you@example.com"
              value={val}
              onChange={setVal}
              showFieldnote
              fieldnote="We'll never share your email."
            />
          )}
          {variant === 'Large' && (
            <Input
              size="large"
              label="Full name"
              showLabel
              placeholder="Jane Smith"
              value={val}
              onChange={setVal}
            />
          )}
          {variant === 'Error' && (
            <Input
              size="medium"
              label="Email address"
              showLabel
              placeholder="you@example.com"
              value={val}
              onChange={setVal}
              state="error"
              errorText="Please enter a valid email address."
            />
          )}
          {variant === 'Warning' && (
            <Input
              size="medium"
              label="Username"
              showLabel
              placeholder="johndoe"
              value={val}
              onChange={setVal}
              state="warning"
              warningText="Username may already be taken."
            />
          )}
        </div>
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Pagination page ──────────────────────────────────────────────────────────

function PaginationPage() {
  type V = 'Web' | 'Mobile Items' | 'Mobile Pages'
  const [variant, setVariant] = useState<V>('Web')
  const typeMap: Record<V, 'web' | 'mobile-items' | 'mobile-pages'> = {
    'Web': 'web',
    'Mobile Items': 'mobile-items',
    'Mobile Pages': 'mobile-pages',
  }
  return (
    <ComponentPage title="Pagination example" pkg="@radion/pagination">
      <VariantTabs<V>
        tabs={['Web', 'Mobile Items', 'Mobile Pages']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        <Pagination
          type={typeMap[variant]}
          defaultPage={3}
          totalPages={12}
          totalItems={120}
          defaultRowsPerPage={10}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Progress Stepper page ────────────────────────────────────────────────────

const DEMO_STEPS = [
  { label: 'Account', description: 'Create your account', state: 'completed' as const, indicator: 'icon' as const },
  { label: 'Profile', description: 'Set up your profile', state: 'active' as const, indicator: 'number' as const, number: '2' },
  { label: 'Review', description: 'Review your details', state: 'inactive' as const, indicator: 'number' as const, number: '3' },
  { label: 'Done', description: 'All set!', state: 'inactive' as const, indicator: 'dot' as const },
]

function ProgressStepperPage() {
  type V = 'Lined' | 'Step' | 'Boxed'
  const [variant, setVariant] = useState<V>('Lined')
  const styleMap: Record<V, 'lined' | 'step' | 'boxed'> = {
    Lined: 'lined',
    Step: 'step',
    Boxed: 'boxed',
  }
  return (
    <ComponentPage title="Progress Stepper example" pkg="@radion/progress-stepper">
      <VariantTabs<V> tabs={['Lined', 'Step', 'Boxed']} active={variant} onChange={setVariant} />
      <PreviewBox>
        <ProgressStepper
          steps={DEMO_STEPS}
          style={styleMap[variant]}
          direction="horizontal"
          showDescription
        />
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Slider page ──────────────────────────────────────────────────────────────

function SliderPage() {
  type V = 'Website' | 'Mobile' | 'With Labels' | 'Disabled'
  const [variant, setVariant] = useState<V>('Website')
  const [val, setVal] = useState(40)
  return (
    <ComponentPage title="Slider example" pkg="@radion/slider">
      <VariantTabs<V>
        tabs={['Website', 'Mobile', 'With Labels', 'Disabled']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        <div style={{ width: 360 }}>
          {variant === 'Website' && (
            <Slider
              type="website"
              label="Volume"
              min={0}
              max={100}
              value={val}
              onChange={setVal}
            />
          )}
          {variant === 'Mobile' && (
            <Slider
              type="mobile"
              label="Brightness"
              min={0}
              max={100}
              value={val}
              onChange={setVal}
            />
          )}
          {variant === 'With Labels' && (
            <Slider
              type="website"
              label="Price range"
              min={0}
              max={500}
              value={val}
              onChange={setVal}
              leftLabel="$0"
              rightLabel="$500"
              showMinMax
              formatValue={(v) => `$${v}`}
            />
          )}
          {variant === 'Disabled' && (
            <Slider
              type="website"
              label="Volume"
              min={0}
              max={100}
              value={30}
              disabled
            />
          )}
        </div>
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Tag page ─────────────────────────────────────────────────────────────────

function TagPage() {
  type V = 'Text Only' | 'With Close' | 'With Count' | 'With Dot'
  const [variant, setVariant] = useState<V>('Text Only')
  const actionMap: Record<V, 'text-only' | 'x-close' | 'count' | 'text-only'> = {
    'Text Only': 'text-only',
    'With Close': 'x-close',
    'With Count': 'count',
    'With Dot': 'text-only',
  }
  return (
    <ComponentPage title="Tag example" pkg="@radion/tag">
      <VariantTabs<V>
        tabs={['Text Only', 'With Close', 'With Count', 'With Dot']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        {variant === 'Text Only' && (
          <>
            <Tag size="sm" label="Design" />
            <Tag size="md" label="Engineering" />
            <Tag size="lg" label="Product" />
          </>
        )}
        {variant === 'With Close' && (
          <>
            <Tag size="sm" action="x-close" label="React" />
            <Tag size="md" action="x-close" label="TypeScript" />
            <Tag size="lg" action="x-close" label="CSS Modules" />
          </>
        )}
        {variant === 'With Count' && (
          <>
            <Tag size="sm" action="count" label="Issues" count={3} />
            <Tag size="md" action="count" label="PRs" count={12} />
            <Tag size="lg" action="count" label="Discussions" count={99} />
          </>
        )}
        {variant === 'With Dot' && (
          <>
            <Tag size="sm" icon="dot" label="Active" dotColor="#22c55e" />
            <Tag size="md" icon="dot" label="Pending" dotColor="#f59e0b" />
            <Tag size="lg" icon="dot" label="Offline" dotColor="#ef4444" />
          </>
        )}
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── TextArea page ────────────────────────────────────────────────────────────

function TextAreaPage() {
  type V = 'Medium' | 'Large' | 'With Count' | 'Error'
  const [variant, setVariant] = useState<V>('Medium')
  const [val, setVal] = useState('')
  return (
    <ComponentPage title="TextArea example" pkg="@radion/textarea">
      <VariantTabs<V>
        tabs={['Medium', 'Large', 'With Count', 'Error']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        <div style={{ width: 360 }}>
          {variant === 'Medium' && (
            <TextArea
              size="medium"
              label="Message"
              showLabel
              placeholder="Write your message here…"
              value={val}
              onChange={setVal}
              rows={4}
            />
          )}
          {variant === 'Large' && (
            <TextArea
              size="large"
              label="Description"
              showLabel
              placeholder="Describe your project…"
              value={val}
              onChange={setVal}
              rows={5}
            />
          )}
          {variant === 'With Count' && (
            <TextArea
              size="medium"
              label="Bio"
              showLabel
              placeholder="Tell us about yourself…"
              value={val}
              onChange={setVal}
              showCount
              maxLength={200}
              rows={4}
            />
          )}
          {variant === 'Error' && (
            <TextArea
              size="medium"
              label="Feedback"
              showLabel
              placeholder="What went wrong?"
              value={val}
              onChange={setVal}
              state="error"
              errorText="Feedback cannot be empty."
              rows={4}
            />
          )}
        </div>
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Toast page ───────────────────────────────────────────────────────────────

function ToastPage() {
  type V = 'Default' | 'Success' | 'Warning' | 'Error' | 'With Actions'
  const [variant, setVariant] = useState<V>('Default')
  const stateMap: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
    Default: 'default',
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
    'With Actions': 'default',
  }
  const titleMap: Record<string, string> = {
    Default: 'Here is a notification message',
    Success: 'Changes saved successfully',
    Warning: 'Your session will expire soon',
    Error: 'Something went wrong',
    'With Actions': 'Update available',
  }
  return (
    <ComponentPage title="Toast example" pkg="@radion/toast">
      <VariantTabs<V>
        tabs={['Default', 'Success', 'Warning', 'Error', 'With Actions']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        <div style={{ width: 360 }}>
          {variant === 'With Actions' ? (
            <Toast
              state="default"
              title="Update available"
              description="A new version of Radion is ready to install."
              showActions
              primaryLabel="Update now"
              secondaryLabel="Later"
            />
          ) : (
            <Toast
              state={stateMap[variant]}
              title={titleMap[variant]}
              description="This is an optional supporting message for the notification."
              dismissable
            />
          )}
        </div>
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Tooltip page ─────────────────────────────────────────────────────────────

function TooltipPage() {
  type V = 'Default' | 'Dual Text' | 'Comprehensive'
  const [variant, setVariant] = useState<V>('Default')
  return (
    <ComponentPage title="Tooltip example" pkg="@radion/tooltip">
      <VariantTabs<V>
        tabs={['Default', 'Dual Text', 'Comprehensive']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        {variant === 'Default' && (
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Tooltip type="default" direction="top-middle" label="Tooltip text" />
            <Tooltip type="default" direction="bottom-middle" label="Below target" />
            <Tooltip type="default" direction="right" label="Right side" />
          </div>
        )}
        {variant === 'Dual Text' && (
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Tooltip type="dual-text" direction="top-middle" label="Left value" labelRight="Right value" />
            <Tooltip type="dual-text" direction="bottom-middle" label="Width" labelRight="320px" />
          </div>
        )}
        {variant === 'Comprehensive' && (
          <Tooltip
            type="comprehensive"
            direction="bottom-middle"
            title="Keyboard shortcut"
            content={<span style={{ fontSize: 12, color: '#ccc' }}>Press <kbd style={{ background: '#333', padding: '1px 5px', borderRadius: 3 }}>⌘K</kbd> to open the command palette.</span>}
            showButton
            buttonLabel="Learn more"
          />
        )}
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Breadcrumb page ──────────────────────────────────────────────────────────

const BREADCRUMB_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Components', href: '#' },
  { label: 'Breadcrumb' },
]

function BreadcrumbPage() {
  type V = 'Link' | 'Box' | 'Outlined' | 'Filled'
  const [variant, setVariant] = useState<V>('Link')
  const styleMap: Record<V, 'link' | 'box' | 'outlined' | 'filled'> = {
    Link: 'link',
    Box: 'box',
    Outlined: 'outlined',
    Filled: 'filled',
  }
  type Sep = 'Chevron' | 'Slash' | 'Dot' | 'Arrow'
  const [sep, setSep] = useState<Sep>('Chevron')
  const sepMap: Record<Sep, 'chevron' | 'slash' | 'dot' | 'arrow'> = {
    Chevron: 'chevron',
    Slash: 'slash',
    Dot: 'dot',
    Arrow: 'arrow',
  }
  return (
    <ComponentPage title="Breadcrumb example" pkg="@radion/breadcrumb">
      <VariantTabs<V> tabs={['Link', 'Box', 'Outlined', 'Filled']} active={variant} onChange={setVariant} />
      <p style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Separator</p>
      <VariantTabs<Sep> tabs={['Chevron', 'Slash', 'Dot', 'Arrow']} active={sep} onChange={setSep} />
      <PreviewBox>
        <Breadcrumb
          items={BREADCRUMB_ITEMS}
          style={styleMap[variant]}
          indicator={sepMap[sep]}
        />
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── DatePicker page ──────────────────────────────────────────────────────────

function DatePickerPage() {
  type V = 'Single' | 'Range' | 'With Input' | 'With Actions'
  const [variant, setVariant] = useState<V>('Single')
  const [date, setDate] = useState<Date | null>(null)
  return (
    <ComponentPage title="Date Picker example" pkg="@radion/date-picker">
      <VariantTabs<V>
        tabs={['Single', 'Range', 'With Input', 'With Actions']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        {variant === 'Single' && (
          <DatePicker mode="single" value={date} onChange={setDate} />
        )}
        {variant === 'Range' && (
          <DatePicker mode="range" />
        )}
        {variant === 'With Input' && (
          <DatePicker mode="single" value={date} onChange={setDate} showInput />
        )}
        {variant === 'With Actions' && (
          <DatePicker mode="single" value={date} onChange={setDate} showActions />
        )}
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── File Upload page ─────────────────────────────────────────────────────────

function FileUploadPage() {
  type V = 'Drop & Drag' | 'Browse Files' | 'Drag or Browse'
  const [variant, setVariant] = useState<V>('Drop & Drag')
  const typeMap: Record<V, 'drop-drag' | 'browse-files' | 'drag-or-browse'> = {
    'Drop & Drag': 'drop-drag',
    'Browse Files': 'browse-files',
    'Drag or Browse': 'drag-or-browse',
  }
  return (
    <ComponentPage title="File Upload example" pkg="@radion/file-upload">
      <VariantTabs<V>
        tabs={['Drop & Drag', 'Browse Files', 'Drag or Browse']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        <div style={{ width: 380 }}>
          <FileUploadPrompt
            type={typeMap[variant]}
            hint="PNG, JPG, GIF or PDF up to 10MB"
          />
        </div>
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Modal page ───────────────────────────────────────────────────────────────

function ModalPage() {
  type V = 'Default' | 'Checklist' | 'Form' | 'Horizontal'
  const [variant, setVariant] = useState<V>('Default')
  return (
    <ComponentPage title="Modal example" pkg="@radion/modal">
      <VariantTabs<V>
        tabs={['Default', 'Checklist', 'Form', 'Horizontal']}
        active={variant}
        onChange={setVariant}
      />
      <PreviewBox>
        {variant === 'Default' && (
          <ModalCard
            type="default"
            title="Confirm action"
            description="Are you sure you want to proceed? This action cannot be undone."
            confirmLabel="Confirm"
            cancelLabel="Cancel"
          />
        )}
        {variant === 'Checklist' && (
          <ModalCard
            type="checklist"
            title="Before you publish"
            description="Please confirm the following before publishing your changes."
            confirmLabel="Publish"
            cancelLabel="Go back"
            checklistItems={[
              { label: 'Review content for accuracy', checked: true },
              { label: 'Check all links are working', checked: false },
              { label: 'Preview on mobile', checked: false },
            ]}
          />
        )}
        {variant === 'Form' && (
          <ModalCard
            type="form"
            title="Sign in"
            description="Enter your credentials to continue."
            confirmLabel="Sign in"
            cancelLabel="Cancel"
          />
        )}
        {variant === 'Horizontal' && (
          <ModalCard
            type="default"
            alignment="horizontal"
            title="Delete item"
            description="This will permanently delete the selected item and all associated data."
            confirmLabel="Delete"
            cancelLabel="Cancel"
          />
        )}
      </PreviewBox>
    </ComponentPage>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeId, setActiveId] = useState<ComponentId>('overview')

  function renderPage() {
    switch (activeId) {
      case 'overview':        return <OverviewPage onNavigate={setActiveId} />
      case 'accordion':       return <AccordionPage />
      case 'badge':           return <BadgePage />
      case 'button':          return <ButtonPage />
      case 'button-group':    return <ButtonGroupPage />
      case 'checkbox':        return <CheckboxPage />
      case 'dropdown':        return <DropdownPage />
      case 'icon-button':     return <IconButtonPage />
      case 'input':           return <InputPage />
      case 'pagination':      return <PaginationPage />
      case 'progress-stepper':return <ProgressStepperPage />
      case 'slider':          return <SliderPage />
      case 'tag':             return <TagPage />
      case 'textarea':        return <TextAreaPage />
      case 'toast':           return <ToastPage />
      case 'tooltip':         return <TooltipPage />
      case 'breadcrumb':      return <BreadcrumbPage />
      case 'date-picker':     return <DatePickerPage />
      case 'file-upload':     return <FileUploadPage />
      case 'modal':           return <ModalPage />
      default:                return null
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* ── Sidebar ────────────────────────────────────────────── */}
      <aside
        style={{
          width: 210,
          minWidth: 210,
          background: '#0d0d0d',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 0',
          overflowY: 'auto',
        }}
      >
        {/* GitHub link */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 12,
            color: '#888',
            textDecoration: 'none',
            padding: '0 20px',
            marginBottom: 24,
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ccc')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#888')}
        >
          GitHub
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ marginTop: 1 }}>
            <path
              d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Section label */}
        <p
          style={{
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#555',
            padding: '0 20px',
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          Components
        </p>

        {/* Nav items */}
        <nav>
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeId
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '7px 12px 7px 20px',
                  fontSize: 13.5,
                  color: isActive ? '#fff' : '#aaa',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      inset: '3px 8px',
                      background: '#252525',
                      borderRadius: 6,
                      zIndex: 0,
                    }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* ── Main content ────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '48px 56px',
          background: '#fff',
        }}
      >
        {renderPage()}
      </main>
    </div>
  )
}
