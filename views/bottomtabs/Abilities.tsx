/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomStatusBar from '../../components/CustomStatusBar';
import {fakeCautionsData} from '../../services/data';
import {saveIcon2} from '../../assets/svgIcon';
import {vh, vw} from '../../services/styleProps';
import disasterAPI from '../../apis/disasterAPI';
import {Action, Dissater} from '../../services/model';

const tabTitles = [
  {id: 1, title: 'Bão'},
  {id: 2, title: 'Lũ'},
  {id: 3, title: 'Cháy rừng'},
  {id: 4, title: 'Sạt lở'},
  {id: 5, title: 'Hạn hán'},
];

const Abilities = () => {
  const [selectedTabId, setSelectedTabId] = useState(tabTitles[0].id);
  const [tabDetailData, setTabDetailData] = useState<Action[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedTabId) {
      const fetchTabData = async () => {
        setLoading(true);
        setError(null);
        setTabDetailData(null);
        try {
          const disasterDetails: Dissater = await disasterAPI.getById(
            selectedTabId,
          );
          console.log('Disaster Details:', disasterDetails);

          if (disasterDetails && disasterDetails.actions) {
            setTabDetailData(disasterDetails.actions);
          } else {
            setTabDetailData([]); // Set to empty array if no actions or no data
          }
        } catch (err) {
          setError('Failed to fetch data. Please try again.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchTabData();
    }
  }, [selectedTabId]);

  const renderCards = () => {
    const allTypes = fakeCautionsData;
    const displayTypes = [];

    if (allTypes.length > 0) {
      for (let i = 0; i < 3; i++) {
        displayTypes.push(allTypes[i] || allTypes[0]);
      }
    } else {
      return null;
    }

    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalCardsContainer}>
        {displayTypes.map((typeItem, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>
                5 việc cần làm sau {typeItem.type}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.cardViews}>124 lưu</Text>
                <TouchableOpacity style={styles.saveIconContainer}>
                  {saveIcon2(24, 24, '#000')}
                </TouchableOpacity>
              </View>
            </View>
            <Image
              source={require('../../assets/abilities/bground.png')}
              style={styles.cardImage}
            />
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderTabData = () => {
    if (loading) {
      return (
        <View style={styles.centeredMessage}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text>Loading data...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centeredMessage}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (!tabDetailData || tabDetailData.length === 0) {
      return (
        <View style={styles.centeredMessage}>
          <Text>No information available for this category.</Text>
        </View>
      );
    }

    return (
      <View style={styles.tabDataContainer}>
        {tabDetailData.map((action, index) => (
          <View key={action.action_id || index} style={styles.actionItem}>
            <Text style={styles.actionTitle}>{action.title}</Text>
            <Text style={styles.actionDescription}>{action.description}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar backgroundColor="#C9E5FF" barStyle={'dark-content'} />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>KỸ NĂNG ỨNG PHÓ THIÊN TAI</Text>
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderTitle}>Dành cho bạn</Text>
        </View>
        {renderCards()}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          contentContainerStyle={styles.tabsContentContainer}>
          {tabTitles.map(title => (
            <TouchableOpacity
              key={title.id}
              style={[
                styles.tab,
                selectedTabId === title.id && styles.selectedTab,
              ]}
              onPress={() => setSelectedTabId(title.id)}>
              <Text
                style={[
                  styles.tabText,
                  selectedTabId === title.id && styles.selectedTabText,
                ]}>
                {title.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{paddingBottom: vh(7)}}>{renderTabData()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Abilities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9E5FF',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  subHeader: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  subHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  horizontalCardsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 15,
    height: 120,
    overflow: 'hidden',
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    height: '100%',
    paddingLeft: vw(3),
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  cardViews: {
    fontSize: 12,
    color: '#777',
  },
  cardImage: {
    width: '40%',
    height: '100%',
    marginLeft: 10,
  },
  saveIconContainer: {},
  tabsContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#C9E5FF',
  },
  tabsContentContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#E0EFFF',
    marginRight: 10,
  },
  selectedTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  selectedTabText: {
    color: '#fff',
  },
  tabDataContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  actionDescription: {
    fontSize: 14,
    color: '#333',
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
