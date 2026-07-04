'use client'

import React, { useContext, useState } from 'react'
import { MessageSquareText, X, Send } from "lucide-react"
import { AppContext } from '@/contexts/AppData'
import { generateAnswer } from '@/service/GeminiService'
import { StateContext } from '@/contexts/State'
import { useAuth } from '@clerk/nextjs'

export default function Chat() {
  const { stashData, archiveData, setStashData, setArchiveData, incrementViewsCount } = useContext(AppContext)
  const { sortData } = useContext(StateContext)
  const { isSignedIn } = useAuth();


  const [chatModel, setChatModel] = useState(true)
  const [chatValue, setChatValue] = useState('')



  async function send(data, prompt) {
    const res = await generateAnswer(data, prompt)
    console.log(res);
    console.log(res.functionCalls[0].args);
    console.log(res.text);
    if (res.functionCalls[0].name === "createCard") {
      addDataThroughAi(res.functionCalls[0].args)
    }
    if (res.functionCalls[0].name === "editCard") {
      handleStashAction(res.functionCalls[0].args, "Edit")
    }
    if (res.functionCalls[0].name === "openWebsite") {
      handleStashAction(res.functionCalls[0].args, "Visit")
    }
    if (res.functionCalls[0].name === "deleteCard") {
      handleStashAction(res.functionCalls[0].args, "Delete")
    }

  }

  function handleOnKeyDown(e) {
    if (e.key === "Enter") {
      send([...stashData, ...archiveData], chatValue)
    }
  }

  function addDataThroughAi(data) {
    const newData = [{
      ...data, id: crypto.randomUUID(), created: Date.now(), isArchived: false, views: 0, isLatest: false, isPinned: false
    }, ...stashData,]
    setStashData(sortData("date", newData))
  }

  function handleStashAction(data, action) {
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
        const newData = archiveData.filter((obj) => obj.id !== data.id)
        setArchiveData(sortData("date", newData))
      }
      else {
        const newData = stashData.filter((obj) => obj.id !== data.id)
        setStashData(sortData("date", newData))
      }
    }
    // if (action === "Archive") {
    //   if (!isSignedIn) {
    //     toast.error("Please Sign in to use Archive")
    //     return
    //   }
    //   const newArchiveData = stashData.filter((obj) => obj.id === devStash.id)
    //   const isArchived = archiveData.some(obj => obj.id === devStash.id)
    //   if (!isArchived) {
    //     const newData = stashData.filter((obj) => obj.id !== devStash.id)
    //     setStashData(sortData("date", newData))
    //     setArchiveData(sortData("date", [...archiveData, {
    //       ...newArchiveData[0], isArchived: true,
    //       isPinned: false,
    //       isLatest: false
    //     }]))
    //   }
    // }
    // if (action === "Edit") {
    //   const dataForForm = stashData.filter((obj) => obj.id === devStash.id)
    //   setFormData({
    //     id: dataForForm[0].id,
    //     title: dataForForm[0].title,
    //     url: dataForForm[0].url,
    //     description:
    //       dataForForm[0].description,
    //     tags: dataForForm[0].tags,
    //     views: 0,
    //     created: dataForForm[0].created,
    //     isArchived: false,
    //     isPinned: dataForForm[0].isPinned,
    //     pinnedAt: dataForForm[0].pinnedAt
    //   })
    //   setTagValue(dataForForm[0].tags.join(", "))
    //   setIsEditMode({ edit: true, isArchiveEdit: false })
    //   setIsModalOpen(true)
    // }
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
