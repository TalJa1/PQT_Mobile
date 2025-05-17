import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WeatherDisplay from '../../components/bottomtabs/WeatherDisplay';
import AdditionalInfo from '../../components/home/AdditionalInfo';
import {vh} from '../../services/styleProps';
import CustomStatusBar from '../../components/CustomStatusBar';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar barStyle="dark-content" backgroundColor={'#C9E5FF'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <WeatherDisplay textColor="#1F2D54" backgroundColor="#C9E5FF" />
        <AdditionalInfo />
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
