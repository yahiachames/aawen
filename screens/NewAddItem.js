import React, { useEffect, useState } from 'react';
import Screen from '../components/screen';
import { setItems } from '../controllers/itemsapis';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'


import * as Yup from 'yup'
import { AppForm, AppFormField, SubmitButton, ErrorMessage } from '../components/form'
import colors from '../config/colors';

function NewAddItem(props) {
    const [errorMsg, setErrorMsg] = useState(null);
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [mapRegion, setRegion] = useState(null);
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0)
    const [apiLoading, setApiLoading] = useState(null)




    const validationSchema = Yup.object({
        title: Yup.string().required().label('title'),
        description: Yup.string().required().label('description')
    })



    const getlocation = async () => {
        try {
            let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({})
            setLocation({ latitude, longitude })




            setRegion({ latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
            setLoading(false)
            return ({ latitude, longitude })

        } catch (e) {
            console.log(e)
        }
    }

    const pickImage = async () => {
        try {
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
                return ({ localUri, filename })

            }


        } catch (e) {
            console.log(e)
        }
    };

    const displayLoading = () => {
        let arrlast = []
        for (let i = 0; i <= count - 1; i++) {

            arrlast[i] = <ActivityIndicator size="large" color={colors.dark} key={i} />

        }
        return arrlast
    }








    const handleSubmit = async (data) => {



        try {
            setCount(count + 1)
            setApiLoading(true)

            const image = await pickImage()
            const location = await getlocation()
            const geo = await Location.reverseGeocodeAsync({ latitude: location.latitude, longitude: location.longitude })


            console.log(geo)
            let formData = new FormData()
            formData.append('file', { uri: image.localUri, name: image.filename });
            formData.append('description', data.description);
            formData.append('title', data.title);
            formData.append('altitude', location.latitude);
            formData.append('longitude', location.longitude);
            formData.append('city', geo[0].city);
            formData.append('street', geo[0].street);



            const result = await setItems(formData)
            if (result.status === 200) {

                setApiLoading(false)
            } else if (result.status === 401) {
                console.log(result)
            } else {
                console.log(result)
            }


        } catch (e) {
            console.log(e)
        }


    }

    return (

        <Screen>
            <ScrollView >

                <AppForm
                    initialValues={{ title: "", description: "" }}
                    onSubmit={async (values) => {
                        return handleSubmit(values)

                    }}
                    validationSchema={validationSchema}
                >
                    <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="title"

                        name="title"
                        placeholder="Titre"


                    />
                    {/* {errMess.errMsg && errMess.visibble && <ErrorMessage error={errMess.errMsg} visible={errMess.visibble} />} */}
                    <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="description"
                        name="description"
                        placeholder="Description"
                        multiline={true}
                        numberOfLines={10}



                    />
                    <SubmitButton title="Ajouter" />

                </AppForm>
                <View style={styles.loading} >
                    {apiLoading === true && count !== 0 ? displayLoading().map(el => el) : apiLoading === null ? <MaterialCommunityIcons name="cloud-download" size={24} color="red" /> : <MaterialIcons name="cloud-done" size={24} color="green" />}
                    {errorMsg !== null && <Text>{errorMsg}</Text>}
                </View>
            </ScrollView>


        </Screen>


    );
}

export default NewAddItem;



const styles = StyleSheet.create({
    loading: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 5
    }
})