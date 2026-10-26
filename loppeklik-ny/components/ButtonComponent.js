import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

/* Knap vi kan genbruge. title = teksten på knappen, onPress = det der sker ved tryk */
const ButtonComponent = ({ title, onPress, color }) => {
    return(
        <Pressable style={[styles.button, { backgroundColor: color ? color : 'green' }]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 50,
        elevation: 3,
        marginTop: 12,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default ButtonComponent;
