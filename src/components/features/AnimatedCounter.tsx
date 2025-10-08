'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
}

export default function AnimatedCounter({ end, duration = 1600, suffix = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true })
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (!inView) return

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
      const eased = easeOutCubic(progress)
      setCount(Math.round(end * eased))
      if (progress < 1) requestAnimationFrame(animate)
    }

    const rAF = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rAF)
  }, [inView, end, duration])

  const formatted = new Intl.NumberFormat().format(count)
  return <span ref={ref}>{formatted}{suffix}</span>
}