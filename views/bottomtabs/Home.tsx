import {
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WeatherDisplay from '../../components/bottomtabs/WeatherDisplay';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#C9E5FF'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <WeatherDisplay textColor="#1F2D54" />
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
  },
});
