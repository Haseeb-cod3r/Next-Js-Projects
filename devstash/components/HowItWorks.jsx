'use client'

import { useState } from 'react'
import {
  HelpCircle, X, BookOpen, Search, ArrowUpDown, Pin,
  Archive, Sparkles, LogIn, ChevronRight
} from 'lucide-react'

const SECTIONS = [
  {
    id: 'overview',
    label: 'Overview',
    icon: BookOpen,
    title: 'Welcome to DevStash',
    body: "DevStash is your personal shelf for the tools, articles, and links you don't want to lose. Save anything with a title, a URL, a short description, and a few tags — then find it again in seconds.",
    tips: [
      'Click "Add DevStash" in the header to save your first link',
      'Everything you save lives in your Stash, front and center',
      'Nothing is ever more than a search or a tag away',
    ],
  },
  {
    id: 'organize',
    label: 'Tags & Search',
    icon: Search,
    title: 'Find anything, instantly',
    body: 'Every stash can carry multiple tags — think of them as folders that overlap. Combine tags in the sidebar to narrow things down, or just type in the search bar for instant, highlighted matches.',
    tips: [
      'Check multiple tags in the sidebar to filter by all of them at once',
      'The search bar matches titles as you type — no need to hit enter',
      'Clear your filters anytime from the "No results" screen',
    ],
  },
  {
    id: 'sort',
    label: 'Sort & Pin',
    icon: ArrowUpDown,
    title: 'Keep what matters on top',
    body: 'Sort your whole stash by Latest, Oldest, Most Viewed, or Least Viewed using the sort menu. For anything you need close at hand regardless of sort order, pin it — pinned items always float to the top.',
    tips: [
      'Use the pin icon on any card to keep it at the top',
      'Sorting applies separately to your Stash and your Archive',
      'Pinned items stay pinned even if you change the sort order',
    ],
  },
  {
    id: 'archive',
    label: 'Archive',
    icon: Archive,
    title: 'Clear the clutter, not the memory',
    body: "Done with something but not ready to delete it? Move it to the Archive. It's a separate space for links you're not actively using — restore any item back to your Stash whenever you need it again.",
    tips: [
      'Archiving and restoring requires signing in',
      "Archived items keep all their tags, views, and pin status",
      'Use the card menu (•••) to Archive, Edit, or Delete an item',
    ],
  },
  {
    id: 'ai',
    label: 'AI Assistant',
    icon: Sparkles,
    title: 'Just ask, don\u2019t click',
    body: "The chat bubble in the corner is a full assistant, not just a Q&A bot. Tell it what you want in plain language and it will do it for you — no need to hunt through menus.",
    tips: [
      '"Add a stash for tailwindcss.com about utility CSS"',
      '"Archive the React link" or "Pin my Next.js stash"',
      '"Show me everything tagged design" or "Sort by most viewed"',
    ],
  },
  {
    id: 'account',
    label: 'Account',
    icon: LogIn,
    title: 'Sign in when it counts',
    body: 'You can browse and save stashes without an account. Signing in unlocks the Archive — since it keeps your organized links tied to you, wherever you come back from.',
    tips: [
      'Look for the Sign In button in the top-right corner',
      'A locked icon next to "Archived" means you need to sign in first',
      'Your Stash still works fully while signed out',
    ],
  },
]

export default function HowItWorks() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState(SECTIONS[0].id)

  const active = SECTIONS.find((s) => s.id === activeId)

  return (
    <>
   
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm text-left transition-all duration-150 border-l-2 border-transparent text-parchment/50 hover:bg-white/5 hover:text-parchment/80 cursor-pointer"
      >
        <HelpCircle size={15} />
        How it works
      </button>

      
      {open && (
        <>
          <div
            className="fixed inset-0 z-100 bg-ink/30 backdrop-blur-[2px] animate-[fadeSlideIn_150ms_ease-out]"
            onClick={() => setOpen(false)}
          />

          <div className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-150 w-auto sm:w-[720px] max-h-[90vh] sm:h-[560px] flex flex-col sm:flex-row rounded-2xl overflow-hidden bg-white border border-ink/10 shadow-2xl animate-[modalPop_200ms_ease-out]">

         
            <div className="bg-ink sm:w-56 flex-shrink-0 flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 sm:pb-2">
                <div>
                  <p className="font-display font-semibold text-parchment text-sm">How it works</p>
                  <p className="text-[11px] text-parchment/40">A quick tour of DevStash</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="sm:hidden p-1.5 rounded-lg text-parchment/60 hover:text-parchment hover:bg-white/10 transition-colors duration-150"
                >
                  <X size={16} />
                </button>
              </div>

              <nav className="flex sm:flex-col overflow-x-auto sm:overflow-visible px-2 sm:px-3 py-2 gap-0.5">
                {SECTIONS.map((section) => {
                  const Icon = section.icon
                  const isActive = section.id === activeId
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveId(section.id)}
                      className={`flex items-center gap-2.5 flex-shrink-0 sm:w-full px-3 py-2.5 rounded-lg text-sm text-left transition-all duration-150 border-l-2 whitespace-nowrap
                        ${isActive
                          ? 'bg-brass/15 font-semibold text-brass border-brass'
                          : 'text-parchment/50 border-transparent hover:bg-white/5 hover:text-parchment/80'
                        }`}
                    >
                      <Icon size={15} />
                      {section.label}
                    </button>
                  )
                })}
              </nav>
            </div>

           
            <div className="flex-1 min-h-0 flex flex-col bg-parchment/40">
              <div className="hidden sm:flex items-center justify-end px-5 pt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-ink/5 transition-colors duration-150"
                >
                  <X size={18} />
                </button>
              </div>

              <div key={active.id} className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 py-4 sm:py-2 animate-[fadeSlideIn_200ms_ease-out]">
                <div className="w-8 h-8 rounded-lg bg-brass/15 text-brass flex items-center justify-center mb-3">
                  <active.icon size={16} />
                </div>

                <h3 className="text-xl font-bold font-display text-ink mb-2">{active.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-4">{active.body}</p>

                <div className="flex flex-col gap-2">
                  {active.tips.map((tip, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-ink bg-white border border-ink/10 rounded-xl px-3.5 py-2.5"
                    >
                      <ChevronRight size={15} className="text-brass flex-shrink-0 mt-0.5" />
                      <span className="font-mono text-[13px] leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

             
              <div className="flex items-center justify-center gap-1.5 py-4 flex-shrink-0">
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveId(section.id)}
                    className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                      section.id === activeId ? 'w-6 bg-brass' : 'w-1.5 bg-ink/15 hover:bg-ink/25'
                    }`}
                    aria-label={`Go to ${section.label}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
