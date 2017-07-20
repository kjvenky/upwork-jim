import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


export default {
    container: {
        backgroundColor: '#FFF',
    },
    listItemStyle: {
        alignSelf: 'center',
        borderBottomWidth: 0,
        paddingTop: 0,
        paddingBottom: 0,
        fontFamily: 'MyriadPro-Semibold',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,

    },
    profileCard: {
        backgroundColor: '#f4f4f4',
        width: width,
        alignSelf: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        paddingVertical: 30,
    },
    background: {
        backgroundColor: 'transparent',
        height: height,
        width: width,
    },
    logo: {
        width: width * 0.30,
        resizeMode: 'contain',
    },
    whiteText: {
        color: '#FBFAFA',
    },
    bg: {
        backgroundColor: 'transparent',
        width: width,

    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'rgb(253,253,253)',
    },
    holder: {
        flex: 0.25,
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: 32,
    },
};
