import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import GlobalStyles from '../../styles/GlobalStyles';
import ButtonComponent from '../../components/ButtonComponent';
import { loadItems, saveItems, loadOrders, saveOrders, formatTime } from '../../data/storage';

/* Skærm 3: Én vare. Køberen køber den med det samme og får en afhentningskode */
export default function ItemDetailScreen({ route }) {
    const item = route.params.item; // den vare, der blev trykket på
    const [sold, setSold] = useState(item.sold);

    /* Sælgeren har valgt 60 eller 90 minutter. Startvarerne har 90 */
    const pickupMinutes = item.pickupMinutes ? item.pickupMinutes : 90;

    const buyItem = async () => {
        /* 1. Find varen og marker den som solgt */
        const items = await loadItems();
        const updatedItems = items.map((i) => {
            if (i.id === item.id) {
                return { ...i, sold: true };
            }
            return i;
        });
        await saveItems(updatedItems);

        /* 2. Lav købet med en frist og en kode på 4 cifre */
        const deadline = Date.now() + pickupMinutes * 60 * 1000; // nu + antal minutter i millisekunder
        const code = Math.floor(1000 + Math.random() * 9000);
        const newOrder = {
            id: Date.now().toString(),
            title: item.title,
            price: item.price,
            stand: item.stand,
            placement: item.placement,
            itemId: item.id,
            deadline: deadline,
            code: code,
            status: "betalt", // betalt, hentet eller refunderet
        };

        /* 3. Gem købet sammen med de tidligere køb */
        const orders = await loadOrders();
        await saveOrders([newOrder, ...orders]);

        setSold(true);
        Alert.alert(
            "Tak for dit køb!",
            "Hent varen ved stand " + item.stand + " senest kl. " + formatTime(deadline) +
            ". Din kode er " + code + ". Du kan altid se den under Mine køb."
        );
    };

    return (
        <ScrollView style={GlobalStyles.container}>
            {item.imageUri ? <Image source={{ uri: item.imageUri }} style={GlobalStyles.image} /> : null}

            <Text style={GlobalStyles.title}>{item.title}</Text>
            <Text style={GlobalStyles.price}>{item.price} kr.</Text>
            <Text style={GlobalStyles.text}>Stand {item.stand}</Text>
            <Text style={GlobalStyles.smallText}>Placering: {item.placement}</Text>

            {/* Reglen står tydeligt før købet, fordi køberne i brugertesten var i tvivl om den */}
            <View style={GlobalStyles.infoBox}>
                <Text style={GlobalStyles.text}>Du betaler nu og henter varen inden for {pickupMinutes} minutter.</Text>
                <Text style={GlobalStyles.text}>Når du ikke at hente den, får du automatisk alle pengene tilbage.</Text>
            </View>

            {sold ? (
                <Text style={[GlobalStyles.title, { marginTop: 16 }]}>Varen er solgt</Text>
            ) : (
                <ButtonComponent title={"Køb nu for " + item.price + " kr."} onPress={() => buyItem()} color="orange" />
            )}
            <StatusBar style="auto" />
        </ScrollView>
    );
}
