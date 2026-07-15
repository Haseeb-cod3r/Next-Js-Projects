
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
import HowItWorks from './HowItWorks'


export default function Sidebar() {
  const pathname = usePathname()
  const { stashData, archiveData, isLoaded, setStashData, setArchiveData } = useContext(AppContext)
  const { setSearchValue } = useContext(SearchContext)
  const { sortAccTags, tags, generateTags, checkedTags, setCheckedTags, appliedTags, setAppliedTags, mobileOpen, setMobileOpen } = useContext(TagContext)
  const { activeNav, setActiveNav, setSort, sortData } = useContext(StateContext)
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
          <div className="w-8 h-8 bg-brass rounded-lg flex items-center justify-center">
            <Bookmark size={15} className="text-white" />
          </div>
          <span className="font-semibold font-display text-sm text-parchment tracking-wide">DevStash Manager</span>
        </div>

        <button
          className="lg:hidden p-1 text-parchment/50 hover:text-parchment transition-colors duration-150"
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

      <div className="px-3 flex-1 min-h-0 flex flex-col overflow-auto">
        <p className="text-xs font-semibold text-parchment/40 uppercase tracking-widest px-2 mb-2">
          Tags
        </p>
        {!isLoaded
          ? Array.from({ length: 20 }).map((_, index) => (
            <SkeletonTag key={index} width="w-24" />
          ))
          : tags.map(tag => (
            <label
              key={tag.name}
              className="flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer hover:bg-white/5 transition-colors duration-150"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checkedTags.some(t => t.toLowerCase() === tag.name.toLowerCase())}
                  onChange={() => {
                    addAppliedTags(tag.name)
                    toggleTag(tag.name)
                  }}
                  className="w-3.5 h-3.5 accent-brass"
                />
                <span className="text-sm text-parchment/70">{tag.name}</span>
              </div>
              <span className="text-xs text-parchment/40 bg-white/5 px-1.5 py-0.5 rounded-full">
                {tag.count}
              </span>
            </label>
          ))}
      </div>

     <div className="px-3 py-3 border-t border-white/10 flex-shrink-0 flex flex-col gap-1 items-center justify-center">
        <HowItWorks />
        <p className="text-[11px] text-parchment/30 text-center pt-1 font-mono">
          © {new Date().getFullYear()} DevStash
        </p>
      </div>
      
    </>
  )

  return (
    <>

      <aside className="hidden lg:flex w-52 bg-ink border-r border-black/20 flex-col sticky top-0 z-10 h-screen">
        {sidebarContent}
      </aside>


      <button
        className="lg:hidden fixed top-3 left-4 z-40 p-2 bg-white border border-ink/10 rounded-lg shadow-sm hover:border-brass/30 transition-colors duration-150"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={18} className="text-ink-muted" />

      </button>


      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/30"
          onClick={() => setMobileOpen(false)}
        />
      )}


      <aside
        className={`lg:hidden fixed top-0 left-0 z-40 h-screen w-64 bg-ink border-r border-black/20 flex flex-col transform transition-transform duration-200
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
        className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm text-left transition-all duration-150 border-l-2
          ${active
            ? 'bg-brass/15 font-semibold text-brass border-brass'
            : 'text-parchment/50 font-normal border-transparent hover:bg-white/5 hover:text-parchment/80 hover:translate-x-0.5 cursor-pointer'
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
          {!isSignedIn && <div className="text-parchment/40"> <Lock size={18} /></div>}
        </div>}
      </button>
    </Link>
  )
}
