import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {vw, vh} from '../../services/styleProps';

const generateHourlyData = () => {
  const data = [];
  const now = new Date();
  const currentActualHour = now.getHours();

  for (let h = 0; h < 24; h++) {
    const isCurrentHour = h === currentActualHour;
    const displayTime = isCurrentHour
      ? 'Bây giờ'
      : `${h.toString().padStart(2, '0')}:00`;
    data.push({
      time: displayTime,
      hour: h, // Store actual hour for logic
      isCurrent: isCurrentHour, // Flag for current hour
      icon: 'sun', // Placeholder, replace with actual logic based on hour h
      temp: `${18 + Math.floor(Math.random() * 5)}°`, // Random temp for example
      rain: `${Math.floor(Math.random() * 50)}%`, // Random rain % for example
    });
  }
  return data;
};

const hourlyData = generateHourlyData();

const dailyData = [
  {day: 'Ngày mai, 16/5', icon: 'cloudy_rain', temp: '22°'},
  {day: 'Thứ 3, 17/5', icon: 'sun_cloud', temp: '22°'},
  {day: 'Thứ 4, 18/5', icon: 'sun_cloud', temp: '22°'},
  {day: 'Thứ 5, 18/5', icon: 'cloud', temp: '22°'},
  {day: 'Thứ 5, 18/5', icon: 'cloud', temp: '22°'},
  {day: 'Thứ 5, 18/5', icon: 'cloud', temp: '22°'},
  {day: 'Thứ 5, 18/5', icon: 'cloud', temp: '22°'},
];

const iconMap: {[key: string]: any} = {
  sun: require('../../assets/predict/sunAndThunder.png'),
  cloudy_rain: require('../../assets/predict/sunAndRain.png'),
  sun_cloud: require('../../assets/predict/sunAndCloud.png'),
  cloud: require('../../assets/predict/snow.png'),
};

const ThoiTietTab = () => {
  const scrollViewRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    setTimeout(() => {
      const nowIndex = hourlyData.findIndex(item => item.isCurrent);
      if (nowIndex !== -1 && scrollViewRef.current) {
        const itemWidth = vw(20) + vw(3);
        const screenCenterOffset = vw(50) - itemWidth / 2;
        let scrollToX = nowIndex * itemWidth - screenCenterOffset;
        scrollToX = Math.max(0, scrollToX); // Ensure not scrolling to negative
        scrollViewRef.current.scrollTo({x: scrollToX, animated: true});
      }
    }, 100);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Hôm nay</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hourlyForecastContainer}>
        {hourlyData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.hourlyItem,
              item.isCurrent && styles.currentHourItem, // Use isCurrent flag
            ]}>
            <Text
              style={[
                styles.hourlyTime,
                item.isCurrent && styles.currentHourText, // Use isCurrent flag
              ]}>
              {item.time}
            </Text>
            <Image
              source={iconMap[item.icon]}
              style={styles.weatherIconSmall}
            />
            <Text
              style={[
                styles.hourlyRain,
                item.isCurrent && styles.currentHourText, // Use isCurrent flag
              ]}>
              {item.rain}
            </Text>
            <Text
              style={[
                styles.hourlyTemp,
                item.isCurrent && styles.currentHourText, // Use isCurrent flag
              ]}>
              {item.temp}
            </Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>7 ngày tới</Text>
      <View style={styles.dailyForecastContainer}>
        {dailyData.map((item, index) => (
          <View key={index} style={styles.dailyItem}>
            <Image
              source={iconMap[item.icon]}
              style={styles.weatherIconLarge}
            />
            <View style={styles.dailyTextContainer}>
              <Text style={styles.dailyTemp}>{item.temp}</Text>
              <Text style={styles.dailyDay}>{item.day}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: vw(4.5),
    fontWeight: 'bold',
    color: 'white',
    marginLeft: vw(2),
    marginBottom: vh(1),
  },
  hourlyForecastContainer: {
    flexDirection: 'row',
    paddingVertical: vh(1),
    marginBottom: vh(2),
  },
  hourlyItem: {
    backgroundColor: '#A9D3FF',
    borderRadius: vw(15),
    padding: vw(3),
    alignItems: 'center',
    marginHorizontal: vw(1.5),
    width: vw(20),
  },
  currentHourItem: {
    backgroundColor: '#87CEFA',
  },
  hourlyTime: {
    fontSize: vw(3.5),
    color: '#1F2D54',
    marginBottom: vh(0.5),
  },
  currentHourText: {
    color: '#FFFFFF',
  },
  weatherIconSmall: {
    width: vw(8),
    height: vw(8),
    marginVertical: vh(0.5),
  },
  hourlyRain: {
    fontSize: vw(3.5),
    color: '#1F2D54',
  },
  hourlyTemp: {
    fontSize: vw(4),
    fontWeight: 'bold',
    color: '#1F2D54',
    marginTop: vh(0.5),
  },
  dailyForecastContainer: {
    // backgroundColor: '#FFFFFF', // White background for the 7-day forecast area
    // borderRadius: vw(5),
    // padding: vw(3),
  },
  dailyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C9E5FF', // Light blue for each daily item background
    borderRadius: vw(20),
    paddingHorizontal: vw(5),
    paddingVertical: vh(1.5),
    marginBottom: vh(1),
  },
  weatherIconLarge: {
    width: vw(12),
    height: vw(12),
    marginRight: vw(4),
    backgroundColor: '#1F2D54', // Dark blue circle background for icon
    borderRadius: vw(6),
  },
  dailyTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dailyTemp: {
    fontSize: vw(5),
    fontWeight: 'bold',
    color: '#1F2D54',
  },
  dailyDay: {
    fontSize: vw(4),
    color: '#1F2D54',
  },
});

export default ThoiTietTab;
