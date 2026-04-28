import { useState } from 'react'
import { useEvents } from '../hooks/useEvents'
import DayCell from './DayCell'
import EventFormModal from './EventFormModal'
import EventDetailModal from './EventDetailModal'

const DAY_NAMES   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const MEMBERS = [
  { name: 'Mom',     bg: 'bg-tab-blossom', text: 'text-tab-blossom-dark' },
  { name: 'Dad',     bg: 'bg-tab-sky',     text: 'text-tab-sky-dark'     },
  { name: 'Child 1', bg: 'bg-tab-fern',    text: 'text-tab-fern-dark'    },
  { name: 'Child 2', bg: 'bg-tab-wheat',   text: 'text-tab-wheat-dark'   },
]

function getWeekStart(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const offset = (d.getDay() + 6) % 7 // days since Monday
  d.setDate(d.getDate() - offset)
  return d
}

function getWeekDates(weekStart) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    return d
  })
}

function toDateKey(date) {
  return date.toISOString().slice(0, 10)
}

function formatWeekRange(dates) {
  const first = dates[0]
  const last  = dates[6]
  if (first.getMonth() === last.getMonth()) {
    return `${first.getDate()}–${last.getDate()} ${MONTH_NAMES[first.getMonth()]} ${first.getFullYear()}`
  }
  return `${first.getDate()} ${MONTH_NAMES[first.getMonth()]} – ${last.getDate()} ${MONTH_NAMES[last.getMonth()]} ${last.getFullYear()}`
}

function formatDayLabel(date) {
  return `${DAY_NAMES[(date.getDay() + 6) % 7]} ${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`
}

function WeeklyCalendar() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents()
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()))
  const [modal, setModal] = useState(null)

  const weekDates = getWeekDates(weekStart)
  const todayKey  = toDateKey(new Date())

  const shiftWeek = (n) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + n * 7)
    setWeekStart(d)
  }

  const closeModal = () => setModal(null)

  const handleSave = (eventData) => {
    if (modal.type === 'add')  addEvent(modal.day, eventData)
    if (modal.type === 'edit') updateEvent(modal.day, modal.event.id, eventData)
    closeModal()
  }

  const handleDelete = () => {
    deleteEvent(modal.day, modal.event.id)
    closeModal()
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-rule shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-5 py-4 border-b border-rule flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink">{formatWeekRange(weekDates)}</h2>
          <div className="flex items-center gap-1">
            <button onClick={() => shiftWeek(-1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-mist transition-colors text-ink/50 hover:text-ink">←</button>
            <button onClick={() => setWeekStart(getWeekStart(new Date()))} className="px-3 py-1 text-xs text-ink/50 hover:text-ink hover:bg-mist rounded-lg transition-colors">Today</button>
            <button onClick={() => shiftWeek(1)}  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-mist transition-colors text-ink/50 hover:text-ink">→</button>
          </div>
        </div>

        {/* Day columns */}
        <div className="grid grid-cols-8 border-b border-rule bg-mist">
          <div className="p-3" />
          {weekDates.map((date) => {
            const key     = toDateKey(date)
            const isToday = key === todayKey
            return (
              <div key={key} className={`p-3 text-center border-l border-rule ${isToday ? 'bg-tab-sky/20' : ''}`}>
                <div className="text-xs font-semibold text-ink/50">{DAY_NAMES[(date.getDay() + 6) % 7]}</div>
                <div className={`text-sm font-semibold mt-0.5 ${isToday ? 'text-tab-sky-dark' : 'text-ink'}`}>{date.getDate()}</div>
              </div>
            )
          })}
        </div>

        {/* Member rows */}
        {MEMBERS.map(member => (
          <div key={member.name} className="grid grid-cols-8 border-b border-rule last:border-b-0">
            <div className={`px-4 py-3 flex items-center font-semibold text-sm ${member.bg} ${member.text}`}>
              {member.name}
            </div>
            {weekDates.map((date) => {
              const key = toDateKey(date)
              const dayEvents = (events[key] ?? [])
                .filter(e => e.members.includes(member.name))
                .sort((a, b) => {
                  if (!a.time && !b.time) return 0
                  if (!a.time) return 1
                  if (!b.time) return -1
                  return a.time.localeCompare(b.time)
                })
              return (
                <DayCell
                  key={key}
                  events={dayEvents}
                  onAddClick={() => setModal({ type: 'add', day: key, dayLabel: formatDayLabel(date), member: member.name })}
                  onEventClick={event => setModal({ type: 'detail', event, day: key, dayLabel: formatDayLabel(date) })}
                />
              )
            })}
          </div>
        ))}
      </div>

      {modal?.type === 'add' && (
        <EventFormModal
          day={modal.dayLabel}
          initialMember={modal.member}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

      {modal?.type === 'detail' && (
        <EventDetailModal
          event={modal.event}
          day={modal.dayLabel}
          onEdit={() => setModal({ ...modal, type: 'edit' })}
          onDelete={handleDelete}
          onClose={closeModal}
        />
      )}

      {modal?.type === 'edit' && (
        <EventFormModal
          day={modal.dayLabel}
          initialMember={modal.event.members[0]}
          event={modal.event}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </>
  )
}

export default WeeklyCalendar
