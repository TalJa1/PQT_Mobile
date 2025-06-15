import {ScrollView, StyleSheet, RefreshControl} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomStatusBar from '../../components/CustomStatusBar';
import WeatherDisplay from '../../components/bottomtabs/WeatherDisplay';
import WeatherTabView from '../../components/predict/WeatherTabView';

const Predict = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    // Force components to remount by changing key
    setRefreshKey(prevKey => prevKey + 1);

    // Simulate refresh delay for better UX
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar barStyle="light-content" backgroundColor={'#56707d'} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FFFFFF']} // Android - white spinner
            tintColor="#FFFFFF" // iOS - white spinner
            title="Đang tải lại..." // iOS
            titleColor="#FFFFFF" // iOS - white text
          />
        }>
        <WeatherDisplay
          key={`weather-${refreshKey}`}
          textColor="#FFFFFF"
          backgroundColor="opacity"
        />
        <WeatherTabView key={`weather-tab-${refreshKey}`} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Predict;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56707d',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
});
