import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomStatusBar from '../../components/CustomStatusBar';

const Report = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView>
        <View>
          <Text>Report</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
