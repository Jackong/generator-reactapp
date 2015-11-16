import React from 'react'
import { Route } from 'react-router'

import Index from './components/index'
import About from './components/about'
import App from './components/app'

export default (
    <Route path='/' component={Index}>
        <Route path='app' component={App} />
        <Route path="about" component={About} />
    </Route>
)
