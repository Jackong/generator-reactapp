import 'babel-polyfill';
import { jsdom } from 'jsdom';
import configMockStore from 'redux-mock-store';

global.document = jsdom();
global.window = document.defaultView;
global.navigator = global.window.navigator;

global.mockStore = configMockStore([]);
