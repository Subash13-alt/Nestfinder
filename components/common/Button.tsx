'use client'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-white shadow-soft hover:bg-primary/90',
    secondary: 'bg-secondary text-gray-900 shadow-soft hover:bg-secondary/80',
    accent: 'bg-accent text-white shadow-soft hover:bg-accent-strong',
    outline: 'border border-border bg-white/80 text-gray-900 shadow-sm backdrop-blur-md hover:border-primary hover:bg-secondary',
  }
  
  const sizes = { sm: 'h-9 px-4 py-2 text-sm', md: 'h-12 rounded-lg px-7 text-base', lg: 'h-14 rounded-xl px-8 text-lg' }
  
  return (
    <button className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
