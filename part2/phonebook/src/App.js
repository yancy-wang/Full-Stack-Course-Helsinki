import React,{ useEffect, useState } from 'react'
import Filter from './Filter'
import Person from './Person'
import PersonForm from './PersonForm'
import service from './Service'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchItem, setSearchItem] = useState('')
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    service.getAll()
    .then(personData => {
      setPersons(personData);
    })
    .catch(error => {
      console.error('Error:', error)
    }
    );
  },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchItem(event.target.value)
  }

  const searchedPerson = persons.filter(person =>
      person.name.toLowerCase().includes(searchItem.toLowerCase())
    )
  
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
    setNotification(null);
    }, 5000); // Hide notification after 5 seconds
  };
  
  

  const addPerson = (event) => {
    event.preventDefault()
    const repeatedPerson = persons.find(person => person.name === newName)
    if(repeatedPerson)
    {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
      {
        const newRepeatedPerson = {...repeatedPerson, number:newNumber}
        service.updatePerson(repeatedPerson.id, newRepeatedPerson)
        .then(newRepeatedPerson => {
          setPersons(persons.map(person => person.id !== newRepeatedPerson.id ? person: newRepeatedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error('Error update', error)
        })
      }
      showNotification(`Number for ${repeatedPerson.name} updated successfully!`);
    }
    else
    {
      const newPerson = {name: newName, number: newNumber}

      service.create(newPerson)
      .then(newPersonData => {
        setPersons([...persons, newPersonData])
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error('Error:', error)
      })
      showNotification(`Number for ${newPerson.name} added successfully!`); 
    }
    
  }

  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name}?`))
    {
      service.deletePerson(id)
      .then(()=>{
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.error('Delete Error:', error)
      })
    }
    showNotification(`Number for ${name} deleted successfully!`);

  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification message={notification} />}
      <Filter searchItem={searchItem} handleSearchChange={handleSearchChange}/>

      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} showNotification={showNotification}/>
      
      <h2>Numbers</h2>
      <Person persons={searchedPerson} handleDelete={handleDelete} showNotification={showNotification}/>
    
      
    </div>
  )
}

export default App
