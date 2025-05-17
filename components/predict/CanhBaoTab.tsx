/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from 'react-native'; // Added Image
import {vw, vh} from '../../services/styleProps';
import {fakeCautionsData, CautionAlert} from '../../services/data';
import {
  stormIconXml,
  locationIconXml,
  clockIconXml,
  waveIconXml,
  windIconXml,
  rainIconXml,
  directionIconXml,
} from '../../assets/svgIcon';

const CanhBaoTab = () => {
  const [selectedCaution, setSelectedCaution] = useState<CautionAlert | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const handleViewDetails = (caution: CautionAlert) => {
    setSelectedCaution(caution);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {fakeCautionsData.map((caution, index) => (
          <React.Fragment key={caution.id}>
            <View style={styles.cautionItemContainer}>
              <View style={styles.cautionHeader}>
                {stormIconXml(vw(5), vw(5), '#FFFFFF')}
                <Text style={styles.cautionType}>{caution.type}</Text>
              </View>
              <View style={styles.cautionRow}>
                {locationIconXml(vw(5), vw(5), '#FFFFFF')}
                <Text style={styles.cautionText}>{caution.area}</Text>
              </View>
              <View style={styles.cautionRow}>
                {clockIconXml(vw(5), vw(5), '#FFFFFF')}
                <Text style={styles.cautionText}>{caution.time}</Text>
              </View>
              <View style={styles.cautionFooter}>
                <View style={styles.dangerLevelContainer}>
                  <Text style={styles.dangerLevelText}>Mức độ nguy hiểm:</Text>
                  <View style={styles.dangerLevelCircle}>
                    <Text style={styles.dangerLevelNumber}>
                      {caution.dangerLevel}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => handleViewDetails(caution)}>
                  <Text style={styles.detailsButtonText}>Xem chi tiết</Text>
                  {/* Add arrow icon here if needed */}
                </TouchableOpacity>
              </View>
              <Image
                source={require('../../assets/home/tonardo.png')}
                style={styles.tornadoImage}
              />
            </View>
            {index < fakeCautionsData.length - 1 && (
              <View style={styles.separator} />
            )}
          </React.Fragment>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedCaution && (
              <ScrollView contentContainerStyle={styles.modalScrollContainer}>
                <Text style={styles.modalTitle}>
                  {selectedCaution.detailsTitle}
                </Text>
                <View style={styles.detailItem}>
                  {stormIconXml(vw(5), vw(5), '#FFFFFF')}
                  <Text style={styles.modalText}>{selectedCaution.type}</Text>
                </View>
                <View style={styles.detailItem}>
                  {locationIconXml(vw(5), vw(5), '#FFFFFF')}
                  <Text style={styles.modalText}>{selectedCaution.area}</Text>
                </View>
                <View style={styles.detailItem}>
                  {clockIconXml(vw(5), vw(5), '#FFFFFF')}
                  <Text style={styles.modalText}>{selectedCaution.time}</Text>
                </View>
                {selectedCaution.waveHeight && (
                  <View style={styles.detailItem}>
                    {waveIconXml(vw(5), vw(5), '#FFFFFF')}
                    <Text style={styles.modalText}>
                      {selectedCaution.waveHeight}
                    </Text>
                  </View>
                )}
                {selectedCaution.wind && (
                  <View style={styles.detailItem}>
                    {windIconXml(vw(5), vw(5), '#FFFFFF')}
                    <Text style={styles.modalText}>{selectedCaution.wind}</Text>
                  </View>
                )}
                {selectedCaution.rainAmount && (
                  <View style={styles.detailItem}>
                    {rainIconXml(vw(5), vw(5), '#FFFFFF')}
                    <Text style={styles.modalText}>
                      {selectedCaution.rainAmount}
                    </Text>
                  </View>
                )}
                {selectedCaution.direction && (
                  <View style={styles.detailItem}>
                    {directionIconXml(vw(5), vw(5), '#FFFFFF')}
                    <Text style={styles.modalText}>
                      {selectedCaution.direction}
                    </Text>
                  </View>
                )}
              </ScrollView>
            )}
            <View style={styles.ButtonBottomGroup}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: vh(2),
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 14, fontWeight: 700, color: '#1F2D54'}}>
                  Mức độ nguy hiểm:{' '}
                </Text>
                <View
                  style={[
                    styles.dangerLevelCircle,
                    {backgroundColor: '#1F2D54'},
                  ]}>
                  <Text style={[styles.dangerLevelNumber, {color: '#FFA500'}]}>
                    {selectedCaution?.dangerLevel}
                  </Text>
                </View>
              </View>
                <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: '#1F2D54',
                  borderWidth: 1,
                  borderRadius: 15,
                  paddingVertical: vh(1),
                  paddingHorizontal: vw(4),
                  marginTop: vh(2),
                }}>
                <Text
                  style={{
                  color: '#1F2D54',
                  fontWeight: 'bold',
                  fontSize: vw(4),
                  marginRight: vw(2),
                  }}>
                  Xem kỹ năng ứng phó với bão
                </Text>
                <Text
                  style={{
                  color: '#1F2D54',
                  fontSize: vw(5),
                  fontWeight: 'bold',
                  }}>
                  &gt;
                </Text>
                </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: vw(100),
  },
  scrollContainer: {
    padding: vw(5),
    paddingHorizontal: vw(5),
  },
  cautionItemContainer: {
    backgroundColor: '#1F2D54', // Slightly lighter blue for items
    borderRadius: vw(3),
    marginBottom: vw(4),
    position: 'relative', // For absolute positioning of the tornado image
  },
  cautionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1),
  },
  cautionType: {
    fontSize: vw(4.5),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: vw(2),
  },
  cautionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(0.5),
  },
  icon: {
    marginRight: vw(2.5),
    color: '#FFFFFF', // Default icon color
  },
  cautionText: {
    fontSize: vw(3.8),
    color: '#E0E0E0',
    flexShrink: 1, // Allow text to wrap
  },
  cautionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh(1.5),
  },
  dangerLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dangerLevelText: {
    fontSize: vw(3.8),
    color: '#E0E0E0',
    marginRight: vw(2),
  },
  dangerLevelCircle: {
    backgroundColor: '#FFA500', // Orange color for danger level
    width: vw(8),
    height: vw(8),
    borderRadius: vw(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dangerLevelNumber: {
    fontSize: vw(4),
    fontWeight: 'bold',
    color: '#1F2D54',
  },
  detailsButton: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: vw(5),
    paddingVertical: vh(1),
    paddingHorizontal: vw(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: vw(3.8),
    color: '#FFFFFF',
    marginRight: vw(1), // Space for potential arrow icon
  },
  tornadoImage: {
    position: 'absolute',
    right: vw(3),
    top: vh(2),
    width: vw(20), // Adjust as needed
    height: vh(10), // Adjust as needed
    resizeMode: 'contain',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#FFFFFF', // Or any color you prefer for the line
    marginVertical: vh(3), // Adjust spacing as needed
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    height: '80%', // Half screen, adjust as needed
    backgroundColor: '#1F2D54', // Same as caution item
    borderTopLeftRadius: vw(5),
    borderTopRightRadius: vw(5),
  },
  modalTitle: {
    fontSize: vw(5.5),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: vh(2),
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1.5),
  },
  modalText: {
    fontSize: vw(4),
    color: '#E0E0E0',
    marginLeft: vw(2),
    flexShrink: 1,
  },
  closeButton: {
    backgroundColor: '#FFA500',
    borderRadius: vw(3),
    paddingVertical: vh(1.5),
    alignItems: 'center',
    marginTop: vh(2),
  },
  closeButtonText: {
    fontSize: vw(4.2),
    fontWeight: 'bold',
    color: '#1F2D54',
  },
  ButtonBottomGroup: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFAC33',
  },
  modalScrollContainer: {
    padding: vw(5),
    paddingBottom: vh(2),
  },
});

export default CanhBaoTab;
