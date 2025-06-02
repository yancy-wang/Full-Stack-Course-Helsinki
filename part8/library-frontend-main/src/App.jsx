import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import AddBook from './components/AddBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient } from '@apollo/client'

function App() {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const saved = localStorage.getItem('library-user-token')
    if (saved) setToken(saved)
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
  }

  return (
    <div>
      <button onClick={() => setPage('authors')}>authors</button>
      <button onClick={() => setPage('books')}>books</button>
      {token && <button onClick={() => setPage('add')}>add book</button>}
      {token && <button onClick={() => setPage('recommendations')}>recommend</button>}
      {token ? (
        <button onClick={logout}>logout</button>
      ) : (
        <button onClick={() => setPage('login')}>login</button>
      )}

      {page === 'authors' && <Authors />}
      {page === 'books' && <Books />}
      {page === 'add' && <AddBook />}
      {page === 'recommendations' && <Recommendations />}
      {page === 'login' && <LoginForm setToken={setToken} />}
    </div>
  )
}

export default App;