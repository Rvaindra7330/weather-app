import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/api/weather/${city}`);
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError('An error occurred');
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.city}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Conditions: {weatherData.conditions}</p>
        </div>
      )}
    </div>
  );
}

export default App;
