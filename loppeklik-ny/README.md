# LoppeKlik – click and collect på loppemarkedet

LoppeKlik lader stadeholdere på store loppemarkeder lægge deres varer op i en app, så købere i nærheden kan se dem på et kort, købe dem med det samme og hente dem ved standen inden for 60 eller 90 minutter. Det løser problemet med, at man på meget store markeder ikke kan nå hele vejen rundt.

**Demovideo:** [indsæt link her]
**GitHub:** [indsæt link her]

## Funktioner

- **Markeder** – liste over loppemarkeder (FlatList). Tryk på et marked for at se dets varer.
- **Varer** – varerne på markedet med en søgefunktion (TextInput).
- **Vare** – køberen køber varen med det samme og får en afhentningskode. Reglen om frist og refusion står tydeligt før købet. Betalingen er simuleret.
- **Kort** – din position og varerne inden for en afstand, du vælger (1, 3 eller 10 km), med `react-native-maps` og `expo-location`.
- **Sælg** – sælgeren lægger en vare op med titel, pris, standnummer, placering, billede og vælger selv en frist på 60 eller 90 minutter.
- **Mine køb** – afhentningskode, frist og status. Hentes varen ikke i tide, refunderes pengene, og varen kommer til salg igen.

Varer og køb gemmes med **AsyncStorage** (`data/storage.js`), så de huskes, når appen lukkes.

## Projektstruktur

```
App.js                                  Tab Navigator med fire faner
components/StackComponent.js            Stack Navigator: Loppemarkeder -> Varer -> Vare
components/ButtonComponent.js           Genbrugelig knap (props: title, onPress, color)
components/ItemComponent.js             Viser én vare i en liste
screens/StackScreens/MarketsScreen.js   Liste over markeder
screens/StackScreens/MarketItemsScreen.js  Varer på et marked + søgning
screens/StackScreens/ItemDetailScreen.js   Én vare + køb
screens/MapScreen.js                    Kort
screens/SellScreen.js                   Læg en vare op
screens/OrdersScreen.js                 Mine køb
data/const.js                           Markeder og startvarer
data/storage.js                         Gem og hent med AsyncStorage
styles/GlobalStyles.js                  Fælles styling
```

## Kør projektet (Expo SDK 58)

```bash
npm install
npx expo install --fix
npx expo start -c
```

Scan QR-koden med Expo Go. På eduroam kan det være nødvendigt at bruge `npx expo start --tunnel`.

## Hvem har kodet hvad

| Person | Bidrag |
|---|---|
| [Navn] | [fx MapScreen, lokation] |
| [Navn] | [fx SellScreen, billeder] |
