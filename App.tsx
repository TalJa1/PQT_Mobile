/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import {vh, vw} from './services/styleProps';
import Home from './views/bottomtabs/Home';
import {homeIcon, menuIcon, predictIcon, reportIcon} from './assets/svgIcon';
import Predict from './views/bottomtabs/Predict';
import Abilities from './views/bottomtabs/Abilities';
import Report from './views/bottomtabs/Report';
import MustDoScreen from './views/predict/MustDo';
import AddReport from './views/report/AddReport';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const TabNavigator = () => {
    const createTabBarIcon =
      (iconComponent: Function) =>
      ({color, focused}: {color: string; focused: boolean}) => {
        const iconOnlySize = vw(9);
        const iconContainerSize = vw(10);

        return (
          <View
            style={[
              styles.iconContainer,
              {
                width: iconContainerSize,
                height: iconContainerSize,
                ...(focused && {
                  backgroundColor: '#C9E5FF',
                  borderRadius: iconContainerSize / 2,
                }),
              },
            ]}>
            {iconComponent(iconOnlySize, iconOnlySize, color)}
          </View>
        );
      };

    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#1F2D54',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: '#1F2D54',
            height: vh(7),
            paddingTop: vh(1),
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            shadowColor: '#FFFFFF',
            shadowOffset: {width: 3, height: -3},
            shadowOpacity: 0.7,
            shadowRadius: 3,
            elevation: 20,
          },
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: createTabBarIcon(homeIcon),
          }}
        />
        <Tab.Screen
          name="Predict"
          component={Predict}
          options={{
            tabBarIcon: createTabBarIcon(predictIcon),
          }}
        />
        <Tab.Screen
          name="Abilities"
          component={Abilities}
          options={{
            tabBarIcon: createTabBarIcon(menuIcon),
          }}
        />
        <Tab.Screen
          name="Report"
          component={Report}
          options={{
            tabBarIcon: createTabBarIcon(reportIcon),
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        {/* others */}
        <Stack.Screen
          name="MustDo"
          component={MustDoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddReport"
          component={AddReport}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
