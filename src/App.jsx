import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `/cat/says/${firstThreeWords}?size=:size&color=:color/cat?json=true`
const CAT_PREFIX_URL = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  useEffect(() => {
    if (!fact) return
    const firstThreeWords = fact.split(' ').slice(0, 3).join(' ')
    // console.log(firstThreeWords)

    fetch(`https://cataas.com/cat/says/${firstThreeWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        console.log(response)
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])
  return (
    <main>
      <h1>App de gatitos</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img
          src={`${CAT_PREFIX_URL}${imageUrl}`} alt={`Image extracted using the first three words of ${fact}`} />}
      </section>
    </main>
  )
}
