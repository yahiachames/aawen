import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import MapView from 'react-native-maps';

import { baseUrl } from './../baseUrl';

import colors from '../config/colors';


export default function DetailScreen(props) {
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
                        coordinate={{ latitude: details.latitude, longitude: details.longitude }}
                    />
                </MapView>
                <View style={styles.textBox} >
                    <Text style={styles.textTitle} numberOfLines={1} ellipsizeMode="tail" > {details.title}</Text>
                    <Text style={styles.textDescription} numberOfLines={7} ellipsizeMode="tail"  >  {details.description}</Text>
                </View>
            </View>

        </View >



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
        height: '90%',
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