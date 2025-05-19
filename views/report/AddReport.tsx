import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image, // Added for displaying the image
  Modal, // Added for camera view
  Alert, // Added for feedback
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react'; // Added useRef
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomStatusBar from '../../components/CustomStatusBar';
import {useNavigation} from '@react-navigation/native';
import {backIcon, cameraIcon} from '../../assets/svgIcon';
import {vw} from '../../services/styleProps';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera'; // Import Camera from react-native-vision-camera
import {Post} from '../../services/data';

const AddReport = () => {
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [showCamera, setShowCamera] = useState(false); // State for camera visibility
  const [imageUri, setImageUri] = useState<string | null>(null); // State for captured image URI
  const cameraRef = useRef<Camera | null>(null); // Ref for Camera
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    setTime(`${day}/${month}/${year}`);
  }, []);

  useEffect(() => {
    if (showCamera && !hasPermission) {
      requestPermission();
    }
  }, [showCamera, hasPermission, requestPermission]);

  const handleSubmit = async () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentDatetime = `${day}/${month}/${year} ${hours}:${minutes}`;

    try {
      const existingPostsJson = await AsyncStorage.getItem('posts');
      let posts: Post[] = [];
      if (existingPostsJson !== null) {
        const parsedPosts = JSON.parse(existingPostsJson);
        if (Array.isArray(parsedPosts)) {
          posts = parsedPosts;
        } else {
          console.warn(
            "'post' in AsyncStorage was not an array. Initializing as empty array.",
          );
        }
      }
      const newPost: Post = {
        id: `post${posts.length + 1}`,
        avatar: '../../assets/report/user.png', // Path to the asset
        name: 'Phung Quang Thang',
        datetime: currentDatetime,
        description: description,
        post_image: imageUri ?? '',
        location: 'thanh pho Ho Chi Minh',
      };
      posts.push(newPost);
      await AsyncStorage.setItem('posts', JSON.stringify(posts));
      console.log('Posts:', posts);
      Alert.alert('Success', 'Report submitted successfully!');
      setDescription('');
      setImageUri(null);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save post', error);
      Alert.alert('Error', 'Failed to submit report.');
    }
  };

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({
          flash: 'off',
          enableShutterSound: false,
        });
        setImageUri('file://' + photo.path);
        setShowCamera(false); // Hide camera after taking photo
      } catch (error) {
        console.error('Failed to take picture', error);
        setShowCamera(false);
      }
    }
  };

  if (showCamera) {
    if (!hasPermission) {
      return (
        <View style={styles.container}>
          <Text>Camera permission is required.</Text>
          <TouchableOpacity onPress={requestPermission}>
            <Text>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (!device) {
      return (
        <View style={styles.container}>
          <Text>No camera device found.</Text>
        </View>
      );
    }
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={showCamera}
        onRequestClose={() => {
          setShowCamera(false);
        }}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={showCamera}
          photo={true} // Enable photo capture
        />
        <View style={styles.cameraControls}>
          <TouchableOpacity
            onPress={handleTakePhoto}
            style={styles.captureButton}>
            {/* Component */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowCamera(false)}
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar backgroundColor="white" barStyle={'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          {backIcon(24, 24, '#2A4B8D')}
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Mô tả thông tin</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Thời gian</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={time}
            editable={false}
          />

          <Text style={styles.imageSectionTitle}>Thêm các ảnh liên quan</Text>
          <TouchableOpacity
            style={styles.imagePickerBox}
            onPress={() => setShowCamera(true)}>
            {imageUri ? (
              <Image source={{uri: imageUri}} style={styles.previewImage} />
            ) : (
              <>
                {cameraIcon(40, 40, '#B0B0B0')}
                <Text style={styles.imagePickerText}>Thêm</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Gửi báo cáo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Light blue background from image
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white', // Match container background or make transparent
  },
  backButton: {
    padding: 8, // Make it easier to tap
    marginRight: 16, // Space if there was a title
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#E9F5FE', // Background for the rounded area
    borderTopLeftRadius: vw(5),
    borderTopRightRadius: vw(5),
    overflow: 'hidden', // To clip content to the rounded corners
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  formContainer: {
    flex: 1, // Allows the form to take up available space before the footer
  },
  label: {
    fontSize: 16,
    color: '#2A4B8D', // Dark blue text
    marginBottom: 8,
    marginTop: 16, // Space between input groups
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12, // Rounded corners
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderColor: '#D0D0D0', // Light border for the input
    borderWidth: 1,
    marginBottom: 10, // Space below each input
    color: '#333', // Ensure text color is visible
  },
  imageSectionTitle: {
    fontSize: 16,
    color: '#E74C3C', // Orange-red color from image
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  imagePickerBox: {
    height: 150,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF', // White background for the box
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    fontSize: 14,
    color: '#B0B0B0', // Light gray for text
    marginTop: 8,
  },
  previewImage: {
    // Style for the preview image
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  cameraControls: {
    // Container for camera buttons
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 20,
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: 35,
    padding: 15,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, // Added border
    borderColor: '#666', // Added border color
  },
  closeButton: {
    // Style for close button
    backgroundColor: 'transparent',
    padding: 10,
  },
  closeButtonText: {
    // Style for close button text
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    padding: 20,
    backgroundColor: '#E9F5FE', // Match container background
  },
  submitButton: {
    backgroundColor: '#2A4B8D', // Dark blue from image
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
