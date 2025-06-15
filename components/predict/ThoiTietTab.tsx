/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {vw, vh} from '../../services/styleProps';
import weatherService, {ForecastData} from '../../services/weatherService';
import locationService from '../../services/locationService';

const getWeatherIcon = (conditionText: string, _iconUrl: string) => {
  const condition = conditionText.toLowerCase();

  if (
    condition.includes('rain') ||
    condition.includes('drizzle') ||
    condition.includes('shower')
  ) {
    return 'rain';
  }
  if (
    condition.includes('snow') ||
    condition.includes('sleet') ||
    condition.includes('blizzard')
  ) {
    return 'cloud';
  }
  if (
    condition.includes('cloud') ||
    condition.includes('overcast') ||
    condition.includes('mist') ||
    condition.includes('fog')
  ) {
    if (condition.includes('partly') || condition.includes('few')) {
      return 'sun_cloud';
    }
    return 'cloud';
  }
  if (condition.includes('thunder') || condition.includes('storm')) {
    return 'sun';
  }
  // Default to sun for clear/sunny conditions
  return 'sun';
};

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

const iconMap: {[key: string]: any} = {
  sun: require('../../assets/predict/sunAndThunder.png'),
  cloudy_rain: require('../../assets/predict/sunAndRain.png'),
  sun_cloud: require('../../assets/predict/sunAndCloud.png'),
  cloud: require('../../assets/predict/snow.png'),
  rain: require('../../assets/predict/rain.png'),
};

