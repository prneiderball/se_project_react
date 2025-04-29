export function getWeatherData({ latitude, longitude }, APIkey) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

export function parseWeatherData(data) {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.type = getWeatherType(result.temp.F);
  result.description = data.weather[0].main.toLowerCase();
  result.isDayTime = isDayTime(data.sys, Date.now());
  return result;
}

const isDayTime = ({ sunrise, sunset }, now) => {
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
