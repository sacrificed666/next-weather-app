import { METEOCONS_BASE_URL } from "@/constants/cdn";

const useIcon = (description: string) => {
  switch (description.toLowerCase()) {
    case "thunderstorm with light rain":
    case "thunderstorm with light drizzle":
      return `${METEOCONS_BASE_URL}thunderstorms-rain.svg`;

    case "thunderstorm with rain":
    case "thunderstorm with drizzle":
      return `${METEOCONS_BASE_URL}thunderstorms-overcast-rain.svg`;

    case "thunderstorm with heavy rain":
    case "thunderstorm with heavy drizzle":
      return `${METEOCONS_BASE_URL}thunderstorms-extreme-rain.svg`;

    case "light thunderstorm":
      return `${METEOCONS_BASE_URL}thunderstorms.svg`;

    case "thunderstorm":
      return `${METEOCONS_BASE_URL}thunderstorms-overcast.svg`;

    case "heavy thunderstorm":
    case "ragged thunderstorm":
      return `${METEOCONS_BASE_URL}thunderstorms-extreme.svg`;

    case "light intensity drizzle":
    case "light intensity drizzle rain":
      return `${METEOCONS_BASE_URL}drizzle.svg`;

    case "drizzle":
    case "drizzle rain":
    case "shower rain and drizzle":
    case "shower drizzle":
      return `${METEOCONS_BASE_URL}overcast-drizzle.svg`;

    case "heavy intensity drizzle":
    case "heavy intensity drizzle rain":
    case "heavy shower rain and drizzle":
      return `${METEOCONS_BASE_URL}extreme-drizzle.svg`;

    case "light rain":
    case "light intensity shower rain":
      return `${METEOCONS_BASE_URL}rain.svg`;

    case "moderate rain":
    case "shower rain":
      return `${METEOCONS_BASE_URL}overcast-rain.svg`;

    case "heavy intensity rain":
    case "very heavy rain":
    case "extreme rain":
    case "heavy intensity shower rain":
    case "ragged shower rain":
      return `${METEOCONS_BASE_URL}extreme-rain.svg`;

    case "light shower sleet":
    case "light rain and snow":
      return `${METEOCONS_BASE_URL}sleet.svg`;

    case "freezing rain":
    case "sleet":
    case "shower sleet":
    case "rain and snow":
      return `${METEOCONS_BASE_URL}extreme-sleet.svg`;

    case "light snow":
    case "light shower snow":
      return `${METEOCONS_BASE_URL}snow.svg`;

    case "snow":
    case "shower snow":
      return `${METEOCONS_BASE_URL}overcast-snow.svg`;

    case "heavy snow":
    case "heavy shower snow":
      return `${METEOCONS_BASE_URL}extreme-snow.svg`;

    case "mist":
      return `${METEOCONS_BASE_URL}mist.svg`;

    case "smoke":
      return `${METEOCONS_BASE_URL}smoke.svg`;

    case "haze":
      return `${METEOCONS_BASE_URL}haze.svg`;

    case "sand/dust whirls":
      return `${METEOCONS_BASE_URL}dust-wind.svg`;

    case "fog":
      return `${METEOCONS_BASE_URL}fog.svg`;

    case "sand":
    case "dust":
    case "volcanic ash":
      return `${METEOCONS_BASE_URL}dust.svg`;

    case "squalls":
      return `${METEOCONS_BASE_URL}wind.svg`;

    case "tornado":
      return `${METEOCONS_BASE_URL}tornado.svg`;

    case "clear sky":
    case "sky is clear":
      return `${METEOCONS_BASE_URL}clear-day.svg`;

    case "few clouds":
      return `${METEOCONS_BASE_URL}partly-cloudy-day.svg`;

    case "scattered clouds":
      return `${METEOCONS_BASE_URL}cloudy.svg`;

    case "broken clouds":
    case "overcast clouds":
      return `${METEOCONS_BASE_URL}overcast.svg`;

    default:
      return `${METEOCONS_BASE_URL}not-available.svg`;
  }
};

export default useIcon;
