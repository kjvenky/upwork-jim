/**
 * Combine All Reducers
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import { combineReducers } from 'redux';

// Our custom reducers
// We need to import each one here and add them to the combiner at the bottom
import router from '@redux/router/reducer';
import sideMenu from '@redux/sidemenu/reducer';
import user from '@redux/user/reducer';
import truck from '@redux/trucks/reducer';
import traccar from '@redux/traccar/reducer';
import devices from '@redux/devices/reducer';
import positions from '@redux/positions/reducer';

// Combine all
const appReducer = combineReducers({
  router,
  sideMenu,
  user,
  truck,
  traccar,
  positions,
  devices,

});

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
};

export default rootReducer;
