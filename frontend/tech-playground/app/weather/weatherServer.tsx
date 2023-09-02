import { fetchWeather, forecast } from "./openWeatherMapClient";

export async function WeatherServer() {
  const { data, error } = await fetchWeather();
  if (error) {
    const errorMessage = `Error ${error.cod}: ${error.message}`;
    return <p>{errorMessage}</p>;
  }
  const weatherForecast = forecast(data!);
  return <p>{"Server: " + weatherForecast}</p>;
}
