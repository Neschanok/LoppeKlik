import { StyleSheet } from 'react-native';

/* Fælles styling til hele appen, så alle skærme ser ens ud */
const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF7F2',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    text: {
        fontSize: 16,
        marginBottom: 4,
    },
    smallText: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    },
    card: {
        backgroundColor: 'white',
        padding: 14,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    infoBox: {
        backgroundColor: '#E3EFE8',
        padding: 12,
        borderRadius: 8,
        marginTop: 12,
    },
    code: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'orange',
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 10,
        marginBottom: 12,
    },
    map: {
        flex: 1,
    },
});

export default GlobalStyles;
