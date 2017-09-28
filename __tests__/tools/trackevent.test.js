/**
 * LVL99 TrackEvent
 */

const _loggerPath = 'lvl99/es6/tools/trackevent'
const TrackEvent = require('../../es6/tools/trackevent')

// Use fake timers because waiting is boring
jest.useFakeTimers()

const track = TrackEvent(true)

test(`${_loggerPath} exists`, () => {
  expect(TrackEvent).toBeTruthy()
})

test(`${_loggerPath} instantiated`, () => {
  expect(track).toBeDefined()
  expect(track).ToBeInstanceOf(Function)
})

