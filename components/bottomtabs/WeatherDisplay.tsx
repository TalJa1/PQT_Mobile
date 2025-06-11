import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {vw, vh} from '../../services/styleProps';
import weatherService, {WeatherData} from '../../services/weatherService';
import locationService from '../../services/locationService';

interface WeatherDisplayProps {
  textColor: string;
  backgroundColor: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  textColor,
  backgroundColor,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);  const fetchWeatherWithChoice = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Let user choose location
      const location = await locationService.getLocationWithChoice();
      console.log('Selected location:', location);

      // Fetch weather data
      const weather = await weatherService.getCurrentWeather(
        location.latitude,
        location.longitude,
      );

      setWeatherData(weather);
    } catch (err) {
      console.error('Error fetching weather with choice:', err);
      setError('Không thể tải dữ liệu thời tiết');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current location (with fallback for emulator)
      const location = await locationService.getCurrentPosition();
      console.log('Current location:', location);

      // Fetch weather data
      const weather = await weatherService.getCurrentWeather(
        location.latitude,
        location.longitude,
      );

      setWeatherData(weather);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Không thể tải dữ liệu thời tiết');
      Alert.alert(
        'Lỗi',
        'Không thể tải dữ liệu thời tiết. Thử chọn vị trí khác?',
        [
          {
            text: 'Chọn vị trí',
            onPress: fetchWeatherWithChoice,
          },
          {
            text: 'Thử lại',
            onPress: fetchWeatherData,
          },
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
      );
    } finally {
      setLoading(false);
    }
  }, [fetchWeatherWithChoice]);
  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const formatDate = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `Ngày ${day} tháng ${month} năm ${year}`;
  };

  const formatTime = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getLocationDisplay = () => {
    if (!weatherData?.location) {
      return 'Đang tải...';
    }
    const {name, region} = weatherData.location;
    return `${name}, ${region}`;
  };

  const dynamicStyles = StyleSheet.create({
    dateText: {
      fontSize: vw(4.5),
      color: textColor,
      marginBottom: vh(3),
      fontWeight: '500',
    },
    temperatureText: {
      fontSize: vw(20),
      fontWeight: 'bold',
      color: textColor,
    },
    weatherConditionText: {
      fontSize: vw(4),
      color: textColor,
      marginTop: vh(-1),
    },
    locationText: {
      fontSize: vw(4.5),
      color: textColor,
      fontWeight: '600',
    },
    detailLabel: {
      fontSize: vw(3.5),
      color: textColor,
      marginBottom: vh(0.5),
      opacity: 0.7,
    },
    detailValue: {
      fontSize: vw(4),
      color: textColor,
      fontWeight: 'bold',
    },
    locationIcon: {
      fontSize: vw(5),
      marginRight: vw(2),
      color: textColor,
    },
  });

  if (loading) {
    return (
      <View style={[styles.upperSection, {backgroundColor: backgroundColor}]}>
        <ActivityIndicator size="large" color={textColor} />
        <Text style={[dynamicStyles.dateText, {marginTop: vh(2)}]}>
          Đang tải dữ liệu thời tiết...
        </Text>
      </View>
    );
  }

  if (error && !weatherData) {
    return (
      <View style={[styles.upperSection, {backgroundColor: backgroundColor}]}>
        <Text style={dynamicStyles.dateText}>{formatDate()}</Text>
        <Text style={dynamicStyles.weatherConditionText}>{error}</Text>
        <Text
          style={[dynamicStyles.locationText, {marginTop: vh(2)}]}
          onPress={fetchWeatherData}>
          Nhấn để thử lại
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.upperSection, {backgroundColor: backgroundColor}]}>
      <Text style={dynamicStyles.dateText}>
        {formatDate(weatherData?.location.localtime)}
      </Text>

      <View style={styles.weatherSection}>
        <Image
          source={{
            uri: weatherData?.current.condition.icon
              ? `https:${weatherData.current.condition.icon}`
              : undefined,
          }}
          style={styles.weatherIcon}
          defaultSource={require('../../assets/home/homeImg.png')}
        />
        <View style={styles.temperatureContainer}>
          <Text style={dynamicStyles.temperatureText}>
            {weatherData?.current.temp_c
              ? Math.round(weatherData.current.temp_c)
              : '--'}
            °
          </Text>
          <Text style={dynamicStyles.weatherConditionText}>
            {weatherData?.current.condition.text || 'Đang tải...'}
          </Text>
        </View>
      </View>

      <View style={styles.locationSection}>
        <Text style={dynamicStyles.locationIcon}>📍</Text>
        <Text style={dynamicStyles.locationText}>{getLocationDisplay()}</Text>
      </View>

      <View style={styles.detailsSection}>
        <View style={styles.detailItem}>
          <Text style={dynamicStyles.detailLabel}>THỜI GIAN</Text>
          <Text style={dynamicStyles.detailValue}>
            {formatTime(weatherData?.location.localtime)}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={dynamicStyles.detailLabel}>GIÓ</Text>
          <Text style={dynamicStyles.detailValue}>
            {weatherData?.current.wind_kph
              ? Math.round(weatherData.current.wind_kph)
              : '--'}
            km/h
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={dynamicStyles.detailLabel}>MÂY</Text>
          <Text style={dynamicStyles.detailValue}>
            {weatherData?.current.cloud ?? '--'}%
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={dynamicStyles.detailLabel}>ĐỘ ẨM</Text>
          <Text style={dynamicStyles.detailValue}>
            {weatherData?.current.humidity ?? '--'}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  upperSection: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: vh(4),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  weatherSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(3),
    width: '100%',
    justifyContent: 'space-around',
  },
  weatherIcon: {
    width: vw(35),
    height: vw(35),
    resizeMode: 'contain',
  },
  temperatureContainer: {
    alignItems: 'center',
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(4),
  },
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  detailItem: {
    alignItems: 'center',
  },
});

export default WeatherDisplay;
