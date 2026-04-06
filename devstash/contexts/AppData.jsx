"use client"
import React, { createContext, useState } from 'react'

export const AppContext = createContext({})
export default function AppData({ children }) {
  const [data, setData] = useState([
    {
      id: 1,
      title: "Frontend Mentor",
      url: "frontendmentor.io",
      description:
        "Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.",
      tags: ["Practice", "Learning", "Community"],
      views: 47,
      created: "15 Jan 2026",
      isArchived: false,
      isPinned:false,
      isLatest:false
    },
    {
      id: 2,
      title: "youtube",
      url: "https://www.youtube.com/",
      description:
        "Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.",
      tags: ["Practice", "Learning", "Community"],
      views: 47,
      created: "15 Jan 2026",
      isArchived: false,
      isPinned:false,
      isLatest:false
    },
    {
      id: 3,
      title: "trading view",
      url: "https://www.tradingview.com/",
      description:
        "Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.",
      tags: ["Practice", "Learning", "Community"],
      views: 47,
      created: "15 Jan 2026",
      isArchived: false,
      isPinned:false,
      isLatest:false
    },
  ])


  const [archiveData, setArchiveData] = useState([])
  const [activeNav, setActiveNav] = useState('home')



  return (
    <AppContext.Provider value={{ data, setData, archiveData, setArchiveData, activeNav, setActiveNav }}>
      {children}
    </AppContext.Provider>
  )
}
