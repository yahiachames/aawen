import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import colors from '../config/colors'

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="small" color={colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.dark
    },
})
