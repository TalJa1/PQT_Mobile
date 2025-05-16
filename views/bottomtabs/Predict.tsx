import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {vh} from '../../services/styleProps';
import CustomStatusBar from '../../components/CustomStatusBar';

const Predict = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar barStyle="light-content" backgroundColor={'#56707d'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View>
          <Text>Predict</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Predict;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: vh(10),
  },
});
