import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'

const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

const Books = () => {
  const [genre, setGenre] = useState(null)
  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: { genre }
  })

  if (loading) return <p>Loading...</p>

  const genres = [...new Set(data.allBooks.flatMap(b => b.genres))]

  return (
    <div>
      <h2>Books</h2>
      <div>
        {genres.map(g => (
          <button key={g} onClick={() => setGenre(g)}>{g}</button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
      <table>
        <thead>
          <tr><th>title</th><th>author</th><th>published</th></tr>
        </thead>
        <tbody>
          {data.allBooks.map(b => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books