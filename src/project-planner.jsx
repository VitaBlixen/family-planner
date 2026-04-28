import { useState } from "react";
import { NavLink } from "react-router-dom";

const milestones = [
  {
    id: 1,
    phase: "POC",
    label: "Proof of Concept",
    color: "#5B8A6F",
    accent: "#A8D5B5",
    icon: "🧱",
    title: "Weekly Calendar Layout",
    goal: "A working, visually appealing weekly view — ready to screenshot for your portfolio.",
    tasks: [
      { id: "1a", text: "Set up React project with Vite + GitHub repo", done: false },
      { id: "1b", text: "Design colour palette & typography (inspired by physical wall planners)", done: false },
      { id: "1c", text: "Build 7-column weekly grid (Mon–Sun)", done: false },
      { id: "1d", text: "Add 4 hardcoded family members: Mom, Dad, Child 1, Child 2", done: false },
      { id: "1e", text: "Display time slots per day per member", done: false },
      { id: "1f", text: "Add/edit/delete events within a day cell", done: false },
      { id: "1g", text: "Weekly view fills ~½ the screen on desktop", done: false },
      { id: "1h", text: "Push to GitHub with a clear README", done: false },
    ],
    tip: "This is your showcase milestone — focus on visual quality, not features.",
  },
  {
    id: 2,
    phase: "v0.2",
    label: "Dynamic Members",
    color: "#7A6B9A",
    accent: "#C4B5E8",
    icon: "👨‍👩‍👧‍👦",
    title: "Configurable Family Members",
    goal: "Users can add, name, and remove their own family members.",
    tasks: [
      { id: "2a", text: "Replace hardcoded members with dynamic state", done: false },
      { id: "2b", text: "Add 'Add member' button with name input", done: false },
      { id: "2c", text: "Allow removing a member (with confirmation)", done: false },
      { id: "2d", text: "Assign a colour per member automatically", done: false },
      { id: "2e", text: "Persist members in localStorage", done: false },
    ],
    tip: "localStorage is fine for POC persistence — no backend needed yet.",
  },
  {
    id: 3,
    phase: "v0.3",
    label: "Week Start Day",
    color: "#B87333",
    accent: "#F0C896",
    icon: "📅",
    title: "Flexible Week Start",
    goal: "Users can pick which day their week starts on.",
    tasks: [
      { id: "3a", text: "Add a settings panel (modal or sidebar)", done: false },
      { id: "3b", text: "Dropdown: choose week start day (Mon–Sun)", done: false },
      { id: "3c", text: "Calendar columns re-order reactively", done: false },
      { id: "3d", text: "Save preference in localStorage", done: false },
    ],
    tip: "A settings panel is a great portfolio signal — shows you think about UX.",
  },
  {
    id: 4,
    phase: "v0.4",
    label: "Resizable Layout",
    color: "#5A7FA8",
    accent: "#B0CFEB",
    icon: "↔️",
    title: "Adaptable Widget Sizes",
    goal: "Users can resize sections to suit their family's priorities.",
    tasks: [
      { id: "4a", text: "Introduce a grid/panel layout system", done: false },
      { id: "4b", text: "Make weekly view resizable (drag handle or presets)", done: false },
      { id: "4c", text: "Add at least one more panel placeholder (e.g. meal plan stub)", done: false },
      { id: "4d", text: "Layouts persist per user in localStorage", done: false },
    ],
    tip: "Even preset size options (Small / Medium / Large) count as 'adaptive' at this stage.",
  },
  {
    id: 5,
    phase: "v1.0",
    label: "Full Planner",
    color: "#A85A6B",
    accent: "#E8B0BC",
    icon: "🗂️",
    title: "Multi-section Wall Planner",
    goal: "A complete digital ugeplanner with all core sections.",
    tasks: [
      { id: "5a", text: "Monthly overview panel", done: false },
      { id: "5b", text: "Meal planning section", done: false },
      { id: "5c", text: "Notes / pinboard section", done: false },
      { id: "5d", text: "Children's school schedule section", done: false },
      { id: "5e", text: "Mobile-responsive layout", done: false },
      { id: "5f", text: "Polish README with screenshots & live demo link", done: false },
    ],
    tip: "A live demo (e.g. Vercel or GitHub Pages) makes a huge difference on a portfolio.",
  },
];

