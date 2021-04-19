import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native'
import { Overlay } from 'react-native-maps';



import colors from '../config/colors';
import { adaptToheight, adaptToWidth, height } from '../config/dimensions';
import MapView from 'react-native-maps';



export default function ListItem({ item, index, onPress }) {

    return (

        <View style={styles.container}  >
            <Text style={styles.title} >{item.title}</Text>

            <MapView
                style={styles.map}
                region={{ latitude: item.latitude, longitude: item.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}




            >


                <MapView.Marker
                    title="YIKES, Inc."
                    description="Web Design and Development"
                    coordinate={{ "latitude": item.latitude, "longitude": item.longitude }}
                />
            </MapView>






        </View>



    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 300,
        width: 400,
        justifyContent: "center",
        alignItems: "center",

        justifyContent: 'space-evenly',
        backgroundColor: "rgba(0, 0, 0,0.4)",
        borderBottomColor: colors.light,


        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 10,




    },
    title: {
        color: colors.white,

        width: "100%",
        fontSize: 18,
        height: "10%",
        textAlign: "center",


    },
    img: {
        width: 10,
        height: 10
    },
    desc: {

    },
    map: {
        width: "100%",
        height: "60%",
        alignSelf: "flex-end"

    }



})
