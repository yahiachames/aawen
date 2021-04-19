import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Platform, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppButton from './../components/Button';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
export function DetailScreen() {

    return (

        <View style={styles.container}>
            <Text>Open Detail.js</Text>
            <StatusBar style="auto" />

        </View>


    );
}

const Stack = createStackNavigator();
export default function Detail() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
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