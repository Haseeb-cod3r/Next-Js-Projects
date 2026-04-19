import React from 'react'

export default function SkeletonTag({ width = "w-20" }) {
  return (
    <div className="flex items-center justify-between px-2 py-1.5 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-3.5 h-3.5 bg-gray-200 rounded" />
        <div className={`h-3 bg-gray-100 rounded ${width}`} />
      </div>
      <div className="w-6 h-4 bg-gray-50 rounded-full" />
    </div>
  )
}
