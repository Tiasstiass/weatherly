import axios from 'axios';

const weatherURL = 'https://api.openweathermap.org/';
const {
  REACT_APP_API_KEY_WEATHER: keyWeather,
  REACT_APP_API_KEY_PLACES: keyPlaces,
} = process.env;

function getAutocomplete(input) {
  return axios.get(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&limit=5&type=city&apiKey=${keyPlaces}`
  );
}

function getCity(lat, lon) {
  return axios.get(
    `${weatherURL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${keyWeather}`
  );
}

function getWeatherData(lat, lon) {
  return axios.get(
    `${weatherURL}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely,hourly&units=metric&appid=${keyWeather}`
  );
}

export { getCity, getWeatherData, getAutocomplete };
