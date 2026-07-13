'use client'

import { useContext, useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { AppContext } from '@/contexts/AppData'
import { StateContext } from '@/contexts/State'
import DevStashGrid from './DevStashGrid'
import { usePathname } from 'next/navigation';

export const SORT_OPTIONS = ['Latest', 'Oldest', 'Most viewed', 'Least viewed']

export default function DevStash() {
  const [sortOpen, setSortOpen] = useState(false)
  const { stashData, archiveData, setArchiveData, setStashData } = useContext(AppContext)
  const { sortData, sort, setSort, activeNav } = useContext(StateContext)
  const pathname = usePathname()


  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg lg:text-xl font-bold font-sans animate-[float_3s_ease-in-out_infinite]">
          <span className=" text-[30px] bg-gradient-to-r from-brass via-ink to-brass bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_4s_linear_infinite]">
            {pathname === '/' ? 'Stash' : 'Archive'}
          </span>
        </h1>
        <div className="relative">
          <button
            onClick={() => setSortOpen(p => !p)}
            className="flex items-center gap-2 border border-ink/10 bg-white rounded-lg px-3 lg:px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-ink/5 hover:border-brass/30 hover:text-ink transition-colors duration-150"
          >
            <ArrowUpDown size={13} />
            <span className="hidden sm:inline">Sort by</span>
          </button>

          {sortOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-ink/10 rounded-lg shadow-lg z-20 w-40 overflow-hidden animate-[fadeSlideIn_150ms_ease-out]">
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => {
                    setSort(opt)
                    setSortOpen(false)
                    activeNav === 'home'
                      ? sortData(opt, stashData, setStashData)
                      : sortData(opt, archiveData, setArchiveData)
                  }}
                  className={`block w-full px-3.5 py-2 text-left text-sm hover:bg-brass/10 transition-colors duration-150
                    ${sort === opt ? 'font-semibold text-brass bg-brass/10' : 'text-ink-muted'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <DevStashGrid />
    </div>
  )
}