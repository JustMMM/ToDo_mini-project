import { useState, useEffect } from 'react'

function QuoteCard() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.quotable.io/random?tags=motivational|success|inspirational')
      .then(res => res.json())
      .then(data => {
        setQuote({ text: data.content, author: data.author })
        setLoading(false)
      })
      .catch(() => {
        setQuote({ text: 'Начни делать то, что необходимо, затем то, что возможно, и внезапно ты делаешь невозможное.', author: 'Франциск Ассизский' })
        setLoading(false)
      })
  }, [])

  return (
    <div className="quote-card">
      {loading ? (
        <p className="quote-loading">Загрузка цитаты...</p>
      ) : (
        <>
          <p className="quote-text">"{quote.text}"</p>
          <p className="quote-author">— {quote.author}</p>
        </>
      )}
    </div>
  )
}

export default QuoteCard
