import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Platform, FlatList, RefreshControl } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import ListItem from './../components/ListtItem';
import { data } from '../data'
import colors from '../config/colors';
import ItemContext from './../reactContext/itemContext';
import { getItems } from './../controllers/itemsapis';

const renderMenuItem = ({ item, index }) => {
    return (

        <ListItem
            index={index}
            item={item}

        />

    );
};



export function ListScreen() {
    const [refreshing, setRefreshing] = useState(false)

    const itemContext = useContext(ItemContext)


    const onRefresh = useCallback(() => {

        setRefreshing(true)
        getItems().then((res) => {
            itemContext.setItem(res)
            setRefreshing(false)
        })
    })


    if (itemContext.item !== null) {
        return (

            <View style={styles.container}>

                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }

                    data={itemContext.item}
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
            <Stack.Screen name="List" component={ListScreen} />
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: colors.secondary,
        justifyContent: "center",
        alignItems: "center",

    },
});