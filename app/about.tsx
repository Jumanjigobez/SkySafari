import { styles } from '@/styles/styles';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Switch  } from 'react-native';

import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/store/reducer';

const AboutScreen = () => {
  const router = useRouter();

  const { isDarkMode, colors } = useSelector((state: RootState) => state.theme),
        dispatch = useDispatch();
  
  const handleGoHome = () =>{
    router.push("/setting")
  }
  
  const handleThemeSwitch = () =>{
    dispatch(toggleTheme())
    // console.log(isDarkMode)
  }
  return (
    <SafeAreaView style={[styles.main, {backgroundColor: colors.primarybg}]}>
      <View style={styles.container} >
        <TouchableOpacity onPress={handleGoHome} style={styles.opacity_backbtn} >
            <Text style={styles.back_btn}><FontAwesome name="arrow-left" size={20}/></Text>
        </TouchableOpacity>
        
        <View style={styles.about_container}>
          <Text style={styles.about_title}>SkySafari</Text>
          <Text style={styles.about_info}>
          SkySafari is a user-friendly weather forecast app designed to provide accurate and reliable updates on current and upcoming weather conditions. With its simple and intuitive interface, it offers detailed forecasts, temperature readings, precipitation chances, and other essential weather metrics, helping users plan their day effectively. SkySafari is perfect for anyone seeking a no-frills yet dependable weather companion.
          </Text>
        </View>

        <View style={styles.coder_part}>
          <Text style={styles.coder_txt}>Coded By <Link href="https://jumanjigobez.github.io/personal_portfolio" style={styles.link}>Jumanji</Link></Text>
        </View>
       
      </View>
    </SafeAreaView>
  )
}

export default AboutScreen;