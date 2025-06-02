import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const Authors = () => {
  const { data, loading, error } = useQuery(ALL_AUTHORS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error fetching authors</p>

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Born</th><th>Books</th></tr>
        </thead>
        <tbody>
          {data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born ?? '–'}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
