import AppAPI from '@lib/api';
import TraccerAPI from '@lib/api_traccar';

export function getPositions(userData, hasToken) {
  return (dispatch) => {
  	console.log(userData)
    return TraccerAPI.getPositions(userData, hasToken)
      .then((res) => {
        dispatch({
          type: 'GET_POSITIONS',
          data: {res},
        });
      });
  };
}
