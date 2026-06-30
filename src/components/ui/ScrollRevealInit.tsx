'use client'
import { useEffect } from 'react'

export default function ScrollRevealInit() {
  useEffect(() => {
    const selectors = '.reveal, .reveal-left, .reveal-right, .line-draw'

    const observe = () => {
      const els = document.querySelectorAll(selectors)
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
      )
      els.forEach(el => observer.observe(el))
      return observer
    }

    const observer = observe()

    // Re-observe on route change (Next.js app router)
    const mutationObserver = new MutationObserver(() => {
      observer.disconnect()
      observe()
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}
