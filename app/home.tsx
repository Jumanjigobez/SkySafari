import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '@/styles/styles';
import { useRouter } from 'expo-router';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import WeatherForecastHourly from '@/components/weatherForecastHourly';
import { setLocation } from '@/store/reducer';
import * as Location from 'expo-location';
import { OPENWEATHER_API_KEY, TOMORROW_API_KEY } from './_layout';
import { updateCachedLocation } from '@/store/locationReducer';
import Toast from 'react-native-toast-message';

const HomeScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentTemp, setCurrentTemp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  // const [backPress, setBackPress] = useState({
  //   count: 0
  // });

  // Retrieve the cached location and weather data from Redux
  const cachedLocation = useSelector((state: RootState) => state.location.cachedLocation);
  const weatherData = cachedLocation?.weather;

  // Extract weather details
  const maxTemp = weatherData?.timelines?.daily?.[0]?.values?.temperatureMax;
  const minTemp = weatherData?.timelines?.daily?.[0]?.values?.temperatureMin;
  

  // Today's date logic
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const today = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

  

  const handleGoTo = (screen: string) => {
    switch (screen) {
      case 'location':
        router.push('/location');
        break;
      case 'setting':
        router.push('/setting');
        break;
      case 'explore':
        router.push('/explore');
        break;
    }
  };


  const handleRefresh = async () => {
      setLoading(true);
      setDisableBtn(true);
      
    
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
    
        // If permission is denied, fallback to cachedLocation if available
        if (status !== 'granted') {
          ToastAndroid.show("Permission Denied", ToastAndroid.SHORT);
    
          if (cachedLocation) {
            // console.log("Using cached location:", cachedLocation);
            // router.replace("/home");
            setLoading(false);
            setDisableBtn(false);
            return;
          } else {
            ToastAndroid.show("Unable to fetch location.", ToastAndroid.SHORT);
            // Toast.show({
            //   type: 'error',
            //   text1: 'Error!',
            //   text2: 'Unable to fetch location. No cached data available.',
            //   position: 'top',
            //   visibilityTime: 3000,
            // });
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
          // console.log("Using cached location:", cachedLocation);
          //   router.replace("/home");
            setLoading(false);
            setDisableBtn(false);
            return;
        }
        // OpenWeatherMap Reverse Geocoding
        const reverseGeocodeUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${OPENWEATHER_API_KEY}`;
        const reverseResponse = await fetch(reverseGeocodeUrl);
        const reverseData = await reverseResponse.json();
    
        if (!reverseData || reverseData.length === 0) {
          // console.log("City not found. Using cached location if available.");
          if (cachedLocation) {
            // console.log("Using cached location:", cachedLocation);
            // router.replace("/home");
            setLoading(false);
            setDisableBtn(false);
            return;
          }
          
          ToastAndroid.show("Unable to fetch city details.", ToastAndroid.SHORT)
          // Toast.show({
          //   type: 'error',
          //   text1: 'Error!',
          //   text2: 'Unable to fetch city details. No cached data available.',
          //   position: 'top',
          //   visibilityTime: 3000,
          // });
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
          // console.log("Location and weather cached in store");
          router.replace("/home");
        } 
    
        setLoading(false);
        setDisableBtn(false);
      } catch (error) {
        console.error(error);
    
       
          ToastAndroid.showWithGravity(
            "Unable to fetch data. Kindly enable location and network for better experience.",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
        }
    
        setLoading(false);
        setDisableBtn(false);
      }

  var backPress = 0;
  const backAction = () => {
      backPress += 1;

      console.log(backPress)
      if (backPress == 2) { // If back was pressed twice
        // Exit the app
        // console.log("exited")
        backPress = 0;
        BackHandler.exitApp();
      } else {
        
        ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
        
      }
  
      return true; // Prevent the default behavior (going back)
  };

  // Function to get the closest temperature to the current time
  useEffect(() => {
    if (weatherData?.timelines?.hourly) {
      const currentDateTime = new Date();
      let closestTemp = null;
      let smallestDiff = Infinity;

      weatherData.timelines.hourly.forEach((forecast: any) => {
        const forecastTime = new Date(forecast.time);
        const diff = Math.abs(currentDateTime.getTime() - forecastTime.getTime());

        if (diff < smallestDiff) {
          smallestDiff = diff;
          closestTemp = forecast?.values?.temperature;
        }
      });

      setCurrentTemp(closestTemp);
    }
  }, [weatherData]);

  useEffect(() => {
    
    const backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandlerListener.remove(); 
  }, [router]);

  return (
    <ImageBackground source={require('@/assets/images/bgImage.png')} style={styles.main}>
      <TouchableOpacity onPress={handleRefresh} style={styles.opacity_refreshbtn} disabled={disableBtn ? true:false}>
        <Text style={styles.btn3}>{loading ? "Refreshing" : <FontAwesome name='refresh' size={24}/> }</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        {/* Weather Status Part */}
        <View style={styles.status_part}>
          <Text style={styles.temp_title}>
            {currentTemp !== null ? `${currentTemp}` : '--'}
            <Text style
            
            ={styles.degree_span}>°C</Text>
          </Text>
          <Text style={styles.preci_status}>Probability</Text>
          <View style={styles.max_min}>
            <Text style={styles.temp_max}>Max: {maxTemp ? `${maxTemp}°C` : '--'}</Text>
            <Text style={styles.temp_min}>Min: {minTemp ? `${minTemp}°C` : '--'}</Text>
          </View>
        </View>

        {/* Forecasts */}
        <View style={styles.forecasts_part}>
          <View style={styles.forecasts_1}>
            <Text style={styles.forecast_txt}>Today</Text>
            <Text style={styles.forecast_txt}>{today}, {day}</Text>
          </View>

          <WeatherForecastHourly weatherData={weatherData}/>
        </View>

        {/* Bottom Tabs */}
        <View style={styles.tab_part}>
          <TouchableOpacity onPress={() => handleGoTo('location')}>
            <Text style={styles.tab_btn}>
              <FontAwesome name="map-marker" style={styles.tab_icon} size={20} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleGoTo('explore')} style={styles.opacity_btn2}>
            <Text style={styles.tab_btn2}>
              <FontAwesome name="plus" style={styles.tab_icon} size={20} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleGoTo('setting')}>
            <Text style={styles.tab_btn}>
              <FontAwesome name="gear" style={styles.tab_icon} size={20} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
