import 'react';
import 'react-dom';
import 'react-router';
import 'history';
import 'qs';
import 'isomorphic-fetch';
import 'whatwg-fetch';
import 'restful.js';
import 'store';
import 'react-css-modules';<% if (sm === 'mobx') { %>
import 'es6-promise/auto';
import 'mobx';
import 'mobx-react';<% } else { %>
import 'babel-polyfill';
import 'react-redux';
import 'redux';
import 'redux-saga';
import 'react-router-redux';
import 'reselect';
import 'normalizr';
import 'immutable';<% } %>
