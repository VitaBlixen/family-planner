const SECTIONS = [
  { title: 'Meal Plan' },
  { title: 'Notes'     },
]

function Sidebar() {
  return (
    <div className="flex flex-col gap-4">
      {SECTIONS.map(section => (
        <div key={section.title} className="bg-white rounded-2xl border border-rule p-5">
          <h2 className="font-display text-xl text-ink mb-2">{section.title}</h2>
          <p className="text-sm text-ink/50">Coming soon</p>
        </div>
      ))}
    </div>
  )
}

export default Sidebar
