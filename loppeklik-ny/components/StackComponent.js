import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MarketsScreen from '../screens/StackScreens/MarketsScreen';
import MarketItemsScreen from '../screens/StackScreens/MarketItemsScreen';
import ItemDetailScreen from '../screens/StackScreens/ItemDetailScreen';

const Stack = createStackNavigator();

/* Stack Navigator til fanen "Markeder": Loppemarkeder -> Varer -> Vare */
const StackComponent = () => {
    return(
        <Stack.Navigator initialRouteName="Loppemarkeder">
            <Stack.Screen name="Loppemarkeder" component={MarketsScreen} />
            <Stack.Screen name="Varer" component={MarketItemsScreen} />
            <Stack.Screen name="Vare" component={ItemDetailScreen} />
        </Stack.Navigator>
    )
}

export default StackComponent;
