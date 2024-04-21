// CountryDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}`);
        setWeather(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError('Error fetching weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, [country.capital]);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={`${country.name.common} Flag`} />

      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
