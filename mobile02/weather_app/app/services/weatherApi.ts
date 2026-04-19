


   export const getCoords = async (search:string)=>{
    const coords = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=5`)
    const result = await coords.json()
    return result?.results;
  }
  export const getWeather = async(latitude: number, longitude: number)=>{

    const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&c&hourly=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`)
    const result = await weather.json(); // ✅ IMPORTANT
    return result;
  }
