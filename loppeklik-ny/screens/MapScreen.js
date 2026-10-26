import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import GlobalStyles from '../styles/GlobalStyles';
import ItemComponent from '../components/ItemComponent';
import { loadItems } from '../data/storage';

/* Regner afstanden i km mellem to punkter på kortet. */
const distanceInKm = (lat1, lon1, lat2, lon2) => {
    const a = (lat2 - lat1) * 111;
    const b = (lon2 - lon1) * 63;
    return Math.sqrt(a * a + b * b);
};

/* De afstande, man kan vælge imellem */
const RADIUS_OPTIONS = [1, 3, 10];

/* Skærm 4: Kort med din position og varerne inden for den afstand, du vælger */
export default function MapScreen({ navigation }) {
    const [items, setItems] = useState([]);
    const [location, setLocation] = useState(null);
    const [radius, setRadius] = useState(3); // afstand i km, 3 km fra start
    const isFocused = useIsFocused();

    /* Spørger om lov til at bruge lokation og finder din position */
    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            const position = await Location.getCurrentPositionAsync({});
            setLocation(position.coords);
        } else {
            /* Siger man nej, viser vi Slagelse centrum i stedet */
            setLocation({ latitude: 55.4028, longitude: 11.3546 });
        }
    };

    /* Henter kun de varer, der stadig er til salg */
    const getItems = async () => {
        const allItems = await loadItems();
        setItems(allItems.filter((item) => item.sold === false));
    };

    /* Åbner varens side i fanen Markeder, hvor man kan købe den */
    const openItem = (item) => {
        console.log("Trykket på vare:", item.title); // vises i terminalen, så man kan se om trykket virker
        navigation.navigate('Markeder', { screen: 'Vare', params: { item: item }, initial: false });
    };

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        getItems();
    }, [isFocused]);

    if (location === null) {
        return (
            <View style={GlobalStyles.container}>
                <Text>Finder din position...</Text>
                <StatusBar style="auto" />
            </View>
        );
    }

    /* Viser kun de varer, der ligger inden for den valgte afstand */
    const nearbyItems = items.filter((item) =>
        distanceInKm(location.latitude, location.longitude, item.latitude, item.longitude) <= radius
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Knapper til at vælge afstand. Den valgte er grøn */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 10 }}>
                {RADIUS_OPTIONS.map((km) => {
                    return (
                        <Pressable
                            key={km}
                            onPress={() => setRadius(km)}
                            style={{
                                backgroundColor: radius === km ? 'green' : 'lightgrey',
                                paddingVertical: 8,
                                paddingHorizontal: 18,
                                borderRadius: 20,
                                marginHorizontal: 6,
                            }}
                        >
                            <Text style={{ color: radius === km ? 'white' : 'black', fontWeight: 'bold' }}>{km} km</Text>
                        </Pressable>
                    );
                })}
            </View>
            <Text style={{ textAlign: 'center', padding: 8 }}>
                {nearbyItems.length} varer inden for {radius} km. Tryk på en vare for at købe den.
            </Text>

            <MapView
                style={{ flex: 1 }}
                showsUserLocation={true}
                /* Fanger tryk på en markør via dens identifier (virker også, hvis markørens egen onPress ikke gør) */
                onMarkerPress={(event) => {
                    const item = nearbyItems.find((i) => i.id === event.nativeEvent.id);
                    if (item) {
                        openItem(item);
                    }
                }}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.15,
                    longitudeDelta: 0.15,
                }}
            >
                {/* Cirkel der viser den valgte afstand. radius skal være i meter */}
                <Circle
                    center={{ latitude: location.latitude, longitude: location.longitude }}
                    radius={radius * 1000}
                    strokeColor="green"
                    fillColor="rgba(0, 128, 0, 0.1)"
                />

                {/* En markør for hver vare. Tryk på markøren eller på teksten over den for at åbne varen */}
                {nearbyItems.map((item) => {
                    return (
                        <Marker
                            key={item.id}
                            identifier={item.id}
                            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                            title={item.title + " - " + item.price + " kr."}
                            description="Tryk her for at købe"
                            onPress={() => openItem(item)}
                            onCalloutPress={() => openItem(item)}
                        />
                    );
                })}
            </MapView>

            {/* Liste med de samme varer under kortet. Tryk på en vare for at åbne den */}
            <View style={{ height: 200, padding: 10, backgroundColor: '#FAF7F2' }}>
                <FlatList
                    data={nearbyItems}
                    renderItem={({ item }) => {
                        return <ItemComponent item={item} onPress={() => openItem(item)} />;
                    }}
                />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}