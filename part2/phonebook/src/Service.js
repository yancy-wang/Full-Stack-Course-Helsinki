import axios from 'axios'

const baseUrl = 'https://phonebook-backend-yyw.fly.dev/'

const getAll = () =>{
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson)
      .then(response => response.data)
      .catch(error => {
        throw error.response.data;
      });
  };
  
const service = {getAll, create, deletePerson, updatePerson}

export default service
