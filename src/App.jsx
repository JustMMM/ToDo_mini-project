import { useState } from 'react'
import './App.css'

import AddTodoForm from './components/AddTodoForm'
import TodoControls from './components/TodoControls'
import TodoList from './components/TodoList'
import StatsBar from './components/StatsBar'

const INITIAL_TODOS = [
  { id: 1, text: 'Изучить React компоненты', priority: 'high', completed: false },
  { id: 2, text: 'Сделать домашнее задание', priority: 'medium', completed: false },
  { id: 3, text: 'Прочитать документацию', priority: 'low', completed: true },
]

let nextId = INITIAL_TODOS.length + 1

function applyFilter(todos, filter) {
  if (filter === 'active') return todos.filter((t) => !t.completed)
  if (filter === 'completed') return todos.filter((t) => t.completed)
  if (filter === 'high') return todos.filter((t) => t.priority === 'high')
  if (filter === 'medium') return todos.filter((t) => t.priority === 'medium')
  if (filter === 'low') return todos.filter((t) => t.priority === 'low')
  return todos
}

function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  function handleAdd(text, priority) {
    setTodos((prev) => [
      { id: nextId++, text, priority, completed: false },
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
        <h1>My <span>To-Do</span></h1>
        <p className="task-count">
          {todos.length === 0
            ? 'Нет задач'
            : `${todos.length} ${todos.length === 1 ? 'задача' : 'задач'}`}
        </p>
      </header>

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
    </div>
  )
}

export default App
