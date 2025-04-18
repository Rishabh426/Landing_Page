"use client"

import { useState, useEffect } from "react"

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set target date to June 15, 2025 (first contest)
    const targetDate = new Date("2025-04-21T10:00:00")

    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    // Update immediately
    updateCountdown()

    // Update every second
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="d-flex justify-content-center gap-4 stagger-items">
      <div className="text-center animate-pop">
        <div className="bg-primary text-light p-3 rounded-lg text-3xl font-bold">{timeLeft.days}</div>
        <div className="mt-2 text-sm">Days</div>
      </div>
      <div className="text-center animate-pop delay-100">
        <div className="bg-primary text-light p-3 rounded-lg text-3xl font-bold">{timeLeft.hours}</div>
        <div className="mt-2 text-sm">Hours</div>
      </div>
      <div className="text-center animate-pop delay-200">
        <div className="bg-primary text-light p-3 rounded-lg text-3xl font-bold">{timeLeft.minutes}</div>
        <div className="mt-2 text-sm">Minutes</div>
      </div>
      <div className="text-center animate-pop delay-300">
        <div className="bg-primary text-light p-3 rounded-lg text-3xl font-bold">{timeLeft.seconds}</div>
        <div className="mt-2 text-sm">Seconds</div>
      </div>
    </div>
  )
}
