export const getWeatherDescription = (code) => {
  const weatherDescriptions = {
    1: "Clear Sky",
    2: "Partly Cloudy",
    3: "Cloudy",
    45: "Foggy",
    48: "Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    80: "Rain Showers",
    81: "Heavy Rain Showers",
    82: "Violent Rain Showers",
  };
  return weatherDescriptions[code] || "No Weather";
};
