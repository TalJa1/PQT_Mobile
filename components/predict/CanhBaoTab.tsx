import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { vw } from '../../services/styleProps';

const CanhBaoTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cảnh báo Tab Content</Text>
      <Text style={styles.subText}>This is where the warning/alert information will be displayed.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: vw(5),
  },
  text: {
    fontSize: vw(5),
    fontWeight: 'bold',
    color: '#1F2D54',
    marginBottom: vw(2),
  },
  subText: {
    fontSize: vw(4),
    color: '#56707d',
    textAlign: 'center',
  },
});

export default CanhBaoTab;
