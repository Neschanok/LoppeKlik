import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, Pressable } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import { MARKETS } from '../../data/const';

/* Skærm 1: Liste over loppemarkeder. Tryk på et marked for at se varerne */
export default function MarketsScreen({ navigation }) {
    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.smallText}>Vælg et marked og se, hvad standene sælger.</Text>

            <FlatList
                data={MARKETS}
                renderItem={({ item }) => {
                    return (
                        <Pressable
                            style={GlobalStyles.card}
                            onPress={() => navigation.navigate('Varer', { marketId: item.id })}
                        >
                            <Text style={GlobalStyles.title}>{item.name}</Text>
                            <Text style={GlobalStyles.smallText}>{item.address}</Text>
                        </Pressable>
                    );
                }}
            />
            <StatusBar style="auto" />
        </View>
    );
}
