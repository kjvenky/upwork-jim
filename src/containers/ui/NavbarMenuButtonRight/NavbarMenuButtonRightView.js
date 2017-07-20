/**
 * Navbar Menu Button
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app	
 */
import React, { PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-elements';
import { Icon,} from 'native-base';
import { Actions } from 'react-native-router-flux';


/* Component ==================================================================== */
const NavbarMenuButtonRight = ({ toggleSideMenu }) => (
  <TouchableOpacity
    onPress ={() =>{Actions.ComingSoon();}}
    activeOpacity={0.7}
    style={{top: 2 }}
    hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
  >
    <Icon name='ios-notifications'  style={{ marginTop: -2, marginRight: 5, marginLeft: 2,fontSize: 28, color: '#FFF'}}  />
  </TouchableOpacity>
);

NavbarMenuButtonRight.propTypes = {
  toggleSideMenu: PropTypes.func.isRequired,
};

/* Export Component ==================================================================== */
export default NavbarMenuButtonRight;
