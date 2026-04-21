
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
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        if (!res.ok) 
          throw new Error("API error");
        const data = await res.json();
        return data?.address; 
        }

      catch{
      setError("Connection error. Please try again.");

    }
};
