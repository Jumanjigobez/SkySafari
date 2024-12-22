import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";

import Constants from 'expo-constants';
interface ExtraConfig {
  OPENWEATHER_API_KEY: string;
  TOMORROW_API_KEY: string;
}

export const extra = Constants.expoConfig?.extra as ExtraConfig,
  { OPENWEATHER_API_KEY, TOMORROW_API_KEY } = extra;

// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
 
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require('@/assets/fonts/Inter.ttf'),
    // OpenSansItalic: require('@/assets/fonts/OpenSans-Italic.ttf'),
    OpenSans: require('@/assets/fonts/OpenSans.ttf'),
  });

  
  useEffect(() => {
    if (loaded) {
      
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* <ThemeProvider value={DefaultTheme}> */}
          <Stack initialRouteName='index'>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="location" options={{ headerShown: false }} />
            <Stack.Screen name="explore" options={{ headerShown: false }} />
            <Stack.Screen name="setting" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ headerShown: false }} />
            
            
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default RootLayout;