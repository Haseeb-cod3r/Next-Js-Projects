'use client'

import { useContext, useState } from 'react'
import { MoreHorizontal, Eye, Calendar, Pin, } from 'lucide-react'
import { AppContext } from '@/contexts/AppData'
import { ModalContext } from '@/contexts/ModalData'
import { StateContext } from '@/contexts/State'
import { SearchContext } from '@/contexts/Search'


const stashMenu = ['Edit', 'Archive', 'Delete']
const archiveMenu = ['Edit', 'Remove Archive', 'Delete']


export default function DevStashCard({ devStash }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { stashData, setStashData, archiveData, setArchiveData } = useContext(AppContext)
  const { setIsModalOpen, setFormData, setTagValue, setIsEditMode } = useContext(ModalContext)
  const { sortData } = useContext(StateContext)
  const { searchValue } = useContext(SearchContext)


  function HighlightedText(text, highlight) {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={index} className="bg-blue-200 text-blue-700 rounded-sm font-medium">
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  function handleArchiveAction(action) {
    if (action === "Delete") {
      const newData = archiveData.filter((obj) => obj.id !== devStash.id)
      setArchiveData(sortData("date", newData))
    }
    if (action === "Remove Archive") {
      const newData = archiveData.filter((obj) => obj.id === devStash.id)
      const newArchiveData = archiveData.filter((obj) => obj.id !== devStash.id)

      setArchiveData(sortData("date", newArchiveData))
      setStashData(sortData("date", [{
        ...newData[0], isArchived: false,
        isPinned: false,
        isLatest: false
      }, ...stashData]))

    }
    if (action === "Edit") {
      const dataForForm = archiveData.filter((obj) => obj.id === devStash.id)
      setFormData({
        id: dataForForm[0].id,
        title: dataForForm[0].title,
        url: dataForForm[0].url,
        description:
          dataForForm[0].description,
        tags: dataForForm[0].tags,
        views: 0,
        created: dataForForm[0].created,
        isArchived: true,
        isPinned: dataForForm[0].isPinned,
        pinnedAt: dataForForm[0].pinnedAt
      })
      setTagValue(dataForForm[0].tags.join(", "))
      setIsEditMode({ edit: true, isArchiveEdit: true })
      setIsModalOpen(true)
    }
  }
  function handleStashAction(action) {
    if (action === "Delete") {
      const newData = stashData.filter((obj) => obj.id !== devStash.id)
      setStashData(sortData("date", newData))
    }
    if (action === "Archive") {
      const newArchiveData = stashData.filter((obj) => obj.id === devStash.id)
      const isArchived = archiveData.some(obj => obj.id === devStash.id)
      if (!isArchived) {
        const newData = stashData.filter((obj) => obj.id !== devStash.id)
        setStashData(sortData("date", newData))
        setArchiveData(sortData("date", [...archiveData, {
          ...newArchiveData[0], isArchived: true,
          isPinned: false,
          isLatest: false
        }]))
      }
    }
    if (action === "Edit") {
      const dataForForm = stashData.filter((obj) => obj.id === devStash.id)
      setFormData({
        id: dataForForm[0].id,
        title: dataForForm[0].title,
        url: dataForForm[0].url,
        description:
          dataForForm[0].description,
        tags: dataForForm[0].tags,
        views: 0,
        created: dataForForm[0].created,
        isArchived: false,
        isPinned: dataForForm[0].isPinned,
        pinnedAt: dataForForm[0].pinnedAt
      })
      setTagValue(dataForForm[0].tags.join(", "))
      setIsEditMode({ edit: true, isArchiveEdit: false })
      setIsModalOpen(true)
    }
  }
  function sortPin(data, setData) {

    const pinnedData = data.map((item) => (
      item.id === devStash.id ? { ...item, isPinned: !item.isPinned, pinnedAt: !item.isPinned ? Date.now() : null } : item
    ))

    const sortedPinnedData = [...pinnedData.filter((item) => item.isPinned).sort((a, b) => b.pinnedAt - a.pinnedAt)]
    const sortedNormalData = [...pinnedData.filter((item) => !item.isPinned).sort((a, b) => new Date(b.created) - new Date(a.created))]
    const sorted = [
      ...sortedPinnedData,
      ...sortedNormalData
    ]
    setData(sorted)
  }


  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow relative overflow-hidden">

      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src={`https://www.google.com/s2/favicons?domain=${devStash.url}&sz=32`}
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm text-gray-900 leading-tight truncate">
              {HighlightedText(devStash.title, searchValue)}
            </p>
            <p title='url' className="text-xs text-gray-400 mt-0.5 truncate break-all">
              {devStash.url}
            </p>
          </div>
        </div>

        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen(p => !p)}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-32 overflow-hidden">
              {(devStash.isArchived ? archiveMenu : stashMenu).map(action => (
                <button
                  key={action}
                  onClick={() => {
                    setMenuOpen(false)
                    devStash.isArchived ? handleArchiveAction(action) : handleStashAction(action)
                  }}
                  className={`block w-full px-3.5 py-2 text-left text-sm hover:bg-gray-50 transition-colors
                    ${action === 'Delete' ? 'text-red-500' : 'text-gray-700'}`}
                >
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 break-words">
        {devStash.description}
      </p>

      <div className="flex flex-wrap gap-1.5 overflow-hidden mt-auto">
        {devStash.tags.map(tag => (
          <span
            key={crypto.randomUUID()}
            className="text-xs bg-gray-100 text-gray-500 font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap"
          >
            {tag}
          </span >
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-gray-100 mt-auto">
        <span className="flex items-center gap-1 flex-shrink-0">
          <Eye size={11} />
          {devStash.views}
        </span>
        <span className="flex items-center gap-1 flex-shrink-0">
          <Calendar size={11} />
          {new Date(devStash.created).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })}
        </span>
        <span
          onClick={() => { devStash.isArchived ? sortPin(archiveData, setArchiveData) : sortPin(stashData, setStashData) }}
          className='flex items-center cursor-pointer ml-auto hover:text-black transition-colors'
        >
          <Pin size={15} className={`${devStash.isPinned ? "fill-black text-black" : ""}`} />
        </span>
      </div>
    </div>
  )
}