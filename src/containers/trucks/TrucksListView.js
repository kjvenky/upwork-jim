import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Image,
    StyleSheet,
    ListView,
    ScrollView,
    Dimensions,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Text, List, Card, 
    CardItem,
    Thumbnail, Left, Right, Body, Grid, Col, ListItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AppStyles, AppSizes } from '@theme/';
import { Spacer } from '@ui/';
// Actions
// What data from the store shall we send to the component?
import * as PositionsActions from '@redux/positions/actions';
import _ from 'lodash'
import Octicon from 'react-native-vector-icons/Octicons';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    positionsData: state.positions,
    devicesData: state.devices,
});
// Any actions to map to the component?
const mapDispatchToProps = {
    getPositions: PositionsActions.getPositions,
};
/* Styles ==================================================================== */
const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        backgroundColor: 'red',
    },
    tabbar: {
        backgroundColor: 'green',
    },
    tabbarIndicator: {
        backgroundColor: '#FFF',
    },
    tabbar_text: {
        color: '#FFF',
    },
    
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 0
    },

    calloutGrid: {
        paddingHorizontal: 4,
        paddingVertical: 0,
        marginVertical: 0,
        marginHorizontal: 4,
        borderWidth: 0
    },
});

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = width / height;
const LATITUDE = 17.439517;
const LONGITUDE = 78.400525;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const truckImage = require('../../images/truck_detail_icon.png');

/* Component ==================================================================== */
class TrucksListView extends Component {
    static componentName = 'TrucksListView';
    static propTypes = {
        getPositions: PropTypes.func.isRequired,
    }
    
    constructor(props) {
        super(props);
        //Merging positions and devices data 
        const devicesData = this.props.devicesData;
        const mergedList = _.map(this.props.positionsData, function(item) {
            return _.merge({}, item, _.find(devicesData, ['id', item.deviceId]));
        });
        
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
        this.state = {
            dataSource: ds.cloneWithRows(mergedList)
        };
    }

    updateData = async() => {
        // Get user data from AsyncStorage to populate fields
        const values = await AsyncStorage.getItem('userData');
        const jsonValues = JSON.parse(values);

        if (values !== null) {
          //Devices
          this.props.getDevices(jsonValues, true).then(() => {
            // Actions.app({ type: 'reset' });
              setTimeout(() => {
                Actions.app({ type: 'reset' });
              }, 4000);
            }).catch((err) => {
                this.setState({ resultMsg: { error } });
            });

            this.props.getPositions(jsonValues, true).then(() => {
                //console.log()
            }).catch((err) => {
                this.setState({ resultMsg: { error } });
            });
        }
        else {
          Actions.authenticate({ type: 'reset' });
        }
    }
    
    onPressCard = (data) => {
        Actions.trucksDetails({
            truckData: data, currentScrren : '1'
        });
    }

    renderRow = (data, sectionID) => (
            <ListItem
              key={`list-row-${sectionID}`}
              onPress={()=>this.onPressCard(data)}
              title={data.attributes.vehicleId}
              subtitle= {data.name || null}
              // avatar={data.name ? { uri: '../../images/truck.png' } : null}
              avatar={require('../../images/list_running_truck.png')}
              roundAvatar={!!data.avatar}
            >
             </ListItem>
    )


