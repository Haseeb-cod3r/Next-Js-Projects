'use client'

import React, { useContext, useState } from 'react'
import { MessageSquareText, X, Send } from "lucide-react"
import { AppContext } from '@/contexts/AppData'
import { generateAnswer } from '@/service/GeminiService'

export default function Chat() {
  const { stashData } = useContext(AppContext)


  const [chatModel, setChatModel] = useState(true)
  const [chatValue, setChatValue] = useState('')



  async function send(data, prompt) {
    const res = await generateAnswer(data, prompt)
    console.log(res.functionCalls[0].args);
    console.log(res.text);
  }

  function handleOnKeyDown(e) {
    if (e.key === "Enter") {
      send(stashData, chatValue)
    }
  }

  if (!chatModel) {

    return (
      <div onClick={() => setChatModel(true)} className='fixed bottom-10 right-10 border rounded-full bg-blue-500 text-white p-3 flex items-center justify-center gap-1 cursor-pointer hover:scale-120 transition-all ease-in-out duration-[.33s]'><MessageSquareText size={25} /></div>
    )
  }
  if (chatModel) {
    return (
      <div className='fixed bottom-10 right-10 border h-[500px] w-[400px] flex flex-col p-3 bg-blue-300 justify-between'>< div className='flex w-full justify-between'><p>chat powered by gemini 2.5 flash</p>          <button
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

          <Send className='cursor-pointer' onClick={() => send(stashData, chatValue)} size={25} />
        </div>
      </div>
    )
  }
}
