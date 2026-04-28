import { useState } from 'react'
import { useEvents } from '../hooks/useEvents'
import DayCell from './DayCell'
import EventFormModal from './EventFormModal'
import EventDetailModal from './EventDetailModal'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const MEMBERS = [
  { name: 'Mom',     bg: 'bg-tab-blossom', text: 'text-tab-blossom-dark' },
  { name: 'Dad',     bg: 'bg-tab-sky',     text: 'text-tab-sky-dark'     },
  { name: 'Child 1', bg: 'bg-tab-fern',    text: 'text-tab-fern-dark'    },
  { name: 'Child 2', bg: 'bg-tab-wheat',   text: 'text-tab-wheat-dark'   },
]

function WeeklyCalendar() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents()
  const [modal, setModal] = useState(null)

  const closeModal = () => setModal(null)

  const handleSave = (eventData) => {
    if (modal.type === 'add') {
      addEvent(modal.day, eventData)
    } else if (modal.type === 'edit') {
      updateEvent(modal.day, modal.event.id, eventData)
    }
    closeModal()
  }

  const handleDelete = () => {
    deleteEvent(modal.day, modal.event.id)
    closeModal()
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-rule shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-rule">
          <h2 className="font-display text-2xl text-ink">This Week</h2>
        </div>

        <div className="grid grid-cols-8 border-b border-rule bg-mist">
          <div className="p-3" />
          {DAYS.map(day => (
            <div key={day} className="p-3 text-center text-sm font-semibold text-ink border-l border-rule">
              {day}
            </div>
          ))}
        </div>

        {MEMBERS.map(member => (
          <div key={member.name} className="grid grid-cols-8 border-b border-rule last:border-b-0">
            <div className={`px-4 py-3 flex items-center font-semibold text-sm ${member.bg} ${member.text}`}>
              {member.name}
            </div>
            {DAYS.map(day => {
              const dayEvents = (events[day] ?? []).filter(e => e.members.includes(member.name))
              return (
                <DayCell
                  key={day}
                  events={dayEvents}
                  onAddClick={() => setModal({ type: 'add', day, member: member.name })}
                  onEventClick={event => setModal({ type: 'detail', event, day })}
                />
              )
            })}
          </div>
        ))}
      </div>

      {modal?.type === 'add' && (
        <EventFormModal
          day={modal.day}
          initialMember={modal.member}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

      {modal?.type === 'detail' && (
        <EventDetailModal
          event={modal.event}
          day={modal.day}
          onEdit={() => setModal({ type: 'edit', event: modal.event, day: modal.day })}
          onDelete={handleDelete}
          onClose={closeModal}
        />
      )}

      {modal?.type === 'edit' && (
        <EventFormModal
          day={modal.day}
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
