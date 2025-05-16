import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {vw, vh} from '../../services/styleProps'; // Adjust path as necessary

interface WeatherDisplayProps {
  textColor: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({textColor}) => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const displayDate = `Ngày ${day} tháng ${month} năm ${year}`;

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

  return (
    <View style={styles.upperSection}>
      <Text style={dynamicStyles.dateText}>{displayDate}</Text>

      <View style={styles.weatherSection}>
        <Image
          source={require('../../assets/home/homeImg.png')}
          style={styles.weatherIcon}
        />
        <View style={styles.temperatureContainer}>
          <Text style={dynamicStyles.temperatureText}>34°</Text>
          <Text style={dynamicStyles.weatherConditionText}>Mưa vài nơi</Text>
        </View>
      </View>

      <View style={styles.locationSection}>
        <Text style={dynamicStyles.locationIcon}>📍</Text>
        <Text style={dynamicStyles.locationText}>Tân Lập, Đồng Tháp</Text>
      </View>

      <View style={styles.detailsSection}>
        <View style={styles.detailItem}>
          <Text style={dynamicStyles.detailLabel}>THỜI GIAN</Text>
          <Text style={dynamicStyles.detailValue}>11:25</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={dynamicStyles.detailLabel}>GIÓ</Text>
          <Text style={dynamicStyles.detailValue}>15km/h</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={dynamicStyles.detailLabel}>% MƯA</Text>
          <Text style={dynamicStyles.detailValue}>10%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={dynamicStyles.detailLabel}>ĐỘ ẨM</Text>
          <Text style={dynamicStyles.detailValue}>58%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  upperSection: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#C9E5FF',
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
    height: vw(30),
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
