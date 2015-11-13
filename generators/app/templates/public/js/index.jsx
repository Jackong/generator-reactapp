import React from 'react'
import {render} from 'react-dom'
import App from './components/app'


const handleError = e => {
    console.error('error', e, e.stack)
    alert(e.stack)
}

Promise.onPossiblyUnhandledRejection(handleError)

window.onerror = (msg, url, line, column, e) => {
    handleError(e ? e : new Error(msg + '(' + url + '):' + line + '-' + column))
    return true
}

let rootInstance = null
try {
    rootInstance = render(<App title='Hello <%= appname %>' />, document.getElementById('app'))
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
