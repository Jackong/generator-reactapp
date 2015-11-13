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

try {
    render(<App title='Hello <%= appname %>' />, document.getElementById('app'))
} catch (e) {
    handleError(e)
}
