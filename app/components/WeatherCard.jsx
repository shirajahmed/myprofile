"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getWeatherDescription, getWeatherGif } from "../utils/weatherUtils";

async function fetchWeatherData(lat, lon) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&past_days=3`
  );
  if (!res.ok) throw new Error("Failed to fetch weather");
  return res.json();
}

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const [geoRes, weatherData] = await Promise.all([
            fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            ).then((r) => r.json()),
            fetchWeatherData(latitude, longitude),
          ]);
          const addr = geoRes.address;
          setLocation(
            `${addr?.city || addr?.town || addr?.city_district || addr?.county || addr?.state_district || addr?.suburb || "NA"}, ${addr?.country || "NA"}`
          );
          setWeather(weatherData.daily);
        } catch {
          setError("Failed to load weather");
        }
      },
      () => setError("Location permission denied")
    );
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6 flex flex-col gap-3">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
        🌤️ Weather
      </h2>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {!error && !weather && (
        <p className="text-gray-500 dark:text-gray-400 text-sm animate-pulse">
          Fetching weather...
        </p>
      )}

      {weather && (
        <>
          {location && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              📍 {location}
            </p>
          )}

          {/* Today */}
          <div className="flex items-center justify-between bg-blue-50 dark:bg-gray-700 rounded-lg p-3">
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                {new Date(weather.time[0]).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(weather.time[0]).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                })}
              </p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                {getWeatherDescription(weather.weather_code[0])}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {weather.temperature_2m_min[0]}°C – {weather.temperature_2m_max[0]}°C
              </p>
            </div>
            <Image
              src={`/${getWeatherGif(weather.weather_code[0])}.gif`}
              alt="weather"
              width={70}
              height={70}
              className="rounded-full"
            />
          </div>

          {/* 3-day forecast */}
          <div className="grid grid-cols-3 gap-2 mt-1">
            {weather.time.slice(1, 4).map((date, i) => (
              <div
                key={date}
                className="flex flex-col items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center"
              >
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <Image
                  src={`/${getWeatherGif(weather.weather_code[i + 1])}.gif`}
                  alt="weather"
                  width={36}
                  height={36}
                  className="rounded-full my-1"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {weather.temperature_2m_min[i + 1]}° – {weather.temperature_2m_max[i + 1]}°
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
