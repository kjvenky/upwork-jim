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
    ToastAndroid,
    Keyboard,
} from 'react-native';
import { Container, Badge, Text, Button, Content, Form, Item, Input, Label, Icon, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';
// Components
import { Alerts, Spacer } from '@ui/';
import * as DevicesActions from '@redux/devices/actions';
import * as PositionsActions from '@redux/positions/actions';

import AppAPI from '@lib/api';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    devicesData: state.devices,
});
// Any actions to map to the component?
const mapDispatchToProps = {
    getDevices: DevicesActions.getDevices,
  getPositions: PositionsActions.getPositions,


};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    background: {
        backgroundColor: 'transparent',
        height: AppSizes.screen.height,
        width: AppSizes.screen.width,
    },
    logo: {
        width: AppSizes.screen.width * 0.35,
        resizeMode: 'contain',
    },
    whiteText: {
        color: '#FBFAFA',
    },
    form:{
      paddingHorizontal: 0,
      marginHorizontal: AppSizes.screen.width*0.05,
    },
    bg: {
        backgroundColor: 'transparent',
        width: AppSizes.screen.width
    },
    container: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FBFAFA',
    }

});
/* Component ==================================================================== */
class Authenticate extends Component {
    static componentName = 'Authenticate';

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            resultMsg: { status: '', success: '', error: '', },
            loading_status: false,
            showToast: true,
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

    login = () => {
        this.setState({ loading_status: true });

        // let credentials = { "email": this.state.email, "password": this.state.password }
        this.props.getDevices({ "email": this.state.email, "password": this.state.password }, false).then((responseJson) => {

          this.props.getPositions({ "email": this.state.email, "password": this.state.password }, false).then(() => {
                //console.log()
            this.setState({
                resultMsg: { success: 'Awesome, you\'re now logged in!' },
                loading_status: false
            });          
            Actions.app();

            }).catch((err) => {
                this.setState({ resultMsg: { error } });
            this.setState({ resultMsg: { error: 'Please check your credentials' }, loading_status: false });
            ToastAndroid.show('Please check your credentials', ToastAndroid.SHORT);
            });

        }).catch((err) => {
            console.log(err,'Failing in login page')
            // const error = AppAPI.handleError(err);
            this.setState({ resultMsg: { error: 'Please check your credentials' }, loading_status: false });
            ToastAndroid.show('Please check your credentials', ToastAndroid.SHORT);
            
             
        });
    }



    render = () => {
        // const Form = FormValidation.form.Form;
        return (
            <View>
              <ScrollView>
                      <Image source={require( '../../images/login.png')} style={[ styles.background]}>
                          <View style={AppStyles.containerCentered}>
                              <Image source={require( '../../images/logo.png')} style={[styles.logo]} />
                              <View style={styles.bg}>
                                  <Form style={{paddingHorizontal: 0,}}>
                                      <Item style={{ paddingVertical: 4, width: AppSizes.screen.width * 0.9,  marginHorizontal:  AppSizes.screen.width* 0.05, borderColor: 'rgba(255, 255, 255, 0.3)'}}>
                                        <MaterialIcon  style={{color: '#fff', fontSize: 35}}  name='person-outline' />
                                        <Input style={{color: '#fff', fontSize: 18,marginLeft: 15, fontFamily: "MyriadPro-Light",}} placeholderTextColor="white" placeholderStyle={{color:"white"}}  placeholder='Email' onChangeText={(email) => this.setState({email})} />
                                      </Item>
                                      <Item style={{ paddingVertical: 4, width: AppSizes.screen.width * 0.9,  marginHorizontal:  AppSizes.screen.width* 0.05,  borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                                        <MaterialIcon style={{color: '#fff', fontSize: 35}} name='lock-outline' />
                                        <Input style={{color: '#fff', fontSize: 18,marginLeft: 15, fontFamily: "MyriadPro-Light",}}  placeholderTextColor="white" secureTextEntry={true} placeholder='Password' onChangeText={(password) => this.setState({password})}  onSubmitEditing={this.login} />
                                      </Item>
                                  </Form>
                              </View>
                          </View>
                          <Spacer size={50} />
                          
                          <Button rounded block onPress={this.login} style={{ backgroundColor: '#ff3366', marginHorizontal:  AppSizes.screen.width* 0.05, height: 54}}>
                            <Text style={{fontFamily: 'MyriadPro-Regular',fontSize: 20}}>Sign in</Text>
                          </Button>

                          <Spacer size={10} />

                          <View style={{ alignSelf: 'center', alignItems: 'flex-end', marginHorizontal:  AppSizes.screen.width*0.05, width: AppSizes.screen.width*0.8}}>
                            {/* <Alerts style={{width: AppSizes.screen.width*0.8}}
                              status={this.state.resultMsg.status}
                              error={this.state.resultMsg.error}
                            /> */}
                               <Toast><Text>{this.state.resultMsg.error}</Text></Toast>
                          </View>
                          {this.state.loading_status &&
                            <View style={{ position: 'absolute', height: AppSizes.screen.width*0.25, backgroundColor: 'rgba(0, 0, 0, 0.25)', padding: 13,  width: AppSizes.screen.width*0.25, marginHorizontal: AppSizes.screen.width*0.375, marginVertical: AppSizes.screen.height*0.375, borderRadius: 10}}>
                              <Image source={require( '../../images/loading.gif')} ></Image>
                            </View>
                          }
                      </Image>
              </ScrollView>
            </View>

        )
    }
}

/* Export Component ====================================================================  */

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);
