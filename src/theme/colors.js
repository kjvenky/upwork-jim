/**
 * App Theme - Colors
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

const app = {
  background: '#FFFFFF',
  cardBackground: '#FFFFFF',
  listItemBackground: '#FFFFFF',
};

const brand = {
  brand: {
    primary: '#157efc',
    secondary: '#17233D',
    //#157efc #00adb4
  },
};

const text = {
  textPrimary: '#222222',
  textSecondary: '#777777',
  headingPrimary: brand.brand.primary,
  headingSecondary: brand.brand.primary,
};

const borders = {
  border: '#D0D1D5',
};

const tabbar = {
  tabbar: {
    background: '#FFFFFF',
    iconDefault: '#5d5d5d',
    iconSelected: '#FFFFFF',
  },
};

export default {
  ...app,
  ...brand,
  ...text,
  ...borders,
  ...tabbar,
};
