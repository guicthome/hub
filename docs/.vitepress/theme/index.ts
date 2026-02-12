import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp() {
    if (typeof window !== 'undefined') {
      document.addEventListener('click', (e) => {
        const link = (e.target as HTMLElement).closest('a[data-direct]')
        if (!link) return

        const href = link.getAttribute('href')
        if (!href || href === '#') return

        e.preventDefault()
        e.stopPropagation()
        window.location.href = href
      }, true)
    }
  }
} satisfies Theme
