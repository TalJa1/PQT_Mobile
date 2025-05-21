import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomStatusBar from '../../components/CustomStatusBar';
import {PostsData, Post} from '../../services/data';
import {vh} from '../../services/styleProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const imageSources = {
  avatar: require('../../assets/report/avatar.png'),
  drought: require('../../assets/report/drought.jpg'),
  flood: require('../../assets/report/flood.jpg'),
  earthquake: require('../../assets/report/earthquake.jpg'),
  user: require('../../assets/report/user.png'),
};

const getPostImageSource = (imagePath: string | undefined) => {
  if (!imagePath) {
    return imageSources.drought; // Default image
  }
  // Check for predefined asset paths
  if (imagePath === 'assets/report/drought.jpg') {
    return imageSources.drought;
  }
  if (imagePath === 'assets/report/flood.jpg') {
    return imageSources.flood;
  }
  if (imagePath === 'assets/report/earthquake.jpg') {
    return imageSources.earthquake;
  }
  // If it's not a predefined asset, assume it's a URI (e.g., from camera)
  // The Image component can handle { uri: string } for network or local file URIs
  if (imagePath.startsWith('file://') || imagePath.startsWith('http')) {
    return {uri: imagePath};
  }
  // Fallback or default if the path is not recognized or not a URI
  return imageSources.drought; // Or handle as an error/different default
};

const Report = () => {
  const [renderData, setRenderData] = useState<Post[]>([]);
  const navigate = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const loadPosts = async () => {
        try {
          let storedPosts = await AsyncStorage.getItem('posts');
          if (storedPosts) {
            const parsedPosts = JSON.parse(storedPosts);
            const reversedPosts = parsedPosts.reverse();
            setRenderData(reversedPosts);
          } else {
            await AsyncStorage.setItem('posts', JSON.stringify(PostsData));
            setRenderData(PostsData);
          }
        } catch (error) {
          console.log('Error loading or setting posts:', error);
          setRenderData(PostsData);
        }
      };
      loadPosts();
    }, []),
  );

  const formatTimeAgo = (dateTimeStr: string | undefined): string => {
    if (!dateTimeStr) {
      return 'N/A';
    }

    // Adjusting parser for "DD/MM/YYYY, HH:mm" or "DD/MM/YYYY HH:mm"
    const parts = dateTimeStr.replace(',', '').split(' '); // "DD/MM/YYYY", "HH:mm"
    const dateParts = parts[0].split('/'); // "DD", "MM", "YYYY"
    const timeParts = parts[1].split(':'); // "HH", "mm"

    // Ensure month is 0-indexed for Date constructor (0-11)
    const postDate = new Date(
      parseInt(dateParts[2], 10),
      parseInt(dateParts[1], 10) - 1,
      parseInt(dateParts[0], 10),
      parseInt(timeParts[0], 10),
      parseInt(timeParts[1], 10),
    );

    const now = new Date();
    const seconds = Math.round((now.getTime() - postDate.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const months = Math.round(days / 30.44); // Average days in month
    const years = Math.round(days / 365.25); // Account for leap years

    if (seconds < 60) {
      return `${seconds} giây trước`;
    }
    if (minutes < 60) {
      return `${minutes} phút trước`;
    }
    if (hours < 24) {
      return `${hours} giờ trước`;
    }
    if (days < 30) {
      return `${days} ngày trước`;
    }
    if (months < 12) {
      return `${months} tháng trước`;
    }
    return `${years} năm trước`;
  };

  const extractTime = (dateTimeStr: string | undefined) => {
    if (!dateTimeStr) {
      return 'N/A';
    }
    const parts = dateTimeStr.split(', ');
    return parts.length > 1 ? parts[1] : dateTimeStr;
  };

  // Helper to get a short summary for the post card title
  const getShortSummary = (description: string | undefined) => {
    if (!description) {
      return 'Chi tiết';
    }
    return (
      description.substring(0, 20) + (description.length > 20 ? '...' : '')
    );
  };

  // Helper to get the first part of the location
  const getDisplayLocation = (location: string | undefined) => {
    if (!location) {
      return 'Không rõ';
    }
    return location.split(',')[0];
  };

  const handlePressAddReport = () => {
    navigate.navigate('AddReport' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.sendAlertOuterContainer}>
          <TouchableOpacity
            style={styles.sendAlertButton}
            onPress={handlePressAddReport}>
            <View style={styles.plusIconContainer}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
            <Text style={styles.sendAlertButtonText}>GỬI CẢNH BÁO THỰC TẾ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cảnh báo thực tế gần bạn</Text>
        </View>

        <View style={styles.postsListContainer}>
          {renderData.map((post: Post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image
                  source={
                    post.name === 'Phung Quang Thang'
                      ? imageSources.user
                      : imageSources.avatar
                  }
                  style={styles.avatar}
                />
                <View style={styles.postHeaderTextContainer}>
                  <Text style={styles.postUserName}>{post.name}</Text>
                  <Text
                    style={
                      styles.postMeta
                    }>{`${formatTimeAgo(post.datetime)} · ${getDisplayLocation(
                    post.location,
                  )}`}</Text>
                </View>
                <TouchableOpacity style={styles.followButton}>
                  <Text style={styles.followButtonText}>Theo dõi</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.postCardTitle}>
                {`${extractTime(post.datetime)} - ${getShortSummary(
                  post.description,
                )}`}
              </Text>
              <Text
                style={styles.postCardDescription}
                numberOfLines={3}
                ellipsizeMode="tail">
                {post.description}
              </Text>

              {post.post_image && (
                <Image
                  source={getPostImageSource(post.post_image) as any} // Added 'as any' to bypass strict type checking if mixed types are returned
                  style={styles.postImage}
                />
              )}
            </View>
          ))}
        </View>
        <View style={{height: vh(7)}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Light gray overall background
  },
  scrollContentContainer: {
    paddingBottom: 20, // Ensure space at the bottom of the scroll view
  },
  sendAlertOuterContainer: {
    backgroundColor: '#fff', // White background for this section
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  sendAlertButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16, // Padding inside the button area
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff', // White background for the button itself
    width: '100%', // Make the button area take full width of its container
    maxWidth: 350, // Max width for larger screens
  },
  plusIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24, // Circular
    backgroundColor: '#2A4B8D', // Dark blue from image
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  plusIcon: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  sendAlertButtonText: {
    color: '#2A4B8D',
    fontSize: 16,
    fontWeight: '600', // Slightly less bold than title
    textAlign: 'center',
  },
  sectionHeader: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  postsListContainer: {
    paddingHorizontal: 16, // Horizontal padding for the list of cards
    marginTop: 10, // Space before the first card
  },
  postCard: {
    backgroundColor: '#E9F5FE', // Light blue background for card
    borderRadius: 12,
    padding: 16,
    marginBottom: 16, // Vertical separation between cards
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1, // Subtle elevation
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#FFF', // Small white border if needed
  },
  postHeaderTextContainer: {
    flex: 1, // Takes available space
  },
  postUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50', // Darker text color
  },
  postMeta: {
    fontSize: 13,
    color: '#7F8C8D', // Softer color for meta text
  },
  followButton: {
    backgroundColor: '#D6EFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20, // Pill shape
  },
  followButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  postCardTitle: {
    fontSize: 15, // Slightly smaller than username
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 6,
  },
  postCardDescription: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 12,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 180, // Adjusted height
    borderRadius: 8,
    resizeMode: 'cover',
    marginTop: 4, // Space above image
  },
});
