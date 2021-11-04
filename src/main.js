import { Wrapper } from './wrapper'
import { provider as cashProvider } from './cash.mjs'

// Base example how to use wrapper
const caller = {
  call: (n) => console.log('CALL\n', n),
  end: () => console.log('END')
}


const wrapperCaller = (fnName, fn) => {
  return (...args) => {
    console.log(`Function call with name "${fnName}"`)
    fn(...args)
  }
}
const wrapperCash = (fnName, fn) => {
  return (...args) => {
    return cashProvider(fnName, fn, ...args)
  }
}



const callerNew = new Wrapper(caller, wrapperCaller)
const callerCash = new Wrapper(caller, wrapperCash)


callerNew.call('+399 999 999')
callerNew.end()


// In Functions that were called with the same arguments, the result will be taken from the cache.
callerCash.call('+399 999 999')
callerCash.call('+399 999 999')
callerCash.call('+399 999 333')
callerCash.call('+399 999 666')
callerNew.end()



