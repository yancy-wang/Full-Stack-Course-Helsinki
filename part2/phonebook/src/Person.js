import React from 'react'
const Person = ({persons, handleDelete}) =>{
    return(
        <div>
        {persons.map((person, index)=>(
          <div key={index}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
          </div>
          
        )
        )}
      </div>
    );
}
export default Person;