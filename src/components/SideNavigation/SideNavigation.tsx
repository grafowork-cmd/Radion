import React, { useState } from 'react'
import {
  Home, BarChart2, FileText, MessageSquare, Layers, Calendar,
  FolderOpen, Megaphone, Users, Briefcase, Puzzle, LifeBuoy,
  Settings, Search, ChevronRight, LogOut,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Tooltip } from '../Tooltip/Tooltip'
import './SideNavigation.css'

// ─── Figma asset URLs ─────────────────────────────────────────────────────────
const LOGOMARK = 'https://www.figma.com/api/mcp/asset/79d840f2-66e7-4f51-a6b2-204d201994c9'
const AVATAR   = 'https://www.figma.com/api/mcp/asset/2866e628-0188-4dce-845e-2117ecd335e1'

// ─── Types ────────────────────────────────────────────────────────────────────
export type SideNavVariant = 'expanded' | 'collapsed'

export interface SideNavigationProps {
  variant?: SideNavVariant
  activeItem?: string
  onNavItemClick?: (id: string) => void
  userName?: string
  userEmail?: string
}

// ─── Nav data ─────────────────────────────────────────────────────────────────
interface NavItem { id: string; label: string; icon: LucideIcon }

const MAIN: NavItem[] = [
  { id: 'home',      label: 'Home',      icon: Home       },
  { id: 'analytics', label: 'Analytics', icon: BarChart2  },
  { id: 'reports',   label: 'Reports',   icon: FileText   },
]
const TOOLS: NavItem[] = [
  { id: 'messages',      label: 'Messages',       icon: MessageSquare },
  { id: 'projects',      label: 'Projects',        icon: Layers        },
  { id: 'calendar',      label: 'Calendar',        icon: Calendar      },
  { id: 'files-library', label: 'Files & Library', icon: FolderOpen    },
  { id: 'campaign',      label: 'Campaign',        icon: Megaphone     },
]
const MANAGE: NavItem[] = [
  { id: 'team',         label: 'Team',         icon: Users    },
  { id: 'clients',      label: 'Clients',      icon: Briefcase},
  { id: 'integrations', label: 'Integrations', icon: Puzzle   },
]
const FOOTER: NavItem[] = [
  { id: 'support',  label: 'Support',  icon: LifeBuoy },
  { id: 'settings', label: 'Settings', icon: Settings },
]

// ─── Atoms ────────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="sn-divider" />
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="sn-section-wrap">
      <div className="sn-section-label"><span>{label}</span></div>
    </div>
  )
}

// Expanded nav item — exactly mirrors Figma layout
function NavRow({ item, active, onClick }: { item: NavItem; active: boolean; onClick: (id: string) => void }) {
  const Icon = item.icon
  return (
    <button
      className={`sn-nav-item${active ? ' sn-nav-item--active' : ''}`}
      onClick={() => onClick(item.id)}
    >
      <span className={`sn-dot${active ? ' sn-dot--active' : ''}`} />
      <span className="sn-icon"><Icon size={16} strokeWidth={1.75} /></span>
      <span className="sn-label">{item.label}</span>
      <span className={`sn-badge${active ? ' sn-badge--active' : ''}`}>99+</span>
      <span className="sn-chevron"><ChevronRight size={16} strokeWidth={1.75} /></span>
    </button>
  )
}

// Collapsed icon button — exactly mirrors Figma 40×40 / 20px icon
function IconBtn({ item, active, onClick }: { item: NavItem; active: boolean; onClick: (id: string) => void }) {
  const Icon = item.icon
  const [hovered, setHovered] = useState(false)
  return (
    <div className="sn-icon-btn-wrap" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <button
        className={`sn-icon-btn${active ? ' sn-icon-btn--active' : ''}`}
        onClick={() => onClick(item.id)}
      >
        <Icon size={20} strokeWidth={1.75} />
      </button>
      {hovered && (
        <div className="sn-icon-btn-tooltip">
          <Tooltip type="default" direction="left" label={item.label} />
        </div>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function SideNavigation({
  variant = 'expanded',
  activeItem = 'home',
  onNavItemClick = () => {},
  userName = 'john_doe',
  userEmail = 'ahmad@radion.io',
}: SideNavigationProps) {
  const collapsed = variant === 'collapsed'

  if (collapsed) {
    const allGroups = [MAIN, TOOLS, MANAGE]
    return (
      <div className="sn-root sn-root--collapsed">
        {/* Logo only */}
        <div className="sn-logo-collapsed">
          <img src={LOGOMARK} alt="Radion" />
        </div>

        {/* Search icon btn */}
        <button className="sn-search-icon-btn" title="Search">
          <Search size={16} strokeWidth={1.75} />
        </button>

        {/* Nav groups — stacked with no gap between icons */}
        {allGroups.map((group, gi) => (
          <div key={gi} className="sn-icon-group">
            {group.map(item => (
              <IconBtn key={item.id} item={item} active={item.id === activeItem} onClick={onNavItemClick} />
            ))}
          </div>
        ))}

        <div className="sn-spacer" />

        {/* Footer icon btns */}
        <div className="sn-icon-group">
          {FOOTER.map(item => (
            <IconBtn key={item.id} item={item} active={item.id === activeItem} onClick={onNavItemClick} />
          ))}
        </div>

        {/* Avatar only */}
        <div className="sn-avatar">
          <img src={AVATAR} alt={userName} />
          <span className="sn-online-dot" />
        </div>
      </div>
    )
  }

  return (
    <div className="sn-root sn-root--expanded">

      {/* Logo bar */}
      <div className="sn-logo-bar">
        <div className="sn-logo-mark"><img src={LOGOMARK} alt="Radion" /></div>
        <span className="sn-brand">Radion</span>
        <button className="sn-logo-action" title="Settings">
          <Settings size={16} strokeWidth={1.75} />
        </button>
      </div>

      <Divider />

      {/* Search */}
      <div className="sn-search-wrap">
        <div className="sn-search">
          <span className="sn-search-icon"><Search size={16} strokeWidth={1.75} /></span>
          <span className="sn-search-placeholder">Search</span>
        </div>
      </div>

      {/* Main nav items */}
      <div className="sn-nav-items">
        {MAIN.map(item => (
          <NavRow key={item.id} item={item} active={item.id === activeItem} onClick={onNavItemClick} />
        ))}

        <SectionLabel label="Tools" />
        {TOOLS.map(item => (
          <NavRow key={item.id} item={item} active={item.id === activeItem} onClick={onNavItemClick} />
        ))}

        <SectionLabel label="Manage" />
        {MANAGE.map(item => (
          <NavRow key={item.id} item={item} active={item.id === activeItem} onClick={onNavItemClick} />
        ))}
      </div>

      <div className="sn-spacer" />

      {/* Footer nav */}
      <div className="sn-footer-nav">
        {FOOTER.map(item => (
          <NavRow key={item.id} item={item} active={item.id === activeItem} onClick={onNavItemClick} />
        ))}
      </div>

      <Divider />

      {/* User footer */}
      <div className="sn-user-footer">
        <div className="sn-avatar">
          <img src={AVATAR} alt={userName} />
          <span className="sn-online-dot" />
        </div>
        <div className="sn-user-info">
          <span className="sn-user-name">{userName}</span>
          <span className="sn-user-email">{userEmail}</span>
        </div>
        <button className="sn-logout" title="Log out">
          <LogOut size={16} strokeWidth={1.75} />
        </button>
      </div>

    </div>
  )
}
