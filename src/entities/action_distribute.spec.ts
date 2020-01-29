import { expect } from 'chai'
import 'mocha'
import ActionDistributor from './action_distribute'

describe('Action dispatcher', () => {
  it('get action', () => {
    const dispatcher = new ActionDistributor()
    const action = dispatcher.getAction('open_door')
    expect(action).to.contain.keys('action')
  })

  it('will cause error if action not exist', () => {
    const dispatcher = new ActionDistributor()
    const action = () => dispatcher.getAction('some_strange_action')

    expect(action).to.throw('Action not found')
  })

  it('if not valid parameters - will send error', () => {
    const dispatcher = new ActionDistributor()
    const action = () =>
        dispatcher.getAction('test_with_parameter', 'true')

    expect(action).to.throw('Parameter is not valid')
  })

  it('if valid parameters - will return test action', () => {
    const dispatcher = new ActionDistributor()
    const action =
       dispatcher.getAction('test_with_parameter', true)

    expect(action)
        .to.be.deep
        .contain({ key: 'test_with_parameter' } )
  })
})