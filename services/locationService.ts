import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform, Alert} from 'react-native';

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

// Default locations for testing (Vietnam cities)
const DEFAULT_LOCATIONS = {
  hochiminh: {latitude: 10.8231, longitude: 106.6297, name: 'Hồ Chí Minh'},
  hanoi: {latitude: 21.0285, longitude: 105.8542, name: 'Hà Nội'},
  danang: {latitude: 16.0471, longitude: 108.2068, name: 'Đà Nẵng'},
  cantho: {latitude: 10.0452, longitude: 105.7469, name: 'Cần Thơ'},
  dongthap: {latitude: 10.4591, longitude: 105.6384, name: 'Đồng Tháp'},
};

class LocationService {
  // Request location permission on Android
  async requestLocationPermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        // Check if permission is already granted
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
          return true;
        }

        // Request permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Quyền truy cập vị trí',
            message:
              'Ứng dụng cần quyền truy cập vị trí để lấy dữ liệu thời tiết.',
            buttonNeutral: 'Hỏi lại sau',
            buttonNegative: 'Từ chối',
            buttonPositive: 'Đồng ý',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Cần cấp quyền vị trí',
            'Vui lòng vào Cài đặt > Ứng dụng > PQT Mobile > Quyền để cấp quyền truy cập vị trí.',
            [{text: 'OK'}],
          );
        }

        return false;
      } catch (err) {
        console.warn('Location permission error:', err);
        return false;
      }
    }
    return true; // iOS permissions are handled automatically
  }
  // Get fallback location for testing/emulator
  getFallbackLocation(): LocationCoords {
    // Use Dong Thap as default location
    return DEFAULT_LOCATIONS.dongthap;
  }

  // Check if running on emulator (simplified check)
  isEmulator(): boolean {
    // This is a simplified check - in real apps you might want more sophisticated detection
    return Platform.OS === 'android' && (__DEV__ || true);
  }

  // Get current position with fallback for emulator
  async getCurrentPosition(): Promise<LocationCoords> {
    return new Promise(async (resolve, reject) => {
      // For emulator or when location fails, offer fallback
      const tryFallback = () => {
        Alert.alert(
          'Sử dụng vị trí mặc định',
          'Không thể lấy vị trí hiện tại. Sử dụng vị trí Đồng Tháp để xem thời tiết?',
          [
            {
              text: 'Thử lại GPS',
              onPress: () => {
                this.getCurrentPosition().then(resolve).catch(reject);
              },
            },
            {
              text: 'Dùng vị trí mặc định',
              onPress: () => {
                resolve(this.getFallbackLocation());
              },
            },
          ],
        );
      };

      try {
        // Request permission first
        const hasPermission = await this.requestLocationPermission();

        if (!hasPermission) {
          tryFallback();
          return;
        }

        Geolocation.getCurrentPosition(
          position => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => {
            console.error('Geolocation error:', error);

            // For emulator or location errors, offer fallback
            if (this.isEmulator() || error.code === 2) {
              tryFallback();
            } else {
              // Show user-friendly error messages
              let errorMessage = 'Unable to get location';
              switch (error.code) {
                case 1:
                  errorMessage =
                    'Location access denied. Please enable location services.';
                  break;
                case 3:
                  errorMessage =
                    'Location request timed out. Please try again.';
                  break;
              }

              Alert.alert('Location Error', errorMessage);
              reject(new Error(errorMessage));
            }
          },
          {
            enableHighAccuracy: false, // Use less accurate but faster location for emulator
            timeout: 10000, // Shorter timeout
            maximumAge: 30000, // Accept older location data
          },
        );
      } catch (error) {
        console.error('Location service error:', error);
        tryFallback();
      }
    });
  }

  // Watch position changes
  watchPosition(
    onSuccess: (coords: LocationCoords) => void,
    onError?: (error: string) => void,
  ): number {
    return Geolocation.watchPosition(
      position => {
        onSuccess({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        const errorMessage = `Geolocation error: ${error.message}`;
        console.error(errorMessage);
        onError?.(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
  }

  // Clear watch
  clearWatch(watchId: number): void {
    Geolocation.clearWatch(watchId);
  }

  // Get available test locations
  getAvailableLocations() {
    return DEFAULT_LOCATIONS;
  }

  // Get location by city name for testing
  getLocationByCity(cityKey: keyof typeof DEFAULT_LOCATIONS): LocationCoords {
    return DEFAULT_LOCATIONS[cityKey];
  }

  // Quick method to get location with user choice for testing
  async getLocationWithChoice(): Promise<LocationCoords> {
    return new Promise(resolve => {
      Alert.alert(
        'Chọn vị trí để xem thời tiết',
        'Chọn một thành phố để xem dữ liệu thời tiết:',
        [
          {
            text: 'Hồ Chí Minh',
            onPress: () => resolve(DEFAULT_LOCATIONS.hochiminh),
          },
          {
            text: 'Hà Nội',
            onPress: () => resolve(DEFAULT_LOCATIONS.hanoi),
          },
          {
            text: 'Đà Nẵng',
            onPress: () => resolve(DEFAULT_LOCATIONS.danang),
          },
          {
            text: 'Đồng Tháp',
            onPress: () => resolve(DEFAULT_LOCATIONS.dongthap),
          },
          {
            text: 'Dùng GPS',
            onPress: () => {
              this.getCurrentPosition()
                .then(resolve)
                .catch(() => {
                  resolve(DEFAULT_LOCATIONS.dongthap);
                });
            },
          },
        ],
      );
    });
  }
}

export default new LocationService();
