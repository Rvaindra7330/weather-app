const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/weatherapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Test endpoint to check the database connection
app.get('/api/test', (req, res) => {
    const testObject = { message: 'Database connection successful' };
    res.json(testObject);
  });
  

const WeatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  conditions: String,
});

const Weather = mongoose.model('Weather', WeatherSchema);

// API route to fetch weather data
app.get('/api/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = 'YOUR_API_KEY'; // Replace with your weather API key

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    const { main, weather } = response.data;
    const temperature = main.temp;
    const conditions = weather[0].description;

    const weatherData = new Weather({
      city,
      temperature,
      conditions,
    });

    await weatherData.save();

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
