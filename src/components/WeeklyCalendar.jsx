const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const MEMBERS = [
  { name: 'Mom',     bg: 'bg-tab-blossom', text: 'text-tab-blossom-dark' },
  { name: 'Dad',     bg: 'bg-tab-sky',     text: 'text-tab-sky-dark'     },
  { name: 'Child 1', bg: 'bg-tab-fern',    text: 'text-tab-fern-dark'    },
  { name: 'Child 2', bg: 'bg-tab-wheat',   text: 'text-tab-wheat-dark'   },
]

function WeeklyCalendar() {
  return (
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
          {DAYS.map(day => (
            <div
              key={day}
              className="min-h-24 border-l border-rule hover:bg-mist transition-colors cursor-pointer"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default WeeklyCalendar
