import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Container, Content, List, ListItem, Thumbnail, Text, Header, Title, Button, Left, Right, Body ,Spinner} from 'native-base';
import MapView from 'react-native-maps';
const { width, height } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { TabIcon } from '@ui/';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../resources/fonts/selection.json';
const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig);
// import Spinner from 'react-native-loading-spinner-overlay';
import Ionicon from 'react-native-vector-icons/Ionicons';

const ASPECT_RATIO = width / height;
const LATITUDE = 17.42;
const LONGITUDE = 78.35;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_WS_URL = 'ws://35.154.107.84:8082/api/socket'
const DEFAULT_HTTP_URL = 'http://35.154.107.84:8082/api/socket'

const WS_EVENTS = [
    'close',
    'error',
    'message',
    'open',
];

const WS_STATES = [
    /* 0 */
    'CONNECTING',
    /* 1 */
    'OPEN',
    /* 2 */
    'CLOSING',
    /* 3 */
    'CLOSED',
];


class TruckView extends React.Component {
    state: State = {
      url: DEFAULT_WS_URL,
      httpUrl: DEFAULT_HTTP_URL,
      fetchStatus: null,
      socket: null,
      socketState: null,
      lastSocketEvent: null,
      lastMessage: null,
      outgoingMessage: '',
      visible: false,
      coordinate: {},
      speed: null,
      region:{}
    };

    constructor(props) {
      super(props);
    }
    
    // getInitialState() {
    //   return {
    //     region: new MapView.AnimatedRegion({
    //       latitude: LATITUDE,
    //       longitude: LONGITUDE,
    //       latitudeDelta: LATITUDE_DELTA,
    //       longitudeDelta: LONGITUDE_DELTA,
    //     }),
    //   };
    // }

    // https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/js/WebSocketExample.js 
    // http://stackoverflow.com/questions/37246446/sending-cookies-with-react-native-websockets
    _connect = async() => {
        const values = await AsyncStorage.getItem('userData');
        const jsonValues = JSON.parse(values);
        const socket = new WebSocket(this.state.url, '', { Cookie: jsonValues.sessionToken });
        
        WS_EVENTS.forEach(ev => socket.addEventListener(ev, this._onSocketEvent));

        this.setState({
          socket,
          socketState: socket.readyState,
        });
    };

    _onSocketEvent = (event: any) => {
        const state: any = {
            socketState: event.target.readyState,
            lastSocketEvent: event.type,
        };

        if(event.type === 'open'){
          this._onSocketOpen(event)
        }
        else if (event.type === 'message') {
          state.lastMessage = event.data
          event_data = JSON.parse(event.data)

          if(event_data.hasOwnProperty('positions') ){ // There are message related to devices also
              // Get the event data
              // First position set the region and cordinate
              if(event_data.positions[0].deviceId == this.props.truckData.deviceId){
                // console.log(event_data.positions[0])
                // Manage region on update
                // Handle manual movement of the map
                let region = {}
                if(_.isEmpty(this.state.region)){
                    region = {
                      latitude : event_data.positions[0].latitude,
                      longitude : event_data.positions[0].longitude,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA
                    }
                }else{
                  region = this.state.region
                }

                this.setState({
                  region: region,
                  coordinate:{
                    latitude : event_data.positions[0].latitude,
                    longitude : event_data.positions[0].longitude
                  },
                  visible: true,
                  speed: event_data.positions[0].speed,
                  time: event_data.positions[0].deviceTime,
                })
                
              }
          }
        }

    };

    _updatePosition = () => {

    }

    _onSocketOpen = (event: any) => {
    }

    _disconnect = () => {
        if (!this.state.socket) {
            return;
        }
        this.state.socket.close();
    };

    componentWillMount = () => {
        // this._connect()

        // Also setup the initila latitude and logitude
    }

    componentDidMount = () => {
    }

    componentWillUnmount = () => {
         // this._disconnect()
    }

