import { RootState } from '@/store/store';
import { styles } from '@/styles/styles';
import { FontAwesome } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Pressable, Keyboard, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { BackHandler } from 'react-native';
import { updateCachedLocation } from '@/store/locationReducer';
import { OPENWEATHER_API_KEY, TOMORROW_API_KEY } from './_layout';
import Toast from 'react-native-toast-message';


const LocationScreen = () => {
  
  const router = useRouter();
  const currentPathname = usePathname(); // Get the current route
  const { isDarkMode, colors } = useSelector((state: RootState) => state.theme);
  
  const cachedLocation = useSelector((state: RootState) => state.location.cachedLocation),
        currentCity = cachedLocation.city,
        dispatch= useDispatch();
       
        
        

  const [city, setCity] = useState(''),
        [error, setError] = useState(''),
        [loading, setLoading] = useState(false),
        [disableBtn, setDisableBtn] = useState(false),
        inputRef = useRef(null);

  const handleGoHome = () =>{
    router.push("/home")
  }

  const handleConfirmCity = async () => {
    if (city.trim() === '') {
      setError('City Name is required');
      setDisableBtn(false)
      setLoading(false)
      return;
    }
    
    setError('');
    try {
      setLoading(true);
      setDisableBtn(true);
      // Step 1: Geocoding API to check if the city exists
      const geocodeUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`;
      const geocodeResponse = await fetch(geocodeUrl);
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.cod !== 200) {
        setError('City not found');
        setDisableBtn(false)
        setLoading(false)
        return;
      }

      // Step 2: Extract city coordinates and use Tomorrow API for the forecast
      const { lat, lon } = geocodeData.coord;

      const weatherUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=${TOMORROW_API_KEY}`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      // Step 3: Update Redux store with the new city and weather data
      

      if(dispatch(
        updateCachedLocation({
          latitude: lat,
          longitude: lon,
          city: city,
          weather: weatherData,
        })
      )){
        setDisableBtn(false)
        setLoading(false)
        
        // Toast.show({
        //   type: 'success',
        //   text1: 'Success',
        //   text2: 'City updated successfully!',
        //   position: 'top',
        //   visibilityTime: 3000,
        // });
         ToastAndroid.show("City updated successfully!", ToastAndroid.SHORT);

        router.replace("/home")
        // console.log("City and weather data updated in Redux store");
      }
     

    } catch (error) {
      console.error("Error fetching city data:", error);
      setError('Error fetching data, please try again later.');
      setDisableBtn(false)
      setLoading(false)
    }
  };

  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.main, {backgroundColor: colors.primarybg}]}>
        <View style={styles.container} >
          <TouchableOpacity onPress={handleGoHome} style={styles.opacity_backbtn} >
              <Text style={styles.back_btn}><FontAwesome name="arrow-left" size={20}/></Text>
          </TouchableOpacity>

          <View style={styles.city_part}>
            <Text style={styles.city_name}>{currentCity}</Text>
           
          </View>

          <View style={styles.text_part}>
            <TextInput 
              ref={inputRef}
              inputMode='text' 
              placeholder='Enter City...' 
              style={error ? styles.input_error : styles.city_input}
              keyboardType='default'
              value={city}
              onChangeText={(text) => setCity(text)}
              onFocus={() => setError('')} // Clear error on focus
          

            />
            {error ? 
              <Text style={[styles.error_txt, {color: colors.errorColor}]}>{error}</Text>
              :
              null
            }

            <TouchableOpacity style={styles.opacity_btn} onPress={handleConfirmCity}>
              <Text style={styles.btn}>{loading ? "Please wait..." : "Confirm City"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default LocationScreen;