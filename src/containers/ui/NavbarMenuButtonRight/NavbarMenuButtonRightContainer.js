/**
 * Navbar Elements
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { connect } from 'react-redux';

// Actions
import * as SideMenuActions from '@redux/sidemenu/actions';

// The component we're mapping to
import NavbarMenuButtonRightRender from './NavbarMenuButtonRightView';

// What data from the store shall we send to the component?
const mapStateToProps = () => ({});

// Any actions to map to the component?
const mapDispatchToProps = {
  toggleSideMenu: SideMenuActions.toggle,
};

/* Export Component ==================================================================== */
exports.NavbarMenuButtonRight = connect(mapStateToProps, mapDispatchToProps)(NavbarMenuButtonRightRender);
