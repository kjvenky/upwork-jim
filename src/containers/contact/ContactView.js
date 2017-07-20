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
import { Container, Badge, Text, Button,Body, Content, Form, Item, Icon, Input, Label,Card,CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';
// Components
import { Alerts, Spacer } from '@ui/';
import Communications from 'react-native-communications';

// What data from the store shall we send to the component?
// const mapStateToProps = state => ({
//     devicesData: state.devices,
// });
// // Any actions to map to the component?
// const mapDispatchToProps = {
//     getDevices: DevicesActions.getDevices,

// };

import styles from './styles';

/* Component ==================================================================== */
class ContactView extends Component {
    static componentName = 'ContactView';

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            resultMsg: { status: '', success: '', error: '', },
        }
    }

    // componentWillMount = async() => {
    //     // Get user data from AsyncStorage to populate fields
    //     const values = await AsyncStorage.getItem('userData');
    //     const jsonValues = JSON.parse(values);

    //     if (values !== null) {
    //         this.props.getDevices(jsonValues, true).then(() => {
    //             Actions.app({ type: 'reset' });
    //             // setTimeout(() => {
    //             //     Actions.app({ type: 'reset' });
    //             // }, 0);
    //         }).catch((err) => {
    //             this.setState({ resultMsg: { error } });
    //         });
    //     }
    // }

    render = () => {
        // const Form = FormValidation.form.Form;
        return (
             <Content style={{backgroundColor: '#fff'}}>
                    <View style={styles.profileCard}>
                    <CardItem cardBody style={{alignSelf:'center', backgroundColor: 'transparent'}}>
                              <Image source={require('../../images/logo2.png')} style={{height: 100, width: 100}}/> 
                          </CardItem>
                          </View>
                     
                <View style={styles.container}>
                <ScrollView>
          <View style={styles.holder}>
              <Button large transparent textStyle={{color: '#4285f4'}} onPress={() => Communications.phonecall('9666777809', true)}>
                                    <Icon style={{padding: 0, fontSize: 40, borderRadius:5,color: '#4285f4'}} name="call" />
                                    <Text style={{marginLeft: 20,fontSize:18,fontFamily: 'MyriadPro-Semibold',color: '#686668'}}> 9666777809</Text>
                                </Button>
                                    

          </View>
          <View style={styles.holder}>
              <Button large transparent textStyle={{color: '#4285f4'}} onPress={() => Communications.email(['support@transin.in'],null,null,'Support Request','Body Text')}>
                                    <Icon style={{padding: 0, fontSize: 40, borderRadius:5,color: '#4285f4'}} name="md-mail" />
                                    <Text style={{marginLeft: 20,fontSize:18, fontFamily: 'MyriadPro-Semibold',color: '#686668'}}>support@transin.in</Text>
                                </Button>
          </View>
          <View style={styles.holder}>
              <Button large transparent textStyle={{color: '#4285f4'}} onPress={() => Communications.text('9912487505')}>
                                    <Icon style={{padding: 0, fontSize: 40, borderRadius:5,color: '#4285f4'}} name="ios-mail-open" />
                                    <Text style={{marginLeft: 20,fontSize:18, fontFamily: 'MyriadPro-Semibold',color: '#686668'}}> 9666777809</Text>
                                </Button>
          </View>
          <View style={styles.holder}>
              <Button large transparent textStyle={{color: '#4285f4'}} onPress={() => Communications.web('http://www.transin.in/')}>
                                    <Icon style={{padding: 0, fontSize: 40, borderRadius:5,color: '#4285f4'}} name="md-globe" />
                                    <Text style={{marginLeft: 20,fontSize:18, fontFamily: 'MyriadPro-Semibold', color: '#686668'}}>www.transin.in</Text>
                                </Button>
          </View>
           
           {/* <View style={styles.holder}>
            <Text> Address </Text>
            <Text>TRANSIN LOGISTICS
            Plot no- 623/G, Rd no-35, Jubilee Hills,
            Hyderabad - 500033. </Text>
          </View> */}
        </ScrollView>
      </View>
      
                </Content>

        )
    }
}

/* Export Component ====================================================================  */

export default ContactView;

// export default connect(mapStateToProps, mapDispatchToProps)(ContactView);
