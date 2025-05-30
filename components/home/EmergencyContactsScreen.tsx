import React, {JSX} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {vh, vw} from '../../services/styleProps';
import {
  accidentIcon,
  ambulanceIcon,
  backIcon,
  copIcon,
  fireFighterIcon,
  rescueIcon,
} from '../../assets/svgIcon'; // Assuming these icons exist

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  icon: JSX.Element;
  color: string;
}

const emergencyContactsData: EmergencyContact[] = [
  {
    id: '1',
    name: 'Cứu thương',
    number: '115',
    icon: ambulanceIcon(vw(8), vw(8)),
    color: '#F0F4C3',
  }, // Light Lime Green
  {
    id: '2',
    name: 'Cảnh sát',
    number: '113',
    icon: copIcon(vw(8), vw(8)),
    color: '#FFCCBC',
  }, // Light Orange
  {
    id: '3',
    name: 'Tai nạn',
    number: '116',
    icon: accidentIcon(vw(8), vw(8)),
    color: '#E1BEE7',
  }, // Light Purple
  {
    id: '4',
    name: 'Cứu hỏa',
    number: '114',
    icon: fireFighterIcon(vw(8), vw(8)),
    color: '#FFCDD2',
  }, // Light Red
  {
    id: '5',
    name: 'Cứu hộ cứu nạn',
    number: '119',
    icon: rescueIcon(vw(8), vw(8)),
    color: '#FFF9C4',
  }, // Light Yellow
];

const EmergencyContactsScreen = () => {
  const navigation = useNavigation();

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const renderItem = ({item}: {item: EmergencyContact}) => (
    <TouchableOpacity onPress={() => handleCall(item.number)}>
      <View style={[styles.itemContainer, {backgroundColor: item.color}]}>
        <View style={styles.iconContainer}>{item.icon}</View>
        <View style={styles.infoContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemNumber}>{item.number}</Text>
        </View>
        <View style={styles.actionContainer}>
          <Text style={styles.actionText}>Trượt để gọi</Text>
          <Text style={styles.actionArrow}>{'>>>>'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          {backIcon(vw(6), vw(6))}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Liên lạc khẩn cấp</Text>
      </View>
      <FlatList
        data={emergencyContactsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={{paddingBottom: vh(2)}}
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
    paddingBottom: vh(3), // Increased padding
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: vw(1),
  },
  headerTitle: {
    fontSize: vw(5.5), // Increased size
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: vw(3),
    textAlign: 'center', // Center title
    flex: 1, // Allow title to take space and center
    marginRight: vw(10), // Adjust to balance back button
  },
  list: {
    flex: 1,
    paddingHorizontal: vw(4),
    marginTop: vh(2),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: vw(3),
    padding: vw(4),
    marginBottom: vh(2),
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  iconContainer: {
    marginRight: vw(4),
  },
  infoContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: vw(4.5),
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  itemNumber: {
    fontSize: vw(3.8),
    color: '#34495E',
    marginTop: vh(0.5),
  },
  actionContainer: {
    alignItems: 'flex-end',
  },
  actionText: {
    fontSize: vw(3.5),
    color: '#7F8C8D',
  },
  actionArrow: {
    fontSize: vw(3.5),
    color: '#7F8C8D',
    fontWeight: 'bold',
  },
});

export default EmergencyContactsScreen;
