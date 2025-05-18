/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomStatusBar from '../../components/CustomStatusBar';
import {fakeCautionsData} from '../../services/data';
import {saveIcon2} from '../../assets/svgIcon';
import {vw} from '../../services/styleProps';

const Abilities = () => {
  const [selectedTab, setSelectedTab] = useState(fakeCautionsData[0].type);

  const renderCards = () => {
    const allTypes = fakeCautionsData;
    const displayTypes = [];

    if (allTypes.length > 0) {
      for (let i = 0; i < 3; i++) {
        displayTypes.push(allTypes[i] || allTypes[0]);
      }
    } else {
      return null;
    }

    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalCardsContainer}>
        {displayTypes.map((typeItem, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>
                5 việc cần làm sau {typeItem.type}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.cardViews}>124 lưu</Text>
                <View style={styles.saveIconContainer}>
                  {saveIcon2(24, 24, '#000')}
                </View>
              </View>
            </View>
            <Image
              source={require('../../assets/abilities/bground.png')}
              style={styles.cardImage}
            />
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar backgroundColor="#C9E5FF" barStyle={'dark-content'} />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>KỸ NĂNG ỨNG PHÓ THIÊN TAI</Text>
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderTitle}>Dành cho bạn</Text>
        </View>
        {renderCards()}
        <View style={styles.tabsContainer}>
          {fakeCautionsData.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.tab,
                selectedTab === item.type && styles.selectedTab,
              ]}
              onPress={() => setSelectedTab(item.type)}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === item.type && styles.selectedTabText,
                ]}>
                {item.type.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Abilities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9E5FF',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  subHeader: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  subHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  horizontalCardsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 15,
    height: 120,
    overflow: 'hidden',
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    height: '100%',
    paddingLeft: vw(3),
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  cardViews: {
    fontSize: 12,
    color: '#777',
  },
  cardImage: {
    width: '40%',
    height: '100%',
    marginLeft: 10,
  },
  saveIconContainer: {},
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#C9E5FF',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#E0EFFF',
  },
  selectedTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  selectedTabText: {
    color: '#fff',
  },
});
