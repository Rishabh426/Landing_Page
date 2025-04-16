"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")

    // Add dark class to body for custom CSS
    if (theme !== "dark") {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 transition hover-shadow rounded-full bg-light dark:bg-dark"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="text-xl" size={20} /> : <Moon className="text-xl" size={20} />}
    </button>
  )
}
