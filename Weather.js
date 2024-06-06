import React, { useState } from "react";
import { fetchWeather } from "./src/api";
import { Container, Typography, TextField, Button } from "@mui/material";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    setLoading(true);
    try {
      const weatherData = await fetchWeather(city);
      setWeather(weatherData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }



  };


  export const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`${OPENWEATHERMAP_URL}/weather`, {
        params: {
          q: city,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data", error);
      return null;
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Weather
      </Typography>
      <TextField
        label="City"
        variant="outlined"
        fullWidth
        margin="normal"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={getWeather}>
        Get Weather
      </Button>
      {loading && <Typography variant="body1">Loading...</Typography>}
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      {weather && (
        <div>
          <Typography variant="h6">{weather.name}</Typography>
          <Typography variant="body1">
            Temperature: {weather.main.temp}°C
          </Typography>
          <Typography variant="body1">
            Weather: {weather.weather[0].description}
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default Weather;
