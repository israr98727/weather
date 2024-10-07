import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

const WeatherApp = () => {
  const [city, setCity] = useState('Karachi');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track error state

  const API_KEY = '73e6f8952ee27e550669a32513d1f4c9'; // Replace with your OpenWeatherMap API Key

  useEffect(() => {
    fetchWeatherData(); // Fetch weather data on initial load
  }, []);

  

  const fetchWeatherData = async () => {
    try {
      setError(null); // Clear previous errors
      setLoading(true); // Set loading state
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
      );

      setWeatherData(response.data); // Set the data from response
      setLoading(false); // Turn off loading state
    } catch (err) {
      console.error(err); // Log any error to the console
      setError(err.response ? err.response.data.message : 'An error occurred'); // Set error message
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value); // Update city state when the input changes
  };

  const handleSearch = () => {
    setLoading(true); // Set loading state before fetching data
    fetchWeatherData(); // Fetch weather data using Axios
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white backdrop-blur-lg">
      {/* Card Container */}
      <div className="flex flex-col items-center justify-center h-[500px] w-[400px] bg-white/10 backdrop-blur-md rounded-[20px] shadow-lg p-6">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-10 text-gray-100">Weather App</h1>

        {/* Input and Button */}
        <div className="flex w-full mb-6">
          <input
            type="text"
            className="p-2 flex-1 rounded-lg text-black placeholder-gray-600"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city"
          />
          <button
            className="bg-purple-700 p-2 rounded-lg ml-2 text-white hover:bg-purple-600 transition duration-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Display loading message */}
        {loading && <p className="mt-4 text-lg text-gray-200">Loading...</p>}

        {/* Display error message if any */}
        {error && <p className="mt-4 text-lg text-blue-950"><span className='text-white'>Error: </span> {error}</p>}

        {/* Display weather data */}
        {weatherData && !loading && !error && (
          <div className="mt-4 text-center">
            <h2 className="text-3xl font-semibold text-gray-100">
              {weatherData.name}
            </h2>
            <p className="text-xl text-gray-300 capitalize">
              {weatherData.weather[0].description}
            </p>
            <p className="text-2xl font-bold text-gray-100">
              {weatherData.main.temp}°C
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
