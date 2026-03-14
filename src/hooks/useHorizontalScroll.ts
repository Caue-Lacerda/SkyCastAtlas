import { useEffect } from "react"

export function useHorizontalScroll(scroll: React.RefObject<HTMLDivElement | null>) {
  if (!scroll) return
  useEffect(() => {
    const element = scroll.current
    if (!element) return
    const handleWheel = (event: WheelEvent) => {
      if (element.scrollWidth <= element.clientWidth) return
      event.preventDefault()
      element.scrollLeft += event.deltaY
    }
    element.addEventListener("wheel", handleWheel, { passive: false})
    return () => {
      element.removeEventListener("wheel", handleWheel)
    }
  }, [])
}