import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import colors from '../config/colors';

function AppButton({ title, onPress, color = "primary", style, textColor = "white", disabled = false }) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors[color] }, style]} disabled={disabled} onPress={onPress} >
            <Text style={[styles.text, { color: textColor }]} >{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "100%",
        marginVertical: 10,
        marginTop: 10,


    },
    text: {
        color: "white",
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
        textAlign: "center",

    },
})

export default AppButton;