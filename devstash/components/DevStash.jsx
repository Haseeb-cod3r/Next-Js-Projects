'use client'

import { useContext, useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { AppContext } from '@/contexts/AppData'
import { StateContext } from '@/contexts/State'
import DevStashGrid from './DevStashGrid'

export const SORT_OPTIONS = ["Latest", "Oldest", "Most viewed", "Least viewed"];

export default function DevStash() {
  const [sortOpen, setSortOpen] = useState(false)
  const { stashData, archiveData, setArchiveData, setStashData, } = useContext(AppContext)
  const { sortData, sort, setSort, activeNav } = useContext(StateContext)


  return (
    <div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">{activeNav === "home" ? "All Stash" : "All Archive"}</h1>

        <div className="relative">
          <button
            onClick={() => setSortOpen(p => !p)}
            className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowUpDown size={13} />
            Sort by
          </button>

          {sortOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-40 overflow-hidden">
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => {
                    setSort(opt); setSortOpen(false);
                    activeNav === "home" ? sortData(opt, stashData, setStashData) : sortData(opt, archiveData, setArchiveData)
                  }}
                  className={`block w-full px-3.5 py-2 text-left text-sm hover:bg-gray-50 transition-colors
                    ${sort === opt ? 'font-semibold text-gray-900 bg-gray-50' : 'text-gray-600'}`}
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