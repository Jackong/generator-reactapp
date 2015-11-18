import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import Root from './components/root'

const handleError = e => {
    console.error('error', e, e.stack)
    alert(e.stack)
}

Promise.onPossiblyUnhandledRejection(handleError)

window.onerror = (msg, url, line, column, e) => {
    handleError(e ? e : new Error(msg + '(' + url + '):' + line + '-' + column))
}

let rootInstance = null
try {
    rootInstance = render(<Root />, document.getElementById('app'))
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
