import React from 'react';

const CountryList = ({ countries, handleShowDetails }) => {
  return (
    <div>
      {countries.map(country => (
        <div key={country.name.common}>
          <span>{country.name.common}</span>
          <button onClick={() => handleShowDetails(country)}>Show Details</button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;