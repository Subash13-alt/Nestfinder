import { ReactNode } from 'react'

interface CardProps { children: ReactNode; className?: string; hover?: boolean }

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-white shadow-soft ${hover ? 'transition duration-300 hover:-translate-y-1 hover:shadow-lift' : ''} ${className}`}>
      {children}
    </div>
  )
}
