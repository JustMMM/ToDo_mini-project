import { useState } from 'react'
import { Check, Pencil, Trash2 } from 'lucide-react'

const PRIORITY_LABELS = {
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
}

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  function handleSave() {
    const trimmed = editText.trim()
    if (!trimmed) return
    onEdit(todo.id, trimmed)
    setIsEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setEditText(todo.text)
      setIsEditing(false)
    }
  }

  return (
    <div className={`todo-item priority-${todo.priority} ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <div className="todo-content">
        {isEditing ? (
          <input
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <>
            <div className="todo-text">{todo.text}</div>
            <div className="todo-meta">
              <span className={`priority-badge ${todo.priority}`}>
                {PRIORITY_LABELS[todo.priority]}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <button className="btn-icon btn-save" onClick={handleSave} title="Сохранить">
            <Check size={16} />
          </button>
        ) : (
          <button
            className="btn-icon btn-edit"
            onClick={() => setIsEditing(true)}
            title="Редактировать"
          >
            <Pencil size={16} />
          </button>
        )}
        <button
          className="btn-icon btn-delete"
          onClick={() => onDelete(todo.id)}
          title="Удалить"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

export default TodoItem
