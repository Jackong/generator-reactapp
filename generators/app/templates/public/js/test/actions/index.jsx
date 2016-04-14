import {expect} from 'chai'
import nock from 'nock'
import * as actions from '../../actions'
import types from '../../actions/types'

describe('actions', () => {
    describe('change title', () => {
        it('should be create an action to change title', () => {
            const payload = 'test'
            const expected = {
                type: types.CHANGE_TITLE,
                payload
            }
            expect(actions.changeTitle(payload)).to.be.eql(expected)
        })
    })
})
