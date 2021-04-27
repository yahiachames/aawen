import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Platform, FlatList, RefreshControl } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import ListItem from './../components/ListtItem';
import { data } from '../data'
import colors from '../config/colors';

import { getItems } from './../controllers/itemsapis';
import { DetailScreen } from './detail';
import NewAddItem from './NewAddItem';






export function ListScreen(props) {
    const [cases, setCases] = useState(null)


    const getCases = async () => {

        getItems().then((res) => {
            setCases(res)
        }).catch(e => console.log(e))

    }

    useEffect(() => {
        getCases()
    }, [JSON.stringify(cases)])

    const renderMenuItem = ({ item, index }) => {
        return (

            <ListItem
                index={index}
                item={item}
                onPress={() => props.navigation.navigate("Details", { details: item })}

            />

        );
    };
    const [refreshing, setRefreshing] = useState(false)




    const onRefresh = useCallback(() => {

        setRefreshing(true)
        getItems().then((res) => {
            setCases(res)
            setRefreshing(false)
        })
    })


    if (cases !== null) {
        return (

            <View style={styles.container}>

                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }

                    data={cases}
                    renderItem={renderMenuItem}
                    keyExtractor={(item, index) => index + ""}
                />
            </View>


        );
    }
    else {
        return (
            <View>
                <Text>Loading..</Text>
            </View>
        )
    }
}

const Stack = createStackNavigator();
export default function List() {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.secondary }, headerTintColor: "white" }}>
            <Stack.Screen name="Les cas" component={ListScreen} />
            <Stack.Screen name="Details" component={DetailScreen} />
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",

    },
});