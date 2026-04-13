const FILTERS = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
  { value: 'high', label: 'Высокий' },
  { value: 'medium', label: 'Средний' },
  { value: 'low', label: 'Низкий' },
]

function TodoControls({ search, onSearch, filter, onFilter }) {
  return (
    <div className="controls">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Поиск задач..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={filter === f.value ? 'active' : ''}
            onClick={() => onFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TodoControls
