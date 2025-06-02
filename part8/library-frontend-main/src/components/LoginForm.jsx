import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import PropTypes from 'prop-types'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  })

  const submit = async (e) => {
    e.preventDefault()
    await login({ variables: { username, password } })
  }

  return (
    <form onSubmit={submit}>
      <div>
        username <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        password <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginForm