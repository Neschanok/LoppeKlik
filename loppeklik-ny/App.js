import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import StackComponent from './components/StackComponent';
import MapScreen from './screens/MapScreen';
import SellScreen from './screens/SellScreen';
import OrdersScreen from './screens/OrdersScreen';

const Tab = createBottomTabNavigator();

/* Tab Navigator*/
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: 'green',
                    tabBarInactiveTintColor: 'gray',
                    /* Vælger et ikon til hver fane */
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Markeder') {
                            iconName = 'storefront-outline';
                        } else if (route.name === 'Kort') {
                            iconName = 'map-outline';
                        } else if (route.name === 'Sælg') {
                            iconName = 'add-circle-outline';
                        } else {
                            iconName = 'bag-handle-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Markeder" component={StackComponent} options={{ headerShown: false }} />
                <Tab.Screen name="Kort" component={MapScreen} />
                <Tab.Screen name="Sælg" component={SellScreen} />
                <Tab.Screen name="Mine køb" component={OrdersScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
