function EventDetailModal({ event, day, onEdit, onDelete, onClose }) {
  return (
    <div className="fixed inset-0 bg-ink/20 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl border border-rule shadow-lg p-6 w-full max-w-md mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            {event.time && <p className="text-sm text-ink/50 mb-1">{event.time}</p>}
            <h2 className="font-display text-2xl text-ink">
              {event.emoji && <span className="mr-2">{event.emoji}</span>}
              {event.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-ink/30 hover:text-ink text-2xl leading-none ml-4"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <div>
            <span className="text-xs font-semibold text-ink/40 uppercase tracking-wide">Day</span>
            <p className="text-ink mt-0.5">{day}</p>
          </div>

          <div>
            <span className="text-xs font-semibold text-ink/40 uppercase tracking-wide">Members</span>
            <p className="text-ink mt-0.5">{event.members.join(', ')}</p>
          </div>

          {event.description && (
            <div>
              <span className="text-xs font-semibold text-ink/40 uppercase tracking-wide">Notes</span>
              <p className="text-ink mt-0.5 whitespace-pre-wrap">{event.description}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-end pt-5">
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm text-red-400 hover:text-red-600 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 text-sm bg-ink text-linen rounded-lg"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventDetailModal
