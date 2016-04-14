import { jsdom } from 'jsdom'
import configMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import React from 'react'
import TestUtils from 'react-addons-test-utils'

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator

global.mockStore = configMockStore([thunk])

global.mockRender = (Component, props) => {
  const renderer = TestUtils.createRenderer()
  renderer.render(<Component {...props} />)
  const output = renderer.getRenderOutput()
  return {
    props,
    output,
    renderer,
  }
}
