import React, { PropTypes } from 'react'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'

import store from  '../store'
import routes from '../routes'

class Root extends React.Component {
    render () {
        return (
            <div>
               <Provider store={store}>
                 <ReduxRouter>
                     {routes}
                 </ReduxRouter>
               </Provider>
            </div>
        )
    }
}

export default Root
