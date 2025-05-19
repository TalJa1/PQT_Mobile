import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image, // Added for displaying the image
  Modal, // Added for camera view
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react'; // Added useRef
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomStatusBar from '../../components/CustomStatusBar';
import {useNavigation} from '@react-navigation/native';
import {backIcon, cameraIcon} from '../../assets/svgIcon';
import {vw} from '../../services/styleProps';
import {RNCamera} from 'react-native-camera'; // Import RNCamera

const AddReport = () => {
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [showCamera, setShowCamera] = useState(false); // State for camera visibility
  const [imageUri, setImageUri] = useState<string | null>(null); // State for captured image URI
  const cameraRef = useRef<RNCamera | null>(null); // Ref for RNCamera

  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    setTime(`${day}/${month}/${year}`);
  }, []);

  const handleSubmit = () => {
    console.log('Report Submitted', {description, time, imageUri}); // Added imageUri to log
  };

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      try {
        const data = await cameraRef.current.takePictureAsync(options);
        setImageUri(data.uri);
        setShowCamera(false); // Hide camera after taking photo
      } catch (error) {
        console.error('Failed to take picture', error);
        setShowCamera(false);
      }
    }
  };

  if (showCamera) {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={showCamera}
        onRequestClose={() => {
          setShowCamera(false);
        }}>
        <RNCamera
          ref={cameraRef}
          style={styles.cameraPreview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false} // Explicitly disable audio capture
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={styles.cameraControls}>
          <TouchableOpacity
            onPress={handleTakePhoto}
            style={styles.captureButton}>
            <Text style={styles.captureButtonText}>SNAP</Text>
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
  cameraPreview: {
    // Style for RNCamera component
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    // Style for capture button
    backgroundColor: '#fff',
    borderRadius: 35,
    padding: 15,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonText: {
    // Style for capture button text
    fontSize: 14,
    color: '#000',
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
