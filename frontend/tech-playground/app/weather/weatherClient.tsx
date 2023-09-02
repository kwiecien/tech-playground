"use client";

import {
  OpenWeatherMapResponse,
  forecast,
  useWeather,
} from "./openWeatherMapClient";

export const WeatherClient = () => {
  const { data, error, isLoading } = useWeather();
  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }
  if (isLoading) return <p>Loading...</p>;
  const weatherForecast = forecast(data as OpenWeatherMapResponse);
  return <p>{"Client: " + weatherForecast}</p>;
};
