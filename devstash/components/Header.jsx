'use client'

import { useContext, useState } from 'react'
import { Search, Plus, User } from 'lucide-react'
import Modal from './Modal'
import { ModalContext } from '@/contexts/ModalData'

export default function Header() {
  const [search, setSearch] = useState('')
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext)
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-30">
      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-72">
        <Search size={15} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 w-full"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus size={15} />
          Add DevStash
        </button>
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
          <User size={16} className="text-gray-500" />
        </div>
      </div>
      {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} /> : ""}
    </header>

  )
}