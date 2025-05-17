/* eslint-disable react-native/no-inline-styles */
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

const getDayOfWeekVietnamese = (date: Date) => {
  const days = [
    'Chủ Nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];
  return days[date.getDay()];
};

const generateDailyData = () => {
  const data = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayName = i === 0 ? 'Hôm nay' : getDayOfWeekVietnamese(date);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;

    data.push({
      day: `${dayName}, ${formattedDate}`,
      // Keep existing icon and temp logic, or replace with dynamic data if available
      icon:
        i % 4 === 0
          ? 'cloudy_rain'
          : i % 3 === 0
          ? 'sun_cloud'
          : i % 5 === 0
          ? 'rain'
          : 'cloud', // Example icon logic
      temp: `${20 + Math.floor(Math.random() * 5)}°`, // Example temp logic
    });
  }
  return data;
};

const dailyData = generateDailyData();

const iconMap: {[key: string]: any} = {
  sun: require('../../assets/predict/sunAndThunder.png'),
  cloudy_rain: require('../../assets/predict/sunAndRain.png'),
  sun_cloud: require('../../assets/predict/sunAndCloud.png'),
  cloud: require('../../assets/predict/snow.png'),
  rain: require('../../assets/predict/rain.png'),
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

      <View style={styles.next7daysContainer}>
        <Text style={[styles.sectionTitle, {color: '#1F2D54'}]}>
          7 ngày tới
        </Text>
        <View>
          {dailyData.map((item, index) => (
            <View key={index} style={styles.dailyItem}>
              <View style={styles.weatherIconLargeCircle}>
                <Image
                  source={iconMap[item.icon]}
                  style={styles.weatherIconLarge}
                />
              </View>
              <View style={{width: vw(5)}} />
              <View style={styles.dailyTextContainer}>
                <Text style={styles.dailyTemp}>{item.temp}</Text>
                <Text style={styles.dailyDay}>{item.day}</Text>
              </View>
            </View>
          ))}
        </View>
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
  next7daysContainer: {
    backgroundColor: '#A9D3FF',
    borderRadius: vw(5),
    marginHorizontal: vw(2),
    padding: vw(2),
  },
  dailyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(5),
    paddingVertical: vh(1.5),
  },
  weatherIconLargeCircle: {
    backgroundColor: '#1F2D54',
    borderRadius: vw(20),
    padding: vw(2),
  },
  weatherIconLarge: {
    width: vw(12),
    height: vw(12),
  },
  dailyTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    height: '100%',
    borderColor: '#1F2D54',
    borderRadius: 100,
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
