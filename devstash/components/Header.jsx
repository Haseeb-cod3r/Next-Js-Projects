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
    <header className="h-15 bg-parchment border-b border-ink/10 flex gap-2 items-center justify-between lg:px-8 sticky top-0 z-30">


      <div className="flex items-center gap-2 bg-white border border-ink/10 rounded-lg px-3 py-2 w-40 sm:w-64 lg:w-72 ml-16 lg:ml-0 transition-colors duration-150 focus-within:border-brass/40 focus-within:shadow-[0_0_0_3px_rgba(184,134,60,0.1)]">
        <Search size={15} className="text-ink-muted flex-shrink-0" />
        <input
          type="text"
          placeholder="Search by title..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="bg-transparent outline-none text-sm text-ink placeholder-ink-muted/60 w-full"
        />
      </div>


      <div className="flex items-center gap-2 max-lg:pr-5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 bg-brass hover:bg-brass/90 text-white text-sm font-medium px-3 lg:px-4 py-2 rounded-lg transition-all duration-150 cursor-pointer hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">
            {pathname === '/' ? 'Add DevStash' : 'Add Archive'}
          </span>
        </button>



        <div className={`flex items-center justify-center w-[65px]`}>
          {isLoaded ? (
            <>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="h-[35px] w-[65px] bg-ink  hover:bg-ink/90 text-white rounded-lg transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:scale-95 flex justify-center items-center">
                    Sign In
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </>
          ) : <div className="flex items-center gap-3">
            <div className="h-7 w-7 bg-ink/10 animate-pulse rounded-full"></div>
          </div>}

        </div>

      </div>

      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </header >
  )
}