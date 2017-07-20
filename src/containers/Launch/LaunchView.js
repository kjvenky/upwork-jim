/**
 * Launch Screen
 *  - Shows a nice loading screen whilst:
 *  - Checking if user is logged in, and redirects from there
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';


/* Styles ==================================================================== */
const styles = StyleSheet.create({
  launchImage: {
    width: AppSizes.screen.width,
    height: AppSizes.screen.height,
  },
});

/* Component ==================================================================== */
class AppLaunch extends Component {
  static componentName = 'AppLaunch';

  static propTypes = {
    login: PropTypes.func.isRequired,
  }

  // componentDidMount = () => {
  //   // Show status bar on app launch
  //   StatusBar.setHidden(false, true);

  //   // Try to authenticate based on existing token
  //   this.props.login()
  //     // Logged in, show index screen
  //     .then(() => Actions.app({ type: 'reset' }))
  //     // Not Logged in, show Login screen
  //     .catch(() => Actions.authenticate({ type: 'reset' }));
  //     // .catch(() => Actions.app({ type: 'reset' })); 
  // }
  

    // componentDidMount = async() => {
    //     const values = await AsyncStorage.getItem('userData');
    //     console.log(values)
    //     if (values !== null) {
    //        Actions.app({ type: 'reset' });
    //     }
    //     else {
    //       Actions.authenticate({ type: 'reset' });
    //     }
    // }

     componentDidMount = async() => {
        // Get user data from AsyncStorage to populate fields
        const values = await AsyncStorage.getItem('userData');
        const jsonValues = JSON.parse(values);

        if (values !== null) {
          //Devices
          this.props.getDevices(jsonValues, true).then(() => {
            // Actions.app({ type: 'reset' });
               this.props.getPositions(jsonValues, true).then(() => {
                  setTimeout(() => {
                  Actions.app({ type: 'reset' });
                }, 8000);
              }).catch((err) => {
                  this.setState({ resultMsg: { error } });
              });
              
            }).catch((err) => {
                this.setState({ resultMsg: { error } });
            });

           
        }
        else {
          Actions.authenticate({ type: 'reset' });
        }
    }


  render = () => (
    <View style={[AppStyles.container]}>
      <Image source={require('../../images/loader.gif')} style={[styles.launchImage, AppStyles.containerCentered]} /> 
    </View>
  )

}

/* Export Component ==================================================================== */
export default AppLaunch;
