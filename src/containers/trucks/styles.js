import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


export default {
    container: {
        backgroundColor: '#fff',
    },
    mb10: {
        marginBottom: 10,
    },
    scrollview: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    map: {
        width: width,
        height: height / 3,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        borderBottomWidth: 1,
    },
    callout: {
        width: width / 2,
    },
};
