import { useState } from 'react'

function NoteIcon() {
  return (
    <svg width="9" height="10" viewBox="0 0 9 10" fill="none" className="ml-auto shrink-0 opacity-35">
      <rect x="0.5" y="0.5" width="8" height="9" rx="1" stroke="currentColor" />
      <line x1="2" y1="3.5" x2="7" y2="3.5" stroke="currentColor" />
      <line x1="2" y1="5.5" x2="7" y2="5.5" stroke="currentColor" />
      <line x1="2" y1="7.5" x2="5.5" y2="7.5" stroke="currentColor" />
    </svg>
  )
}

function DayCell({ events = [], onAddClick, onEventClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="min-h-24 border-l border-rule p-2 flex flex-col gap-1 hover:bg-mist transition-colors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {events.map(event => (
        <button
          key={event.id}
          onClick={() => onEventClick(event)}
          className="text-left text-xs text-ink bg-white border border-rule rounded px-1.5 py-0.5 leading-snug hover:border-ink/30 transition-colors flex items-center gap-1 w-full"
        >
          <span className="truncate">
            {event.time && <span className="text-ink/50 mr-1">{event.time}</span>}
            {event.title}
          </span>
          {event.description && <NoteIcon />}
        </button>
      ))}

      {hovered && (
        <button
          onClick={onAddClick}
          className="self-start text-ink/30 hover:text-ink/70 text-lg leading-none px-0.5 transition-colors"
        >
          +
        </button>
      )}
    </div>
  )
}

export default DayCell
