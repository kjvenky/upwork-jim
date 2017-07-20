/**
 * App Navigation
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import { Actions, Scene, ActionConst } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';

// Components
import Drawer from '@containers/ui/DrawerContainer';

// Scenes
import AppLaunch from '@containers/Launch/LaunchContainer';
import Placeholder from '@components/general/Placeholder';
import AuthScenes from './auth';
import TabsScenes from './tabs';
import TruckView from '@containers/trucks/TruckView';


/* Routes ==================================================================== */
export default Actions.create(
  <Scene key={'root'} {...AppConfig.navbarProps}>
     <Scene
      hideNavBar
      key={'splash'}
      component={AppLaunch}
      analyticsDesc={'AppLaunch: Launching App'}
    />
    
    {/* Auth */}
    {AuthScenes}

    {/* Main App */}
    <Scene key={'app'} {...AppConfig.navbarProps} title={AppConfig.appName} hideNavBar={false} type={ActionConst.REPLACE}>
      {/* Drawer Side Menu */}
      <Scene key={'home'} component={Drawer} initial={'tabBar'}>
        {/* Tabbar */}
        {TabsScenes}
      </Scene>
    </Scene>

     <Scene
      key={'trucksDetails'}
      title={'Single Truck View'}
      component={TruckView}
      hideNavBar={true}
      analyticsDesc={'Placeholder: Coming Soon'} type={ActionConst.REPLACE}
    />
   
  </Scene>,
);
