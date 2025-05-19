import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomStatusBar from '../../components/CustomStatusBar';
import {PostsData, Post} from '../../services/data';
import {vh} from '../../services/styleProps';

// Image sources mapping for local assets
const imageSources = {
  avatar: require('../../assets/report/avatar.png'),
  drought: require('../../assets/report/drought.jpg'),
  flood: require('../../assets/report/flood.jpg'),
  earthquake: require('../../assets/report/earthquake.jpg'),
  // Add other specific images from PostsData if they exist and are used
};

const getPostImageSource = (imagePath: string | undefined) => {
  if (!imagePath) {
    return imageSources.drought;
  } // Default or placeholder
  if (imagePath === 'assets/report/drought.jpg') {
    return imageSources.drought;
  }
  if (imagePath === 'assets/report/flood.jpg') {
    return imageSources.flood;
  }
  if (imagePath === 'assets/report/earthquake.jpg') {
    return imageSources.earthquake;
  }
  return imageSources.drought; // Fallback for any other unmapped images
};

const Report = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.sendAlertOuterContainer}>
          <TouchableOpacity style={styles.sendAlertButton}>
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
          {PostsData.map((post: Post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={imageSources.avatar} style={styles.avatar} />
                <View style={styles.postHeaderTextContainer}>
                  <Text style={styles.postUserName}>{post.name}</Text>
                  <Text
                    style={
                      styles.postMeta
                    }>{`30 phút trước · ${getDisplayLocation(
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
                  source={getPostImageSource(post.post_image)}
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
