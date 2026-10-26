import AsyncStorage from '@react-native-async-storage/async-storage';
import { START_ITEMS } from './const';

/* Her gemmer og henter vi data med AsyncStorage, så varer og køb huskes, når appen lukkes.
   AsyncStorage kan kun gemme tekst, så vi laver listerne om til tekst med JSON.stringify
   og tilbage til lister med JSON.parse */

/* Henter alle varer. Første gang appen åbnes, er der intet gemt, så bruger vi startvarerne */
export const loadItems = async () => {
    const saved = await AsyncStorage.getItem('items_slagelse');
    if (saved === null) {
        return START_ITEMS;
    }
    return JSON.parse(saved);
};

/* Gemmer alle varer */
export const saveItems = async (items) => {
    await AsyncStorage.setItem('items_slagelse', JSON.stringify(items));
};

/* Henter alle køb */
export const loadOrders = async () => {
    const saved = await AsyncStorage.getItem('orders_slagelse');
    if (saved === null) {
        return [];
    }
    return JSON.parse(saved);
};

/* Gemmer alle køb */
export const saveOrders = async (orders) => {
    await AsyncStorage.setItem('orders_slagelse', JSON.stringify(orders));
};

/* Laver et tidspunkt om til tekst, fx "14:05" */
export const formatTime = (time) => {
    const date = new Date(time);
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return date.getHours() + ":" + minutes;
};