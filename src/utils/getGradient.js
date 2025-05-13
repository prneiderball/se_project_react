import { weatherConditions } from "../utils/constants.js";
import {isDayTime} from "../utils/WeatherApi.js";

export function getGradient(weatherConditions, isDayTime = true) {
  if (!Array.isArray(weatherConditions)) {
    return "linear-gradient(to top, #ffffff,rgb(80, 162, 255))";
  }

  const match = weatherConditions.find(
    (entry) => entry.condition.toLowerCase() === condition.toLowerCase() && entry.day === isDay
  );

  return match?.gradient || "linear-gradient(to top, #ffffff,rgb(80, 162, 255))";
}