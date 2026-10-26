import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import GlobalStyles from '../../styles/GlobalStyles';
import ItemComponent from '../../components/ItemComponent';
import { loadItems } from '../../data/storage';

/* Skærm 2: Varerne på det valgte marked, med en søgefunktion */
export default function MarketItemsScreen({ navigation, route }) {
    const marketId = route.params.marketId; // det marked, der blev trykket på
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const isFocused = useIsFocused(); // bliver true, hver gang skærmen vises

    /* Henter varerne og gemmer kun dem fra dette marked */
    const getItems = async () => {
        const allItems = await loadItems();
        setItems(allItems.filter((item) => item.marketId === marketId));
    };

    /* Kører hver gang skærmen vises, så nye varer og køb kommer med */
    useEffect(() => {
        getItems();
    }, [isFocused]);

    /* Viser kun de varer, hvor titlen indeholder det, der er søgt på */
    const shownItems = items.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={GlobalStyles.container}>
            <TextInput
                style={GlobalStyles.input}
                placeholder="Søg efter en vare, fx lampe"
                onChangeText={(txt) => setSearch(txt)}
                value={search}
            />

            {shownItems.length > 0 ? (
                <FlatList
                    data={shownItems}
                    renderItem={({ item }) => {
                        return (
                            <ItemComponent item={item} onPress={() => navigation.navigate('Vare', { item: item })} />
                        );
                    }}
                />
            ) : (
                <Text style={GlobalStyles.smallText}>Ingen varer fundet.</Text>
            )}
            <StatusBar style="auto" />
        </View>
    );
}
