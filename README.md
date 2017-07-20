### Transin Mandatory changes necessary
### dependencies for V1
1. React should be 0.15.4.2
2. React Native should be 0.40
3. Flux Route 3.37.0
4. Native Base 2.0.12

They should be set up in shrinkwrap
Changes in node modules:
1. Super CLusters: index.js 

```javascript
function getClusterProperties(cluster) {
    var count = cluster.numPoints;
    var abbrev = count >= 10000 ? Math.round(count / 1000) + 'k' :
                 count >= 1000 ? (Math.round(count / 100) / 10) + 'k' : count;
    return extend(extend({}, cluster.properties), {
        cluster: true,
        cluster_id: cluster.id,
        clusters:cluster,
        point_count: count,
        point_count_abbreviated: abbrev
    });
}
```

2. To fis this error Original is here. The version qualifier may be implied

update /node_modules/react-native/local-cli/bundle/assetpathUtils.js

```javascript
function getAndroidAssetSuffix(scale) {
  switch (scale) {
    case 0.75: return 'ldpi';
    case 1: return 'mdpi-v4';
    case 1.5: return 'hdpi';
    case 2: return 'xhdpi';
    case 3: return 'xxhdpi';
    case 4: return 'xxxhdpi';
  }
}
```
3. Airbnb markers if we use map marker custom icon need to edit "AirMarker.java" according to this url

https://github.com/greycats/react-native-maps/commit/b0e0fc4327d336d55deed633aecf1b1551307e44



# React Native Starter Kit (Base repo)

React Native Starter Kit helps you get started with React Native. It contains a bunch of helpful components, building blocks and basic structure to allow you to jump straight into building an app.

## Docs

1. [Features](#features)
1. **Before you start**
  1. [Getting Started with React Native](/docs/react-native.md)
  1. [React Native Quick Tips](/docs/quick-tips.md)
  1. [Understanding the File Structure](#understanding-the-file-structure)
  1. [Opinions Guiding this Project](/docs/opinions.md)
1. **Using RNSK**
  1. [Getting Up and Running with RNSK](#getting-started)
  1. [Renaming the App from StarterKit](/docs/renaming.md)
  1. [Routing / Navigating](/src/navigation/README.md)
  1. [Using Google Analytics](/docs/google-analytics.md)
  1. [Interacting with a REST API](/docs/api.md)
  1. [Testing](/docs/testing.md)
1. [Contributing](/docs/contributing.md)
1. [Licence](LICENSE)

---

## Features

| Feature | Summary |
| --- | --- |
| [Redux](https://github.com/reactjs/react-redux) | A predictable state container - Helping you write applications that behave consistently and run in different environments. |
| [React Native Router Flux](https://github.com/aksonov/react-native-router-flux) | Router for React Native based on new React Native Navigation API. <br><br>['How to' Guide &rarr;](/src/navigation/README.md)|
| [API Example](/docs/api.md) | A basic example showing how you can interact with a RESTful API with user authentication (JWT). |
| [Sidebar / Hamburger Menu](https://github.com/react-native-community/react-native-side-menu) | ... |
| [React Native Elements](https://github.com/react-native-community/react-native-elements) | Cross Platform React Native UI Toolkit. |
| [Google Analytics](https://github.com/idehub/react-native-google-analytics-bridge) | Shows how to track screen views (includes both a 'debug' mode tracker as well as 'release' mode so that data doesn't get obfuscated). <br><br>[Setup Guide &rarr;](/docs/google-analytics.md) |
| [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) | Easily use icons from a wide range of icon libraries, it's as simple as importing the icon font and then `<Icon name={'ios-alert-outline'} size={50} color={"#CCC"} />`. |
| [Tcomb Form Validation](https://github.com/gcanti/tcomb-form-native) | An example on how to create forms with validation. |
| Component Style Guide | A bunch of elements and components to get you started - styled headings, buttons, list rows, alerts etc. |
| Code Linting / Code Style Guide | We're using [Airbnb's](https://github.com/airbnb/javascript) JS/React Style Guide with ESLint linting. <br><br>[Get started with linting for React Native &rarr;](https://medium.com/pvtl/linting-for-react-native-bdbb586ff694) |
| Boilerplate | An example directory/file structure I've found useful for scaling apps <br><br>[Learn more &rarr;](#understanding-the-file-structure) |

---

## Getting Started

1. Ensure you've followed the [React Native - Get Started Guide](https://facebook.github.io/react-native/docs/getting-started.html) for the platform/s of choice
1. Clone this project `git clone https://github.com/mcnamee/react-native-starter-app.git`
1. Run `npm install` from root directory
1. Start the app in [an emulator](/docs/quick-tips.md#running-in-an-emulator)

---

## Understanding the File Structure

- `/android` - The native Android stuff
- `/ios` - The native iOS stuff
- `/src` - Contains the full React Native App codebase
  - `/components` - 'Dumb-components' / presentational. [Read More &rarr;](/src/components/README.md)
  - `/constants` - App-wide variables and config
  - `/containers` - 'Smart-components' / the business logic. [Read More &rarr;](/src/containers/README.md)
  - `/images` - Self explanatory right?
  - `/lib` - Utils, custom libraries, functions
  - `/navigation`- Routes - wire up the router with any & all screens. [Read More &rarr;](/src/navigation/README.md)
  - `/redux` - Redux Reducers & Actions grouped by type. [Read More &rarr;](/src/redux/README.md)
  - `/theme` - Theme specific styles and variables
