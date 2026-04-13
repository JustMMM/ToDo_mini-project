function StatsBar({ total, completed, onClearCompleted }) {
  const remaining = total - completed

  return (
    <div className="stats-bar">
      <span>
        Осталось: <strong>{remaining}</strong> / {total}
      </span>
      {completed > 0 && (
        <button className="btn-clear" onClick={onClearCompleted}>
          Удалить выполненные ({completed})
        </button>
      )}
    </div>
  )
}

export default StatsBar
