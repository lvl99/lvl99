/**
 * LVL99 Queue
 */

let _loggerPath = 'lvl99/tools/queue'

import Queue from '../../es6/tools/queue'

// Use fake timers because waiting is boring
jest.useFakeTimers()

let testQueue = new Queue({
  timerDelay: 1000
})

let testCounter = 0
function testQueuedFunction (incrementAmount = 1) {
  if (incrementAmount) {
    testCounter += incrementAmount
  }
}

test(`${_loggerPath} exists`, () => {
  expect(Queue).toBeTruthy()
})

test(`${_loggerPath} instantiated with options correctly`, () => {
  expect(testQueue).toBeDefined()
  expect(testQueue.getTimerDelay()).toBe(1000)
})

test(`${_loggerPath} queue unnamed action`, () => {
  testQueue.queue(undefined, testQueuedFunction, 1)
  expect(testQueue.length()).toBe(1)
})

test(`${_loggerPath} queue named action`, () => {
  testQueue.queue('test', testQueuedFunction, 1)
  let getQueuedAction = testQueue.getActionByLabel('test')
  expect(getQueuedAction).toBeDefined()
  expect(getQueuedAction).toHaveProperty('action', testQueuedFunction)
  expect(getQueuedAction).toHaveProperty('args')
  expect(getQueuedAction.args).not.toBeUndefined()
  expect(getQueuedAction.args).toHaveLength(1)
})

test(`${_loggerPath} remove named item in queue`, () => {
  testQueue.remove('test')
  expect(testQueue.length()).toBe(1)
})

test(`${_loggerPath} replace named item in queue`, () => {
  testQueue.queue('test', testQueuedFunction)
  let getQueuedAction = testQueue.getActionByLabel('test')
  expect(getQueuedAction).toBeDefined()
  expect(getQueuedAction).toHaveProperty('args')
  expect(getQueuedAction.args).toBeInstanceOf(Array)
  expect(getQueuedAction.args).toHaveLength(0)

  // Replace the 'test' action with a new action
  testQueue.queue('test', testQueuedFunction, 2)
  getQueuedAction = testQueue.getActionByLabel('test')
  expect(getQueuedAction).toHaveProperty('args')
  expect(getQueuedAction.args).toBeInstanceOf(Array)
  expect(getQueuedAction.args).toHaveLength(1)
  expect(getQueuedAction.args).toContain(2)
})

test(`${_loggerPath} run queue works`, () => {
  expect(testCounter).toBe(0)
  // The unnamed and the named queued functions should be added together
  testQueue.run()
  expect(testCounter).toBe(3)
  expect(testQueue.length()).toBe(0)
})

test(`${_loggerPath} add to queue and play after default delay of 1000ms`, () => {
  const callback = jest.fn()
  testQueue.add('test2', callback)
  testQueue.add('test3', testQueuedFunction, 2)

  expect(callback).not.toBeCalled()
  jest.advanceTimersByTime(1000)

  expect(callback).toBeCalled()
  expect(callback).toHaveBeenCalledTimes(1)
  expect(testCounter).toBe(5)
})

test(`${_loggerPath} add to queue and play after 2 delays of 2000ms each`, () => {
  const callback = jest.fn()
  testQueue.delayAdd(2000, 'test4', callback)
  testQueue.delayAdd(2000, 'test5', testQueuedFunction, 10)

  expect(callback).not.toBeCalled()
  jest.advanceTimersByTime(2000)

  expect(callback).toBeCalled()
  expect(callback).toHaveBeenCalledTimes(1)
  expect(testCounter).toBe(15)
})

test(`${_loggerPath} sync queue works`, () => {
  testQueue.queue('test6', testQueuedFunction, 10)
  testQueue.sync('test7', testQueuedFunction, 15)
  expect(testCounter).toBe(40)
})

test(`${_loggerPath} pause queue works`, () => {
  testQueue.pause()
  expect(testQueue.checkStatus()).toBe(0)
})

test(`${_loggerPath} add to paused queue should not run`, () => {
  const callback = jest.fn()

  testQueue.add('test6', callback)
  testQueue.add('test7', testQueuedFunction, 10)

  expect(callback).not.toBeCalled()
  jest.advanceTimersByTime(1000)

  expect(testQueue.checkStatus()).toBe(0)
  expect(callback).not.toBeCalled()
  expect(callback.mock.calls.length).toBe(0)
})

test(`${_loggerPath} play queue works`, () => {
  testQueue.play()
  expect(testQueue.checkStatus()).toBe(1)
  expect(testCounter).toBe(50)
  expect(testQueue.length()).toBe(0)
})
