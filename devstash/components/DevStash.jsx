'use client'

import { useContext, useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { AppContext } from '@/contexts/AppData'
import DevStashCard from './DevStashCard'
import { UtilityContext } from '@/contexts/Utility'

export const SORT_OPTIONS = ["Latest", "Oldest", "Most viewed", "Least viewed"];

export default function DevStash() {
  const [sortOpen, setSortOpen] = useState(false)
  const [sort, setSort] = useState('Latest')
  const { stashData, activeNav, archiveData, setArchiveData, setStashData } = useContext(AppContext)
const {sortData} = useContext(UtilityContext)



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


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeNav === "home" ? stashData.map(devStash => (
          <DevStashCard key={devStash.id} devStash={devStash} />
        ))
          : archiveData.map(devStash => (
            <DevStashCard key={devStash.id} devStash={devStash} />
          ))}
      </div>
    </div>
  )
}