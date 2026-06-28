"use client"

import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const AppContext = createContext({})
export default function AppData({ children }) {

  const [isLoaded, setIsLoaded] = useState(false)

  const staData = [{
    id: 1,
    title: "Scrimba",
    url: "https://scrimba.com/",
    description: "Scrimba is a coding platform that allows you to have interactive conversations with the code. Learn front-end development through interactive screencasts.",
    tags: ["Learning", "Practice", "CSS", "JavaScript"],
    views: 176,
    created: "11 Nov 2024",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
  {
    id: 2,
    title: "The Odin Project",
    url: "https://www.theodinproject.com/",
    description: "The Odin Project provides a free open source coding curriculum that can be taken entirely online. Learn HTML, CSS, JavaScript, and more with hands-on projects.",
    tags: ["Practice", "HTML", "Open Source", "Tutorial"],
    views: 244,
    created: "28 Oct 2024",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
  {
    id: 3,
    title: "Dribbble",
    url: "https://dribbble.com/",
    description: "Discover the world's top designers and creatives. Dribbble is the leading destination to find and showcase creative work.",
    tags: ["Design", "Inspiration", "Community"],
    views: 162,
    created: "14 Oct 2024",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
  {
    id: 4,
    title: "Dev.to",
    url: "https://dev.to/",
    description: "A constructive and inclusive social network for software developers. Write articles, find jobs, and discuss the coding world with other developers.",
    tags: ["Community", "Tips", "JavaScript", "Learning"],
    views: 187,
    created: "30 Sep 2024",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
  {
    id: 5,
    title: "React Documentation",
    url: "https://react.dev/",
    description: "The library for web and native user interfaces. Learn React from the official documentation with interactive examples and detailed API references.",
    tags: ["JavaScript", "Framework", "Learning", "Reference"],
    views: 355,
    created: "17 Sep 2024",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
  {
    id: 6,
    title: "Flexbox Froggy",
    url: "https://flexboxfroggy.com/",
    description: "A game where you help Froggy and friends by writing CSS code to move them to their lily pads. Learn CSS Flexbox in a fun and interactive way.",
    tags: ["CSS", "Layout", "Practice", "Tips"],
    views: 118,
    created: "02 Sep 2024",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
  {
    id: 7,
    title: "CSS Grid Garden",
    url: "https://cssgridgarden.com/",
    description: "A game for learning CSS Grid layout. Write CSS code to grow your carrot garden using the power of CSS grid.",
    tags: ["CSS", "Layout", "Practice", "Learning"],
    views: 134,
    created: "19 Aug 2024",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
  {
    id: 8,
    title: "web.dev",
    url: "https://web.dev/",
    description: "Guidance and analysis from Google to help developers build excellent web experiences. Explore resources on performance, accessibility, and modern web APIs.",
    tags: ["Learning", "Performance", "Tips", "Reference"],
    views: 203,
    created: "05 Aug 2024",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
  {
    id: 9,
    title: "Lighthouse",
    url: "https://developer.chrome.com/docs/lighthouse/",
    description: "An open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication.",
    tags: ["Performance", "Dev Tools", "Tools", "Reference"],
    views: 97,
    created: "28 Jul 2024",
    isArchived: false,
    isPinned: false,
    isLatest: false
  },
  {
    id: 10,
    title: "Git Documentation",
    url: "https://git-scm.com/doc",
    description: "Official documentation for Git — the free and open source distributed version control system designed to handle everything from small to very large projects.",
    tags: ["Git", "Reference", "Dev Tools", "Open Source"],
    views: 142,
    created: "10 Jul 2024",
    isArchived: false,
    isPinned: false,
    isLatest: false
  }
  ]

  const [stashData, setStashData] = useState([])


  const [archiveData, setArchiveData] = useState([])


  useEffect(() => {
    const savedStash = localStorage.getItem("stash");
    const savedArchive = localStorage.getItem("archive");
    setStashData(() => {
      if (!savedStash) return staData;

      try {
        return JSON.parse(savedStash);
      } catch (error) {

        toast.error("Your Stash Data has been Corrupted we have provided some default Data");
        localStorage.removeItem("Stash");
        return staData;

      }
    });
    setArchiveData(() => {
      if (!savedArchive) return [];

      try {
        return JSON.parse(savedArchive);
      } catch (error) {

        toast.error("Your Archive Data has been Corrupted Please build you archive again");
        localStorage.removeItem("archive");

      }
    });
    setIsLoaded(true)
  }, []);



  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("stash", JSON.stringify(stashData));
    }
  }, [stashData, isLoaded]);


  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("archive", JSON.stringify(archiveData));
    }
  }, [archiveData, isLoaded]);


  return (
    <AppContext.Provider value={{ stashData, setStashData, archiveData, setArchiveData,isLoaded }}>
      {children}
    </AppContext.Provider>
  )
}
