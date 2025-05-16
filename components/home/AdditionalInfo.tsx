import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {vh, vw} from '../../services/styleProps';
import {homeDiagram} from '../../assets/svgIcon';

const DAY_WAVE_HEIGHT = vh(6);
const NIGHT_WAVE_DEPTH = vh(3);
const GRAPH_TOTAL_HEIGHT = DAY_WAVE_HEIGHT + NIGHT_WAVE_DEPTH;

const GRAPH_AREA_WIDTH = vw(55);
const NIGHT_WAVE_WIDTH = vw(13);

const AdditionalInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sunGraphOuterContainer}>
        <View style={styles.sunGraphContent}>
          {homeDiagram(vw(90), vh(15))}
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
  sunGraphOuterContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: vh(3),
  },
  sunGraphContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 'auto',
  },
  timeInfoBlock: {
    alignItems: 'center',
    width: vw(22),
  },
  timeLabel: {
    fontSize: vw(3.2),
    color: '#808080',
    marginBottom: vh(0.3),
  },
  timeValue: {
    fontSize: vw(4),
    color: '#404040',
    fontWeight: '500',
    marginBottom: vh(0.5),
  },
  verticalDashedLine: {
    width: 1,
    borderLeftWidth: 1.5,
    borderColor: '#C0C0C0',
    borderStyle: 'dashed',
  },
  graphVisualArea: {
    width: GRAPH_AREA_WIDTH,
    height: GRAPH_TOTAL_HEIGHT,
    marginHorizontal: vw(1),
    position: 'relative',
  },
  dayWave: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: DAY_WAVE_HEIGHT,
    backgroundColor: '#A0D2FA',
    borderTopLeftRadius: DAY_WAVE_HEIGHT * 1.8,
    borderTopRightRadius: DAY_WAVE_HEIGHT * 1.8,
  },
  nightWave: {
    position: 'absolute',
    top: DAY_WAVE_HEIGHT,
    left: 0,
    width: NIGHT_WAVE_WIDTH,
    height: NIGHT_WAVE_DEPTH,
    backgroundColor: '#0B204C',
    borderBottomLeftRadius: NIGHT_WAVE_DEPTH * 1.5,
    borderBottomRightRadius: NIGHT_WAVE_DEPTH * 1.5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  horizontalBaseline: {
    position: 'absolute',
    top: DAY_WAVE_HEIGHT,
    left: NIGHT_WAVE_WIDTH,
    right: 0,
    height: 1,
    borderTopWidth: 1.5,
    borderColor: '#C0C0C0',
    borderStyle: 'dashed',
  },
  warningCard: {
    backgroundColor: '#2A3B5D',
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
