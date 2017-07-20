/**
 * Menu Contents
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import {
    View,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image,
    AsyncStorage,
} from 'react-native';
import { Container, Content, Text, List, ListItem, Left, Body, Right, Switch, Radio, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../resources/fonts/selection.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig);
import Ionicon from 'react-native-vector-icons/Ionicons';


// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Components
import { Spacer, Button } from '@ui/';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
/* Styles ==================================================================== */
const MENU_BG_COLOR = '#fff';

const styles = StyleSheet.create({
    backgroundFill: {
        backgroundColor: MENU_BG_COLOR,
        height: AppSizes.screen.height,
        width: AppSizes.screen.width,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    container: {
        position: 'relative',
        flex: 1,
    },
    menuContainer: {
        flex: 1,
        left: 0,
        right: 0,
        backgroundColor: MENU_BG_COLOR,
    },

    // Main Menu
    menu: {
        flex: 3,
        left: 0,
        right: 0,
        backgroundColor: MENU_BG_COLOR,
        paddingTop: AppSizes.statusBarHeight,
    },
    
    menuItem: {
    },

    menuItem_text: {
        fontSize: 12,
        fontWeight: '500',
        color: '#EEEFF0',
    },

    // Menu Bottom
    menuBottom: {
        flex: 1,
        left: 0,
        right: 0,
        justifyContent: 'flex-end',
    },
    
    menuBottom_text: {
        color: '#EEEFF0',
    },

    sidebar: {
        flex: 1,
        backgroundColor: '#fff',
    },

    drawerCover: {
        alignSelf: 'stretch',
        // resizeMode: 'cover',
        height: SCREEN_HEIGHT / 3.5,
        width: null,
        position: 'relative',
    },
    
    drawerImage: {
        // left: (Platform.OS === 'android') ? 30 : 40,
        // top: (Platform.OS === 'android') ? 45 : 55,
        left: SCREEN_WIDTH*0.1,
        top: SCREEN_HEIGHT / 10,
        width: SCREEN_WIDTH*0.5,
        height: 50,
        resizeMode: 'contain'
    },

    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    listItem: {
        paddingTop: 0,
        backgroundColor: 'red',
    },

    iconContainer: {
        width: 37,
        borderRadius: 18,
        marginRight: 12,
        paddingTop: 7,
    },

    sidebarIcon: {
        fontSize: 21,
        color: '#fff',
        lineHeight: 21,
        backgroundColor: 'transparent',
    },

    text: {
        fontSize: 12,
    },

    badgeText: {
        fontSize: 11,
        marginTop: -3,
    }
});

/* Component ==================================================================== */
class Menu extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired,
        closeSideMenu: PropTypes.func.isRequired,
        user: PropTypes.shape({
            name: PropTypes.string,
        }),
    }

    constructor() {
        super();

        this.state = {
            menu: [{
                title: 'Recipes',
                onPress: () => { this.props.closeSideMenu();
                    Actions.app(); },
            }, {
                title: 'Example Link',
                onPress: () => { this.props.closeSideMenu();
                    Actions.comingSoon(); },
            }, ],
        };
    }

    login = () => {
        this.props.closeSideMenu();
        Actions.login();
    }

    logout = () => {
        if (this.props.logout) {
            this.props.logout()
                .then(() => {
                    this.props.closeSideMenu();
                    Actions.login();
                }).catch(() => {
                    Alert.alert('Oh uh!', 'Something went wrong.');
                });
        }
    }


    tempLogout = async() => {
        // Get user data from AsyncStorage to populate fields
        const values = await AsyncStorage.setItem('userData', '');
        if (values === null) {
            this.props.closeSideMenu();
            Actions.authenticate({ type: 'reset' });
        }
        else{
            Actions.authenticate({ type: 'reset' });

        }
        
    }
     gotoContact = (data) => {
            this.props.closeSideMenu();
            Actions.contact();
    }
     gotoMapView = () => {
            this.props.closeSideMenu();
            Actions.TrucksMapView();
    }
    gotoListOfTrucks = () => {
            this.props.closeSideMenu();
            Actions.TrucksListView();
    }
    gotoComingSoon = () => {
        this.props.closeSideMenu();
        Actions.ComingSoon();
    }

    gotoSettings = () => {
        this.props.closeSideMenu();
        Actions.settings();
    }


    render = () => {
        const { menu } = this.state;

        // Build the actual Menu Items
        const menuItems = [];
        menu.map((item) => {
            const { title, onPress } = item;

            return menuItems.push(
                <TouchableOpacity
          key={`menu-item-${title}`}
          onPress={onPress}
        >
          <View style={[styles.menuItem]}>
            <Text >
              {title}
            </Text>
          </View>
        </TouchableOpacity>,
            );
        });

        return (
            <View style={[styles.container]}>
                <Content>
                    <Image  source={require('../../../images/login.png')} style={styles.drawerCover}>
                        <Image square style={styles.drawerImage}
                            source={require('../../../images/sidebar_logo.png')} />
                    </Image>
                    <List>
                        <ListItem icon style={{ borderBottomWidth: 1, borderBottomColor: '#e9e9e9', height: 50, margin: 0, alignItems: 'flex-start' }} onPress={() => this.gotoMapView()}>                         
                            <Left style={{ position: 'absolute', left: 20, paddingTop: 0 }}>
                                <Text style={{ fontSize: 18 ,  fontFamily: 'MyriadPro-Regular', }}>Track Trucks</Text>
                            </Left>
                            <Right style={{ borderBottomWidth: 0, position: 'absolute', right: 20, paddingTop: 0 }}>
                                <Icon style={{color: '#157efb', fontSize: 24}} name="truck_track_icon" />
                            </Right>
                        </ListItem>
                        <ListItem icon style={{ borderBottomWidth: 1, borderBottomColor: '#e9e9e9', height: 50, margin: 0, alignItems: 'flex-start' }} onPress={() => this.gotoListOfTrucks()}>                         
                            <Left style={{ position: 'absolute', left: 20, paddingTop: 0 }}>
                                <Text style={{ fontSize: 18 ,  fontFamily: 'MyriadPro-Regular', }}>View Trucks</Text>
                            </Left>
                            <Right style={{ borderBottomWidth: 0, position: 'absolute', right: 20, paddingTop: 0 }}>
                                <Icon style={{color: '#157efb',fontSize: 24}} name="truck_new_icon" />
                            </Right>
                        </ListItem>
                        <ListItem icon style={{ borderBottomWidth: 1, borderBottomColor: '#e9e9e9', height: 50, margin: 0, alignItems: 'flex-start' }} onPress={() => this.gotoSettings()}>                         
                            <Left style={{ position: 'absolute', left: 20, paddingTop: 0 }}>
                                <Text style={{ fontSize: 18 ,  fontFamily: 'MyriadPro-Regular', }}>Settings</Text>
                            </Left>
                            <Right style={{ borderBottomWidth: 0, position: 'absolute', right: 20, paddingTop: 0 }}>
                                <Icon style={{color: '#157efb',fontSize: 24}} name="settings_icon" />
                            </Right>
                        </ListItem>
                        <ListItem icon style={{ borderBottomWidth: 1, borderBottomColor: '#e9e9e9', height: 50, margin: 0, alignItems: 'flex-start' }} onPress={() => this.gotoContact()}>                         
                            <Left style={{ position: 'absolute', left: 20, paddingTop: 0 }}>
                                <Text style={{ fontSize: 18 ,  fontFamily: 'MyriadPro-Regular', }}>Contact</Text>
                            </Left>
                            <Right style={{ borderBottomWidth: 0, position: 'absolute', right: 20, paddingTop: 0 }}>
                                <Icon style={{color: '#157efb',fontSize: 24}} name="phone-call" />
                            </Right>
                        </ListItem>
                        <ListItem icon style={{ borderBottomWidth: 1, borderBottomColor: '#e9e9e9', height: 50, margin: 0, alignItems: 'flex-start' }} onPress={() => this.gotoComingSoon()}>                         
                            <Left style={{ position: 'absolute', left: 20, paddingTop: 0 }}>
                                <Text style={{ fontSize: 18 ,  fontFamily: 'MyriadPro-Regular',  color: '#9d9b9d'}}>Tracking Options</Text>
                            </Left>
                            <Right style={{ borderBottomWidth: 0, position: 'absolute', right: 20, paddingTop: 0 }}>
                                <Icon style={{color: '#9d9b9d',fontSize: 24}} name="tracking_options_side" />
                            </Right>
                        </ListItem>
                        <ListItem icon style={{ borderBottomWidth: 1, borderBottomColor: '#e9e9e9', height: 50, margin: 0, alignItems: 'flex-start' }} onPress={() => this.gotoComingSoon()}>                         
                            <Left style={{ position: 'absolute', left: 20, paddingTop: 0 }}>
                                <Text style={{ fontSize: 18 ,  fontFamily: 'MyriadPro-Regular', color: '#9d9b9d'}}>Reports</Text>
                            </Left>
                            <Right style={{ borderBottomWidth: 0, position: 'absolute', right: 20, paddingTop: 0 }}>
                                <Icon style={{color: '#9d9b9d',fontSize: 24}} name="reports_side" />
                            </Right>
                        </ListItem>
                        <ListItem icon style={{ borderBottomWidth: 1, borderBottomColor: '#e9e9e9', height: 50, margin: 0, alignItems: 'flex-start' }} onPress={() => this.gotoComingSoon()}>                         
                            <Left style={{ position: 'absolute', left: 20, paddingTop: 0 }}>
                                <Text style={{ fontSize: 18 ,  fontFamily: 'MyriadPro-Regular', color: '#9d9b9d'}}>Alerts</Text>
                            </Left>
                            <Right style={{ borderBottomWidth: 0, position: 'absolute', right: 20, paddingTop: 0 }}>
                                <Icon style={{color: '#9d9b9d',fontSize: 24}} name="alert_side" />
                            </Right>
                        </ListItem>
                        <ListItem icon style={{ height: 50, margin: 0, alignItems: 'flex-start' }} onPress={this.tempLogout}>                         
                            <Left style={{ position: 'absolute', left: 20, paddingTop: 0 }}>
                                <Text style={{ fontSize: 18 ,  fontFamily: 'MyriadPro-Regular', }}>Logout</Text>
                            </Left>
                            <Right style={{ borderBottomWidth: 0, position: 'absolute', right: 20, paddingTop: 0 }}>
                                <Ionicon style={{color: '#157efb',fontSize: 24}} name="md-log-out" />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </View>
        );
    }
}

/* Export Component ==================================================================== */
export default Menu;
