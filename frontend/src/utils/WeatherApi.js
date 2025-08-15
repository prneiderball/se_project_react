import { handleResponse } from "./apiService";
import { coordinates, APIkey } from "./constants";

export function getWeatherData(coords = coordinates, APIkeyValue = APIkey) {
  if (!coords || coords.latitude == null || coords.longitude == null) {
    console.warn("Weather API: Missing coordinates, skipping fetch.");
    return Promise.resolve(null);
  }

  const { latitude, longitude } = coords;

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkeyValue}`
  )
    .then(handleResponse)
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      return null; 
    });
}

export function parseWeatherData(data) {
  if (!data) return null;

  return {
    city: data.name,
    temp: {
      F: Math.round(data.main.temp),
      C: Math.round(((data.main.temp - 32) * 5) / 9),
    },
    type: getWeatherType(Math.round(data.main.temp)),
    description: data.weather[0].main.toLowerCase(),
    isDayTime: isDayTime(data.sys, Date.now()),
  };
}

export const isDayTime = ({ sunrise, sunset }, now) =>
  sunrise * 1000 < now && now < sunset * 1000;

export function getWeatherType(temp) {
  if (temp > 80) return "hot";
  if (temp > 60) return "warm";
  return "cold";
}
