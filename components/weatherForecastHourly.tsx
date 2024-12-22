import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { styles } from '@/styles/styles';

const WeatherForecastHourly = ({ weatherData }: { weatherData: any }) => {
  const renderForecastItem = ({ item }: { item: any }) => {
    const temperature = item?.values?.temperature ?? '--';
    const time = item?.time ? item.time.substring(11, 16) : '--';

    return (
      <View style={styles.w_box}>
        <Text style={styles.w_text}>{temperature}°C</Text>
        <Image
          source={require('@/assets/images/weatherIcon.png')}
          style={styles.w_icon}
        />
        <Text style={styles.w_text}>{time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.forecasts_2}>
      <FlatList
        data={weatherData?.timelines?.hourly?.slice(0, 24)} // Limit to 24 hours
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderForecastItem}
        horizontal={true} // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default WeatherForecastHourly;
