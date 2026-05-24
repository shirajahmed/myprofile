// Maps Open-Meteo weather codes to available GIF files and descriptions
const weatherMap = {
  0:  { gif: 1,  desc: "Clear Sky" },
  1:  { gif: 1,  desc: "Clear Sky" },
  2:  { gif: 2,  desc: "Partly Cloudy" },
  3:  { gif: 3,  desc: "Cloudy" },
  45: { gif: 45, desc: "Foggy" },
  48: { gif: 48, desc: "Rime Fog" },
  51: { gif: 51, desc: "Light Drizzle" },
  53: { gif: 53, desc: "Moderate Drizzle" },
  55: { gif: 55, desc: "Dense Drizzle" },
  56: { gif: 51, desc: "Freezing Drizzle" },
  57: { gif: 55, desc: "Heavy Freezing Drizzle" },
  61: { gif: 80, desc: "Slight Rain" },
  63: { gif: 81, desc: "Moderate Rain" },
  65: { gif: 82, desc: "Heavy Rain" },
  66: { gif: 80, desc: "Freezing Rain" },
  67: { gif: 82, desc: "Heavy Freezing Rain" },
  71: { gif: 51, desc: "Slight Snow" },
  73: { gif: 53, desc: "Moderate Snow" },
  75: { gif: 55, desc: "Heavy Snow" },
  77: { gif: 51, desc: "Snow Grains" },
  80: { gif: 80, desc: "Rain Showers" },
  81: { gif: 81, desc: "Heavy Rain Showers" },
  82: { gif: 82, desc: "Violent Rain Showers" },
  85: { gif: 80, desc: "Snow Showers" },
  86: { gif: 81, desc: "Heavy Snow Showers" },
  95: { gif: 82, desc: "Thunderstorm" },
  96: { gif: 82, desc: "Thunderstorm w/ Hail" },
  99: { gif: 82, desc: "Thunderstorm w/ Heavy Hail" },
};

export const getWeatherDescription = (code) =>
  weatherMap[code]?.desc || "Unknown";

export const getWeatherGif = (code) =>
  weatherMap[code]?.gif || 3; // default to cloudy
