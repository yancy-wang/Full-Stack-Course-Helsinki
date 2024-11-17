import { useState } from 'react';
import { useCountry } from './useCountry';

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>Country not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name.common}</h3>
      <div>Population: {country.data.population}</div>
      <div>Capital: {country.data.capital}</div>
      <img src={country.data.flags.png} alt={`Flag of ${country.data.name.common}`} width="100" />
    </div>
  );
};

const App = () => {
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const country = useCountry(search);

  const fetch = (e) => {
    e.preventDefault();
    setSearch(name);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter country name"
        />
        <button type="submit">Find</button>
      </form>
      <Country country={country} />
    </div>
  );
};

export default App;
