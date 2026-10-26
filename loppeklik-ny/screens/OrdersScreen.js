import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';
import ButtonComponent from '../components/ButtonComponent';
import { loadItems, saveItems, loadOrders, saveOrders, formatTime } from '../data/storage';

/* Skærm 6: Mine køb med afhentningskode, frist og status */
export default function OrdersScreen() {
    const [orders, setOrders] = useState([]);
    const isFocused = useIsFocused();

    const getOrders = async () => {
        const savedOrders = await loadOrders();
        const items = await loadItems();

        /* Er fristen gået, uden at varen er hentet, refunderes pengene,
           og varen sættes til salg igen */
        const updatedOrders = savedOrders.map((order) => {
            if (order.status === "betalt" && Date.now() > order.deadline) {
                const item = items.find((i) => i.id === order.itemId);
                if (item) {
                    item.sold = false;
                }
                return { ...order, status: "refunderet" };
            }
            return order;
        });

        await saveItems(items);
        await saveOrders(updatedOrders);
        setOrders(updatedOrders);
    };

    /* Kaldes ved standen, når køberen har fået varen */
    const markAsCollected = async (orderId) => {
        const updatedOrders = orders.map((order) => {
            if (order.id === orderId) {
                return { ...order, status: "hentet" };
            }
            return order;
        });
        await saveOrders(updatedOrders);
        setOrders(updatedOrders);
    };

    /* Henter købene, hver gang skærmen vises */
    useEffect(() => {
        getOrders();
    }, [isFocused]);

    return (
        <View style={GlobalStyles.container}>
            {orders.length > 0 ? (
                <FlatList
                    data={orders}
                    renderItem={({ item }) => {
                        return (
                            <View style={GlobalStyles.card}>
                                <Text style={GlobalStyles.text}>{item.title}</Text>
                                <Text style={GlobalStyles.price}>{item.price} kr.</Text>
                                <Text style={GlobalStyles.smallText}>Stand {item.stand}, {item.placement}</Text>

                                {item.status === "betalt" ? (
                                    <View>
                                        <Text style={GlobalStyles.text}>Hent senest kl. {formatTime(item.deadline)}</Text>
                                        <Text style={GlobalStyles.code}>Kode: {item.code}</Text>
                                        <ButtonComponent title="Jeg har hentet varen" onPress={() => markAsCollected(item.id)} />
                                    </View>
                                ) : null}

                                {item.status === "hentet" ? <Text style={GlobalStyles.text}>Hentet</Text> : null}
                                {item.status === "refunderet" ? (
                                    <Text style={GlobalStyles.text}>Ikke hentet i tide. Pengene er sendt tilbage.</Text>
                                ) : null}
                            </View>
                        );
                    }}
                />
            ) : (
                <Text style={GlobalStyles.smallText}>Du har ikke købt noget endnu.</Text>
            )}
            <StatusBar style="auto" />
        </View>
    );
}
