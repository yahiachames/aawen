import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import App from './App';
import { View, Text } from 'react-native';

function Auth(props) {
    const [permCamera, setPermCamera] = useState(false)
    const [permLocation, setPermLocation] = useState(false)

    useEffect(() => {
        (async () => {
            Location.enableNetworkProviderAsync()
            let { status } = await Location.requestForegroundPermissionsAsync();
            const { statuss } = await ImagePicker.requestCameraPermissionsAsync();

            if (status !== 'granted' && statuss !== 'granted') {

                return;
            } else {
                setPermLocation(true)
                setPermCamera(true)
            }



        })();
    }, [permLocation, permCamera]);



    if (permCamera && permLocation) {
        return <App />
    } else {
        return (<View style={{ justifyContent: "center", alignItems: "center" }} >
            <Text >you need to enable camera and location</Text>
        </View>)
    }

}

export default Auth;