export default function MilestonePlanner() {
  const [openMilestone, setOpenMilestone] = useState(1);
  const [checks, setChecks] = useState(() => {
    const stored = localStorage.getItem('project-planner-checks')
    return stored ? JSON.parse(stored) : {}
  });

  const toggle = (taskId) => {
    setChecks((prev) => {
      const updated = { ...prev, [taskId]: !prev[taskId] }
      localStorage.setItem('project-planner-checks', JSON.stringify(updated))
      return updated
    });
  };

  const getProgress = (tasks) => {
    const done = tasks.filter((t) => checks[t.id]).length;
    return Math.round((done / tasks.length) * 100);
  };

  const totalTasks = milestones.flatMap((m) => m.tasks).length;
  const totalDone = milestones.flatMap((m) => m.tasks).filter((t) => checks[t.id]).length;
  const overallPct = Math.round((totalDone / totalTasks) * 100);

  const current = milestones.find((m) => m.id === openMilestone);

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#F7F4EF",
      minHeight: "100vh",
      padding: "2rem 1.5rem",
      boxSizing: "border-box",
    }}>
      {/* Header */}
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <p style={{ margin: 0, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", fontFamily: "Georgia, serif" }}>
            Project Roadmap
          </p>
          <nav style={{ display: "flex", gap: "1rem", fontSize: "0.85rem", fontFamily: "Georgia, serif" }}>
            <NavLink to="/" end style={({ isActive }) => ({ color: isActive ? "#1E1E1E" : "#AAA", fontWeight: isActive ? "bold" : "normal", textDecoration: "none" })}>
              Planner
            </NavLink>
            <NavLink to="/project-planner" style={({ isActive }) => ({ color: isActive ? "#1E1E1E" : "#AAA", fontWeight: isActive ? "bold" : "normal", textDecoration: "none" })}>
              Project
            </NavLink>
          </nav>
        </div>
        <h1 style={{
          margin: "0.2rem 0 0.2rem",
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
          color: "#1E1E1E",
          fontWeight: "normal",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}>
          Familie Planner App
        </h1>
        <p style={{ margin: "0 0 1.5rem", color: "#666", fontSize: "0.95rem", fontStyle: "italic" }}>
          From POC to portfolio — a wall-planner for the digital home
        </p>

        {/* Overall progress */}
        <div style={{
          background: "#fff",
          borderRadius: 12,
          padding: "1rem 1.2rem",
          marginBottom: "1.8rem",
          border: "1px solid #E8E3DA",
          display: "flex",
          alignItems: "center",
          gap: "1.2rem",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: "0.82rem", color: "#888", letterSpacing: "0.08em", textTransform: "uppercase" }}>Overall progress</span>
              <span style={{ fontSize: "0.82rem", fontWeight: "bold", color: "#333" }}>{totalDone}/{totalTasks} tasks</span>
            </div>
            <div style={{ background: "#EDE8DF", borderRadius: 99, height: 8, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${overallPct}%`,
                background: "linear-gradient(90deg, #5B8A6F, #7A6B9A)",
                borderRadius: 99,
                transition: "width 0.4s ease",
              }} />
            </div>
          </div>
          <div style={{
            fontSize: "1.6rem",
            fontWeight: "bold",
            color: overallPct === 0 ? "#CCC" : "#5B8A6F",
            minWidth: 48,
            textAlign: "right",
          }}>
            {overallPct}%
          </div>
        </div>

        {/* Milestone tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.4rem" }}>
          {milestones.map((m) => {
            const pct = getProgress(m.tasks);
            const isOpen = openMilestone === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setOpenMilestone(m.id)}
                style={{
                  background: isOpen ? m.color : "#fff",
                  color: isOpen ? "#fff" : "#444",
                  border: `2px solid ${isOpen ? m.color : "#E0D9CE"}`,
                  borderRadius: 99,
                  padding: "0.4rem 1rem",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  fontFamily: "Georgia, serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.2s ease",
                }}
              >
                <span>{m.icon}</span>
                <span style={{ fontWeight: isOpen ? "bold" : "normal" }}>{m.phase}</span>
                {pct > 0 && (
                  <span style={{
                    background: isOpen ? "rgba(255,255,255,0.25)" : m.accent,
                    color: isOpen ? "#fff" : m.color,
                    borderRadius: 99,
                    padding: "0 6px",
                    fontSize: "0.72rem",
                    fontFamily: "Georgia, serif",
                  }}>
                    {pct}%
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Detail card */}
        {current && (
          <div style={{
            background: "#fff",
            border: `1px solid #E8E3DA`,
            borderLeft: `4px solid ${current.color}`,
            borderRadius: 12,
            overflow: "hidden",
          }}>
            {/* Card header */}
            <div style={{
              background: current.accent + "44",
              padding: "1.2rem 1.4rem 1rem",
              borderBottom: "1px solid #EDE8DF",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <span style={{
                    display: "inline-block",
                    background: current.color,
                    color: "#fff",
                    fontSize: "0.7rem",
                    padding: "2px 10px",
                    borderRadius: 99,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                    fontFamily: "Georgia, serif",
                  }}>
                    {current.label}
                  </span>
                  <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#1E1E1E", fontWeight: "normal" }}>
                    {current.icon} {current.title}
                  </h2>
                  <p style={{ margin: "0.4rem 0 0", color: "#555", fontSize: "0.9rem", fontStyle: "italic" }}>
                    Goal: {current.goal}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "2rem", fontWeight: "bold", color: current.color, lineHeight: 1 }}>
                    {getProgress(current.tasks)}%
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#999", textTransform: "uppercase", letterSpacing: "0.08em" }}>done</div>
                </div>
              </div>
              {/* Progress bar */}
              <div style={{ background: "#E8E3DA", borderRadius: 99, height: 6, marginTop: "0.9rem", overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${getProgress(current.tasks)}%`,
                  background: current.color,
                  borderRadius: 99,
                  transition: "width 0.4s ease",
                }} />
              </div>
            </div>

            {/* Tasks */}
            <ul style={{ listStyle: "none", margin: 0, padding: "0.6rem 0" }}>
              {current.tasks.map((task, i) => (
                <li
                  key={task.id}
                  onClick={() => toggle(task.id)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    padding: "0.65rem 1.4rem",
                    cursor: "pointer",
                    borderBottom: i < current.tasks.length - 1 ? "1px solid #F3EFE8" : "none",
                    transition: "background 0.15s",
                    background: checks[task.id] ? current.accent + "22" : "transparent",
                  }}
                >
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    border: `2px solid ${checks[task.id] ? current.color : "#C8C0B4"}`,
                    background: checks[task.id] ? current.color : "transparent",
                    flexShrink: 0,
                    marginTop: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}>
                    {checks[task.id] && (
                      <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                        <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span style={{
                    fontSize: "0.9rem",
                    color: checks[task.id] ? "#999" : "#333",
                    textDecoration: checks[task.id] ? "line-through" : "none",
                    lineHeight: 1.5,
                    transition: "all 0.2s ease",
                  }}>
                    {task.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Tip */}
            <div style={{
              background: current.accent + "33",
              borderTop: "1px solid #EDE8DF",
              padding: "0.8rem 1.4rem",
              display: "flex",
              gap: "0.6rem",
              alignItems: "flex-start",
            }}>
              <span style={{ fontSize: "1rem", marginTop: 1 }}>💡</span>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#555", fontStyle: "italic" }}>
                {current.tip}
              </p>
            </div>
          </div>
        )}

        {/* Footer note */}
        <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.78rem", color: "#BBB", fontStyle: "italic" }}>
          Click any task to mark it done · Progress saves while you keep this tab open
        </p>
      </div>
    </div>
  );
}
