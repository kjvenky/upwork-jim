
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
    Alert,
    StyleSheet,
    AsyncStorage,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Container, Badge, Text, List, ListItem, Right,Switch, Button,Body, Content,Left, Form, Item, Icon, Input, Label,Card,CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';
// Components
import { Alerts, Spacer } from '@ui/';
import * as DevicesActions from '@redux/devices/actions';
import Communications from 'react-native-communications';
import styles from './styles';

import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
// // What data from the store shall we send to the component?
// const mapStateToProps = state => ({
//     devicesData: state.devices,
// });
// // Any actions to map to the component?
// const mapDispatchToProps = {
//     getDevices: DevicesActions.getDevices,

// };
/* Component ==================================================================== */
class SettingsView extends Component {
    static componentName = 'SettingsView';

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            resultMsg: { status: '', success: '', error: '', },
            trueSwitchIsOn: true,
            falseSwitchIsOn: false,
        }
    }

    componentDidMount = async() => {
        // Get user data from AsyncStorage to populate fields
        const values = await AsyncStorage.getItem('userData');
        const jsonValues = JSON.parse(values);

        if (values !== null) {
            console.log(jsonValues)
            this.setState({ email: jsonValues.email});

            // this.props.getDevices(jsonValues, true).then(() => {
            //     this.setState({ email: '' });
            //     // setTimeout(() => {
            //     //     Actions.app({ type: 'reset' });
            //     // }, 0);
            // }).catch((err) => {
            //     this.setState({ resultMsg: { error } });
            // });
        }
    }

    render = () => {
        // const Form = FormValidation.form.Form;
        return (
                <Content style={{backgroundColor: '#fff'}}>
                    <Text style={styles.title}>PROFILE SETTINGS</Text>
                    <View style={styles.profileCard}>
                        <CardItem>
                            <Left>
                            <View  style={{width:80,height:80,borderRadius:40, backgroundColor: '#a2a2a2',alignItems: 'center',justifyContent:'center'}}>
                            <SimpleLineIcon size={40}color={'#fff'} style={{ borderRadius:40,alignSelf:'center'}} active name="user-follow" />
                                        </View>
                                <Body>
                                    <Text style={{fontFamily: 'MyriadPro-Regular'}}>{this.state.email}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                            <Button full style={styles.customBtn} 
                            onPress={() => Alert.alert('Transin App Response','This service is temporarily not available. Please contact Admin.',)}>
                                <Text style={{fontFamily: 'MyriadPro-Regular',fontSize: 18}}>Change Password</Text>
                            </Button>
                            </View>
                    <View>
                     <Spacer size={40} />
                        <ScrollView>
                            <Text style={styles.title}>APP SETTINGS</Text>
                            <List>
                                <ListItem style={styles.listItem}>
                                    <Left>
                                        <Text style={{fontFamily: 'MyriadPro-Regular'}}>Use Location</Text>
                                    </Left>
                                    <Body />
                                    <Right>
                                         <Switch onValueChange={(value) => this.setState({trueSwitchIsOn1: value})} value={this.state.trueSwitchIsOn1} />
                                    </Right>
                                </ListItem>
                                <ListItem style={styles.listItem}>
                                    <Left>
                                        <Text style={{fontFamily: 'MyriadPro-Regular'}}>Notifications</Text>
                                    </Left>
                                    <Body />
                                    <Right>
                                        <Switch onValueChange={(value) => this.setState({trueSwitchIsOn: value})} value={this.state.trueSwitchIsOn} />
                                    </Right>
                                </ListItem>
                            </List>
                        </ScrollView>
                    </View>
                </Content>
        )
    }
}

/* Export Component ====================================================================  */
export default SettingsView;
// export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
