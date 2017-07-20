                                                                                                                                                                                        import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    StatusBar,
    InteractionManager,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import { 
    Button,
    Text,
    Badge,
    List,
    ListItem,
    Left,
    Container,
    Content, Spinner, Card,Icon, CardItem, Body, Grid, Col } from 'native-base';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../resources/fonts/selection.json';
const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig);

import { Actions } from 'react-native-router-flux';
import { AppStyles, AppSizes } from '@theme/';
import { Spacer, } from '@ui/';
import MapView from 'react-native-maps';
const supercluster = require('supercluster');

//  Clusterview code https://gitlab.com/transin/clustering/commit/fbb447304722a89ec8ae116aa9f76f09dc2ba1bf#fa686b63225c10f1fe5ef141ae7f74dd8880a424_22_27 ,
// http://github.com/furkancelik/react-native-map-clustering-example/blob/master/app/index.js 

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = width / height;
const LATITUDE = 17.35;
const LONGITUDE = 78.92;
const LATITUDE_DELTA = 20;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Actions
import * as PositionsActions from '@redux/positions/actions';
import * as DevicesActions from '@redux/devices/actions';

import _ from 'lodash'
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
    positionsData: state.positions,
    devicesData: state.devices,
});
// Any actions to map to the component?
const mapDispatchToProps = {
  getDevices: DevicesActions.getDevices,
  getPositions: PositionsActions.getPositions,
};
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
/* Component ==================================================================== */
class TrucksMapView extends Component {
    static componentName = 'TrucksMapView';

    // state: State = {
      
    // };

