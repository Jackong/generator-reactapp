import React, { PropTypes } from 'react'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'

import store from  '../store'
import routes from '../routes'

let dev = null
if (DEBUG) {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
    dev = (
        <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
    )
}

class Root extends React.Component {
    render () {
        return (
            <div>
               <Provider store={store}>
                 <ReduxRouter>
                     {routes}
                 </ReduxRouter>
               </Provider>
               {dev}
            </div>
        )
    }
}

export default Root
