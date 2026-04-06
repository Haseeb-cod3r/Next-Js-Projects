'use client'

import { useContext, useState } from 'react'
import { Bookmark, Home, Archive } from 'lucide-react'
import { AppContext } from '@/contexts/AppData'

const tags = [
  { name: 'AI', count: 1 },
  { name: 'Community', count: 5 },
  { name: 'Compatibility', count: 1 },
  { name: 'CSS', count: 6 },
  { name: 'Design', count: 1 },
  { name: 'Framework', count: 2 },
  { name: 'Git', count: 1 },
  { name: 'HTML', count: 2 },
  { name: 'JavaScript', count: 3 },
  { name: 'Layout', count: 3 },
  { name: 'Learning', count: 6 },
  { name: 'Performance', count: 2 },
  { name: 'Practice', count: 5 },
  { name: 'Reference', count: 4 },
  { name: 'Tips', count: 4 },
  { name: 'Tools', count: 4 },
  { name: 'Tutorial', count: 3 },
]

export default function Sidebar() {
  
  const {activeNav, setActiveNav} = useContext(AppContext)
  const [checkedTags, setCheckedTags] = useState([])

  const toggleTag = (tag) =>
    setCheckedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )

  return (
    <aside className="w-52  bg-white border-r border-gray-200 flex flex-col sticky top-0 z-10 h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
          <Bookmark size={15} className="text-white" />
        </div>
        <span className="font-semibold text-sm">DevStash Manager</span>
      </div>

      {/* Nav */}
      <nav className="px-3 py-4 flex flex-col gap-0.5">
        <NavItem
          icon={<Home size={15} />}
          label="Home"
          active={activeNav === 'home'}
          onClick={() => setActiveNav('home')}
        />
        <NavItem
          icon={<Archive size={15} />}
          label="Archived"
          active={activeNav === 'archived'}
          onClick={() => setActiveNav('archived')}
        />
      </nav>

      {/* Tags */}
      <div className="px-3 flex flex-col bg-white overflow-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2">
          Tags
        </p>
        {tags.map(tag => (
          <label
            key={tag.name}
            className="flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checkedTags.includes(tag.name)}
                
                onChange={() => toggleTag(tag.name)}
                className="w-3.5 h-3.5 accent-gray-900"
              />
              <span className="text-sm text-gray-600">{tag.name}</span>
            </div>
            <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
              {tag.count}
            </span>
          </label>
        ))}
      </div>
    </aside>
  )
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm text-left transition-colors
        ${active
          ? 'bg-gray-100 font-semibold text-gray-900'
          : 'text-gray-500 font-normal hover:bg-gray-50'
        }`}
    >
      {icon}
      {label}
    </button>
  )
}