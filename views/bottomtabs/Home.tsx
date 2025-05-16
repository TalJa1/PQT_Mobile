import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {vw, vh} from '../../services/styleProps'; // Assuming styleProps.ts is in services folder

const Home = () => {
  const displayDate = 'Ngày 16 tháng 5 năm 2025'; // As per user request for specific date

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#C9E5FF'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.upperSection}>
          <Text style={styles.dateText}>{displayDate}</Text>

          <View style={styles.weatherSection}>
            <Image
              source={require('../../assets/home/homeImg.png')}
              style={styles.weatherIcon}
            />
            <View style={styles.temperatureContainer}>
              <Text style={styles.temperatureText}>34°</Text>
              <Text style={styles.weatherConditionText}>Mưa vài nơi</Text>
            </View>
          </View>

          <View style={styles.locationSection}>
            {/* Placeholder for location pin icon - you can replace with an actual icon component */}
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>Tân Lập, Đồng Tháp</Text>
          </View>

          <View style={styles.detailsSection}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>THỜI GIAN</Text>
              <Text style={styles.detailValue}>11:25</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>GIÓ</Text>
              <Text style={styles.detailValue}>15km/h</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>% MƯA</Text>
              <Text style={styles.detailValue}>10%</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>ĐỘ ẨM</Text>
              <Text style={styles.detailValue}>58%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Light blue background for the whole screen
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  upperSection: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#C9E5FF',
    paddingVertical: vh(4),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  dateText: {
    fontSize: vw(4.5),
    color: '#1F2D54', // Dark blue
    marginBottom: vh(3),
    fontWeight: '500',
  },
  weatherSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(3),
    width: '100%',
    justifyContent: 'space-around', // Adjust as needed
  },
  weatherIcon: {
    width: vw(35), // Adjust size as needed
    height: vw(30), // Adjust size as needed
    resizeMode: 'contain',
  },
  temperatureContainer: {
    alignItems: 'center',
  },
  temperatureText: {
    fontSize: vw(20), // Large temperature text
    fontWeight: 'bold',
    color: '#1F2D54', // Dark blue
  },
  weatherConditionText: {
    fontSize: vw(4),
    color: '#1F2D54', // Dark blue
    marginTop: vh(-1), // Adjust spacing
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(4),
  },
  locationIcon: {
    fontSize: vw(5),
    marginRight: vw(2),
  },
  locationText: {
    fontSize: vw(4.5),
    color: '#1F2D54', // Dark blue
    fontWeight: '600',
  },
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: vw(3.5),
    color: '#50647C', // Greyish blue
    marginBottom: vh(0.5),
  },
  detailValue: {
    fontSize: vw(4),
    color: '#1F2D54', // Dark blue
    fontWeight: 'bold',
  },
});
