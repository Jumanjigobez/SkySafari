import { styles } from '@/styles/styles';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Switch  } from 'react-native';

import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/store/reducer';

const SettingScreen = () => {
  const router = useRouter();

  const { isDarkMode, colors } = useSelector((state: RootState) => state.theme),
        dispatch = useDispatch();
  
  const handleGoHome = () =>{
    router.push("/home")
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
        
        <View style={styles.setting_container}>
          <View style={styles.setting_box}>
            <Text style={styles.setting_txt}>Dark mode</Text>
            <TouchableOpacity><Switch value={isDarkMode} onValueChange={handleThemeSwitch} /></TouchableOpacity>
          </View>

          <View style={[styles.setting_box, styles.setting_box2]}>
            <Text style={styles.setting_txt}>About</Text>
            <TouchableOpacity onPress={()=>router.push("/about")}><FontAwesome name='angle-right' size={35} color={"white"}/></TouchableOpacity>
          </View>

          <View style={[styles.setting_box, styles.setting_box2]}>
            <Text style={styles.setting_txt}>Version</Text>
            <Text style={styles.v_text}>1.0</Text>
          </View>
        </View>

        <View style={styles.coder_part}>
          <Text style={styles.coder_txt}>Coded By <Link href="https://jumanjigobez.github.io/personal_portfolio" style={styles.link}>Jumanji</Link></Text>
        </View>
       
      </View>
    </SafeAreaView>
  )
}

export default SettingScreen;