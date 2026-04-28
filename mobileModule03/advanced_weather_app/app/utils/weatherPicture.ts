import sunny from "../../assets/images/weather/Icon-Sunny.png";
import cloudy from "../../assets/images/weather/Icon-Cloudy.png";
// import fog from "../../assets/images/weather/fog.png";
import rain from "../../assets/images/weather/Icon-Rainy.png";
import snow from "../../assets/images/weather/Icon-Snow.png";
// import storm from "../../assets/images/weather/storm.png";

export const getWeatherImage = (code:number) => {
  if (code === 0) return sunny;
  if (code <= 3) return cloudy;
  if (code <= 48) return sunny;
  if (code <= 67) return rain;
  if (code <= 77) return snow;
  if (code <= 99) return sunny;

  return cloudy;
};