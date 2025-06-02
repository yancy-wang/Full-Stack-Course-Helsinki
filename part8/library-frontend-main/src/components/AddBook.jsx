import { useMutation, gql } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
    }
  }
`

const AddBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })

  const submit = async (e) => {
    e.preventDefault()
    await addBook({ variables: { title, author, published: parseInt(published), genres } })
    setTitle(''); setAuthor(''); setPublished(''); setGenres([]); setGenre('')
  }

  const addGenre = () => {
    setGenres([...genres, genre])
    setGenre('')
  }

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={submit}>
        <div>Title <input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
        <div>Author <input value={author} onChange={(e) => setAuthor(e.target.value)} /></div>
        <div>Published <input type="number" value={published} onChange={(e) => setPublished(e.target.value)} /></div>
        <div>
          <input value={genre} onChange={(e) => setGenre(e.target.value)} />
          <button onClick={addGenre} type="button">Add Genre</button>
        </div>
        <div>Genres: {genres.join(', ')}</div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  )
}

export default AddBook
