/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {vw, vh} from '../../services/styleProps';
import {fakeCautionsData} from '../../services/data'; // Import fakeCautionsData
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomStatusBar from '../../components/CustomStatusBar';

type MustDoItem = {
  title: string;
  description: string;
};

// Define the type for the route params
type ParamList = {
  MustDo: {
    // Changed from MustDoDetail to MustDo to match navigation
    id: string; // Expect an id
  };
};

// Update the route prop type
type MustDoScreenRouteProp = RouteProp<ParamList, 'MustDo'>;

const MustDoScreen = () => {
  const route = useRoute<MustDoScreenRouteProp>();
  const {id} = route.params; // Get id from route params

  // Find the caution data by id
  const cautionData = fakeCautionsData.find(caution => caution.id === id);

  // Placeholder for mustDo data and title - adapt as per your actual data structure
  const mustDoItems: MustDoItem[] = cautionData?.mustDo || [];
  const originalTitle = cautionData?.detailsTitle || 'Kỹ năng ứng phó';
  const screenTitle = `10 việc cần làm khi ${originalTitle}`;

  if (!cautionData) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Không tìm thấy dữ liệu</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomStatusBar backgroundColor="white" barStyle={'dark-content'} />
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>{screenTitle}</Text>
        {mustDoItems.length > 0 ? (
          mustDoItems.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Text style={styles.checkbox}>[ ] </Text>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          ))
        ) : (
          <Text style={[styles.itemDescription, styles.noItemsText]}>
            Không có kỹ năng ứng phó nào được ghi nhận cho cảnh báo này.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: vw(5),
    backgroundColor: '#FFFFFF', // Changed background to white
  },
  headerTitle: {
    fontSize: vw(6),
    fontWeight: 'bold',
    color: '#1F2D54', // Changed text color for white background
    textAlign: 'center',
    marginBottom: vh(3),
  },
  itemContainer: {
    marginBottom: vh(2.5),
    padding: vw(4),
    backgroundColor: '#F0F0F0', // Light gray background for items for contrast
    borderRadius: vw(2),
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1),
  },
  checkbox: {
    fontSize: vw(4.5),
    color: '#1F2D54', // Changed text color
    marginRight: vw(2),
  },
  itemTitle: {
    fontSize: vw(4.5),
    fontWeight: 'bold',
    color: '#1F2D54', // Changed text color
    flexShrink: 1, // Allow title to wrap if long
  },
  itemDescription: {
    fontSize: vw(3.8),
    color: '#333333', // Changed text color
    lineHeight: vh(3),
  },
  noItemsText: {
    textAlign: 'center', // Keep centered for this specific text
    color: '#555555', // Slightly different color for emphasis
  },
});

export default MustDoScreen;
