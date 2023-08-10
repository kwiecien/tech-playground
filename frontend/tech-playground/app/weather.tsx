const API_KEY = "";

const wroclaw = {
  latitude: 51.1079,
  longitude: 17.0385,
};

const EXAMPLE_RESPONSE = {
  coord: { lon: 17.0385, lat: 51.1079 },
  weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
  base: "stations",
  main: {
    temp: 16.65,
    feels_like: 16.17,
    temp_min: 14.48,
    temp_max: 18.92,
    pressure: 1025,
    humidity: 69,
  },
  visibility: 10000,
  wind: { speed: 2.06, deg: 180 },
  clouds: { all: 0 },
  dt: 1691699640,
  sys: {
    type: 2,
    id: 2017463,
    country: "PL",
    sunrise: 1691638204,
    sunset: 1691691876,
  },
  timezone: 7200,
  id: 3081368,
  name: "Wrocław",
  cod: 200,
};

type OpenWeatherMapResponse = typeof EXAMPLE_RESPONSE;

export default async function Weather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${wroclaw.latitude}&lon=${wroclaw.longitude}&units=metric&appid=${API_KEY}`
  );
  const data = (await response.json()) as OpenWeatherMapResponse;
  const weatherForecast = `You are in ${data.name}. It feels like ${data.main.feels_like}°C.`;
  return <p>{weatherForecast}</p>;
}