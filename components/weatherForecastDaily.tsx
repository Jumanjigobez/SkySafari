import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { styles } from '@/styles/styles';

const WeatherForecastDaily = ({ weatherData }: { weatherData: any }) => {
  const renderForecastItem = ({ item }: { item: any }) => {
    const temperatureMax = item?.values?.temperatureMax ?? '--';
    const temperatureMin = item?.values?.temperatureMin ?? '--';
    const timestamp = item?.time;

    // Convert timestamp to a day of the week
    const day = timestamp
      ? new Date(timestamp).toLocaleDateString('en-US', { weekday: 'short' })
      : '--';

    return (
      <View style={styles.day_box}>
        <Text style={styles.w_text}>
          {temperatureMax}°C / {temperatureMin}°C
        </Text>
        <Image source={require('@/assets/images/weatherIcon.png')} style={styles.w_icon} />
        <Text style={styles.w_text}>{day}</Text>
      </View>
    );
  };
  
  return (
    <View style={styles.forecast_container}>
      <FlatList
        data={weatherData?.timelines?.daily?.slice(0, 7)} // Limit to 7 days
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderForecastItem}
        horizontal={true} // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default WeatherForecastDaily;