const ThoiTietTab = () => {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current location
      const location = await locationService.getCurrentPosition();
      console.log('User location:', location);

      // Fetch 7-day forecast with hourly data
      const forecast = await weatherService.getWeatherForecast(
        location.latitude,
        location.longitude,
        7,
      );

      console.log('Forecast data received:', {
        location: forecast.location,
        totalDays: forecast.forecast.forecastday.length,
        firstDay: forecast.forecast.forecastday[0],
        hourlyDataLength: forecast.forecast.forecastday[0]?.hour?.length,
      });

      if (!forecast || !forecast.forecast || !forecast.forecast.forecastday) {
        throw new Error('Invalid forecast data structure received from API');
      }

      if (forecast.forecast.forecastday.length === 0) {
        throw new Error('No forecast days available from API');
      }

      if (
        !forecast.forecast.forecastday[0].hour ||
        forecast.forecast.forecastday[0].hour.length === 0
      ) {
        console.warn('No hourly data available for today');
      }

      setForecastData(forecast);
    } catch (err: any) {
      console.error('Error fetching weather data:', err);

      if (
        err.message?.includes('Network Error') ||
        err.code === 'NETWORK_ERROR'
      ) {
        setError('Không có kết nối mạng. Vui lòng kiểm tra internet.');
      } else if (err.response?.status === 401) {
        setError('API key không hợp lệ. Vui lòng liên hệ nhà phát triển.');
      } else if (err.response?.status === 403) {
        setError('Đã vượt quá giới hạn API. Vui lòng thử lại sau.');
      } else if (err.message?.includes('location')) {
        setError('Không thể lấy vị trí. Vui lòng cấp quyền truy cập vị trí.');
      } else {
        setError('Không thể tải dữ liệu thời tiết. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleRefresh = () => {
    fetchWeatherData();
  };
  const generateHourlyData = () => {
    if (!forecastData?.forecast?.forecastday?.[0]?.hour) {
      console.log('No hourly forecast data available');
      return [];
    }

    const todayHours = forecastData.forecast.forecastday[0].hour;
    const now = new Date();
    const currentHour = now.getHours();

    console.log('Processing hourly data:', {
      totalHours: todayHours.length,
      currentHour: currentHour,
      sampleHour: todayHours[0],
    });

    return todayHours.map((hourData, index) => {
      const isCurrentHour = index === currentHour;
      const displayTime = isCurrentHour
        ? 'Bây giờ'
        : `${index.toString().padStart(2, '0')}:00`;

      return {
        time: displayTime,
        hour: index,
        isCurrent: isCurrentHour,
        icon: getWeatherIcon(
          hourData.condition?.text || 'clear',
          hourData.condition?.icon || '',
        ),
        temp: `${Math.round(hourData.temp_c || 0)}°`,
        rain: `${hourData.chance_of_rain || 0}%`,
      };
    });
  };
  const generateDailyData = () => {
    if (!forecastData?.forecast?.forecastday) {
      console.log('No forecast data available for daily data');
      return [];
    }

    console.log(
      'Generating daily data for',
      forecastData.forecast.forecastday.length,
      'days',
    );

    return forecastData.forecast.forecastday.map((dayData, index) => {
      const date = new Date(dayData.date);
      const dayName = index === 0 ? 'Hôm nay' : getDayOfWeekVietnamese(date);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;

      // Ensure all required properties exist with fallbacks
      return {
        day: `${dayName}, ${formattedDate}`,
        icon: getWeatherIcon(
          dayData.day?.condition?.text || 'clear',
          dayData.day?.condition?.icon || '',
        ),
        temp: `${Math.round(dayData.day?.maxtemp_c || 0)}°`,
        minTemp: `${Math.round(dayData.day?.mintemp_c || 0)}°`,
        condition: dayData.day?.condition?.text || 'Không có dữ liệu',
        rainChance: `${dayData.day?.daily_chance_of_rain || 0}%`,
      };
    });
  };

  const hourlyData = generateHourlyData();
  const dailyData = generateDailyData();

  useEffect(() => {
    if (hourlyData.length > 0) {
      setTimeout(() => {
        const nowIndex = hourlyData.findIndex(item => item.isCurrent);
        if (nowIndex !== -1 && scrollViewRef.current) {
          const itemWidth = vw(20) + vw(3);
          const screenCenterOffset = vw(50) - itemWidth / 2;
          let scrollToX = nowIndex * itemWidth - screenCenterOffset;
          scrollToX = Math.max(0, scrollToX);
          scrollViewRef.current.scrollTo({x: scrollToX, animated: true});
        }
      }, 100);
    }
  }, [hourlyData]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="white" />
        <Text
          style={[
            styles.sectionTitle,
            {textAlign: 'center', marginTop: vh(2)},
          ]}>
          Đang tải dữ liệu thời tiết...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text
          style={[
            styles.sectionTitle,
            {textAlign: 'center', color: '#ff6b6b'},
          ]}>
          {error}
        </Text>{' '}
        <Text
          style={[
            styles.sectionTitle,
            {textAlign: 'center', marginTop: vh(2), fontSize: vw(3.5)},
          ]}
          onPress={handleRefresh}>
          Nhấn để thử lại
        </Text>
      </View>
    );
  }

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
                item.isCurrent && styles.currentHourText,
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
                <View style={styles.dailyTempContainer}>
                  <Text style={styles.dailyTemp}>{item.temp}</Text>
                  <Text style={styles.dailyMinTemp}>{item.minTemp}</Text>
                </View>
                <View style={styles.dailyInfoContainer}>
                  <Text style={styles.dailyDay}>{item.day}</Text>
                  <Text style={styles.dailyRainChance}>{item.rainChance}</Text>
                </View>
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'rgba(169, 211, 255, 0.6)', // Changed to semi-transparent
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    height: '100%',
    borderColor: '#1F2D54',
    borderRadius: 100,
    paddingHorizontal: vw(4),
  },
  dailyTempContainer: {
    alignItems: 'center',
  },
  dailyTemp: {
    fontSize: vw(5),
    fontWeight: 'bold',
    color: '#1F2D54',
  },
  dailyMinTemp: {
    fontSize: vw(3.5),
    color: '#1F2D54',
    opacity: 0.7,
  },
  dailyInfoContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dailyDay: {
    fontSize: vw(4),
    color: '#1F2D54',
    textAlign: 'right',
  },
  dailyRainChance: {
    fontSize: vw(3.5),
    color: '#1F2D54',
    opacity: 0.7,
    textAlign: 'right',
  },
  debugInfoContainer: {
    padding: vw(4),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: vw(5),
    margin: vw(2),
  },
  debugInfoText: {
    fontSize: vw(3.5),
    color: '#333',
  },
});

export default ThoiTietTab;
