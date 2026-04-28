import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import WeeklyCalendar from './components/WeeklyCalendar'
import Sidebar from './components/Sidebar'
import MilestonePlanner from './project-planner'

function PlannerLayout() {
  return (
    <div className="min-h-screen bg-linen font-sans p-6 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-4xl text-ink">Family Planner</h1>
        <nav className="flex gap-4 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'text-ink font-semibold' : 'text-ink/40 hover:text-ink transition-colors'
            }
          >
            Planner
          </NavLink>
          <NavLink
            to="/project-planner"
            className={({ isActive }) =>
              isActive ? 'text-ink font-semibold' : 'text-ink/40 hover:text-ink transition-colors'
            }
          >
            Project
          </NavLink>
        </nav>
      </header>

      <main className="grid grid-cols-4 gap-6 items-start">
        <div className="col-span-3">
          <WeeklyCalendar />
        </div>
        <div className="col-span-1">
          <Sidebar />
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlannerLayout />} />
        <Route path="/project-planner" element={<MilestonePlanner />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
