import React from 'react'
import { Route } from 'react-router'

import Index from './components/smart/index'
import About from './components/smart/about'
import App from './components/smart/app'

export default (
    <Route path='/' component={Index}>
        <Route path='app' component={App} />
        <Route path="about" component={About} />
    </Route>
)
