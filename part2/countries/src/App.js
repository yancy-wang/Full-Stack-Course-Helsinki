// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import CountryList from './CountryList';
import CountryDetail from './CountryDetail';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      axios.get(`https://restcountries.com/v3/name/${searchTerm}`)
        .then(response => {
          setCountries(response.data);
          setSelectedCountry(null);
        })
        .catch(error => {
          console.error('Error fetching countries:', error);
          setCountries([]);
          setSelectedCountry(null);
        });
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>Country Information</h1>
      <SearchForm searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      {countries.length > 10 ? (
        <p>Too many matches, please make your query more specific.</p>
      ) : countries.length === 1 ? (
        <CountryDetail country={countries[0]} />
      ) : (
        <CountryList countries={countries} handleShowDetails={handleShowDetails} />
      )}
      {selectedCountry && <CountryDetail country={selectedCountry} />}
    </div>
  );
};

export default App;