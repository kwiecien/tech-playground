import useSWR from "swr";

const TEN_MINUTES = 600;

const WROCLAW = {
  latitude: "51.1079",
  longitude: "17.0385",
};

const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY ?? "";
const OPEN_WEATHER_API_BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_PARAMS = new URLSearchParams({
  appid: API_KEY,
  units: "metric",
  lat: WROCLAW.latitude,
  lon: WROCLAW.longitude,
});
const WROCLAW_WEATHER_API = `${OPEN_WEATHER_API_BASE_URL}?${WEATHER_PARAMS}`;

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

const EXAMPLE_ERROR = {
  cod: 401,
  message:
    "Invalid API key. Please see https://openweathermap.org/faq#error401 for more info.",
};

export type OpenWeatherMapResponse = typeof EXAMPLE_RESPONSE;
export type OpenWeatherMapError = typeof EXAMPLE_ERROR;

export async function fetchWeather(): Promise<{
  data?: OpenWeatherMapResponse;
  error?: OpenWeatherMapError;
}> {
  const response = await fetch(WROCLAW_WEATHER_API, {
    next: { revalidate: TEN_MINUTES },
  });
  const json = await response.json();
  if (!response.ok) return { error: json as OpenWeatherMapError };
  return { data: json as OpenWeatherMapResponse };
}

const fetcher = (url: string) =>
  fetch(url).then(
    (res): Promise<OpenWeatherMapResponse | OpenWeatherMapError> => res.json()
  );

export function useWeather(): {
  data?: OpenWeatherMapResponse;
  error?: OpenWeatherMapError | unknown;
  isLoading: boolean;
} {
  const { data, error, isLoading } = useSWR(WROCLAW_WEATHER_API, fetcher);
  if (isOpenWeatherMapError(data)) {
    return { error: data, isLoading };
  }
  return { data, error, isLoading };
}

export function isOpenWeatherMapError(
  error?: OpenWeatherMapError | OpenWeatherMapResponse
): error is OpenWeatherMapError {
  return (error as OpenWeatherMapError)?.cod !== 200;
}

export const forecast = (weather: OpenWeatherMapResponse) => {
  return `You are in ${weather.name}. It feels like ${weather.main.feels_like}°C.`;
};
