import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fakeHCMCKLocations, LocationData } from '../../services/data';
import { vh, vw } from '../../services/styleProps';
import { backIcon } from '../../assets/svgIcon';

const NearbySheltersScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: LocationData }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.itemAddress}>{item.address}</Text>
        <Text style={styles.itemDistance}>{item.distance}</Text>
      </View>
      <Text style={styles.itemType}>{item.type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          {backIcon(vw(6), vw(6))}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nơi sơ tán gần bạn</Text>
      </View>
      <FlatList
        data={fakeHCMCKLocations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(4),
    paddingTop: vh(6), // Adjust as needed for status bar
    paddingBottom: vh(2),
    backgroundColor: 'white',
    // Add shadow or border if needed
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: vw(1),
  },
  headerTitle: {
    fontSize: vw(5),
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: vw(3),
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vh(2),
    paddingHorizontal: vw(5),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemContent: {
    flex: 1,
  },
  itemAddress: {
    fontSize: vw(4),
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: vh(0.5),
  },
  itemDistance: {
    fontSize: vw(3.5),
    color: '#7F8C8D',
  },
  itemType: {
    fontSize: vw(3.8),
    color: '#34495E',
    marginLeft: vw(3),
  },
});

export default NearbySheltersScreen;
