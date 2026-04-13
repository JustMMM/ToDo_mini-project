import { useState } from 'react'

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed, priority)
    setText('')
    setPriority('medium')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="add-form-row">
        <input
          type="text"
          placeholder="Новая задача..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn-add">
          + Добавить
        </button>
      </div>
      <div className="priority-row">
        <span>Приоритет:</span>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">Высокий</option>
          <option value="medium">Средний</option>
          <option value="low">Низкий</option>
        </select>
      </div>
    </form>
  )
}

export default AddTodoForm
