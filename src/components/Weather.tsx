import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const CURRENT_WEATHER_API_URL = import.meta.env.VITE_CURRENT_WEATHER_API_URL;
// https://openweathermap.org/img/wn/10d@2x.png

interface CurrentWeatherData {
  city: string;
  coordLon: number;
  coordLat: number;
  weatherMain: string;
  weatherDescription: string;
  weatherIcon: string;
  humidity: number;
  pressure: number;
  temp: number;
  tempMax: number;
  tempMin: number;
  windSpeed: number;
}

const getCurrentWeather = async (city: string) => {
  const response = await axios.get(CURRENT_WEATHER_API_URL, {
    params: { q: city, appid: WEATHER_API_KEY, units: "metric" },
  });
  console.log("data: ", response.data);
  return response.data;
};

function Weather({ city }: { city: string }) {
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherData | null>(null);

  const initCurrentWeather = async () => {
    const data = await getCurrentWeather(city);

    if (data) {
      setCurrentWeather({
        city: data.name,
        coordLon: data.coord.lon,
        coordLat: data.coord.lat,
        weatherMain: data.weather[0].main,
        weatherDescription: data.weather[0].description,
        weatherIcon: data.weather[0].description,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temp: data.main.temp,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        windSpeed: data.wind.speed,
      });
    } else {
      setCurrentWeather(null);
    }
  };

  const currenWeatherQuery = useQuery({
    queryKey: ["currentWeather", city],
    queryFn: initCurrentWeather,
    enabled: !!city,
  });

  console.log("after getCurrentWeather -> currentWeather:", currentWeather);

  return (
    <div className="h-full grid grid-cols-1 grid-rows-3 gap-4 lg:col-span-2">
      <div className="h-full rounded-lg bg-gray-700/25 border border-black shadow-lg row-span-3 md:row-span-2">
        {currentWeather?.city}
      </div>
      <div className="hidden md:flex h-full rounded-lg bg-gray-700/25 border border-black shadow-lg lg:row-span-1"></div>
    </div>
  );
}

export default Weather;
