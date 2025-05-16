import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {vh, vw} from '../../services/styleProps'; // Adjusted path

const AdditionalInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sunriseSunsetSection}>
        <View style={styles.timePoint}>
          <Text style={styles.timeLabel}>Bình minh</Text>
          <Text style={styles.timeValue}>06:25 AM</Text>
        </View>
        <View style={styles.graphContainer}>
          <View style={styles.darkBlueWaveLeft} />
          <View style={styles.lightBlueWave} />
          <View style={styles.darkBlueWaveRight} />
        </View>
        <View style={styles.timePoint}>
          <Text style={styles.timeLabel}>Hoàng hôn</Text>
          <Text style={styles.timeValue}>05:30 PM</Text>
        </View>
      </View>

      <View style={styles.warningCard}>
        <View style={styles.warningHeader}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <Text style={styles.warningTitle}>Cảnh báo khẩn cấp!</Text>
        </View>
        <View style={styles.warningBody}>
          <View style={styles.warningTextContainer}>
            <Text style={styles.warningText}>
              BÃO CẤP 9 – Di chuyển về phía Nam
            </Text>
            <Text style={styles.warningText}>
              Dự kiến ảnh hưởng: 16/05 – 17/05
            </Text>
            <View style={styles.severityContainer}>
              <Text style={styles.warningText}>Mức độ:</Text>
              <View style={styles.severityBadge}>
                <Text style={styles.severityText}>NGUY HIỂM</Text>
              </View>
            </View>
          </View>
          <Image
            source={require('../../assets/home/tonardo.png')}
            style={styles.tornadoIcon}
          />
        </View>
      </View>

      <View style={styles.buttonsSection}>
        <TouchableOpacity style={styles.buttonDark}>
          <Text style={styles.buttonDarkText}>Chi tiết cảnh báo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLight}>
          <Text style={styles.buttonLightText}>Kỹ năng ứng phó</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: vw(4),
    marginTop: vh(2),
    alignItems: 'center',
  },
  // Sunrise/Sunset Styles
  sunriseSunsetSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end', // Align items to bottom for time text
    width: '100%',
    marginBottom: vh(3),
    height: vh(12), // Approximate height
  },
  timePoint: {
    alignItems: 'center',
    marginBottom: vh(1), // Adjust to align with bottom of graph
  },
  timeLabel: {
    fontSize: vw(3.5),
    color: '#666',
  },
  timeValue: {
    fontSize: vw(3.8),
    color: '#333',
    fontWeight: '500',
  },
  graphContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Align waves to the bottom
    height: '80%', // Relative to sunriseSunsetSection height
    width: vw(50), // Width of the graph area
  },
  lightBlueWave: {
    height: '100%', // Takes full height of graphContainer
    width: '70%', // Main wave part
    backgroundColor: '#A0D2FA', // Light blue
    borderTopLeftRadius: vw(15),
    borderTopRightRadius: vw(15),
  },
  darkBlueWaveLeft: {
    height: '30%', // Smaller part of the wave
    width: '15%',
    backgroundColor: '#1F2D54', // Dark blue
    borderTopRightRadius: vw(5), // Smooth transition
    borderBottomRightRadius: vw(5),
  },
  darkBlueWaveRight: {
    height: '30%',
    width: '15%',
    backgroundColor: '#1F2D54',
    borderTopLeftRadius: vw(5),
    borderBottomLeftRadius: vw(5),
  },
  // Warning Card Styles
  warningCard: {
    backgroundColor: '#2A3B5D', // Dark blue-grey
    borderRadius: vw(3),
    padding: vw(4),
    width: '100%',
    marginBottom: vh(2.5),
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1),
  },
  warningIcon: {
    fontSize: vw(5),
    color: 'white',
    marginRight: vw(2),
  },
  warningTitle: {
    fontSize: vw(4.5),
    color: 'white',
    fontWeight: 'bold',
  },
  warningBody: {
    flexDirection: 'row',
  },
  warningTextContainer: {
    flex: 1,
  },
  warningText: {
    fontSize: vw(3.8),
    color: 'white',
    marginBottom: vh(0.5),
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(0.5),
  },
  severityBadge: {
    backgroundColor: '#FFA500',
    borderRadius: vw(4),
    paddingHorizontal: vw(3),
    paddingVertical: vw(1),
    marginLeft: vw(2),
  },
  severityText: {
    fontSize: vw(3.5),
    color: '#000000',
    fontWeight: 'bold',
  },
  tornadoIcon: {
    width: vw(17),
    height: vw(17),
    resizeMode: 'contain',
  },
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonDark: {
    backgroundColor: '#3A3A3A',
    paddingVertical: vh(1.5),
    paddingHorizontal: vw(5),
    borderRadius: vw(2),
    flex: 1,
    marginRight: vw(2),
    alignItems: 'center',
  },
  buttonDarkText: {
    color: 'white',
    fontSize: vw(4),
    fontWeight: '500',
  },
  buttonLight: {
    backgroundColor: 'white',
    paddingVertical: vh(1.5),
    paddingHorizontal: vw(5),
    borderRadius: vw(2),
    borderWidth: 1,
    borderColor: '#3A3A3A',
    flex: 1,
    marginLeft: vw(2),
    alignItems: 'center',
  },
  buttonLightText: {
    color: '#3A3A3A',
    fontSize: vw(4),
    fontWeight: '500',
  },
});

export default AdditionalInfo;
