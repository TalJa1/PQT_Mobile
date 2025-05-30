import React, {JSX, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {vh, vw} from '../../services/styleProps';
import {
  accidentIcon,
  ambulanceIcon,
  backIcon,
  copIcon,
  fireFighterIcon,
  rescueIcon,
} from '../../assets/svgIcon';

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  icon: JSX.Element;
  color: string;
  iconBackgroundColor: string; // New property for icon background
}

const emergencyContactsData: EmergencyContact[] = [
  {
    id: '1',
    name: 'Cứu thương',
    number: '115',
    icon: ambulanceIcon(vw(6.5), vw(6.5)), // Adjusted icon size
    color: '#F0F4C3', // Light Lime Green (item background)
    iconBackgroundColor: '#D4E157', // Lime Green (icon background)
  },
  {
    id: '2',
    name: 'Cảnh sát',
    number: '113',
    icon: copIcon(vw(6.5), vw(6.5)),
    color: '#FFCCBC', // Light Peach (item background)
    iconBackgroundColor: '#FF8A65', // Peach (icon background)
  },
  {
    id: '3',
    name: 'Tai nạn', // Assuming 'Tai nạn giao thông' based on common emergency numbers
    number: '116', // This number might vary or not be standard; using as placeholder
    icon: accidentIcon(vw(6.5), vw(6.5)),
    color: '#E1BEE7', // Light Lavender (item background)
    iconBackgroundColor: '#BA68C8', // Lavender (icon background)
  },
  {
    id: '4',
    name: 'Cứu hỏa',
    number: '114',
    icon: fireFighterIcon(vw(6.5), vw(6.5)),
    color: '#FFCDD2', // Light Pink (item background)
    iconBackgroundColor: '#F06292', // Pink (icon background)
  },
  {
    id: '5',
    name: 'Cứu hộ cứu nạn',
    number: '119',
    icon: rescueIcon(vw(6.5), vw(6.5)),
    color: '#FFF9C4', // Light Yellow (item background)
    iconBackgroundColor: '#FFEE58', // Yellow (icon background)
  },
];

// Constants for the new slide-the-icon mechanism
const ICON_DRAGGABLE_WIDTH = vw(13); // Width of the draggable icon container
const SLIDE_FULL_RANGE = vw(51); // How far the icon can be dragged to the right (visually)
const SLIDE_TO_CALL_THRESHOLD = 5; // Call triggers after sliding 5dp (logical pixels)

const EmergencyContactItem = ({
  item,
  onCall,
}: {
  item: EmergencyContact;
  onCall: (number: string) => void;
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const isCallMade = useRef(false); // To prevent multiple calls per gesture

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      // Allow dragging only within the defined range [0, SLIDE_FULL_RANGE]
      const newTranslateX = Math.max(0, Math.min(event.translationX, SLIDE_FULL_RANGE));
      translateX.setValue(newTranslateX);
      // Check for call threshold during update if you want immediate call trigger
      // For this implementation, call is made onEnd for clarity
    })
    .onEnd(event => {
      const finalTranslateX = event.translationX;
      if (finalTranslateX > SLIDE_TO_CALL_THRESHOLD && !isCallMade.current) {
        onCall(item.number);
        isCallMade.current = true; // Mark call as made for this gesture
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
          speed: 20,
        }).start(() => {
          isCallMade.current = false; // Reset for next gesture
        });
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 5,
        }).start(() => {
          isCallMade.current = false; // Reset if call not made
        });
      }
    })
    .activeOffsetX([-10, SLIDE_FULL_RANGE + vw(10)]) // Activation range
    .activeOffsetY([-20, 20]);

  return (
    <View style={[styles.itemContainer, {backgroundColor: item.color}]}>
      {/* Content that stays behind the icon */}
      <View style={styles.staticContentContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemNumber}>{item.number}</Text>
        </View>
        <View style={styles.slidePromptContainer}>
          <Text style={styles.slidePromptText}>{'Trượt để gọi >>>'}</Text>
        </View>
      </View>

      {/* Draggable Icon on top */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.iconDraggable,
            {backgroundColor: item.iconBackgroundColor},
            {
              transform: [{translateX: translateX}], // Directly use translateX
            },
          ]}>
          {item.icon}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const EmergencyContactsScreen = () => {
  const navigation = useNavigation();

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  // renderItem now uses EmergencyContactItem
  const renderItem = ({item}: {item: EmergencyContact}) => (
    <EmergencyContactItem item={item} onCall={handleCall} />
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
    paddingBottom: vh(3),
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: vw(1),
  },
  headerTitle: {
    fontSize: vw(5.5),
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: vw(3),
    textAlign: 'center',
    flex: 1,
    marginRight: vw(10),
  },
  list: {
    flex: 1,
    paddingHorizontal: vw(3),
    marginTop: vh(2),
  },
  itemContainer: {
    flexDirection: 'row', // Keep row for overall structure if needed, but content is layered
    alignItems: 'center',
    borderRadius: vw(4.5),
    paddingVertical: vh(1.5), // Vertical padding for the item
    // Horizontal padding is managed by margins of internal elements
    marginBottom: vh(2),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    position: 'relative', // Crucial for layering iconDraggable on top
  },
  staticContentContainer: { // Holds the text info and slide prompt, sits underneath
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: vw(3) + ICON_DRAGGABLE_WIDTH + vw(3.5), // Start after where icon normally is + its margin
    right: vw(3), // Right padding for the item
    top: 0,
    bottom: 0,
    paddingVertical: vh(1.5), // Match itemContainer's vertical padding
  },
  iconDraggable: {
    width: ICON_DRAGGABLE_WIDTH,
    height: ICON_DRAGGABLE_WIDTH,
    borderRadius: ICON_DRAGGABLE_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure icon is on top of staticContentContainer
    marginLeft: vw(3), // Initial horizontal position of the icon
    // backgroundColor is set inline via item.iconBackgroundColor
  },
  infoContainer: {
    flex: 1, // Takes up available space in the staticContentContainer
    justifyContent: 'center',
    // marginLeft is handled by staticContentContainer's left positioning
  },
  itemName: {
    fontSize: vw(4.3),
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  itemNumber: {
    fontSize: vw(3.8),
    color: '#34495E',
    marginTop: vh(0.3),
  },
  slidePromptContainer: {
    width: vw(30),
    height: '100%', // Take full height of parent (staticContentContainer)
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: vw(1),
  },
  slidePromptText: {
    fontSize: vw(3.3),
    color: '#34495E',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default EmergencyContactsScreen;
