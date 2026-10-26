import React from 'react'
import { Pressable, Text } from 'react-native'
import GlobalStyles from '../styles/GlobalStyles'

/* Viser én vare i en liste. item = varen, onPress = det der sker ved tryk */
const ItemComponent = ({ item, onPress }) => {
    return(
        <Pressable style={GlobalStyles.card} onPress={onPress}>
            <Text style={GlobalStyles.text}>{item.title}</Text>
            <Text style={GlobalStyles.price}>{item.price} kr.</Text>
            <Text style={GlobalStyles.smallText}>
                Stand {item.stand} - {item.sold ? "Solgt" : "Til salg"}
            </Text>
        </Pressable>
    )
}

export default ItemComponent;
