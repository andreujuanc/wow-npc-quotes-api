import React from 'react'
import Head from 'next/head'

const Home = () => {
  const [quoteData, setQuote] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const getQuote = async () => {
    setLoading(true)
    try {
      const quoteResponse = await fetch('/api/quote')
      setQuote(await quoteResponse.json())
    } catch {

    }
    setLoading(false)
  }

  React.useEffect(() => {
    getQuote()
  }, [])

  return (
    <div>
      <Head>
        <title>WOW NPC QUOTES</title>
      </Head>

      <div className='hero'>
        <h1 className='title'>WOW NPC QUOTES</h1>
        <p className='description'>
          {quoteData ? quoteData.quote.toString() : null}
        </p>

        <div className='row'>
          <button disabled={loading} onClick={getQuote}>
            {loading ? '⌛' : 'Random Quote'}
          </button>
        </div>
      </div>

      <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
    </div>
  )
}

export default Home
