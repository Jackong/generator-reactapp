import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import App from './components/app'
import store from  './store'

const handleError = e => {
    console.error('error', e, e.stack)
    alert(e.stack)
}

Promise.onPossiblyUnhandledRejection(handleError)

window.onerror = (msg, url, line, column, e) => {
    handleError(e ? e : new Error(msg + '(' + url + '):' + line + '-' + column))
}

let dev = null
if (DEBUG) {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
    dev = (
        <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
    )
}

let rootInstance = null
try {
    rootInstance = render((
        <div>
            <Provider store={store}>
                <App/>
            </Provider>
            {dev}
        </div>
    ), document.getElementById('app'))
} catch (e) {
    handleError(e)
}

if (module.hot) {
    //dead code for production
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: () => {
            return [rootInstance]
        }
    })
}
