import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'
import {changeTitle} from '../actions'

@Radium
export class Home extends React.Component {
    componentWillMount() {
      this.props.changeTitle('ReactApp')
    }
    render () {
      return (
          <div style={[styles.base, styles.larger]}>Hello ReactApp</div>
      )
    }
}

const styles = {
    base: {
        color: 'red'
    },
    larger: {
        fontSize: 20
    }
}

export default connect(null, {changeTitle})(Home)
