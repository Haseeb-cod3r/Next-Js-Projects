"use client"
import React, { createContext, useState } from 'react'

export const AppContext = createContext({})
export default function AppData({ children }) {
  const [stashData, setStashData] = useState([
    {
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
    },
    {
      id: 11,
      title: "CodePen",
      url: "https://codepen.io/",
      description: "CodePen is a social development environment for front-end designers and developers. Build and deploy websites, show off your work, and discover inspiration.",
      tags: ["Practice", "Community", "CSS", "JavaScript"],
      views: 265,
      created: "25 Jun 2024",
      isArchived: false,
      isPinned: false,
      isLatest: false
    },
    {
      id: 12,
      title: "Smashing Magazine",
      url: "https://www.smashingmagazine.com/",
      description: "An online magazine for professional web designers and developers, with a focus on useful techniques, best practices, and valuable resources.",
      tags: ["CSS", "Tips", "Design", "Learning"],
      views: 178,
      created: "14 Jun 2024",
      isArchived: false,
      isPinned: false,
      isLatest: false
    },
    {
      id: 13,
      title: "freeCodeCamp",
      url: "https://www.freecodecamp.org/",
      description: "Learn to code for free. Build projects. Earn certifications. Since 2014, more than 40,000 graduates have gotten jobs at tech companies.",
      tags: ["Learning", "Practice", "Community", "Tutorial"],
      views: 390,
      created: "01 Jun 2024",
      isArchived: false,
      isPinned: false,
      isLatest: false
    },
    {
      id: 14,
      title: "Figma",
      url: "https://www.figma.com/",
      description: "Figma is a collaborative interface design tool. Build better products as a team with Figma's design, prototyping, and collaboration features.",
      tags: ["Design", "Collaboration", "Tools"],
      views: 230,
      created: "20 May 2024",
      isArchived: false,
      isPinned: false,
      isLatest: false
    },
    {
      id: 15,
      title: "Can I Use",
      url: "https://caniuse.com/",
      description: "Up-to-date browser support tables for support of front-end web technologies on desktop and mobile web browsers.",
      tags: ["Reference", "Compatibility", "CSS", "HTML"],
      views: 155,
      created: "03 May 2024",
      isArchived: false,
      isPinned: false,
      isLatest: false
    },
    {
      id: 16,
      title: "Tailwind CSS",
      url: "https://tailwindcss.com/",
      description: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
      tags: ["CSS", "Framework", "Tools", "Layout"],
      views: 420,
      created: "15 Apr 2024",
      isArchived: false,
      isPinned: false,
      isLatest: false
    },
    {
      id: 17,
      title: "JavaScript.info",
      url: "https://javascript.info/",
      description: "The Modern JavaScript Tutorial — how it's done now. From the basics to advanced topics with simple, but detailed explanations.",
      tags: ["JavaScript", "Learning", "Tutorial", "Reference"],
      views: 310,
      created: "08 Apr 2024",
      isArchived: false,
      isPinned: false,
      isLatest: false
    },
    {
      id: 18,
      title: "Vercel",
      url: "https://vercel.com/",
      description: "Vercel is a cloud platform for static sites and serverless functions that fits perfectly with your workflow.",
      tags: ["Dev Tools", "Performance", "Tools", "Framework"],
      views: 198,
      created: "22 Mar 2024",
      isArchived: false,
      isPinned: false,
      isLatest: false
    },
    {
      id: 19,
      title: "CSS-Tricks",
      url: "https://css-tricks.com/",
      description: "A web design community curated by Chris Coyier with articles, videos, and an almanac covering all things CSS and front-end development.",
      tags: ["CSS", "Tips", "Reference", "Tutorial"],
      views: 275,
      created: "12 Feb 2024",
      isArchived: false,
      isPinned: false,
      isLatest: false
    },
    {
      id: 20,
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org/",
      description: "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.",
      tags: ["Reference", "HTML", "CSS", "JavaScript", "Learning"],
      views: 340,
      created: "05 Jan 2024",
      isArchived: false,
      isPinned: false,
      isLatest: false
    },
  ])


  const [archiveData, setArchiveData] = useState([])
  const [tags, setTags] = useState([])
  const [tagData, setTagData] = useState({ isTagData: false, data: [] })
  const [activeNav, setActiveNav] = useState('home')



  return (
    <AppContext.Provider value={{ stashData, setStashData, archiveData, setArchiveData, activeNav, setActiveNav, tagData, setTagData, tags, setTags }}>
      {children}
    </AppContext.Provider>
  )
}
