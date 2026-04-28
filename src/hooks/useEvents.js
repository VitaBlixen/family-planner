import { useState } from 'react'

const STORAGE_KEY = 'family-planner-events'

export function useEvents() {
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  })

  const persist = (updated) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setEvents(updated)
  }

  const addEvent = (day, eventData) => {
    const event = { ...eventData, id: crypto.randomUUID() }
    persist({ ...events, [day]: [...(events[day] ?? []), event] })
  }

  const updateEvent = (day, id, eventData) => {
    persist({
      ...events,
      [day]: events[day].map(e => e.id === id ? { ...e, ...eventData } : e),
    })
  }

  const deleteEvent = (day, id) => {
    persist({
      ...events,
      [day]: events[day].filter(e => e.id !== id),
    })
  }

  return { events, addEvent, updateEvent, deleteEvent }
}
