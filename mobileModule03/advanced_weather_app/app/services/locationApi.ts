
import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return null;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    return currentLocation?.coords;
  };


  export const getCityFromCoords = async (lat: number, lon: number,setError:any) => {

    try {
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        if (!res.ok) 
          throw new Error("API error");
        const data = await res.json();
        return {
            city: data.city || data.locality,
            state: data.principalSubdivision,
            country: data.countryName,
        }
        }

      catch{
      setError("Connection error. Please try again.");

    }
};
