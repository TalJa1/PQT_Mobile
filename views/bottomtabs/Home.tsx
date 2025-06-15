import {ScrollView, StyleSheet, RefreshControl} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WeatherDisplay from '../../components/bottomtabs/WeatherDisplay';
import AdditionalInfo from '../../components/home/AdditionalInfo';
import {vh} from '../../services/styleProps';
import CustomStatusBar from '../../components/CustomStatusBar';

const Home = () => {
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
      <CustomStatusBar barStyle="dark-content" backgroundColor={'#C9E5FF'} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#1F2D54']} // Android
            tintColor="#1F2D54" // iOS
            title="Đang tải lại..." // iOS
            titleColor="#1F2D54" // iOS
          />
        }>
        <WeatherDisplay
          key={`weather-${refreshKey}`}
          textColor="#1F2D54"
          backgroundColor="#C9E5FF"
        />
        <AdditionalInfo key={`additional-${refreshKey}`} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: vh(10),
  },
});
