import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import '../../tokens/tokens.css'
import { FileUploadPrompt, FileUploadItem } from './FileUpload'

// ── Prompt meta ───────────────────────────────────────────────────────────────

const promptMeta: Meta<typeof FileUploadPrompt> = {
  title: 'Components/FileUpload/Prompt',
  component: FileUploadPrompt,
  parameters: { layout: 'centered' },
  argTypes: {
    type:     { control: 'select', options: ['drop-drag', 'browse-files', 'drag-or-browse'] },
    disabled: { control: 'boolean' },
    hint:     { control: 'text' },
  },
  decorators: [(Story) => (
    <div style={{ width: 400 }}>
      <Story />
    </div>
  )],
}
export default promptMeta
type PromptStory = StoryObj<typeof FileUploadPrompt>

// ── Prompt stories ────────────────────────────────────────────────────────────

export const DropDrag: PromptStory = {
  args: { type: 'drop-drag' },
}

export const BrowseFiles: PromptStory = {
  args: { type: 'browse-files' },
}

export const DragOrBrowse: PromptStory = {
  args: { type: 'drag-or-browse' },
}

export const Disabled: PromptStory = {
  args: { type: 'drop-drag', disabled: true },
}

export const AllPrompts: PromptStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 400 }}>
      {(['drop-drag', 'browse-files', 'drag-or-browse'] as const).map(type => (
        <div key={type}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9da4ae', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            {type}
          </div>
          <FileUploadPrompt type={type} />
        </div>
      ))}
    </div>
  ),
}

export const AllPromptsDisabled: PromptStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 400 }}>
      {(['drop-drag', 'browse-files', 'drag-or-browse'] as const).map(type => (
        <div key={type}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9da4ae', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            {type} — disabled
          </div>
          <FileUploadPrompt type={type} disabled />
        </div>
      ))}
    </div>
  ),
}

// ── Upload Item stories (separate export file for Storybook) ──────────────────
// These are exported from a separate meta — using a named const trick

export const UploadStates: PromptStory = {
  name: 'Upload States (all)',
  render: () => {
    const styles  = ['blanked', 'lined', 'outlined'] as const
    const states  = ['uploading', 'uploaded', 'error'] as const

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {styles.map(style => (
          <div key={style}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9da4ae', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
              Style: {style}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {states.map(state => (
                <div key={state}>
                  <div style={{ fontSize: 10, color: '#c5c9d0', marginBottom: 6 }}>{state}</div>
                  <FileUploadItem
                    style={style}
                    state={state}
                    filename={state === 'error' ? 'Filename.jpg' : 'Filename.png'}
                    fileSize={style === 'outlined' ? '4MB' : '525KB'}
                    progress={style === 'outlined' ? 70 : 30}
                    errorMessage={style === 'outlined' ? 'Oops! Upload failed' : style === 'lined' ? 'Error in file type' : 'Oops! Upload failed'}
                    onCancel={() => console.log('cancel')}
                    onDelete={() => console.log('delete')}
                    onRetry={() => console.log('retry')}
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
