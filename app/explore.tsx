import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { styles } from '@/styles/styles';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import WeatherForecastDaily from '@/components/weatherForecastDaily';

const ExploreScreen = () => {
  const router = useRouter();
  const { isDarkMode, colors } = useSelector((state: RootState) => state.theme);

  // Retrieve the weather data from Redux
  const cachedLocation = useSelector((state: RootState) => state.location.cachedLocation);
  const weatherData = cachedLocation?.weather;
  const city = cachedLocation?.city;

  // Extract weather details
  const maxTemp = weatherData?.timelines?.daily?.[0]?.values?.temperatureMax;
  const minTemp = weatherData?.timelines?.daily?.[0]?.values?.temperatureMin;
  const windSpeed = weatherData?.timelines?.daily?.[0]?.values?.windSpeedAvg || 'N/A'; 
  const sunrise = weatherData?.timelines?.daily?.[0]?.values?.sunriseTime || 'N/A';
  const sunset = weatherData?.timelines?.daily?.[0]?.values?.sunsetTime || 'N/A';
  const uvIndex = weatherData?.timelines?.daily?.[0]?.values?.uvIndexAvg || 'N/A';

  const getWindSpeedRiskLevel = (windSpeed: number) => {
    if (windSpeed <= 5) {
      return 'Calm (Low risk)';
    } else if (windSpeed >= 6 && windSpeed <= 20) {
      return 'Moderate risk';
    } else if (windSpeed >= 21 && windSpeed <= 39) {
      return 'High risk';
    } else if (windSpeed >= 40) {
      return 'Very high risk';
    } else {
      return 'Invalid Wind Speed';
    }
  };

  
  const getUvIndexRiskLevel = (uvIndex: number) => {
    if (uvIndex >= 0 && uvIndex <= 2) {
      return 'Low';
    } else if (uvIndex >= 3 && uvIndex <= 5) {
      return 'Moderate';
    } else if (uvIndex >= 6 && uvIndex <= 7) {
      return 'High';
    } else if (uvIndex >= 8 && uvIndex <= 10) {
      return 'Very High';
    } else if (uvIndex >= 11) {
      return 'Extreme';
    } else {
      return 'Invalid UV Index';
    }
  };

  
  
  const handleGoHome = () => {
    router.push('/home');
  };

  // console.log(weatherData?.timelines?.daily)
  return (
    <SafeAreaView style={[styles.main, { backgroundColor: colors.primarybg }]}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.opacity_backbtn} onPress={handleGoHome}>
          <Text style={styles.back_btn}>
            <FontAwesome name="arrow-left" size={20} />
          </Text>
        </TouchableOpacity>

        <View style={styles.forecast_city}>
          <Text style={styles.city_name_explore}>{city}</Text>
          <View style={styles.temp_part}>
            <Text style={styles.temp_max}>Max: {maxTemp ? `${maxTemp}°C` : '--'}</Text>
            <Text style={styles.temp_min}>Min: {minTemp ? `${minTemp}°C` : '--'}</Text>
          </View>
        </View>

        <View style={styles.days_forecast}>
          <Text style={styles.title_1}>7-Days Forecasts</Text>
          <WeatherForecastDaily weatherData={weatherData} />
        </View>

        <View style={styles.air_forecast}>
          <Text style={styles.title_2}>
            <FontAwesome name="crosshairs" size={10} /> WIND SPEED
          </Text>
          <Text style={styles.status_txt}>
          {windSpeed === 0 
            ? 'Data Unavailable' 
            : `${windSpeed} - ${getWindSpeedRiskLevel(windSpeed)}`}
        </Text>
        </View>

        <View style={styles.sun_forecast}>
          <View style={styles.sun_box}>
            <Text style={styles.title_2}>
              <FontAwesome name="sun-o" size={10} /> SUNRISE
            </Text>
            <Text style={styles.status_txt}>
              {sunrise !== 'N/A' ? new Date(sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}
            </Text>
            <Text style={styles.status_smalltxt}>
              Sunset: {sunset !== 'N/A' ? new Date(sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}
            </Text>
          </View>

          <View style={styles.sun_box}>
            <Text style={styles.title_2}>
              <FontAwesome name="sun-o" size={10} /> UV INDEX
            </Text>
            <Text style={styles.status_txt}>{uvIndex !== 'N/A' 
    ? `${uvIndex} - ${getUvIndexRiskLevel(uvIndex)}`
    : '--'}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;
