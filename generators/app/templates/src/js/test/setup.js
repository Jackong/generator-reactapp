import { jsdom } from 'jsdom';
import configMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

global.document = jsdom();
global.window = document.defaultView;
global.navigator = global.window.navigator;

global.mockStore = configMockStore([thunk]);
