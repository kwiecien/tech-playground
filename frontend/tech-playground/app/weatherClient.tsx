"use client";

import { useEffect, useState } from "react";

const API_KEY = "";

const wroclaw = {
  latitude: 51.1079,
  longitude: 17.0385,
};

export const WeatherClient = () => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${wroclaw.latitude}&lon=${wroclaw.longitude}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }, []);

  return <p>{JSON.stringify(weather)}</p>;
};
