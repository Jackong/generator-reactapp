import React from 'react'
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
    React.render(<App title='Hello <%= appname %>' />, document.body)
} catch (e) {
    handleError(e)
}
