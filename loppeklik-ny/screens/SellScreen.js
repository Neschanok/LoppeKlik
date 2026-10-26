import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, Image, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import GlobalStyles from '../styles/GlobalStyles';
import ButtonComponent from '../components/ButtonComponent';
import { MARKETS } from '../data/const';
import { loadItems, saveItems } from '../data/storage';

/* Skærm 5: Sælgeren lægger en vare op. Kan gøres hjemmefra før markedet */
export default function SellScreen() {
    const [marketId, setMarketId] = useState(MARKETS[0].id);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [stand, setStand] = useState("");
    const [placement, setPlacement] = useState("");
    const [pickupMinutes, setPickupMinutes] = useState(90);
    const [imageUri, setImageUri] = useState(null);

    /* Vælger et billede fra telefonens billeder */
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const addItem = async () => {
        /* Tjek at de vigtigste felter er udfyldt */
        if (title === "" || price === "" || stand === "") {
            Alert.alert("Mangler oplysninger", "Udfyld titel, pris og standnummer.");
            return;
        }

        /* Varen placeres på kortet ved markedet. Lidt tilfældighed, så markørerne ikke ligger oven i hinanden */
        const market = MARKETS.find((m) => m.id === marketId);
        const newItem = {
            id: Date.now().toString(),
            marketId: marketId,
            title: title,
            price: Number(price),
            stand: stand,
            placement: placement,
            pickupMinutes: pickupMinutes,
            imageUri: imageUri,
            sold: false,
            latitude: market.latitude + (Math.random() - 0.5) * 0.001,
            longitude: market.longitude + (Math.random() - 0.5) * 0.001,
        };

        const items = await loadItems();
        await saveItems([newItem, ...items]);

        /* Tøm felterne, så næste vare kan lægges op */
        setTitle("");
        setPrice("");
        setImageUri(null);
        Alert.alert("Varen er lagt op", "Købere kan nu se den i appen.");
    };

    return (
        <ScrollView style={GlobalStyles.container}>
            <Text style={GlobalStyles.label}>Marked</Text>
            {MARKETS.map((market) => {
                return (
                    <Pressable
                        key={market.id}
                        style={[GlobalStyles.card, { padding: 10, backgroundColor: marketId === market.id ? '#E3EFE8' : 'white' }]}
                        onPress={() => setMarketId(market.id)}
                    >
                        <Text>{market.name}</Text>
                    </Pressable>
                );
            })}

            <Text style={GlobalStyles.label}>Hvad sælger du?</Text>
            <TextInput style={GlobalStyles.input} placeholder="Fx vintage lampe" onChangeText={(txt) => setTitle(txt)} value={title} />

            <Text style={GlobalStyles.label}>Pris i kr.</Text>
            <TextInput style={GlobalStyles.input} placeholder="Fx 150" keyboardType="numeric" onChangeText={(txt) => setPrice(txt)} value={price} />

            <Text style={GlobalStyles.label}>Standnummer</Text>
            <TextInput style={GlobalStyles.input} placeholder="Fx 12" keyboardType="numeric" onChangeText={(txt) => setStand(txt)} value={stand} />

            {/* Købere i brugertesten ville gerne vide mere end GPS kan vise */}
            <Text style={GlobalStyles.label}>Hvor ligger standen?</Text>
            <TextInput style={GlobalStyles.input} placeholder="Fx ved indgangen" onChangeText={(txt) => setPlacement(txt)} value={placement} />

            {/* Sælgerne i interviewene ønskede forskellig frist, så sælgeren vælger selv */}
            <Text style={GlobalStyles.label}>Køberen skal hente varen inden for:</Text>
            <Text style={GlobalStyles.text}>{pickupMinutes} minutter</Text>
            <ButtonComponent title="60 minutter" onPress={() => setPickupMinutes(60)} color={pickupMinutes === 60 ? 'green' : 'grey'} />
            <ButtonComponent title="90 minutter" onPress={() => setPickupMinutes(90)} color={pickupMinutes === 90 ? 'green' : 'grey'} />

            <Text style={[GlobalStyles.label, { marginTop: 16 }]}>Billede</Text>
            {imageUri ? <Image source={{ uri: imageUri }} style={GlobalStyles.image} /> : null}
            <ButtonComponent title="Vælg billede" onPress={() => pickImage()} color="grey" />

            <ButtonComponent title="Læg varen op" onPress={() => addItem()} color="orange" />
            <View style={{ height: 40 }} />
            <StatusBar style="auto" />
        </ScrollView>
    );
}
