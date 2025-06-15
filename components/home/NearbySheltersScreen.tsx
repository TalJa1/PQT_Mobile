import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {fakeHCMCKLocations, LocationData} from '../../services/data';
import {vh, vw} from '../../services/styleProps';
import {backIcon} from '../../assets/svgIcon';
import locationService, {LocationCoords} from '../../services/locationService';

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

// Function to format distance
const formatDistance = (distanceKm: number): string => {
  if (distanceKm < 1) {
    return `Cách bạn ${Math.round(distanceKm * 1000)} m`;
  } else {
    return `Cách bạn ${distanceKm.toFixed(1)} km`;
  }
};

const NearbySheltersScreen = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const location = await locationService.getCurrentPosition();
        setUserLocation(location);
      } catch (error) {
        console.error('Error getting user location:', error);
        // Set default location (Ho Chi Minh City center) if GPS fails
        setUserLocation({latitude: 10.7769, longitude: 106.7009});
      } finally {
        setLoading(false);
      }
    };

    getUserLocation();
  }, []);
  const getDistanceForLocation = (location: LocationData): string => {
    if (!userLocation) {
      return 'Đang tính...';
    }

    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      location.latitude,
      location.longitude,
    );

    return formatDistance(distance);
  };
  // Sort locations by distance from user
  const sortedLocations = userLocation
    ? [...fakeHCMCKLocations].sort((a, b) => {
        const distanceA = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          a.latitude,
          a.longitude,
        );
        const distanceB = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          b.latitude,
          b.longitude,
        );
        return distanceA - distanceB;
      })
    : fakeHCMCKLocations;
  const renderItem = ({item, index}: {item: LocationData; index: number}) => {
    const isTop5 = index < 5;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Text style={styles.itemAddress}>{item.address}</Text>
          <Text style={[styles.itemDistance, isTop5 && styles.nearestDistance]}>
            {getDistanceForLocation(item)}
          </Text>
        </View>
        <Text style={styles.itemType}>{item.type}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            {backIcon(vw(6), vw(6))}
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nơi sơ tán gần bạn</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2C3E50" />
          <Text style={styles.loadingText}>Đang lấy vị trí của bạn...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          {backIcon(vw(6), vw(6))}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nơi sơ tán gần bạn</Text>
      </View>
      <FlatList
        data={sortedLocations}
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
    paddingTop: vh(6),
    paddingBottom: vh(2),
    backgroundColor: 'white',
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
  nearestDistance: {
    color: '#E74C3C', // Red color for top 5 nearest locations
    fontWeight: 'bold',
  },
  itemType: {
    fontSize: vw(3.8),
    color: '#34495E',
    marginLeft: vw(3),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: vw(5),
  },
  loadingText: {
    fontSize: vw(4),
    color: '#7F8C8D',
    marginTop: vh(2),
    textAlign: 'center',
  },
});

export default NearbySheltersScreen;
