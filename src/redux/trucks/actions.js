import AppAPI from '@lib/api';
import TraccerAPI from '@lib/api_traccar';

export function getTrucks() {
  return (dispatch) => {
    return TraccerAPI.getTrucks()
      .then((res) => {
        dispatch({
          type: 'GET_DATA',
          data: {res},
        });
      });
  };
}
