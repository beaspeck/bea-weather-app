import React from 'react';
import './App.css';
import {MainWeather} from "./components/mainWeather/MainWeather";
import {WeatherList} from "./components/weatherList/WeatherList";
require('dotenv').config()

function App() {
  const location = "Seattle";
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  return (
      <div className="App">
        <header className="App-header">
          <div className="appContainer">
            <MainWeather location={location} apiKey={apiKey}/>
            <WeatherList location={location} apiKey={apiKey}/>
          </div>
        </header>
      </div>
  );
}

export default App;
