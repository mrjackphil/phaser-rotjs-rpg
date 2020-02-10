import {expect} from 'chai'
import 'mocha'
import ActionDistributor, {ACTIONS} from '../entities/ActionDistributor'

describe('Action dispatcher', () => {
  it('get action by enum', () => {
    const dispatcher = new ActionDistributor()
    const action = dispatcher.getAction(ACTIONS.REMOVE_DOOR)
    expect(action).to.contain.keys('action')
  })

  it('if valid parameters - will return test action', () => {
    const dispatcher = new ActionDistributor()
    const action =
       dispatcher.getAction(ACTIONS.TEST, true)

    expect(action)
        .to.be.deep
        .contain({ key: ACTIONS.TEST } )
  })
})