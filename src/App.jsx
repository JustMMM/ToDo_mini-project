import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Sun, Moon, BarChart3, Home } from 'lucide-react'
import './App.css'

import AddTodoForm from './components/AddTodoForm'
import TodoControls from './components/TodoControls'
import TodoList from './components/TodoList'
import StatsBar from './components/StatsBar'
import QuoteCard from './components/QuoteCard'
import StatsPage from './pages/StatsPage'

const DEFAULT_TODOS = [
  { id: 1, text: 'Изучить React компоненты', priority: 'high', completed: false },
  { id: 2, text: 'Сделать домашнее задание', priority: 'medium', completed: false },
  { id: 3, text: 'Прочитать документацию', priority: 'low', completed: true },
]

function applyFilter(todos, filter) {
  if (filter === 'active') return todos.filter((t) => !t.completed)
  if (filter === 'completed') return todos.filter((t) => t.completed)
  if (filter === 'high') return todos.filter((t) => t.priority === 'high')
  if (filter === 'medium') return todos.filter((t) => t.priority === 'medium')
  if (filter === 'low') return todos.filter((t) => t.priority === 'low')
  return todos
}

function getNextId(todos) {
  if (todos.length === 0) return 1
  return Math.max(...todos.map(t => t.id)) + 1
}

function App() {
  const location = useLocation()

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : DEFAULT_TODOS
  })

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  function handleAdd(text, priority) {
    setTodos((prev) => [
      { id: getNextId(prev), text, priority, completed: false },
      ...prev,
    ])
  }

  function handleToggle(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function handleDelete(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  function handleEdit(id, newText) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    )
  }

  function handleClearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }

  const filtered = applyFilter(todos, filter).filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  )

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>My <span>To-Do</span></h1>
          <p className="task-count">
            {todos.length === 0
              ? 'Нет задач'
              : `${todos.length} ${todos.length === 1 ? 'задача' : 'задач'}`}
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-theme" onClick={toggleTheme} title="Сменить тему">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link
            to={location.pathname === '/stats' ? '/' : '/stats'}
            className="btn-nav"
            title={location.pathname === '/stats' ? 'На главную' : 'Статистика'}
          >
            {location.pathname === '/stats' ? <Home size={20} /> : <BarChart3 size={20} />}
          </Link>
        </div>
      </header>

      <Routes>
        <Route path="/" element={
          <>
            <QuoteCard />
            <AddTodoForm onAdd={handleAdd} />
            <TodoControls
              search={search}
              onSearch={setSearch}
              filter={filter}
              onFilter={setFilter}
            />
            {todos.length > 0 && (
              <StatsBar
                total={todos.length}
                completed={completedCount}
                onClearCompleted={handleClearCompleted}
              />
            )}
            <TodoList
              todos={filtered}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </>
        } />
        <Route path="/stats" element={
          <StatsPage todos={todos} />
        } />
      </Routes>
    </div>
  )
}

export default App
