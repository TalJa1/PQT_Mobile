import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {vh} from '../../services/styleProps';
import CustomStatusBar from '../../components/CustomStatusBar';
import WeatherDisplay from '../../components/bottomtabs/WeatherDisplay';

const Predict = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar barStyle="light-content" backgroundColor={'#56707d'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <WeatherDisplay textColor="#FFFFFF" backgroundColor="opacity" />
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
    paddingBottom: vh(10),
  },
});
