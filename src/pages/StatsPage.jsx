import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Clock, ListTodo, Target } from 'lucide-react'

function StatsPage({ todos }) {
  const total = todos.length
  const completed = todos.filter(t => t.completed).length
  const active = total - completed
  const highPriority = todos.filter(t => t.priority === 'high' && !t.completed).length

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="stats-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={18} />
        Назад к задачам
      </Link>

      <h1>Ваша <span>Статистика</span></h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="icon">
            <ListTodo size={32} />
          </div>
          <div className="value">{total}</div>
          <div className="label">Всего задач</div>
        </div>

        <div className="stat-card">
          <div className="icon">
            <CheckCircle size={32} />
          </div>
          <div className="value">{completed}</div>
          <div className="label">Выполнено</div>
        </div>

        <div className="stat-card">
          <div className="icon">
            <Clock size={32} />
          </div>
          <div className="value">{active}</div>
          <div className="label">В процессе</div>
        </div>

        <div className="stat-card">
          <div className="icon">
            <Target size={32} />
          </div>
          <div className="value">{highPriority}</div>
          <div className="label">Высокий приоритет</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="value">{completionRate}%</div>
        <div className="label">Процент выполнения</div>
        <div style={{
          marginTop: '12px',
          height: '8px',
          background: 'var(--border)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${completionRate}%`,
            height: '100%',
            background: 'var(--primary)',
            transition: 'width 0.3s'
          }} />
        </div>
      </div>
    </div>
  )
}

export default StatsPage
