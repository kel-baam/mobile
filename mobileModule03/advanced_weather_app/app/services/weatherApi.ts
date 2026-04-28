


   export const getCoords = async (search:string,setError:any)=>{

    try {
        const coords = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=5`)
        if (!coords.ok) 
          throw new Error("API error");
        const result = await coords.json()
        return result?.results;

    }
    catch{
      setError("Connection error. Please try again.");

    }
  }
  export const getWeather = async(latitude: number, longitude: number,setError:any)=>{
    try {
        const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&c&hourly=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`)
        if (!weather.ok) 
          throw new Error("API error");

        const result = await weather.json();

        return result;

    }
    catch{
      setError("Connection error. Please try again.");

    }
  }






  //  export const getCoords = async (search:string,setError:any)=>{

  //   try {
  //       const coords = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=5`)
  //       if (!coords.ok) 
  //         throw new Error("API error");
  //       const result = await coords.json()
  //       return result?.results;

  //   }
  //   catch{
  //     setError("Connection error. Please try again.");

  //   }
  // }
  // export const getWeather = async(latitude: number, longitude: number,setError:any)=>{
  //   try {
  //       const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&c&hourly=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`)
  //       if (!weather.ok) 
  //         throw new Error("API error");

  //       const result = await weather.json();

  //       return result;

  //   }
  //   catch{
  //     setError("Connection error. Please try again.");

  //   }
  // }
