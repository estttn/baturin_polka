import { useEffect, useState } from 'react'

function formatLondonTime() {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}

export function useLondonTime() {
  const [time, setTime] = useState(formatLondonTime)

  useEffect(() => {
    const tick = () => setTime(formatLondonTime())
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return time
}
