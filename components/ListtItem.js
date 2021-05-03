import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableHighlight } from 'react-native'




import colors from '../config/colors';


import { MaterialCommunityIcons, } from '@expo/vector-icons'
import { baseUrl } from '../baseUrl';



export default function ListItem({ item, index, onPress }) {



    console.log(item)



    return (

        <TouchableHighlight onPress={onPress} activeOpacity={0.6}
            underlayColor="#DDDDDD"  >

            <View style={styles.container}  >


                <Image source={{ uri: baseUrl + item.image.split('\\').join('/') }} style={{ width: "100%", height: "60%" }} />
                <View style={styles.textTitle} >
                    <Text style={styles.title} >{item.title}</Text>
                    <View style={styles.textBox} >
                        <MaterialCommunityIcons name="google-maps" size={20} color='red' style={styles.icon} />
                        <Text style={styles.text} >{item.city}, </Text>
                        <Text style={styles.text} >{item.street}</Text>
                    </View>

                </View>



            </View>
        </TouchableHighlight>



    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height / 2,
        width: Dimensions.get('window').width / 1.05,
        justifyContent: "center",
        alignItems: "flex-start",

        justifyContent: 'space-evenly',
        backgroundColor: colors.white,



        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 10,




    },
    title: {
        color: colors.grey,

        width: "100%",
        fontSize: Dimensions.get('window').width / 25,
        fontWeight: 'bold',
        textAlign: "center",
        padding: 5


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

    },
    textBox: {
        marginTop: Dimensions.get('window').height / 115,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row'
    },
    textTitle: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: Dimensions.get('window').width / 30,



    },
    text: {
        color: 'red',
        fontSize: Dimensions.get('window').width / 20,

    }



})
