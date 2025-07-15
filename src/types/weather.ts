export interface WeatherData {
  weather: { description: string }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  name: string;
}