    renderRowCustom = (data, sectionID) => {
        // let tempColor= "grey";
        let tempColor= "#157efb";
        // let tempIcon = require('../../images/truck_no.png');
        let tempIcon = require('../../images/list_running_truck.png');
        let tempStatus ="RUNNING";

        if(data.speed <= 0 && (data.attributes.io239 == 0 || data.attributes.ignition == false))
        {
            tempColor= "#ff3f00";
            tempIcon = require('../../images/list_stop_truck.png');
            tempStatus ="HALT";
            // Stopped
        }
        else if(data.speed > 0 && (data.attributes.io239 == 1  || data.attributes.ignition == true))
        {
            tempColor= "#157efb";
            tempIcon = require('../../images/list_running_truck.png');
            tempStatus ="RUNNING";
            //Running
        }
        else if(data.speed <= 0 && (data.attributes.io239 == 1  || data.attributes.ignition == false))
        {
            tempColor= "grey";
            tempIcon = require('../../images/truck_no.png');
            tempStatus ="NOT WORKING";
            //Halt
        }
        return (
            <Card key={`list-row-${sectionID}`} 
              style={{paddingTop: 10, marginVertical: 5, marginHorizontal: 6, borderRadius: 3, flex: 0, borderWidth: 0, paddingBottom: 15 }}>
                <CardItem onPress={()=>this.onPressCard(data)} style={{ margin: 0 , padding: 0 }} >
                        <Grid style={styles.calloutGrid}>

                                        <Col style={{ width: AppSizes.screen.width*0.15 }}>
                                            <Image source={tempIcon}  style={{ height: 45, width: 45, marginTop: 5 }}/>  
                                        {/* <Text style={{fontSize:18, fontWeight:'bold',color:'black',fontFamily: 'MyriadPro-Semibold',}}> {tempStatus} </Text>  */}                                      
                                        </Col>
                                        <Col style={{ width: AppSizes.screen.width*0.5 }}>
                                            <Text style={{fontSize:18, fontWeight:'bold',color:'#5d5d5d',fontFamily: 'MyriadPro-Semibold',}}>{data.attributes.vehicleId.substr(0, 2)} {data.attributes.vehicleId.substr(2, 2)} {data.attributes.vehicleId.substr(4,2)} {data.attributes.vehicleId.substr(6,4)} </Text>
                                            <Text style={{fontSize:12, color:'#7f7f7f',fontFamily: 'MyriadPro-Semibold',}} > {data.address}</Text>
                                        </Col>
                                        <Col style={{width: AppSizes.screen.width*0.3, marginHorizontal:6, marginLeft:0 }}>
                                            <List style={{ borderWidth:0 }}>
                                                <ListItem style={{paddingTop:0, paddingBottom:0, marginLeft:0, borderBottomWidth:0, marginTop: 2, alignSelf: 'flex-end' }}>
                                                    <Icon ios='ios-speedometer-outline' android="ios-speedometer-outline" style={{fontSize: 16, color: 'green', marginRight: 2 }}/>
                                                    <Text style={{fontSize: 10, color:'green', fontWeight: '500',fontFamily: 'MyriadPro-Semibold',}}> <Text style={{ fontWeight: '900', color: 'green', fontSize: 14}}>{(data.speed * 1.854).toFixed(2)}</Text> KM/H </Text>
                                                </ListItem>
                                                <ListItem style={{paddingTop:0, paddingBottom:0, marginLeft:0, borderBottomWidth:0, marginTop: 5, alignSelf: 'flex-end' }}>
                                                    <Text style={{ backgroundColor: 'green', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 3 }}>
                                                        <Text style={{ color: 'white', fontSize: 10, fontWeight: '700' ,fontFamily: 'MyriadPro-Semibold',}}> GPS </Text>
                                                        <Icon ios='ios-radio-outline' android="ios-radio-outline" style={{fontSize: 10, color: 'white'}}/>
                                                    </Text>
                                                </ListItem>
                                            </List>
                                        </Col>
                        </Grid>
                </CardItem>
            </Card>
    )
}


    render = () => {
    
        return (
            <View style={styles.tabContainer}>
                <ScrollView automaticallyAdjustContentInsets={false} style={[AppStyles.container]}>
                    <ListView initialListSize={2} pageSize={1} scrollRenderAheadDistance={100} style={{backgroundColor: '#fff', paddingBottom: 60, paddingTop: 10 }} renderRow={this.renderRowCustom} dataSource={this.state.dataSource} />
                </ScrollView>
            </View>
    )
}
}
/* Export Component ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(TrucksListView);
