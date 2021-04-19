import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, Platform, Dimensions, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppButton from './../components/Button';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import AppTextInput from './../components/AppTextInput';
import colors from '../config/colors';
import ItemContext from '../reactContext/itemContext';
import { setItems } from '../controllers/itemsapis';


export function AddItemScreen() {
    const itemContext = useContext(ItemContext)

    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [mapRegion, setRegion] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")


    useEffect(() => {
        (async () => {
            Location.enableNetworkProviderAsync()
            let { status } = await Location.requestForegroundPermissionsAsync();
            let { status: tstatus } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            try {
                let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({})
                setLocation({ latitude, longitude })

                setRegion({ latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
                setLoading(false)

            } catch (e) {
                console.log(e)
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const getlocation = async () => {
        try {
            let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            setLocation(location)
        } catch (e) {
            console.log(e)
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })



        if (!result.cancelled) {
            ;

            let localUri = result.uri;
            let filename = localUri.split('/').pop()

            setImage({ localUri, filename })

            setLoading(false)

        }
    };

    let text = ""
    if (errorMsg) {
        text = errorMsg;
    }
    const handleSubmit = () => {



        let formData = new FormData()
        formData.append('file', { uri: image.localUri, name: image.filename });
        formData.append('title', title);
        formData.append('description', description);
        formData.append('altitude', location.latitude);
        formData.append('longitude', location.longitude);
        setItems(formData)


    }

    if (loading) {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <AppTextInput name="titre" placeholder="titre" onChangeText={setTitle} value={title} />
                    <AppTextInput name="Description" placeholder="Description" onChangeText={setDescription} value={description} />
                    <AppButton title="get a picture" onPress={pickImage} />
                    <AppButton title="get location" onPress={getlocation} />
                    <Text>{text}</Text>
                    <Text>Loading </Text>
                    <AppButton title="submit" onPress={handleSubmit} />




                </View>
            </ScrollView>
        )
    } else {
        return (
            <ScrollView>
                <View style={styles.container}>

                    <AppTextInput name="titre" placeholder="titre" />
                    <AppTextInput name="Description" placeholder="Description" />
                    <AppButton title="get a picture" onPress={pickImage} />
                    {image !== null && <Image source={{ uri: image.localUri }} style={{ width: "100%", height: "40%" }} />}
                    <AppButton title="get location" onPress={getlocation} />
                    <Text>{text}</Text>

                    <AppButton title="submit" onPress={handleSubmit} />
                </View>
            </ScrollView>
        );
    }
}


const Stack = createStackNavigator();
export default function AddItem() {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.secondary }, headerTintColor: "white" }} >
            <Stack.Screen name="AddItem" component={AddItemScreen} />
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 4,
    },
});