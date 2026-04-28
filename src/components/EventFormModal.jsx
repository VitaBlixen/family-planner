import { useState } from 'react'

const ALL_MEMBERS = ['Mom', 'Dad', 'Child 1', 'Child 2']

const EMOJIS = [
  '🏥','🦷','💊','🏫','📚','⚽','🏊','🎵','🎨','🎭',
  '🛒','🍽️','🎂','🎉','✈️','🚗','🐕','🌿','💪','🏋️',
  '👶','🏃','🎯','🧹','🤝','📅',
]

function EventFormModal({ day, initialMember, event, onSave, onClose }) {
  const [title, setTitle] = useState(event?.title ?? '')
  const [time, setTime] = useState(event?.time ?? '')
  const [members, setMembers] = useState(event?.members ?? [initialMember])
  const [description, setDescription] = useState(event?.description ?? '')
  const [emoji, setEmoji] = useState(event?.emoji ?? '')

  const toggleMember = (name) => {
    setMembers(prev =>
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || members.length === 0) return
    onSave({ title: title.trim(), time, members, description: description.trim(), emoji })
  }

  return (
    <div className="fixed inset-0 bg-ink/20 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl border border-rule shadow-lg p-6 w-full max-w-md mx-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="font-display text-2xl text-ink mb-5">
          {event ? 'Edit event' : `New event — ${day}`}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-ink/50 uppercase tracking-wide">Title</label>
            <input
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Doctor appointment"
              className="mt-1 w-full border border-rule rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-ink/40"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink/50 uppercase tracking-wide">Icon (optional)</label>
            <div className="mt-2 flex flex-wrap gap-1">
              {EMOJIS.map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(prev => prev === e ? '' : e)}
                  className={`w-9 h-9 text-lg rounded-lg transition-colors ${
                    emoji === e
                      ? 'bg-mist ring-1 ring-rule'
                      : 'hover:bg-mist'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-ink/50 uppercase tracking-wide">Time (optional)</label>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="mt-1 block border border-rule rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-ink/40"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink/50 uppercase tracking-wide">Members</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {ALL_MEMBERS.map(name => (
                <button
                  key={name}
                  type="button"
                  onClick={() => toggleMember(name)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    members.includes(name)
                      ? 'bg-ink text-linen border-ink'
                      : 'bg-white text-ink border-rule hover:border-ink/40'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-ink/50 uppercase tracking-wide">Notes (optional)</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Anything to remember…"
              rows={3}
              className="mt-1 w-full border border-rule rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-ink/40 resize-none"
            />
          </div>

          <div className="flex gap-2 justify-end pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-ink/50 hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || members.length === 0}
              className="px-4 py-2 text-sm bg-ink text-linen rounded-lg disabled:opacity-40 transition-opacity"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EventFormModal
