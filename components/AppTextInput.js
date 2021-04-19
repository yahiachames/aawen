import React from 'react';
import { TextInput, View, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import defaultStyles from '../config/styles'
function AppTextInput({ icon, width = "100%", ...otherProps }) {
    return (
        <View style={[styles.container, { width }]}  >
            {icon && <MaterialCommunityIcons name={icon} size={20} color={colors.dark} style={styles.icon} />}
            <TextInput style={[defaultStyles.text]}  {...otherProps} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: "row",

        padding: 15,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
        top: 3
    },
    text: {
        color: defaultStyles.colors.dark,
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    },
})

export default AppTextInput;