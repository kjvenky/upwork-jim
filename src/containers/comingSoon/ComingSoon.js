/**
 * Authenticate Screen
 *  - Entry screen for all authentication
 *  - User can tap to login, forget password, signup...
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    View,
    Image,
    StyleSheet,
    AsyncStorage,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Container, Badge,StyleProvider, Text, Button,Body, Content,ListItem, Form, Item, Input, Label,Card,CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
// Consts and Libs
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppStyles, AppSizes } from '@theme/';
// Components
import { Alerts, Spacer } from '@ui/';
import * as DevicesActions from '@redux/devices/actions';
import Communications from 'react-native-communications';
import styles from './styles';


// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    devicesData: state.devices,
});
// Any actions to map to the component?
const mapDispatchToProps = {
    getDevices: DevicesActions.getDevices,

};


/* Component ==================================================================== */
class ComingSoon extends Component {
    static componentName = 'ComingSoon';

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            resultMsg: { status: '', success: '', error: '', },
        }
    }

    componentWillMount = async() => {
        // Get user data from AsyncStorage to populate fields
        const values = await AsyncStorage.getItem('userData');
        const jsonValues = JSON.parse(values);

        if (values !== null) {
            this.props.getDevices(jsonValues, true).then(() => {
                Actions.app({ type: 'reset' });
                // setTimeout(() => {
                //     Actions.app({ type: 'reset' });
                // }, 0);
            }).catch((err) => {
                this.setState({ resultMsg: { error } });
            });
        }
    }

    render = () => {

        // const Form = FormValidation.form.Form;
        return (
                <Content style={{backgroundColor: '#fff'}}>
                     <Spacer size={60} />
                    <ListItem cardBody style={styles.listItemStyle}>
                        <Icon style={{padding: 5, fontSize: 200, color: '#ddd'}} active name="timer-sand" />
                    </ListItem>
                     <Spacer size={20} />
                    <ListItem cardBody style={styles.listItemStyle}>
                        <Text style={{fontSize: 16, fontFamily: 'MyriadPro-Regular',color: '#7b7b7b',fontWeight: '400',}}> MORE FEATURES ARE</Text>
                    </ListItem>
                    <ListItem cardBody style={styles.listItemStyle}>
                        <Text style={{fontSize: 38,fontFamily: 'MyriadPro-Regular', color: '#7b7b7b', fontWeight: '300',}}> COMING SOON</Text>
                    </ListItem>
                     <Spacer size={30} />
                    <ListItem cardBody style={styles.listItemStyle}>
                        <Image source={require( '../../images/logo2.png')} style={{height: 100, width: 100}}/>
                    </ListItem>
                </Content>
        )
    }

}

/* Export Component ====================================================================  */

export default connect(mapStateToProps, mapDispatchToProps)(ComingSoon);
