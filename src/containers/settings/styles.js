import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


export default {

    customBtn: {
        alignSelf: 'center',
        width: width * 0.9,
        backgroundColor: '#4285f4',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
    },
    text: {
        fontSize: 32,
    },
    title: {
        alignSelf: 'center',
        color: '#a2a2a2',
        fontSize: 16,
        paddingTop: 20,
        paddingBottom: 15,
        fontFamily: 'MyriadPro-Semibold',
    },
    listItem: {
        borderWidth: 0.33,
        backgroundColor: '#f9f9f9',
        width: width * 0.95,
        marginLeft: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
    },
    profileCard: {
        backgroundColor: '#f9f9f9',
        borderWidth: 0.33,
        width: width * 0.9,
        alignSelf: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
    },
};
