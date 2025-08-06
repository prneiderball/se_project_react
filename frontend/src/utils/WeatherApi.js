import { handleResponse } from "./apiService";

export function getWeatherData({ latitude, longitude }, APIkey) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  )
    .then(handleResponse)
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      throw error;
    });
}

export function parseWeatherData(data) {
  const result = {};
  result.city = data.name;
  result.temp = { F: Math.round(data.main.temp), C: Math.round(((data.main.temp - 32) *5) /9)} ;
  result.type = getWeatherType(result.temp.F);
  result.description = data.weather[0].main.toLowerCase();
  result.isDayTime = isDayTime(data.sys, Date.now());
  return result;
}

export const isDayTime = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

export function getWeatherType(temp) {
  if (temp > 80) {
    return "hot";
  } else if (temp > 60) {
    return "warm";
  } else {
    return "cold";
  }
}
