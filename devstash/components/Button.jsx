'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg select-none outline-none focus-visible:ring-2 focus-visible:ring-brass/40 focus-visible:ring-offset-2'

  const variantClasses = {
    primary: 'bg-brass hover:bg-brass/90 text-white shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:hover:translate-y-0 disabled:active:scale-100',
    secondary: 'border border-ink/15 text-ink-muted hover:text-ink hover:bg-ink/5 active:scale-95 disabled:active:scale-100',
    ink: 'bg-ink hover:bg-ink/90 text-white shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:hover:translate-y-0 disabled:active:scale-100',
    wine: 'bg-wine hover:bg-wine/90 text-white shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:hover:translate-y-0 disabled:active:scale-100',
    emerald: 'bg-emerald hover:bg-emerald/90 text-white shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:hover:translate-y-0 disabled:active:scale-100',
    ghost: 'text-ink-muted hover:text-ink hover:bg-ink/5 active:scale-95 disabled:active:scale-100',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1 rounded-md',
    md: 'px-4 py-2 text-sm gap-1.5 rounded-lg',
    lg: 'px-5 py-2.5 text-base gap-2 rounded-xl',
  }

  const stateClasses = (disabled || isLoading)
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer'

  const iconSize = {
    sm: 14,
    md: 18,
    lg: 22,
  }[size]

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${stateClasses} ${className}`}
      {...props}
    >
      {isLoading && (
        <Loader2 size={iconSize} className="animate-spin" />
      )}

      {!isLoading && Icon && iconPosition === 'left' && (
        <Icon size={iconSize} />
      )}

      <span>{children}</span>

      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon size={iconSize} />
      )}
    </button>
  )
}
