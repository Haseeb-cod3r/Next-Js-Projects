"use client"

import React, { useContext } from 'react'
import { X, Link, FileText, Tag, AlignLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { AppContext } from '@/contexts/AppData'
import { ModalContext } from '@/contexts/ModalData'
export default function Modal({ setIsModalOpen }) {
  const { stashData, setStashData, archiveData, setArchiveData } = useContext(AppContext)
  const { formData, setFormData, tags, setTags, isEditMode } = useContext(ModalContext)


  function handleOnChange(e, key) {
    if (key === "tags") {
      setTags(e.target.value)
      setFormData({ ...formData, [key]: e.target.value.split(" ") })
      return
    }
    setFormData({ ...formData, [key]: e.target.value })
  }
  function sortDate(data) {
    const sortedData = [...data.sort((a, b) => new Date(b.created) - new Date(a.created))]
    return sortedData
  }


  function addData() {
    if (!validateForm()) return
    if (isEditMode.edit && isEditMode.isArchiveEdit) {
      const newEditedData = archiveData.map((obj) => {
        if (obj.id === formData.id) {
          const newObj = {
            id: formData.id,
            title: formData.title,
            url: formData.url,
            description:
              formData.description,
            tags: formData.tags,
            views: formData.views,
            created: formData.created,
            isArchived: true,
            isPinned: formData.isPinned,
            pinnedAt: formData.pinnedAt
          }
          return newObj
        }
        return obj
      })
      setArchiveData(sortDate(newEditedData))
      resetAndCloseForm()

    } else if (isEditMode.edit) {

      const newEditedData = stashData.map((obj) => {
        if (obj.id === formData.id) {
          const newObj = {
            id: formData.id,
            title: formData.title,
            url: formData.url,
            description:
              formData.description,
            tags: formData.tags,
            views: formData.views,
            created: formData.created,
            isArchived: false,
            isPinned: formData.isPinned,
            pinnedAt: formData.pinnedAt
          }
          return newObj
        }
        return obj
      })
      setStashData(sortDate(newEditedData))
      resetAndCloseForm()

    } else {
      const data = [{
        ...formData, id: crypto.randomUUID(), created: Date.now()
      }, ...stashData,]
      setStashData(sortDate(data))
      resetAndCloseForm()
    }
  }

  function resetAndCloseForm() {
    setFormData({
      id: "",
      title: "",
      url: "",
      description:
        "",
      tags: [],
      views: 0,
      created: "",
      isArchived: false,
      isPinned: false,
      pinnedAt: null

    })
    setTags("")
    setIsModalOpen(false)
  }
  function validateForm() {
    if (formData.url === "") {
      toast.error("url is required")
      return false

    }
    if (formData.title === "") {
      toast.error("title is required")
      return false
    }
    if (formData.description === "") {
      toast.error("description is required")
      return false

    }
    if (formData.tags === "") {
      toast.error("tags is required")
      return false

    }
    return true
  }
  return (
    <div
      onClick={() => resetAndCloseForm()}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-999"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
      >

        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Add DevStash</h2>
            <p className="text-xs text-gray-400 mt-0.5">Save a new link to your collection</p>
          </div>
          <button
            onClick={() => resetAndCloseForm()}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>


        <div className="px-6 py-5 flex flex-col gap-4">


          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              URL
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Link size={15} className="text-gray-400 shrink-0" />
              <input
                value={formData.url}
                onChange={(e) => handleOnChange(e, "url")}
                type="url"
                placeholder="https://example.com"
                className="w-full text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
              />
            </div>
          </div>


          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Title
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <FileText size={15} className="text-gray-400 shrink-0" />
              <input
                value={formData.title}
                onChange={(e) => handleOnChange(e, "title")}
                type="text"
                placeholder="Tailwind CSS"
                className="w-full text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
              />
            </div>
          </div>


          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Description
            </label>
            <div className="flex items-start gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <AlignLeft size={15} className="text-gray-400 shrink-0 mt-0.5" />
              <textarea
                value={formData.description}
                onChange={(e) => handleOnChange(e, "description")}
                placeholder="What is this link about..."
                rows={3}
                className="w-full text-sm text-gray-700 placeholder-gray-300 outline-none resize-none bg-transparent"
              />
            </div>
          </div>


          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tags
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Tag size={15} className="text-gray-400 shrink-0" />
              <input
                value={tags}
                onChange={(e) => handleOnChange(e, "tags")}
                type="text"
                placeholder="CSS, Framework, Tools  (comma separated)"
                className="w-full text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
              />
            </div>
          </div>

        </div>


        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={() => resetAndCloseForm()}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => addData()}
            className="flex-1 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-colors"
          >
            {isEditMode.edit ? "Edit DevStash" : "Add DevStash"}
          </button>
        </div>

      </div>
    </div>
  )
}