'use client'

import React, { useContext, useState } from 'react'
import { MessageSquareText, X, Send } from "lucide-react"
import { AppContext } from '@/contexts/AppData'
import { generateAnswer } from '@/service/GeminiService'
import { StateContext } from '@/contexts/State'
import { useAuth } from '@clerk/nextjs'
import { SearchContext } from '@/contexts/Search'

export default function Chat() {
  const { stashData, archiveData, setStashData, setArchiveData, incrementViewsCount } = useContext(AppContext)
  const { sortData, setSort, activeNav } = useContext(StateContext)
  const { isSignedIn } = useAuth();

  const { setSearchValue } = useContext(SearchContext)
  const [chatModel, setChatModel] = useState(true)
  const [chatValue, setChatValue] = useState('')



  async function send(data, prompt) {
    const res = await generateAnswer(data, prompt)
    console.log(res);
    if (!(res.functionCalls)) return

    console.log(res.functionCalls[0]?.args);
    console.log(res?.text);


    if (res.functionCalls[0]?.name === "createCard") {
      addDataThroughAi(res.functionCalls[0]?.args)
    }
    if (res.functionCalls[0]?.name === "editCard") {
      handleActionThroughAi(res.functionCalls[0]?.args, "Edit")
    }
    if (res.functionCalls[0]?.name === "openWebsite") {
      handleActionThroughAi(res.functionCalls[0]?.args, "Visit")
    }
    if (res.functionCalls[0]?.name === "deleteCard") {
      handleActionThroughAi(res.functionCalls[0]?.args, "Delete")
    }
    if (res.functionCalls[0]?.name === "archiveCard") {
      handleActionThroughAi(res.functionCalls[0]?.args, "Archive")
    }
    if (res.functionCalls[0]?.name === "removeArchive") {
      handleActionThroughAi(res.functionCalls[0]?.args, "RemoveArchive")
    }
    if (res.functionCalls[0]?.name === "sortData") {
      handleActionThroughAi(res.functionCalls[0]?.args, "sortData")
    }
    // if (res.functionCalls[0]?.name === "handlePinCard") {
    //   handleActionThroughAi(res.functionCalls[0]?.args, "pinned")
    // }
    if (res.functionCalls[0]?.name === "searchCard") {
      handleActionThroughAi(res.functionCalls[0]?.args, "search")
    }


  }

  function handleOnKeyDown(e) {
    if (e.key === "Enter") {
      send([...stashData, ...archiveData], chatValue)
    }
  }

  function addDataThroughAi(data) {
    const newData = [{
      ...data, id: crypto.randomUUID(), created: Date.now(), isArchived: false, views: 0, isPinned: false
    }, ...stashData,]
    setStashData(sortData("date", newData))
  }

  function handleActionThroughAi(data, action) {
    if (action === "Visit") {
      window.open(data.url, "_blank")
      if (data.isArchived) {
        incrementViewsCount(false, data, archiveData, setArchiveData)
      }
      else {
        incrementViewsCount(false, data, stashData, setStashData)
      }

    }
    if (action === "Delete") {
      if (data.isArchived) {
        if (!isSignedIn) {
          toast.error("Please Sign in to use Archive")
          return
        }
        const newData = archiveData.filter((obj) => obj.id !== data.id)
        setArchiveData(sortData("date", newData))
      }
      else {
        const newData = stashData.filter((obj) => obj.id !== data.id)
        setStashData(sortData("date", newData))
      }
    }
    if (action === "Archive") {
      if (!isSignedIn) {
        toast.error("Please Sign in to use Archive")
        return
      }
      const newArchiveData = stashData.filter((obj) => obj.id === data.id)
      const isArchived = archiveData.some(obj => obj.id === data.id)
      if (!isArchived) {
        const newData = stashData.filter((obj) => obj.id !== data.id)
        setStashData(sortData("date", newData))
        setArchiveData(sortData("date", [...archiveData, {
          ...newArchiveData[0], isArchived: true,
          isPinned: false,
        }]))
      }
    }
    if (action === "RemoveArchive") {
      if (!isSignedIn) {
        toast.error("Please Sign in to use Archive")
        return
      }
      const newData = archiveData.filter((obj) => obj.id === data.id)
      const newArchiveData = archiveData.filter((obj) => obj.id !== data.id)

      setArchiveData(sortData("date", newArchiveData))
      setStashData(sortData("date", [{
        ...newData[0], isArchived: false,
        isPinned: false,
      }, ...stashData]))

    }
    if (action === "Edit") {
      if (data.isArchived) {
        if (!isSignedIn) {
          toast.error("Please Sign in to use Archive")
          return
        }
        const newEditedData = archiveData.map((obj) => {
          if (obj.id === data.id) {
            const newObj = {
              ...obj,
              title: data.title,
              url: data.url,
              description: data.description,
              tags: data.tags,
            }
            return newObj
          }
          return obj
        })
        setArchiveData(sortData("date", newEditedData))
      } else {
        const newEditedData = stashData.map((obj) => {
          if (obj.id === data.id) {
            const newObj = {
              ...obj,
              title: data.title,
              url: data.url,
              description: data.description,
              tags: data.tags,
            }
            return newObj
          }
          return obj
        })
        setStashData(sortData("date", newEditedData))
      }

    }
    if (action === "sortData") {
      const action = data.sortAction.charAt(0).toUpperCase() + data.sortAction.slice(1).toLowerCase()
      console.log(action);
      setSort(action)
      activeNav === 'home'
        ? sortData(action, stashData, setStashData)
        : sortData(action, archiveData, setArchiveData)

    }

    if (action === "pinned") {
      if (data.isArchived) {
        if (!isSignedIn) {
          toast.error("Please Sign in to use Archive")
          return
        }
        const pinnedData = archiveData.map((item) => (
          item.id === data.id ? { ...item, isPinned: !item.isPinned, pinnedAt: !item.isPinned ? Date.now() : null } : item
        ))

        const sortedPinnedData = [...pinnedData.filter((item) => item.isPinned).sort((a, b) => b.pinnedAt - a.pinnedAt)]
        const sortedNormalData = [...pinnedData.filter((item) => !item.isPinned).sort((a, b) => new Date(b.created) - new Date(a.created))]
        const sorted = [
          ...sortedPinnedData,
          ...sortedNormalData
        ]
        setArchiveData(sorted)
      } else {

        const pinnedData = stashData.map((item) => (
          item.id === data.id ? { ...item, isPinned: !item.isPinned, pinnedAt: !item.isPinned ? Date.now() : null } : item
        ))

        const sortedPinnedData = [...pinnedData.filter((item) => item.isPinned).sort((a, b) => b.pinnedAt - a.pinnedAt)]
        const sortedNormalData = [...pinnedData.filter((item) => !item.isPinned).sort((a, b) => new Date(b.created) - new Date(a.created))]
        const sorted = [
          ...sortedPinnedData,
          ...sortedNormalData
        ]
        setStashData(sorted)
      }
    }
    if (action === "search") {
      setSearchValue(data.searchValue)
    }




  }









  if (!chatModel) {
    return (
      <div onClick={() => setChatModel(true)} className='fixed bottom-10 right-10 border rounded-full bg-blue-500 text-white p-3 flex items-center justify-center gap-1 cursor-pointer hover:scale-120 transition-all ease-in-out duration-[.33s]'><MessageSquareText size={25} /></div>
    )
  }
  if (chatModel) {
    return (
      <>
        <div className='fixed inset-0  z-100 ]' onClick={() => setChatModel(false)}></div>
        <div className='z-150 fixed bottom-10 right-10 border h-[500px] w-[400px] flex flex-col p-3 bg-blue-300 justify-between'>< div className='flex w-full justify-between'><p>chat powered by gemini 2.5 flash</p>          <button
          onClick={() => setChatModel(false)}
          className="p-1.5 rounded-lg text-black  hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
        </div>
          <div></div>
          <div className='flex w-full items-center gap-3 border rounded-2xl p-2'>
            <input onKeyDown={handleOnKeyDown} value={chatValue}
              onChange={(e) => setChatValue(e.target.value)} className='border-none outline-none w-full' type="text" />

            <Send className='cursor-pointer' onClick={() => send([...stashData, ...archiveData], chatValue)} size={25} />
          </div>
        </div>
      </>
    )
  }
}
