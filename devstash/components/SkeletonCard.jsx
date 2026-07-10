import React from 'react'

export default function SkeletonCard() {
  return (
    <div className="bg-white border border-ink/10 rounded-xl p-4 flex flex-col gap-3 animate-pulse">

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-ink/10 flex-shrink-0" />
          <div className="flex flex-col gap-1.5">
            <div className="h-3.5 w-24 bg-ink/10 rounded" />
            <div className="h-2 w-16 bg-ink/5 rounded" />
          </div>
        </div>
        <div className="w-6 h-6 bg-ink/5 rounded-md" />
      </div>


      <div className="flex flex-col gap-2 mt-1">
        <div className="h-3 w-full bg-ink/5 rounded" />
        <div className="h-3 w-5/6 bg-ink/5 rounded" />
      </div>


      <div className="flex gap-1.5 mt-1">
        <div className="h-5 w-12 bg-brass/10 rounded-full" />
        <div className="h-5 w-16 bg-brass/10 rounded-full" />
        <div className="h-5 w-10 bg-brass/10 rounded-full" />
      </div>


      <div className="flex items-center gap-4 pt-3 border-t border-ink/10">
        <div className="h-3 w-8 bg-ink/5 rounded" />
        <div className="h-3 w-20 bg-ink/5 rounded" />
        <div className="ml-auto h-4 w-4 bg-ink/5 rounded" />
      </div>
    </div>
  )
}