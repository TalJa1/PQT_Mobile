import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomStatusBar from '../../components/CustomStatusBar';
import {useNavigation} from '@react-navigation/native';
import {backIcon, cameraIcon} from '../../assets/svgIcon';
import {vw} from '../../services/styleProps';

const AddReport = () => {
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  // const [images, setImages] = useState([]); // For handling multiple images

  const handleSubmit = () => {
    // Logic to handle submitting the report
    console.log('Report Submitted', {description, time});
    // Potentially navigate back or show a success message
  };

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
            onChangeText={setTime}
          />

          <Text style={styles.imageSectionTitle}>Thêm các ảnh liên quan</Text>
          <TouchableOpacity style={styles.imagePickerBox}>
            {cameraIcon(40, 40, '#B0B0B0')}
            <Text style={styles.imagePickerText}>Thêm</Text>
          </TouchableOpacity>

          {/* Placeholder for displaying selected images if any */}
          {/* <View style={styles.selectedImagesContainer}></View> */}
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
    color: '#333',
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