    constructor(props) {
        super(props);
        this.counter = 0;
        this.state = {
            region:{
          latitude : LATITUDE,
          longitude : LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        truck_locations: null,
        clusters: null,
        mapType: "standard",
        positionsData: [],
        zoom: null,      
        markers: {},
        showProgress : false,
      };
	   }

    componentWillMount = () => {
      let truck_locations = this.convertMergedList();
      let clusters = this.createCluster(truck_locations);

      // Calculate the region based on the cluster data
      let region = {}
      if(_.isEmpty(this.state.region)){
        region = {
          latitude : LATITUDE,
          longitude : LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      }else{
        region = this.state.region;
      }

      this.setState({
          truck_locations: truck_locations,
          region: region,
          clusters: clusters
      });

    }

   updateData = async() => {
        this.setState({
            showProgress: true,
        });
        // Get user data from AsyncStorage to populate fields
        const values = await AsyncStorage.getItem('userData');
        const jsonValues = JSON.parse(values);

        if (values !== null) {
          //Devices
          // this.props.getDevices(jsonValues, true).then(() => {
          //   // Actions.app({ type: 'reset' });
          //   }).catch((err) => {
          //       this.setState({ resultMsg: { error } });
          //   });

            this.props.getPositions(jsonValues, true).then(() => {
                this.setState({
                  showProgress: false,
                });
                console.log(this.state.showProgress)
                this.componentWillMount();
                this.render();
                
            }).catch((err) => {
                this.setState({ resultMsg: { error } });
            });
            // this.state.showProgress = fasle;
           
        }
        else {
          Actions.authenticate({ type: 'reset' });
        }
    }

    _getMarkers = (clusters, region ) =>  {
      return this.createRegions(clusters, region.latitude, region.longitude);
    }

    createCluster(data) {
      const index = supercluster({
        radius: 40,
        maxZoom: 17,
        extent: 256
      });
      index.load(data.features);
      return index;
    }

    convertMergedList() {
    	const positionsData = this.props.positionsData;
    	const devicesData = this.props.devicesData;
    	
      //Merging positions and devices data 
    	const mergedList = _.map(positionsData, function(item) {
    		return _.merge({}, item, _.find(devicesData, ['id', item.deviceId]));
    	});
    	
      const results = {
         type: 'MapCollection',
         features: [],
       };
       mergedList.map((value, key) => {
         array = {
           type: 'Map',
           properties: value,
           geometry: {
             type: 'Point',
             coordinates: [
               value.longitude,
               value.latitude,
             ],
           },
         };
         results.features.push(array);
       });

       return results;
    }

    getZoomLevel(region = this.state.region) {
        const angle = region.longitudeDelta;
        const level = Math.round(Math.log(360 / angle) / Math.LN2);
        return level;
    }

    createRegions(clusters, latitude, longitude, zoom) {
        const padding = 0;
        zoom = zoom || this.getZoomLevel();
        const markers = clusters.getClusters([
          longitude - (this.state.region.longitudeDelta * (0.5 + padding)),
          latitude - (this.state.region.latitudeDelta * (0.5 + padding)),
          longitude + (this.state.region.longitudeDelta * (0.5 + padding)),
          latitude + (this.state.region.latitudeDelta * (0.5 + padding)),
        ], zoom);
        return markers.map((marker, index) => this.renderMarkers(marker, index));
    }

    onPressCard = (data) => {
      Actions.trucksDetails({
        truckData: data,
      });
    }
    
    setMapType = () => {
          if (this.state.mapType == "standard") {
              this.setState({ mapType: "hybrid" });
          } else {
              this.setState({ mapType: "standard" });
          }
    }
  
    getZoomedRegion = (marker, lowestLat, highestLat, lowestLong, highestLong ) =>{

      let latitudeDeltaFromLat = (parseFloat(highestLat.geometry.coordinates[1]) - parseFloat(lowestLat.geometry.coordinates[1])) * 1.8;
      let longitudeDeltaFromLong = (parseFloat(highestLong.geometry.coordinates[0]) - parseFloat(lowestLong.geometry.coordinates[0])) * 1.8;
      let region =  {
            latitude : marker.geometry.coordinates[1],
            longitude : marker.geometry.coordinates[0]
          }

      if (latitudeDeltaFromLat > (longitudeDeltaFromLong/ASPECT_RATIO)) {
          region.latitudeDelta = latitudeDeltaFromLat,
          region.longitudeDelta = latitudeDeltaFromLat * ASPECT_RATIO
      } else {
          region.latitudeDelta = latitudeDeltaFromLat,
          region.longitudeDelta = latitudeDeltaFromLat * ASPECT_RATIO
      }
    
      return region
    }

    // works only for India as all the coordinates are always positive
    // Change this to get the bbox directly
    // Why is lodash now working? Make this simpler
    getMinMax = (leaves, index) => {
        let minLeaf = maxLeaf =  {};
        let maxVal = 0;
        let minVal = 200; 

        _.forEach(leaves, function(leaf) {
          val = parseFloat(leaf.geometry.coordinates[index])
          
          if( val > maxVal) {
            maxVal = val;
            maxLeaf =  leaf;
          }

          if( val < minVal ) {
            minVal = val;
            minLeaf = leaf;
          }
        });

        return [ minLeaf, maxLeaf ]
    }

    onPressCluster= (marker) => {
        clusters = this.state.clusters;
        let tempLeaves = clusters.getLeaves(marker.properties.cluster_id, marker.properties.clusters.zoom+1, limit= Infinity);
        let [ lowestLat, highestLat ] = this.getMinMax(tempLeaves, 1)
        let [ lowestLong, highestLong ] = this.getMinMax(tempLeaves, 0)
        
        region = this.getZoomedRegion(marker, lowestLat, highestLat, lowestLong, highestLong )  
        this.map.animateToRegion(region, 800);
    }

    onRegionChangeComplete = (region) => {
      this.setState({ region })      
    }

    renderMarkers(marker, index) {
        if(marker.properties.point_count) {
            return(
              <MapView.Marker
                key={index}
                coordinate={{
                  longitude: marker.geometry.coordinates[0],
                  latitude: marker.geometry.coordinates[1],
                }}
                onPress={() => this.onPressCluster(marker)}
                >
                <View style={styles.circle}>
                  <Text style={{color:"#fff",fontWeight:'bold'}}>{marker.properties.point_count}</Text>
                </View>
                                  <MapView.Callout  style={styles.callout} >
                                  </MapView.Callout>
              </MapView.Marker>
            );
        } else {
          let tempColor= "#157efc";
          let tempIcon = require('../../images/list_running_truck.png');
          let tempStatus ="RUNNING";
            
          if(marker.properties.speed <= 0 && (marker.properties.attributes.io239 == 0 || marker.properties.attributes.ignition == false))
          {
              tempColor= "#ff3f00";
              tempIcon = require('../../images/list_stop_truck.png');
              tempStatus ="HALT";
          }
          else if(marker.properties.speed > 0 && (marker.properties.attributes.io239 == 1  || marker.properties.attributes.ignition == true))
          {
              tempColor= "#157efc";
              tempIcon = require('../../images/list_running_truck.png');
              tempStatus ="RUNNING";
          }
          else if(marker.properties.speed <= 0 && (marker.properties.attributes.io239 == 1  || marker.properties.attributes.ignition == false))
          {
              tempColor= "grey";
              tempIcon = require('../../images/truck_no.png');
              tempStatus ="NOT WORKING";
              //Halt
          }
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                longitude: marker.geometry.coordinates[0],
                latitude: marker.geometry.coordinates[1],
              }}
              >
              <Text key={index} style={{ fontSize: 10, color: '#fff', fontWeight:'bold', paddingHorizontal: 6, borderRadius: 2, paddingVertical: 3, backgroundColor: tempColor, justifyContent: 'center'}}>
                              {marker.properties.attributes.vehicleId.substr(marker.properties.attributes.vehicleId.length-4, marker.properties.attributes.vehicleId.length) }</Text>
  						<MapView.Callout style={styles.callout} onPress={() => this.onPressCard(marker.properties)}>
          			<Grid style={styles.calloutGrid}>
          				<Col style={{ width: AppSizes.screen.width*0.8*0.2, justifyContent: 'center' }}>
          					<View style={{width: AppSizes.screen.width*0.8*0.12, height: AppSizes.screen.width*0.8*0.12, borderRadius:25, backgroundColor: tempColor, marginHorizontal: AppSizes.screen.width*0.8*0.04  }}>
          						<CustomIcon name={'shape_3_copy_2'} size={25} style={{ alignSelf:'center', paddingTop: 5}} color={'#fff'} />
          					</View>
          					<Text style={{fontSize: 9, marginTop: 2, fontWeight:'bold',color: tempColor, alignSelf:'center', justifyContent: 'center'}}> {tempStatus} </Text>  
          				</Col>
          				<Col style={{ width: AppSizes.screen.width*0.8*0.5 }}>
          					<Text style={{fontSize:16, fontWeight:'bold',color:'#5d5d5d'}}>{marker.properties.attributes.vehicleId} </Text>
          					<Text style={{fontSize:10, color:'#7f7f7f'}} > {marker.properties.address}</Text>
          				</Col>
          				<Col style={{width:AppSizes.screen.width*0.8*0.3, marginHorizontal:6, marginLeft:0, }}>
          					<List style={{ borderWidth:0 }}>
          						<ListItem style={{paddingTop:0, paddingBottom:0, marginLeft:0,borderBottomWidth: 0,  alignSelf: 'flex-end' }}>
          							<Icon ios='ios-speedometer-outline' android="ios-speedometer-outline" style={{fontSize: 14, color: 'green', marginRight: 2 }}/>
          							<Text style={{fontSize: 10, color:'green', fontWeight: '500'}}> <Text style={{ fontWeight: '900', color: 'green', fontSize: 12}}>{(marker.properties.speed * 1.854).toFixed(2)}</Text> KM/H </Text>
          						</ListItem>
          						<ListItem style={{paddingTop:0, paddingBottom:0, marginLeft:0,marginTop: 2, borderBottomWidth: 0, alignSelf: 'flex-end' }}>
          							<Text style={{ backgroundColor: 'green', borderRadius: 2, borderBottomWidth: 0, paddingHorizontal: 6, paddingVertical: 3 }}>
          								<Text style={{ color: 'white', fontSize: 10, fontWeight: '700' }}> GPS </Text>
          								<Icon ios='ios-radio-outline' android="ios-radio-outline" style={{fontSize: 10, color: 'white'}}/>
          							</Text>
          						</ListItem>
          					</List>
          				</Col>
          			</Grid>
  		        </MapView.Callout>
            </MapView.Marker>
          );
        }
    }

    render = () => {
      console.log(this.state.region)
        if (!this.props.positionsData.length || this.props.positionsData.length < 1 || this.state.showProgress) {
            return (<Container>
                <Content>
                    <ActivityIndicator  style={styles.centering} size="large" />
                </Content>
            </Container>)
        }

      let markers = this._getMarkers(this.state.clusters, this.state.region)
      return(
        <View style={styles.container}>
          <StatusBar
             backgroundColor="#0060d1"
             barStyle="light-content"
           />
          <MapView
             ref={ref => { this.map = ref; }}
             style={styles.map}
             mapType={this.state.mapType}
             rotateEnabled= {false}
             onRegionChangeComplete={this.onRegionChangeComplete}
             initialRegion={{
                latitude : LATITUDE,
                longitude : LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
             }}
             moveOnMarkerPress={false}
            >
            { markers }
          </MapView>
          <View style={styles.buttonContainer}>
                          <Button light onPress={()=> this.setMapType()}>
                              <Text>{this.state.mapType == "standard" ? "Satellite" : "Standard"}</Text>
                          </Button>
                          <Button onPress={()=> this.updateData()} style={{backgroundColor: 'rgba(21, 126, 251, 0.8)'}}>
                              <Icon name='refresh' />
                          </Button>
          </View>
        </View>
      )
    }

}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    background: {
        backgroundColor: 'transparent',
        height: AppSizes.screen.height,
        width: AppSizes.screen.width,
    },
    logo: {
        width: AppSizes.screen.width * 0.85,
        resizeMode: 'contain',
    },
    whiteText: {
        color: '#FFF',
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        width: AppSizes.screen.width,
        height: AppSizes.screen.height,

        },
    scrollview: {
        alignItems: 'center',
    },
    map: {
        marginVertical: 50,
        ...StyleSheet.absoluteFillObject,
    },
    callout: {
        width: AppSizes.screen.width * 0.8,
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderRadius: 40,
        marginVertical: 0,
        marginHorizontal: 0,
        borderWidth: 0,
    },
    calloutGrid: {
        paddingHorizontal: 0,
        paddingVertical: 5,
        marginVertical: 0,
        marginHorizontal: 0,
        borderWidth: 0,
        alignItems: 'center'
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    buttonContainer: {
      paddingTop : 60,
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'flex-end',
      marginRight: 4,
        
    },
    markerText: {
        position: 'absolute',
        width: 250,
        marginVertical: 8,
        backgroundColor: 'transparent',
    },
  circle: {
    backgroundColor:"rgba(21, 126, 251, 0.8)",
    width:30,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:15,
    height:30,
    borderWidth:1,
    borderColor:"rgba(21, 126, 251, 0.6)",
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  }
});
/* Export Component ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(TrucksMapView);
