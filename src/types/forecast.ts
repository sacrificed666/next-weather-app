export interface ForecastDataList {
  list: ForecastData[];
}

export interface ForecastData {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  humidity: number;
  weather: { description: string }[];
  speed: number;
}
