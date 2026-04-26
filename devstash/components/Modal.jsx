"use client"

import React, { useContext, useRef } from 'react'
import { X, Link, FileText, Tag, AlignLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { AppContext } from '@/contexts/AppData'
import { ModalContext } from '@/contexts/ModalData'
import { StateContext } from '@/contexts/State'


export default function Modal({ setIsModalOpen }) {
  const { stashData, setStashData, archiveData, setArchiveData } = useContext(AppContext)
  const { formData, setFormData, tagValue, setTagValue, isEditMode, setIsEditMode } = useContext(ModalContext)
  const { sortData, activeNav } = useContext(StateContext)

  const urlRef = useRef(null)
  const titleRef = useRef(null)
  const desRef = useRef(null)
  const tagRef = useRef(null)

  function handleOnChange(e, key) {
    if (key === "tags") {
      setTagValue(e.target.value)
      setFormData({ ...formData, [key]: e.target.value.split(",") })
      return
    }
    setFormData({ ...formData, [key]: e.target.value })
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
    setTagValue("")
    setIsModalOpen(false)
    setIsEditMode({ edit: false, isArchiveEdit: false })
  }
  function validateForm() {
    if (formData.url === "") {
      toast.error("Please provide a URL for your stash")
      return false

    }
    if (!/^(https?:\/\/)?([\w\d-]+\.)+[\w-]{2,}(\/.*)?$/i.test(formData.url)) {
      toast.error("Please write a correct URL")
      return false
    }
    if (formData.title === "") {
      toast.error("Please provide a title for your stash")
      return false
    }
    if (formData.description === "") {
      toast.error("Please provide a description for your stash")
      return false

    }
    if (formData.tags.length === 0) {
      toast.error("Please provide a tags for your stash")
      return false

    }

    function hasDuplicates(arr) {
      const counts = {};
      for (const item of arr) {
        if (item === "") {
          return "comma"
        }
        if (counts[item.trim()]) {
          return "duplicate"
        }
        counts[item.trim()] = 1;
      }
    }

    if (hasDuplicates(formData.tags) === "duplicate") {
      toast.error("Please remove duplicate tags!")
      return false
    } else if (hasDuplicates(formData.tags) === "comma") {
      toast.error("Remove leading or trailing commas.")
      return false
    }

    return true
  }
  async function addData() {
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
      setArchiveData(sortData("date", newEditedData))
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
      setStashData(sortData("date", newEditedData))
      resetAndCloseForm()

    } else if (activeNav === "home") {
      const data = [{
        ...formData, id: crypto.randomUUID(), created: Date.now()
      }, ...stashData,]
      setStashData(sortData("date", data))
      resetAndCloseForm()
    } else if (activeNav === "archived") {
      const data = [{
        ...formData, id: crypto.randomUUID(), created: Date.now(), isArchived: true
      }, ...archiveData,]
      setArchiveData(sortData("date", data))
      resetAndCloseForm()
    }




  }
  function handleOnKeyDown(e) {
    if (e.key === "Enter" && e.target.name === "URL") {

      titleRef.current.focus()
    } else if (e.key === "Enter" && e.target.name === "title") {

      desRef.current.focus()
    } else if (e.key === "Enter" && e.target.name === "description") {

      tagRef.current.focus()
    } else if (e.key === "Enter" && e.target.name === "tags") {
      addData()
    }
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
                name='URL'
                onKeyDown={handleOnKeyDown}
                ref={urlRef}
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
                name='title'
                onKeyDown={handleOnKeyDown}
                ref={titleRef}
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
                name='description'
                onKeyDown={handleOnKeyDown}
                ref={desRef}
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
                name='tags'
                onKeyDown={handleOnKeyDown}
                ref={tagRef}
                value={tagValue}
                onChange={(e) => handleOnChange(e, "tags")}
                type="text"
                placeholder="Framework, Tools, Design  (comma separated)"
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
            {isEditMode.isArchiveEdit ? "Edit Archive" : isEditMode.edit ? "Edit Stash" : activeNav === "home" ? "Add DevStash" : "Add Archive"}
          </button>
        </div>

      </div>
    </div>
  )
}