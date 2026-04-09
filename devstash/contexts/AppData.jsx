"use client"
import React, { createContext, useState } from 'react'

export const AppContext = createContext({})
export default function AppData({ children }) {
  const [stashData, setStashData] = useState([
  {
    id: 5,
    title: "GitHub",
    url: "https://www.github.com/",
    description: "A platform for version control and collaboration. Host and review code, manage projects, and build software alongside millions of developers.",
    tags: ["Dev Tools", "Collaboration", "Open Source"],
    views: 120,
    created: "01 Mar 2026",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
  {
    id: 1,
    title: "Frontend Mentor",
    url: "frontendmentor.io",
    description: "Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.",
    tags: ["Practice", "Learning", "Community"],
    views: 130,
    created: "15 Jan 2026",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
  {
    id: 3,
    title: "Trading View",
    url: "https://www.tradingview.com/",
    description: "Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.",
    tags: ["Practice", "Learning", "Community"],
    views: 10,
    created: "20 Mar 2025",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
  {
    id: 6,
    title: "Stack Overflow",
    url: "https://stackoverflow.com/",
    description: "The largest online community for developers to learn, share their knowledge, and build their careers.",
    tags: ["Community", "Q&A", "Learning"],
    views: 89,
    created: "18 Nov 2024",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
  {
    id: 2,
    title: "Youtube",
    url: "https://www.youtube.com/",
    description: "Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.",
    tags: ["Practice", "Learning", "Community"],
    views: 221,
    created: "02 Jun 2024",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
  {
    id: 4,
    title: "Claude AI",
    url: "https://claude.ai/",
    description: "Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.",
    tags: ["Practice", "Learning", "Ai"],
    views: 47,
    created: "10 Aug 2023",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
])


  const [archiveData, setArchiveData] = useState([])
  const [activeNav, setActiveNav] = useState('home')



  return (
    <AppContext.Provider value={{ stashData, setStashData, archiveData, setArchiveData, activeNav, setActiveNav }}>
      {children}
    </AppContext.Provider>
  )
}
