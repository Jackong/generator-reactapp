import qs from 'qs';

const hash = qs.parse(window.location.hash.substr(window.location.hash.indexOf('?') + 1));

export const DEV = 'DEV';
export const TEST = 'TEST';
export const PROD = 'PROD';

export default hash.env || PROD;
