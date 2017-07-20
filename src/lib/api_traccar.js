/**
 * API Functions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
/* global fetch console */
import { AsyncStorage } from 'react-native';
import base64 from 'base-64';

// Config
// const HOSTNAME = "http://35.154.107.84:8082/api/";
const HOSTNAME = "http://35.154.65.147:8082/api/";

// export default TraccerAPI;
const TraccerAPI = { getPositions, login, getDevices };

// const token = "Basic " + base64.encode("test@transin.in:1234");
const token = "";

async function storeUserData(userData) {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {

    }
}

async function getUserData() {
    try {
        const value = await AsyncStorage.getItem('userData');
        if (value !== null) {
            token = value;
            return value;
        }
    } catch (error) {
        // Error retrieving data
    }
}

function login(loginData) {
    
    var formBody = [];
    for (var property in loginData) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(loginData[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");


    return fetch(HOSTNAME + 'session', {
            method: 'POST',
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            body: formBody,
        })
        .then((response) => response.json())
        .then((responseJson) => {

            let token = "Basic " + base64.encode(loginData.email + ":" + loginData.password)
            let userData = { "email": loginData.email, base64Token: token }
            storeUserData(userData)
            return responseJson;
        })
        .catch((error) => {
            console.error(euserDatarror);

        });
}

function getDevices(userData, hasToken) {

    token = hasToken ? userData.base64Token : "Basic " + base64.encode(userData.email + ":" + userData.password);
    return fetch(HOSTNAME + 'devices', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                "authorization": token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            return response.json()
        })
        .then((responseJson) => {
            // Store base 64 token
            if (!hasToken) {
                storeUserData({ email: userData.email, base64Token: token })
            }
            return responseJson;
        })
        .catch((error) => {
            return reject(error);
        });
}


function getPositions(userData, hasToken) {
    token = hasToken ? userData.base64Token : "Basic " + base64.encode(userData.email + ":" + userData.password);

    return fetch(HOSTNAME + 'positions', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                "authorization": token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            return response.json()
        })
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export default TraccerAPI;
