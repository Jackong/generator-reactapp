import {expect} from 'chai'
import * as actions from '../actions'

describe('actions', () => {
    describe('change title', () => {
        it('should be create an action to change title', () => {
            const payload = 'test'
            const expected = {
                type: 'CHANGE_TITLE',
                payload
            }
            expect(actions.changeTitle(payload)).to.be.eql(expected)
        })
    })
})
