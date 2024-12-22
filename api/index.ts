import * as Location from 'expo-location';

import Constants from 'expo-constants';

import { setLocation } from '@/store/reducer';
import { useDispatch } from 'react-redux';

interface ExtraConfig {
    OPENWEATHER_API_KEY: string;
    TOMORROW_API_KEY: string;
}

const extra = Constants.expoConfig?.extra as ExtraConfig,
    { OPENWEATHER_API_KEY, TOMORROW_API_KEY } = extra;

export const getCityAndWeather = async () => {
 const dispatch = useDispatch();
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission Denied');
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = currentLocation.coords;

   

    // OpenWeatherMap Reverse Geocoding
    const reverseGeocodeUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${OPENWEATHER_API_KEY}`;
    const reverseResponse = await fetch(reverseGeocodeUrl);
    const reverseData = await reverseResponse.json();

    if (!reverseData || reverseData.length === 0) {
      console.log('City not found');
      return;
    }

    const cityName = reverseData[0].name;
    console.log('City:', cityName);

    // Tomorrow.io Weather Data
    const tomorrowUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&apikey=${TOMORROW_API_KEY}`;
    const weatherResponse = await fetch(tomorrowUrl);
    const weatherData = await weatherResponse.json();

    if (weatherData) {
      

    dispatch(
        setLocation({
            latitude,
            longitude,
            city: cityName,
            weather: weatherData,
        })
    )
    console.log("Location and weather cached in store");
    return {
      city: cityName,
      weather: weatherData,
    };
    } else {
      console.log('Weather data not found');
    }
  } catch (error) {
    console.error(error);
  }
};


