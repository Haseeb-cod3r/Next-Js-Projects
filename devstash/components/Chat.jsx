'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import { MessageSquareText, X, Send, Loader2, Ellipsis, Bot, Sparkles } from "lucide-react"
import { AppContext } from '@/contexts/AppData'
import { generateAnswer } from '@/service/GeminiService'
import { StateContext } from '@/contexts/State'
import { useAuth } from '@clerk/nextjs'
import { SearchContext } from '@/contexts/Search'
import { TagContext } from '@/contexts/Tag'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Chat() {
  const { stashData, archiveData, setStashData, setArchiveData, incrementViewsCount } = useContext(AppContext)
  const { sortData, setSort, activeNav } = useContext(StateContext)
  const { isSignedIn } = useAuth();
  const { appliedTags, setAppliedTags, setCheckedTags, setMobileOpen } = useContext(TagContext)
  const { setSearchValue } = useContext(SearchContext)
  const [chatModel, setChatModel] = useState(false)
  const [chatValue, setChatValue] = useState('')
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)
  const inpRef = useRef(null)


  useEffect(() => {
    const stored = sessionStorage.getItem("chatMessages")
    if (stored) {
      try {
        setMessages(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse chatMessages", e)
      }
    }
  }, [])

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading, chatModel])

  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    if (!loading) {
      inpRef.current?.focus()
    }
  }, [loading])




  async function send(data, prompt) {
    if (chatValue === "") {
      return
    }
    setChatValue("")

    setMessages((prev) =>
      [...prev, { message: prompt, isUser: true }]
    )
    const { args, name, text, error } = await generateAnswer(data, prompt, setLoading)
    console.log(args);
    console.log(name);
    console.log(text);
    console.log(error);

    if (error) {
      setMessages((prev) => [...prev, { message: "Something went wrong please try again!", isUser: false }])
    }
    if (text) {
      setMessages((prev) =>
        [...prev, { message: text, isUser: false }]
      )
    } else if (!error) {
      setMessages((prev) => [...prev, { message: "Something went wrong please try again!", isUser: false }])
    }
    if (!(args && name)) return



    if (name === "createCard") {
      addDataThroughAi(args)
    } else if (name === "editCard") {
      handleActionThroughAi(args, "Edit")
    } else if (name === "openWebsite") {
      handleActionThroughAi(args, "Visit")
    } else if (name === "deleteCard") {
      handleActionThroughAi(args, "Delete")
    } else if (name === "archiveCard") {
      handleActionThroughAi(args, "Archive")
    } else if (name === "removeArchive") {
      handleActionThroughAi(args, "RemoveArchive")
    } else if (name === "sortData") {
      handleActionThroughAi(args, "sortData")
    } else if (name === "handlePinCard") {
      handleActionThroughAi(args, "pinned")
    } else if (name === "searchCard") {
      handleActionThroughAi(args, "search")
    } else if (name === "filterData") {
      handleActionThroughAi(args, "filter")
    } else if (name === "changeRoute") {
      handleActionThroughAi(args, "changeRoute")
    }


  }

  function handleOnKeyDown(e) {
    if (e.key === "Enter") {
      send([...stashData, ...archiveData], chatValue)
    }
  }

  function addDataThroughAi(data) {
    const newTagsArr = data.tags.map((tag) => {
      const trimmed = tag.trim()
      if (!trimmed) return trimmed
      return tag[0].toUpperCase() + tag.slice(1).toLowerCase()
    })

    const newData = [{
      ...data, tags: newTagsArr, id: crypto.randomUUID(), created: Date.now(), isArchived: false, views: 0, isPinned: false
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
    else if (action === "Delete") {
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
    else if (action === "Archive") {
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
    else if (action === "RemoveArchive") {
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
    else if (action === "Edit") {
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
    else if (action === "sortData") {
      const action = data.sortAction.charAt(0).toUpperCase() + data.sortAction.slice(1).toLowerCase()
      console.log(action);
      setSort(action)
      activeNav === 'home'
        ? sortData(action, stashData, setStashData)
        : sortData(action, archiveData, setArchiveData)

    }

    else if (action === "pinned") {
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
    else if (action === "search") {
      setSearchValue(data.searchValue)
    }
    else if (action === "filter") {

      if (data.isApply) {

        data.tags.forEach(tag => {
          setCheckedTags(prev =>
            prev.some(t => t.toLowerCase() === tag.toLowerCase()) ? prev : [...prev, tag]
          )

          const isPresent = appliedTags.some(t => t.toLowerCase() === tag.toLowerCase())
          if (!isPresent) { setAppliedTags((prev) => [...prev, tag]) }


        });
      } else {


        data.tags.forEach(tag => {
          setCheckedTags(prev =>
            prev.some(t => t.toLowerCase() === tag.toLowerCase()) ? prev.filter(t => t.toLowerCase() !== tag.toLowerCase()) : prev
          )

          const isPresent = appliedTags.some(t => t.toLowerCase() === tag.toLowerCase())
          if (isPresent) { setAppliedTags((prev) => prev.filter(t => t.toLowerCase() !== tag.toLowerCase())) }


        });


      }
    }
    else if (action === "changeRoute") {
      if (data.route === "home") {
        router.push("/")
        setAppliedTags([])
        setCheckedTags([])
        setSearchValue('')
        setSort('Latest')
        sortData('Latest', archiveData, setArchiveData)
        setMobileOpen(false)
      }
      else {
        router.push("/archive")
        setAppliedTags([])
        setCheckedTags([])
        setSearchValue('')
        setSort('Latest')
        sortData('Latest', stashData, setStashData)
        setMobileOpen(false)
      }
    }


  }


  if (!chatModel) {
    return (
      <button
        onClick={() => {
          setChatModel(true)
        }}
        className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-500 h-14 w-14 rounded-full bg-brass text-white flex items-center justify-center shadow-[0_8px_24px_-6px_rgba(184,134,60,0.5)] hover:shadow-[0_10px_28px_-4px_rgba(184,134,60,0.6)] hover:scale-120 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <MessageSquareText size={24} />
      </button >
    )
  }
  if (chatModel) {
    return (
      <>
        <div
          className="fixed inset-0 z-100 bg-ink/10 animate-[fadeSlideIn_150ms_ease-out]"
          onClick={() => {
            setChatModel(false)
          }}
        ></div>

        <div className="z-150 fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-10 sm:right-10 h-[70vh] max-h-[560px] sm:h-[520px] w-auto sm:w-[400px] flex flex-col rounded-2xl overflow-hidden bg-white border border-ink/10 shadow-2xl animate-[modalPop_200ms_ease-out]">

          <div className="flex items-center justify-between px-4 py-3.5 bg-ink flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-brass/20 flex items-center justify-center">
                <Sparkles size={14} className="text-brass" />
              </div>
              <div>
                <p className="text-sm font-semibold font-display text-parchment leading-tight">DevStash Assistant</p>
                <p className="text-[11px] text-parchment/40 leading-tight">Gemini 2.5 Flash</p>
              </div>
            </div>
            <button
              onClick={() => {
                setChatModel(false)
              }}
              className="p-1.5 rounded-lg text-parchment/60 hover:text-parchment hover:bg-white/10 transition-colors duration-150 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>


          <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-y-auto p-4 bg-parchment/40">

            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 text-ink-muted">
                <Bot size={32} className="text-ink/20" />
                <p className="text-sm">No messages yet ask me to add, find, or organize a stash.</p>
              </div>
            ) : messages.map((obj) => (
              <div
                key={crypto.randomUUID()}
                className={`flex items-end gap-2 max-w-[85%] animate-[fadeSlideIn_200ms_ease-out] ${obj.isUser ? "self-end flex-row-reverse" : "self-start"}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${obj.isUser ? "bg-brass/15 text-brass" : "bg-ink/10 text-ink"}`}>
                  {obj.isUser ? <span className="text-[10px] font-semibold">You</span> : <Bot size={13} />}
                </div>
                <div
                  className={`px-3.5 py-2 text-sm leading-relaxed break-words shadow-sm
                    ${obj.isUser
                      ? "bg-brass text-white rounded-2xl rounded-br-sm"
                      : "bg-white border border-ink/10 text-ink rounded-2xl rounded-bl-sm"
                    }`}
                >
                  {obj.message}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-end gap-2 self-start animate-[fadeSlideIn_200ms_ease-out]">
                <div className="w-6 h-6 rounded-full bg-ink/10 text-ink flex items-center justify-center flex-shrink-0">
                  <Bot size={13} />
                </div>
                <div className="px-3.5 py-2.5 bg-white border border-ink/10 rounded-2xl rounded-bl-sm shadow-sm">
                  <Ellipsis className="animate-bounce text-brass" size={18} />
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>

          <div className="flex items-center gap-2 p-3 border-t border-ink/10 bg-white flex-shrink-0">
            <div className="flex-1 flex items-center border border-ink/15 rounded-xl px-3 py-2 focus-within:border-brass/50 focus-within:ring-2 focus-within:ring-brass/10 transition-all duration-150">
              <input
                ref={inpRef}
                disabled={loading}
                onKeyDown={handleOnKeyDown}
                value={chatValue}
                onChange={(e) => setChatValue(e.target.value)}
                placeholder="Ask the assistant..."
                className={`border-none outline-none w-full text-sm text-ink placeholder-ink-muted/50 ${loading ? 'cursor-not-allowed' : 'cursor-text'} bg-transparent`}
                type="text"
              />
            </div>

            {loading ? (
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                <Loader2 className="animate-spin text-brass" size={20} />
              </div>
            ) : (
              <button
                onClick={() => send([...stashData, ...archiveData], chatValue)}
                className="w-9 h-9 rounded-lg bg-brass hover:bg-brass/90 text-white flex items-center justify-center flex-shrink-0 transition-all duration-150 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <Send size={16} />
              </button>
            )}
          </div>
        </div>
      </>
    )
  }
}