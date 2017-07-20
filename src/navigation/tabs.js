/**
 * Tabs Scenes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import { Scene } from 'react-native-router-flux';
// Consts and Libs
import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';
// Components
import { TabIcon } from '@ui/';
import { NavbarMenuButton } from '@containers/ui/NavbarMenuButton/NavbarMenuButtonContainer';
import { NavbarMenuButtonRight } from '@containers/ui/NavbarMenuButtonRight/NavbarMenuButtonRightContainer';
// Scenes
import Placeholder from '@components/general/Placeholder';
import Error from '@components/general/Error';
import StyleGuide from '@containers/StyleGuideView';
import TrucksMapView from '@containers/trucks/TrucksMapView';
import TrucksListView from '@containers/trucks/TrucksListView';
import TruckView from '@containers/trucks/TruckView';
import SettingsView from '@containers/settings/SettingsView';
import ContactView from '@containers/contact/ContactView';
import ComingSoon from '@containers/comingSoon/ComingSoon';
import { Actions, ActionConst } from 'react-native-router-flux';
const navbarPropsTabs = {
  ...AppConfig.navbarProps,
  renderLeftButton: () => <NavbarMenuButton />,
  renderRightButton: () => <NavbarMenuButtonRight />,
  sceneStyle: {
    ...AppConfig.navbarProps.sceneStyle,
    paddingBottom: AppSizes.tabbarHeight,
  },
};
// 
/* Routes ==================================================================== */
const scenes = (
  <Scene key={'tabBar'} type='switch' tabs tabBarSelectedItemStyle={AppStyles.tabbar2}  tabBarIconContainerStyle={AppStyles.tabbar}  pressOpacity={0.999} >

    <Scene
      key={'TrucksMapView'}
      {...navbarPropsTabs}
      title={'Track Trucks '}
      component={TrucksMapView}
      icon={props => TabIcon({ ...props, icon: 'truck' , name: 'Track Trucks'})}
      duration={1}
    />
    <Scene
        {...navbarPropsTabs}
        key={'TrucksListView'}
        component={TrucksListView}
        title={'My Trucks'}
        icon={props => TabIcon({ ...props, icon: 'map', name: 'My Trucks' })}
        duration={1}
      />
  {/* 
    <Scene
      {...navbarPropsTabs}
      key={'trucks'}
      title={'View Trucks'}
      icon={props => TabIcon({ ...props, icon: 'local-shipping', name: 'Track Trucks' })}
    >
      
      <Scene
        {...AppConfig.navbarProps}
        key={'TruckDetailsTest'}
        component={TruckView}
        getTitle={props => ((props.title) ? props.title : 'View Trucks')}
        analyticsDesc={'TruckView: View Truck'}
        duration={1}
      />
    </Scene>
 
    <Scene
      {...navbarPropsTabs}
      key={'recipes'}
      title={'Recipes'}
      icon={props => TabIcon({ ...props, icon: 'settings' , name: 'Test'})}
    >
      <Scene
        {...navbarPropsTabs}
        key={'recipesListing'}
        component={Recipes}
        title={AppConfig.appName}
        analyticsDesc={'Recipes: Browse Recipes'}
      />
      <Scene
        {...AppConfig.navbarProps}
        key={'recipeView'}
        component={RecipeView}
        getTitle={props => ((props.title) ? props.title : 'View Recipe')}
        analyticsDesc={'RecipeView: View Recipe'}
      />
    </Scene> */}

     <Scene
      {...navbarPropsTabs}
      key={'settings'}
      title={'Settings '}
      component={SettingsView}
      icon={props => TabIcon({ ...props, icon: 'settings' , name:'Settings'})}
      duration={1}
    /> 

     <Scene
      {...navbarPropsTabs}
      key={'contact'}
      title={'Contact Us'}
      component={ContactView}
      icon={props => TabIcon({ ...props, icon: 'contact' , name:'Contact'})}
      duration={1}
    />

     

   {/* <Scene
      key={'error'}
      {...navbarPropsTabs}
      title={'Example Error'}
      component={Error}
      icon={props => TabIcon({ ...props, icon: 'error' })}
      analyticsDesc={'Error: Example Error'}
       duration={1}
    />

    <Scene
      key={'styleGuide'}
      {...navbarPropsTabs}
      title={'Style Guide'}
      component={StyleGuide}
      icon={props => TabIcon({ ...props, icon: 'speaker-notes' })}
      analyticsDesc={'StyleGuide: Style Guide'}
       duration={1}
    /> */}

    <Scene
      key={'ComingSoon'}
      {...navbarPropsTabs}
      title={'Coming Soon'}
      component={ComingSoon}
      analyticsDesc={'Placeholder: Coming Soon'}
      duration={1}
        
    />

  </Scene> 
);
export default scenes;
