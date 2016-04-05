import React, {PropTypes} from 'react'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {createHashHistory} from 'history'

import store from '../store'
import App from './app'
import Home from './home'
import About from './about'

const hashHistory = useRouterHistory(createHashHistory)({queryKey: false})
const history = syncHistoryWithStore(hashHistory, store)

let devTools = null

if (DEBUG) {
  const DevTools = require('./tools.dev').default
  devTools = <DevTools />
}

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={history}>
            <Route path='/' component={App}>
              <IndexRoute component={Home}/>
              <Route path='about' component={About}/>
            </Route>
          </Router>
          {devTools}
        </div>
      </Provider>
    )
  }
}

export default Root
