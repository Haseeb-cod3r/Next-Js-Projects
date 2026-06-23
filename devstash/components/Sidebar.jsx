
'use client'

import { usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { Bookmark, Home, Archive, X, Menu, Lock } from 'lucide-react'
import { AppContext } from '@/contexts/AppData'
import { SearchContext } from '@/contexts/Search'
import { TagContext } from '@/contexts/Tag'
import { StateContext } from '@/contexts/State'
import SkeletonTag from './SkeletonTag'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'


export default function Sidebar() {
  const pathname = usePathname()
  const { stashData, archiveData, isLoaded,setStashData,setArchiveData } = useContext(AppContext)
  const { setSearchValue } = useContext(SearchContext)
  const { sortAccTags, tags, generateTags } = useContext(TagContext)
  const { activeNav, setActiveNav, setSort,sortData } = useContext(StateContext)
  const [checkedTags, setCheckedTags] = useState([])
  const [appliedTags, setAppliedTags] = useState([])
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isSignedIn } = useAuth();


  useEffect(() => {
    if (pathname === '/archive') setActiveNav('archived')
    else if (pathname === '/') setActiveNav('home')
  }, [pathname, setActiveNav])

  useEffect(() => {
    const currentSource = activeNav === 'home' ? stashData : archiveData
    generateTags(currentSource, setAppliedTags, setCheckedTags)
  }, [stashData, activeNav, archiveData])

  useEffect(() => {
    const currentSource = activeNav === 'home' ? stashData : archiveData
    sortAccTags(appliedTags, currentSource)
  }, [appliedTags, activeNav, archiveData, stashData, tags])


  function toggleTag(tag) {
    setCheckedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  function addAppliedTags(tagName) {
    const isPresent = appliedTags.some(tag => tag === tagName)
    if (isPresent) setAppliedTags(appliedTags.filter(tag => tag !== tagName))
    else setAppliedTags([...appliedTags, tagName])
  }

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <Bookmark size={15} className="text-white" />
          </div>
          <span className="font-semibold text-sm">DevStash Manager</span>
        </div>

        <button
          className="lg:hidden p-1 text-gray-500 hover:text-gray-900"
          onClick={() => setMobileOpen(false)}
        >
          <X size={18} />
        </button>
      </div>

      <nav className="px-3 py-4 flex flex-col gap-0.5">
        <NavItem
          isSignedIn={isSignedIn}
          icon={<Home size={15} />}
          label="Home"
          active={pathname === '/'}
          onClick={() => {
            setAppliedTags([])
            setCheckedTags([])
            setSearchValue('')
            setSort('Latest')
            sortData('Latest', archiveData, setArchiveData)
            setMobileOpen(false)
          }}
        />
        <NavItem
          isSignedIn={isSignedIn}
          icon={<Archive size={15} />}
          label="Archived"
          active={pathname === '/archive'}
          onClick={() => {
            setAppliedTags([])
            setCheckedTags([])
            setSearchValue('')
            setSort('Latest')
            sortData('Latest', stashData, setStashData)
            setMobileOpen(false)
          }}
        />
      </nav>

      <div className="px-3 flex flex-col bg-white overflow-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2">
          Tags
        </p>
        {!isLoaded
          ? Array.from({ length: 20 }).map((_, index) => (
            <SkeletonTag key={index} width="w-24" />
          ))
          : tags.map(tag => (
            <label
              key={tag.name}
              className="flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checkedTags.includes(tag.name)}
                  onChange={() => {
                    addAppliedTags(tag.name)
                    toggleTag(tag.name)
                  }}
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
    </>
  )

  return (
    <>

      <aside className="hidden lg:flex w-52 bg-white border-r border-gray-200 flex-col sticky top-0 z-10 h-screen">
        {sidebarContent}
      </aside>


      <button
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white border border-gray-200 rounded-lg shadow-sm"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={18} className="text-gray-600" />
      </button>


      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/30"
          onClick={() => setMobileOpen(false)}
        />
      )}


      <aside
        className={`lg:hidden fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}

function NavItem({ icon, label, active, onClick, isSignedIn }) {
  return (
    <Link href={label === 'Home' ? '/' : '/archive'}>
      <button
        onClick={onClick}
        className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm text-left transition-colors
          ${active
            ? 'bg-gray-100 font-semibold text-gray-900'
            : 'text-gray-500 font-normal hover:bg-gray-50'
          }`}
      >
        {label === "Home" ? <div className='flex items-center gap-2'>
          {icon}
          {label}
        </div> : <div className='w-full flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {icon}
            {label}
          </div>
          {!isSignedIn && <div> <Lock size={18} /></div>}
        </div>}
      </button>
    </Link>
  )
}