import { weatherConditions } from "../utils/constants.js";

export function getGradient(condition, isDay) {
  const match = weatherConditions.find(
    (entry) => entry.condition === condition && entry.day === isDay
  );
  return match?.gradient || "linear-gradient(to top, #ffffff, #cccccc)";
}
