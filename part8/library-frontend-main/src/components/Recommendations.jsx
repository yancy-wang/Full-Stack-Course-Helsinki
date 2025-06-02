import { gql, useQuery } from '@apollo/client'

const ME = gql`
  query {
    me {
      favouriteGenre
    }
  }
`

const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author { name }
    }
  }
`

const Recommendations = () => {
  const { data: userData } = useQuery(ME)
  const genre = userData?.me?.favouriteGenre

  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre
  })

  if (loading || !data) return <p>Loading...</p>

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favourite genre: <b>{genre}</b></p>
      <table>
        <thead><tr><th>title</th><th>author</th><th>published</th></tr></thead>
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

export default Recommendations
