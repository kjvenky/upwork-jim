/**
 * Tabbar Icon
 *
    <TabIcon icon={'search'} selected={false} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { PropTypes } from 'react';
// import { Icon } from 'react-native-elements';
// import { Icon,} from 'native-base';
import { AppColors } from '@theme/';
import {
    View,
    Text,
    Image,  
} from 'react-native';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../resources/fonts/selection.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const iconsMap = {
  'truck': 'truck_track_icon',
  'map': 'truck_new_icon',
  'settings': 'settings_side',
  'contact': 'phone-call',
};

/* Component ==================================================================== */
const TabIcon = ({ icon, selected, name }) => (
 
 <View >
 {/* <Image
    style={{ tintColor: selected ? '#ffffff' : '#ddd', width: 30, height: 30 , justifyContent: 'center',alignItems: 'center',}}
    source={iconsMap[icon]}
  />
  */}
    <Icon name={iconsMap[icon]} size={20} color={selected ? '#ffffff' : '#5d5d5d'}  style={{alignSelf: 'center'}}/>
    <Text style={{color: selected ? AppColors.tabbar.iconSelected : AppColors.tabbar.iconDefault, fontFamily: 'MyriadPro-Semibold', fontSize: 12, paddingTop: 3 }}>{name}</Text> 
  </View>
);

TabIcon.propTypes = { icon: PropTypes.string.isRequired, selected: PropTypes.bool };
TabIcon.defaultProps = { icon: 'keyboard-backspace', selected: false };

/* Export Component ==================================================================== */
export default TabIcon;
