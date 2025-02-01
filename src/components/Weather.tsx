import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";

const WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const CURRENT_WEATHER_API_URL = import.meta.env.VITE_CURRENT_WEATHER_API_URL;
const FORECAST_WEATHER_API_URL = import.meta.env.VITE_FORECAST_WEATHER_API_URL;

type WeatherData = {
  city?: string;
  coordLon?: number;
  coordLat?: number;
  summary: string;
  description: string;
  icon: string;
  humidity: number;
  pressure?: number;
  temp: number;
  tempMax: number;
  tempMin: number;
  windSpeed: number;
  date: string;
  time: string;
};

type forecastData = {
  city: string;
  coordLon: number;
  coordLat: number;
  list: WeatherData[];
};

function Weather({ city }: { city: string }) {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );

  const [forecastWeather, setForecastWeather] = useState<forecastData | null>(
    null
  );

  const getCurrentWeather = async () => {
    const response = await axios.get(CURRENT_WEATHER_API_URL, {
      params: { q: city, appid: WEATHER_API_KEY, units: "metric" },
    });
    return response.data;
  };

  const getForecastWeather = async () => {
    const response = await axios.get(FORECAST_WEATHER_API_URL, {
      params: { q: city, appid: WEATHER_API_KEY, units: "metric" },
    });
    return response.data;
  };

  const initCurrentWeather = async () => {
    const data = await getCurrentWeather();

    if (data) {
      setCurrentWeather({
        city: data.name,
        coordLon: data.coord.lon,
        coordLat: data.coord.lat,
        summary: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temp: data.main.temp,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        windSpeed: data.wind.speed,
        date: moment().format("Do MMMM YYYY"),
        time: moment().format("h:mm a"),
      });
    } else {
      setCurrentWeather(null);
    }

    return currentWeather;
  };

  const initForecastWeather = async () => {
    const data = await getForecastWeather();

    if (data) {
      const availableList = data.list.map((item: any) => ({
        summary: item.weather[0].main,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        temp: item.main.temp,
        tempMax: item.main.temp_max,
        tempMin: item.main.temp_min,
        windSpeed: item.wind.speed,
        date: moment().isSame(item.dt_txt, "day")
          ? "Today"
          : moment(item.dt_txt).format("D MMMM YYYY"),
        time: moment(item.dt_txt).format("h:mm a"),
      }));

      const availableData = {
        city: data.city.name,
        coordLon: data.city.coord.lon,
        coordLat: data.city.coord.lat,
        list: availableList,
      };

      setForecastWeather(availableData);
    } else {
      setForecastWeather(null);
    }

    return {};
  };

  // console.log("city:", city);

  const currenWeatherQuery = useQuery({
    queryKey: ["currentWeather", city],
    queryFn: initCurrentWeather,
    enabled: !!city,
  });

  const forecastWeatherQuery = useQuery({
    queryKey: ["forecastWeather", city],
    queryFn: initForecastWeather,
    enabled: !!city,
  });

  // console.log("after initCurrentWeather -> currentWeather:", currentWeather);
  console.log("after initForecastWeather -> forecastWeather:", forecastWeather);

  return (
    <div className="flex-auto w-full h-full text-black dark:text-amber-50 px-6 p-4 grid grid-cols-1 gap-4 overflow-auto">
      <div className="h-full grid grid-cols-1 grid-rows-5 gap-4">
        <div className="flex flex-col justify-between min-h-fit h-full rounded-lg dark:bg-gray-700/25 border border-gray-100 dark:border-black row-span-3 inset-shadow-sm">
          {/* location date time */}
          <div className="p-4 w-full h-fit flex justify-center items-center flex-col gap-2">
            <p className="text-[40px] font-bold">{currentWeather?.city}</p>
            <div className="flex gap-8">
              <p className="flex items-center gap-2 text-gray-500">
                <span>
                  <CalendarDaysIcon className="w-6" />
                </span>
                {currentWeather?.date}
              </p>
              <p className="flex items-center gap-2 text-gray-500">
                <span>
                  <ClockIcon className="w-6" />
                </span>
                {currentWeather?.time}
              </p>
            </div>
          </div>
          {/* weather highlight */}
          <div className="p-4 flex flex-col w-full h-fit justify-center items-center">
            <p className="text-[28px]">{currentWeather?.summary}</p>
            <img
              alt="weather icon"
              src={`https://openweathermap.org/img/wn/${currentWeather?.icon}@4x.png`}
              className="w-40"
            />
            <div className="flex items-center justify-center gap-4">
              <p className="text-[40px]">{currentWeather?.temp} &deg;C</p>
              <div className="flex flex-col gap-0.5 text-gray-500 border-l pl-4">
                <p className="text-sm">H: {currentWeather?.tempMax} &deg;C</p>
                <p className="text-sm">L: {currentWeather?.tempMin} &deg;C</p>
              </div>
            </div>
          </div>
          {/* weather detail */}
          <div className="p-4 flex w-full h-fit justify-center items-center divide-gray-500">
            <div className="flex flex-col w-full justify-center items-center">
              <p className="text-lg">{currentWeather?.humidity}%</p>
              <p className="text-sm text-gray-500">Humidity</p>
            </div>
            <div className="flex flex-col w-full justify-center items-center">
              <p className="text-lg">{currentWeather?.windSpeed} km/s</p>
              <p className="text-sm text-gray-500">Wind</p>
            </div>
            <div className="flex flex-col w-full justify-center items-center">
              <p className="text-lg">{currentWeather?.pressure} mb</p>
              <p className="text-sm text-gray-500">Pressure</p>
            </div>
          </div>
        </div>
        <div className="h-full w-full overflow-hidden flex flex-col gap-4 rounded-lg dark:bg-gray-700/25 border border-gray-100 dark:border-black row-span-2 inset-shadow-sm">
          <p className="pl-4 pt-4 font-bold text-lg">
            5 day / 3 hour forecast data
          </p>
          <div className="overflow-x-auto h-full flex gap-4 pl-4 pb-4">
            {/* card */}
            {forecastWeather?.list.map((item) => (
              <div className="flex flex-col justify-between gap-2 rounded-lg p-4 border border-gray-100 shadow-sm w-fit min-w-[280px]">
                {/* location date time */}
                <div className="w-full h-fit flex justify-center items-center flex-col gap-1">
                  <p className="text-md font-bold">{item?.date}</p>
                  <p className="text-sm items-center text-gray-500">
                    {item?.time}
                  </p>
                </div>
                {/* weather highlight */}
                <div className="flex flex-col w-full h-fit justify-center items-center">
                  <p className="text-lg">{item?.summary}</p>
                  <img
                    alt="weather icon"
                    src={`https://openweathermap.org/img/wn/${currentWeather?.icon}@4x.png`}
                    className="w-28"
                  />
                  <div className="flex items-center justify-center gap-4">
                    <p className="text-lg">{item?.temp} &deg;C</p>
                  </div>
                </div>
                {/* weather detail */}
                <div className="text-xs flex w-full h-fit justify-center items-center divide-gray-500">
                  <div className="flex flex-col w-full justify-center items-center">
                    <p className="">{item?.humidity}%</p>
                    <p className="text-gray-500">Humidity</p>
                  </div>
                  <div className="flex flex-col w-full justify-center items-center">
                    <p className="">{item?.windSpeed} km/s</p>
                    <p className="text-gray-500">Wind</p>
                  </div>
                  <div className="flex flex-col w-full justify-center items-center">
                    <p className="">{item?.pressure} mb</p>
                    <p className="text-gray-500">Pressure</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
