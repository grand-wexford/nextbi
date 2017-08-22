/*global console*/
export const COMPONENT_REQUEST_URL = 'http://localhost:3000/r/index.html?module=';
export const STATIC_REQUEST_URL = 'http://localhost:3000/';
export const MENU_URL = 'http://localhost:3000/menu.json';
export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT';
export const API_SERVER = 'http://192.168.50.151:8080/fw/json/mdl';

export const C = (funcName, a) => {
    /* eslint-disable no-console */
    if (typeof a === 'object') {
        a = Array.prototype.map.call(a, elem => elem).join(", ");
    }
    console.log(`${funcName} ${!a ? '' : `: ${a}`}`);
    /* eslint-enable no-console */
};