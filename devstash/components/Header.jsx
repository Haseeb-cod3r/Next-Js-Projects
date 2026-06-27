
'use client'
import { Show, SignInButton, useAuth, UserButton } from '@clerk/nextjs'
import { useContext, useEffect } from 'react'
import { Search, Plus } from 'lucide-react'
import Modal from './Modal'
import { ModalContext } from '@/contexts/ModalData'
import { SearchContext } from '@/contexts/Search'
import { AppContext } from '@/contexts/AppData'
import { StateContext } from '@/contexts/State'
import { usePathname } from 'next/navigation'


export default function Header() {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext)
  const { stashData, archiveData } = useContext(AppContext)
  const { searchValue, setSearchValue, sortSearchData } = useContext(SearchContext)
  const { activeNav } = useContext(StateContext)
  const { isLoaded } = useAuth()
  const pathname = usePathname()


  useEffect(() => {
    const currSource = activeNav === 'home' ? stashData : archiveData
    sortSearchData(currSource, searchValue)
  }, [searchValue, stashData, archiveData])

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between lg:px-8 sticky top-0 z-30">


      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-40 sm:w-64 lg:w-72 ml-10 lg:ml-0">
        <Search size={15} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search by title..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 w-full"
        />
      </div>


      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-3 lg:px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <Plus size={15} />
          <span className="hidden sm:inline">
            {pathname === '/' ? 'Add DevStash' : 'Add Archive'}
          </span>
        </button>



        <div className={`flex items-center justify-center w-[65px] `}>
          {isLoaded ? (
            <>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className=" w-[65px] bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-lg transition-all duration-300 cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </>
          ) : <div className="flex items-center gap-3">
            <div className="h-7 w-7 bg-slate-200 animate-pulse rounded-full"></div>
          </div>}

        </div>

      </div>

      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </header >
  )
}