import React, { useContext } from 'react'
import DevStashCard from './DevStashCard'
import { AppContext } from '@/contexts/AppData'
import { Archive, Plus, Search } from 'lucide-react'
import { ModalContext } from '@/contexts/ModalData'



export default function DevStashGrid() {

  const { stashData, activeNav, archiveData, tagData, setActiveNav } = useContext(AppContext)
  const { setIsModalOpen } = useContext(ModalContext)

  const data = tagData.isTagData ? tagData.data : activeNav === "home" ? stashData : archiveData

  if (tagData.isTagData && data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 opacity-20">
          <Search size={80} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No matches found</h3>
        <p className="text-gray-500 max-w-xs">
          We couldn't find any items matching your selected tags in the {activeNav === "home" ? "Stash" : "Archive"}.
        </p>
      </div>
    )
  }
  if (activeNav === "home" && data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-500">
          <Plus size={40} strokeWidth={2.5} />
        </div>

        <h3 className="text-xl font-bold text-gray-900">Your Stash is looking a bit empty</h3>

        <p className="mt-2 text-gray-500 max-w-sm">
          Start building your collection! Save your favorite code snippets, useful links, and developer resources here.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          <Plus size={18} />
          Add Your First Item
        </button>
      </div>
    );
  }
  if (activeNav === "archived" && data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 opacity-10">
          <Archive size={100} strokeWidth={1.5} />
        </div>

        <h3 className="text-xl font-semibold text-gray-900">Your Archive is empty</h3>

        <p className="mt-2 text-gray-500 max-w-sm">
          Items you move to the Archive will appear here. It's a great way to keep your Stash organized and focused.
        </p>

        <button
          onClick={() => setActiveNav("home")}
          className="mt-6 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          Back to Stash
        </button>
      </div>
    );
  }

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {
        data.map(devStash => <DevStashCard key={devStash.id} devStash={devStash} />)
      }
    </div>

  )





}