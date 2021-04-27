import React, { useEffect, useState } from 'react';
import Screen from '../components/screen';
import { setItems } from '../controllers/itemsapis';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';


import * as Yup from 'yup'
import { AppForm, AppFormField, SubmitButton, ErrorMessage } from '../components/form'

function NewAddItem(props) {
    const [errorMsg, setErrorMsg] = useState(null);
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [mapRegion, setRegion] = useState(null);
    const [loading, setLoading] = useState(true)



    const validationSchema = Yup.object({
        title: Yup.string().required().label('title'),
        description: Yup.string().required().label('description')
    })
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
            let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({})
            setLocation({ latitude, longitude })

            let state = await Location.reverseGeocodeAsync({ latitude, longitude })


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

    const handleSubmit = async (data) => {



        try {

            const image = await pickImage()
            const location = await getlocation()


            let formData = new FormData()
            formData.append('file', { uri: image.localUri, name: image.filename });
            formData.append('description', data.description);
            formData.append('title', data.title);
            formData.append('altitude', location.latitude);
            formData.append('longitude', location.longitude);



            const result = await setItems(formData)


        } catch (e) {
            console.log(e)
        }


    }

    return (

        <Screen>

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



                />
                <SubmitButton title="Ajouter" />

            </AppForm>

        </Screen>


    );
}

export default NewAddItem;