    gotoHome = () => {
            Actions.app();
      // console.log(this.props.currentScrren)
      // if(this.props.currentScrren == '1'){
      //   Actions.TrucksMapView();
      // }
      // else{
      //   Actions.TrucksListView();
      // }
        // Actions.pop();
    }

    updateMapRegion = (region) => {
       this.setState({ region: region })
    }

    // Handle if the coordinate is not in the specified region
    render() {
        const truckData = this.props.truckData;
        console.log(truckData)
        return (
                <Container style={styles.container}>
                    <Header style={{backgroundColor: '#157efb'}}>
                        <Left>
                            <TouchableOpacity onPress={()=> this.gotoHome()}>
                                <Icon name={ 'arrow-back'} size={32} color={ '#fff'} />
                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Title> Live Tracking </Title>
                        </Body>
                    </Header>
                    <Content>
                        <View>
                            <MapView ref={ref=> { this.map = ref; }} style={styles.map} initialRegion={{ latitude: truckData.latitude, longitude: truckData.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA, }} style={styles.map} >
                                <MapView.Marker identifier="Marker1" coordinate={{latitude: truckData.latitude, longitude: truckData.longitude}}>
                                    <Text style={{ fontSize: 10, color: '#fff', fontWeight: 'bold', paddingHorizontal: 6, borderRadius: 2, paddingVertical: 3, backgroundColor: '#157efc', justifyContent: 'center'}}>
                                        {truckData.attributes.vehicleId.substr(truckData.attributes.vehicleId.length-4, truckData.attributes.vehicleId.length) }</Text>
                                </MapView.Marker>
                            </MapView>
                        </View>
                        <View>
                            <List>
                                <ListItem>
                                    <CustomIcon name={ 'shape_3_copy_2'} size={50} style={{ alignSelf: 'center', paddingTop: 5, marginHorizontal: 5,}} color={ '#5b5b5b'} />
                                    <Body>
                                        <Text style={{fontWeight: 'bold'}}> {truckData.attributes.vehicleId.substr(0, 2)} {truckData.attributes.vehicleId.substr(2, 2)} {truckData.attributes.vehicleId.substr(4,2)} {truckData.attributes.vehicleId.substr(6,4)} </Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Ionicon name={ 'ios-speedometer'} size={50} style={{ alignSelf: 'center', paddingTop: 5, marginHorizontal: 5,}} color={ '#5b5b5b'} />
                                    <Body>
                                        <Text note>Vehicle Speed</Text>
                                        <Text>{this.state.speed ? (this.state.speed * 1.852).toFixed(2): (truckData.speed*1.852).toFixed(2) } KM/H</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Ionicon name={ 'ios-battery-charging-outline'} size={50} style={{ alignSelf: 'center', paddingTop: 5, marginHorizontal: 5,}} color={ '#5b5b5b'} />
                                    <Body>
                                        <Text note>Battery Status</Text>
                                        <Text>{truckData.attributes.power?truckData.attributes.power: 'NA'} {truckData.attributes.io239? truckData.attributes.io239: null }</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <CustomIcon name={ 'tuck_locaton_detail'} size={50} style={{ alignSelf: 'center', paddingTop: 5, marginHorizontal: 5,}} color={ '#5b5b5b'} />
                                    <Body>
                                        <Text note>Last Location</Text>
                                        <Text> {this.state.address ? this.state.address : truckData.address }</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Ionicon name={ 'ios-timer'} size={50} style={{ alignSelf: 'center', paddingTop: 5, marginHorizontal: 5,}} color={ '#5b5b5b'} />
                                    <Body>
                                        <Text note>Last Tracked Time</Text>
                                        <Text> {this.state.time ? this.state.time : truckData.deviceTime }</Text>
                                    </Body>
                                </ListItem>
                            </List>
                        </View>
                    </Content>
                </Container>
          );
    }
}

TruckView.propTypes = {
    provider: MapView.ProviderPropType,
};

module.exports = TruckView;
