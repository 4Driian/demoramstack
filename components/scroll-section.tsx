'use client'

import { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { cn } from '@/lib/utils'

interface ScrollSectionProps {
  children: ReactNode
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale'
  className?: string
}

export function ScrollSection({
  children,
  animation = 'fade-up',
  className,
}: ScrollSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  const animationClasses = {
    'fade-up': 'animate-scroll-fade-up',
    'fade-left': 'animate-scroll-fade-left',
    'fade-right': 'animate-scroll-fade-right',
    'scale': 'animate-scroll-scale',
  }

  return (
    <div
      ref={ref}
      className={cn(
        animationClasses[animation],
        isVisible && 'is-visible',
        className
      )}
    >
      {children}
    </div>
  )
}
