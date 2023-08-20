"use client";

import useSWR from "swr";

// TODO remove duplicated code
const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

const wroclaw = {
  latitude: 51.1079,
  longitude: 17.0385,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const WeatherClient = () => {
  const {
    data: weather,
    error,
    isLoading,
  } = useSWR(
    `https://api.openweathermap.org/data/2.5/weather?lat=${wroclaw.latitude}&lon=${wroclaw.longitude}&units=metric&appid=${API_KEY}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const weatherForecast = `You are in ${weather.name}. It feels like ${weather.main.feels_like}°C.`;
  return <p>{"Client: " + weatherForecast}</p>;
};
