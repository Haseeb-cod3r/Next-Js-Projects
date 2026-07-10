'use client'

import { useContext, useState } from 'react'
import { MoreHorizontal, Eye, Calendar, Pin, } from 'lucide-react'
import { AppContext } from '@/contexts/AppData'
import { ModalContext } from '@/contexts/ModalData'
import { StateContext } from '@/contexts/State'
import { SearchContext } from '@/contexts/Search'
import { useAuth } from '@clerk/nextjs'
import toast from 'react-hot-toast'

const stashMenu = ['Visit', 'Edit', 'Archive', 'Delete']
const archiveMenu = ['Visit', 'Edit', 'RemoveArchive', 'Delete']


export default function DevStashCard({ devStash }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { stashData, setStashData, archiveData, setArchiveData, incrementViewsCount } = useContext(AppContext)
  const { setIsModalOpen, setFormData, setTagValue, setIsEditMode } = useContext(ModalContext)
  const { sortData } = useContext(StateContext)
  const { searchValue } = useContext(SearchContext)
  const { isSignedIn } = useAuth();

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
            <mark key={index} className="bg-brass/20 text-brass rounded-sm font-medium">
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
    if (action === "Visit") {
      window.open(devStash.url, "_blank")
      incrementViewsCount(false, devStash, archiveData, setArchiveData,)
    }
    if (action === "Delete") {
      const newData = archiveData.filter((obj) => obj.id !== devStash.id)
      setArchiveData(sortData("date", newData))
    }
    if (action === "RemoveArchive") {
      const newData = archiveData.filter((obj) => obj.id === devStash.id)
      const newArchiveData = archiveData.filter((obj) => obj.id !== devStash.id)

      setArchiveData(sortData("date", newArchiveData))
      setStashData(sortData("date", [{
        ...newData[0], isArchived: false,
        isPinned: false,
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
    if (action === "Visit") {
      window.open(devStash.url, "_blank")
      incrementViewsCount(false, devStash, stashData, setStashData)
    }
    if (action === "Delete") {
      const newData = stashData.filter((obj) => obj.id !== devStash.id)
      setStashData(sortData("date", newData))
    }
    if (action === "Archive") {
      if (!isSignedIn) {
        toast.error("Please Sign in to use Archive")
        return
      }
      const newArchiveData = stashData.filter((obj) => obj.id === devStash.id)
      const isArchived = archiveData.some(obj => obj.id === devStash.id)
      if (!isArchived) {
        const newData = stashData.filter((obj) => obj.id !== devStash.id)
        setStashData(sortData("date", newData))
        setArchiveData(sortData("date", [...archiveData, {
          ...newArchiveData[0], isArchived: true,
          isPinned: false,
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
    <div className="bg-white border border-ink/10 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(27,34,44,0.18)] hover:border-brass/30">

      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg bg-ink/5 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src={`https://www.google.com/s2/favicons?domain=${devStash.url}&sz=32`}
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
          </div>

          <div className="min-w-0 flex-1 overflow-hidden scroll-none">
            <p className="font-semibold text-sm text-ink leading-tight truncate">
              {HighlightedText(devStash.title, searchValue)}
            </p>
            <a href={devStash.url} onClick={() => incrementViewsCount(true, devStash)} target="_blank" title='url' className="text-xs text-ink-muted mt-0.5 truncate break-all font-mono">
              {devStash.url}
            </a>
          </div>
        </div>

        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen(p => !p)}
            className="p-1.5 rounded-md cursor-pointer text-ink-muted hover:text-ink hover:bg-ink/5 transition-colors duration-150"
          >
            <MoreHorizontal size={16} />
          </button>

          {menuOpen && (

            <div className="absolute right-0 top-full mt-1 bg-white border border-ink/10 rounded-lg shadow-lg z-10 w-32 overflow-hidden animate-[fadeSlideIn_150ms_ease-out]">
              {(devStash.isArchived ? archiveMenu : stashMenu).map(action => (
                <button
                  key={action}
                  onClick={() => {
                    setMenuOpen(false)
                    devStash.isArchived ? handleArchiveAction(action) : handleStashAction(action)
                  }}
                  className={`block w-full px-3.5 py-2 text-left text-sm hover:bg-ink/5 transition-colors duration-150
                    ${action === 'Delete' ? 'text-wine' : 'text-ink/80'}`}
                >
                  {action}
                </button>
              ))}
            </div>

          )}
        </div>
      </div>

      <p className="text-sm text-ink-muted leading-relaxed line-clamp-3 break-words">
        {devStash.description}
      </p>

      <div className="flex flex-wrap gap-1.5 overflow-hidden mt-auto">
        {devStash.tags.map(tag => (
          <span
            key={crypto.randomUUID()}
            className="text-[11px] font-mono tracking-wide uppercase bg-brass/10 text-brass border border-brass/25 font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap"
          >
            {tag}
          </span >
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-ink-muted pt-2 border-t border-ink/10">
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
          className='flex items-center cursor-pointer ml-auto hover:text-brass transition-colors duration-150 hover:scale-110'
        >
          <Pin size={15} className={`transition-colors duration-150 ${devStash.isPinned ? "fill-brass text-brass" : ""}`} />
        </span>
      </div>
    </div>
  )
}