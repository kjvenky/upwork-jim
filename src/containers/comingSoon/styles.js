import {StyleSheet, Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');


export default{
  container: {
    backgroundColor: '#FFF',
  },
  listItemStyle:{
    alignSelf:'center',
    borderBottomWidth: 0,
    paddingTop:0,
    fontFamily: 'MyriadPro-Semibold',
    paddingBottom: 0,
  },
};