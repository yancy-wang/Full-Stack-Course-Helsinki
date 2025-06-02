import { gql, useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'
import { useState } from 'react'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const SetBirthYear = () => {
  const { data } = useQuery(ALL_AUTHORS)
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = (e) => {
    e.preventDefault()
    if (name) {
      editAuthor({ variables: { name: name.value, setBornTo: parseInt(born) } })
      setName(null)
      setBorn('')
    }
  }

  const options = data?.allAuthors.map(a => ({ value: a.name, label: a.name })) || []

  return (
    <div>
      <h2>Set Author Birth Year</h2>
      <form onSubmit={submit}>
        <Select value={name} onChange={setName} options={options} />
        <input
          type="number"
          value={born}
          onChange={(e) => setBorn(e.target.value)}
          placeholder="Birth year"
        />
        <button type="submit">Set</button>
      </form>
    </div>
  )
}

export default SetBirthYear
