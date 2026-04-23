import WeeklyCalendar from './components/WeeklyCalendar'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className="min-h-screen bg-linen font-sans p-6 flex flex-col gap-6">
      <header>
        <h1 className="font-display text-4xl text-ink">Family Planner</h1>
      </header>

      <main className="grid grid-cols-5 gap-6 items-start">
        <div className="col-span-3">
          <WeeklyCalendar />
        </div>
        <div className="col-span-2">
          <Sidebar />
        </div>
      </main>
    </div>
  )
}

export default App
