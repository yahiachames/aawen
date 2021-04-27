import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Platform, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppButton from './../components/Button';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

import { baseUrl } from './../baseUrl';
import Screen from './../components/screen';
import colors from '../config/colors';


export function DetailScreen(props) {
    const { details } = props.route.params
    console.log(baseUrl + details.image.split('\\').join('/'))
    console.log(details)

    return (



        <View style={styles.container} >
            <View style={styles.componentDetail} >

                <MapView
                    style={styles.map}
                    region={{ latitude: details.latitude, longitude: details.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}

                >
                    <MapView.Marker
                        title="YIKES, Inc."
                        description="Web Design and Development"
                        coordinate={{ "latitude": details.latitude, "longitude": details.longitude }}
                    />
                </MapView>
                <View style={styles.textBox} >
                    <Text style={styles.textTitle} numberOfLines={1} ellipsizeMode="tail" > {details.title}</Text>
                    <Text style={styles.textDescription} numberOfLines={6} ellipsizeMode="tail"  >  {details.description}</Text>
                </View>
            </View>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%'


    },
    map: {
        width: "100%",
        height: "60%"
    },
    textBox: {
        flex: 1,
        justifyContent: "flex-start",

        padding: 5,

        width: '90%',


        marginTop: Dimensions.get('window').height / 45,
        borderRadius: 10,
        margin: 5


    },
    textTitle: {
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
        marginBottom: Dimensions.get('window').height / 75
    },
    componentDetail: {
        marginTop: Dimensions.get('window').height / 45,
        width: '90%',
        height: '80%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 10,
    },
    textDescription: {
        margin: 5,
        fontSize: 16,
        textAlign: "justify"

    }
});