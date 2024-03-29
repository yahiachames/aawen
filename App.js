import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import List from './screens/list'
import AddItem from './screens/additem'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from './config/colors'


import { data } from './data';
import ItemContext from './reactContext/itemContext';
import { getItems } from './controllers/itemsapis';
const Tab = createBottomTabNavigator();
export default function App() {


  return (

    <NavigationContainer>
      <Tab.Navigator

        tabBarOptions={{
          activeBackgroundColor: colors.yellowFlash, activeTintColor: colors.dark,
          inactiveTintColor: 'white', inactiveBackgroundColor: colors.pink,
          tabStyle: { borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderColor: "white", width: 10, height: 40, margin: 5, borderWidth: 3 },
          labelStyle: { fontSize: 15 },
          activeTintColor: colors.white,
          inactiveTintColor: 'white',
          style: { backgroundColor: colors.secondary, borderWidth: 0 }
        }}
      >
        <Tab.Screen name="Les cas" component={List} />
        <Tab.Screen name="Ajouter cas" component={AddItem} />
      </Tab.Navigator>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
