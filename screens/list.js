import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Platform, FlatList, RefreshControl } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


import ListItem from './../components/ListtItem';

import colors from '../config/colors';

import { getItems } from './../controllers/itemsapis';
import DetailScreen from './detail';
import NewAddItem from './NewAddItem';






export function ListScreen(props) {
    const [cases, setCases] = useState(null)


    const getCases = async () => {

        try {
            const res = await getItems()
            setCases(res)
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        getCases()
    }, [JSON.stringify(cases)])

    const renderMenuItem = ({ item, index }) => {
        console.log(props)
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
        getCases().then((res) => setRefreshing(false))
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
                    keyExtractor={(item, index) => index + 1 + ""}
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


export default function List() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.secondary }, headerTintColor: "white" }} initialRouteName="Les cas" >
            <Stack.Screen
                name="Les cas"

            >
                {(props) => <ListScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen
                name="Details"

            >
                {(props) => <DetailScreen {...props} />}
            </Stack.Screen>

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