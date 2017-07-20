import AppAPI from '@lib/api';
import TraccerAPI from '@lib/api_traccar';

export function getDevices(credentials, hasToken) {
  return (dispatch) => {
    return TraccerAPI.getDevices(credentials, hasToken)
      .then((res) => {
        dispatch({
          type: 'GET_DATA',
          data: {res},
        });
      });
  };
}



