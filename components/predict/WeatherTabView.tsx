import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {vw, vh} from '../../services/styleProps';
import ThoiTietTab from './ThoiTietTab';
import CanhBaoTab from './CanhBaoTab';

const WeatherTabView = () => {
  const [activeTab, setActiveTab] = useState('THOI_TIET');

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'THOI_TIET' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('THOI_TIET')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'THOI_TIET' && styles.activeTabText,
            ]}>
            THỜI TIẾT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'CANH_BAO' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('CANH_BAO')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'CANH_BAO' && styles.activeTabText,
            ]}>
            Cảnh báo
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {activeTab === 'THOI_TIET' ? <ThoiTietTab /> : <CanhBaoTab />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2D54', // Dark blue background for the whole tab view area
    borderTopLeftRadius: vw(5),
    borderTopRightRadius: vw(5),
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: vw(5), // Add some horizontal padding for the tabs
    paddingTop: vh(2), // Add some top padding for the tabs
  },
  tabButton: {
    paddingBottom: vh(1.5),
    paddingHorizontal: vw(5),
    marginHorizontal: vw(1),
    borderBottomWidth: vw(1),
    borderBottomColor: 'transparent', // Default transparent border
  },
  activeTabButton: {
    borderBottomColor: '#FFFFFF', // White border bottom for active tab
  },
  tabText: {
    color: '#A9D3FF', // Lighter blue for inactive tab text
    fontWeight: 'bold',
    fontSize: vw(4),
    textAlign: 'center',
  },
  activeTabText: {
    color: '#FFFFFF', // White text for active tab
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#E0F0FF', // Light blue background for the content area
    borderTopLeftRadius: vw(5),
    borderTopRightRadius: vw(5),
    padding: vw(3),
    marginTop: vh(1), // Space between tabs and content
  },
});

export default WeatherTabView;
