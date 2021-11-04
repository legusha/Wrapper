import { Wrapper } from './wrapper'

// Base example how to use wrapper
const caller = {
  call: (n) => console.log('CALL\n', n),
  end: () => console.log('END')
}
const callerWrapper = (fnName, fn, ...args) => {
  console.log(`Function call with name "${fnName}"`)
  fn(...args)
}
const newCaller = new Wrapper(caller, callerWrapper)

newCaller.call('+399 999 999')
newCaller.end()
