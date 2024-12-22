import React, { useEffect, useState } from 'react';
import { styles } from '@/styles/styles';
import { ScrollView, View, Text, Image, TouchableHighlight, SafeAreaView, TouchableOpacity, ToastAndroid } from 'react-native';
import { useRouter } from 'expo-router';
import {LinearGradient} from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';

import { rootColors } from '@/styles/styles';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

import * as Location from "expo-location";
import { setLocation } from '@/store/reducer';
import { updateCachedLocation } from "@/store/locationReducer";
import { useDispatch } from 'react-redux';

import { getCityAndWeather } from '@/api';
import { OPENWEATHER_API_KEY, TOMORROW_API_KEY } from './_layout';

const WelcomeScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isDarkMode, colors } = useSelector((state: RootState) => state.theme);
  const cachedLocation = useSelector((state: RootState) => state.location.cachedLocation);

  const [loading, setLoading] = useState(false),
        [disableBtn, setDisableBtn] = useState(false);

  const handleGetStarted = async () => {
    setLoading(true);
    setDisableBtn(true);
    console.log("Cached Location:", cachedLocation);
  
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
  
      // If permission is denied, fallback to cachedLocation if available
      if (status !== 'granted') {
        console.log("Permission Denied");
  
        if (cachedLocation) {
          console.log("Using cached location:", cachedLocation);
          router.replace("/home");
          setLoading(false);
          setDisableBtn(false);
          return;
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: 'Unable to fetch location. No cached data available.',
            position: 'top',
            visibilityTime: 3000,
          });
          // ToastAndroid.show("Unable to fetch location. No cached data available.", ToastAndroid.LONG);
          setLoading(false);
          setDisableBtn(false);
          return;
        }
      }
  
      // Get the current location
      const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      
  
      const { latitude, longitude } = currentLocation.coords;
      
      if(latitude&&longitude === cachedLocation.latitude&&cachedLocation.longitude){
        console.log("Using cached location:", cachedLocation);
          router.replace("/home");
          setLoading(false);
          setDisableBtn(false);
          return;
      }
      // OpenWeatherMap Reverse Geocoding
      const reverseGeocodeUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${OPENWEATHER_API_KEY}`;
      const reverseResponse = await fetch(reverseGeocodeUrl);
      const reverseData = await reverseResponse.json();
  
      if (!reverseData || reverseData.length === 0) {
        console.log("City not found. Using cached location if available.");
        if (cachedLocation) {
          console.log("Using cached location:", cachedLocation);
          router.replace("/home");
          setLoading(false);
          setDisableBtn(false);
          return;
        }

        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: 'Unable to fetch city details. No cached data available.',
          position: 'top',
          visibilityTime: 3000,
        });
        // ToastAndroid.show("Unable to fetch city details. No cached data available.", ToastAndroid.LONG);
        setLoading(false);
        setDisableBtn(false);
        return;
      }
  
      const cityName = reverseData[0].name;
      

      // Tomorrow.io Weather Data
      const tomorrowUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&apikey=${TOMORROW_API_KEY}`;
      const weatherResponse = await fetch(tomorrowUrl);
      const weatherData = await weatherResponse.json();
  
      if (weatherData) {
        dispatch(
          updateCachedLocation({
            latitude,
            longitude,
            city: cityName,
            weather: weatherData,
          })
        );
        console.log("Location and weather cached in store");
        router.replace("/home");
      } else {
        console.log("Weather data not found. Using cached location if available.");
        if (cachedLocation) {
          console.log("Using cached location:", cachedLocation);
          router.replace("/home");
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: 'Unable to fetch weather data. No cached data available.',
            position: 'top',
            visibilityTime: 3000,
          });
          // ToastAndroid.show("Unable to fetch weather data. No cached data available.", ToastAndroid.LONG);
        }
      }
  
      setLoading(false);
      setDisableBtn(false);
    } catch (error) {
      console.error(error);
  
      if (cachedLocation) {
        console.log("Using cached location due to an error:", cachedLocation);
        router.replace("/home");
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: 'Unable to fetch data. Kindly enable location and network for better experience.',
          position: 'top',
          visibilityTime: 5000,
        });
        // ToastAndroid.showWithGravity(
        //   "Unable to fetch data. Kindly enable location and network for better experience.",
        //   ToastAndroid.LONG,
        //   ToastAndroid.BOTTOM
        // );
      }
  
      setLoading(false);
      setDisableBtn(false);
    }
  };
  // useEffect(()=>{
  //   handleGetStarted();
  // },[loading])
  return (
    <SafeAreaView style={[styles.main, {backgroundColor: colors.primarybg}]}>
      <View style={styles.container}>
        <View style={styles.logo_part}>
          <Image source={require('@/assets/images/weatherIcon.png')} style={styles.logo_img}/>
        </View>

        <View style={styles.text_part}>
          <Text style={styles.welcome_title}>Sky<Text style={styles.span_title}>Safari</Text></Text>

          <TouchableOpacity onPress={handleGetStarted} disabled={disableBtn ? true : false}>
            <Text style={styles.btn}>{loading ? "Please wait..." : "Get Started"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}



export default WelcomeScreen;


