/**
 * Recipe Reducer
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import AppUtil from '@lib/util';

export const initialState = {
    truck: {},
};

export default function positionsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POSITIONS':
            {
                let truck;
                if (action.data) {
                    truck = action.data;
                    return action.data.res;
                }
                return {
                    truck
                };
            }
        default:
            return state;
    }
}
