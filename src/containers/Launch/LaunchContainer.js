/**
 * Launch Screen Container
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { connect } from 'react-redux';

// Actions
import * as UserActions from '@redux/user/actions';
import * as DevicesActions from '@redux/devices/actions';
import * as PositionsActions from '@redux/positions/actions';



// The component we're mapping to
import AppLaunchRender from './LaunchView';

// What data from the store shall we send to the component?
const mapStateToProps = () => ({
	
});

// Any actions to map to the component?
const mapDispatchToProps = {
  login: UserActions.login,
  getDevices: DevicesActions.getDevices,
  getPositions: PositionsActions.getPositions,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLaunchRender);
