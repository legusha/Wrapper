import { Wrapper } from './wrapper'
import { provider as cashProvider } from './cash.mjs'

// Base example how to use wrapper
const caller = {
  number: 99,
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
const wrapperNumber = (rootVal, val) => {
  console.log(`Function call with root value "${rootVal}" and actual value "${val}"`)
}



const callerNew = new Wrapper(caller, wrapperCaller)
const callerCash = new Wrapper(caller, wrapperCash)
const callOnce = new Wrapper(caller.call, wrapperCash)
const phoneNumber = new Wrapper(caller.number, wrapperNumber)

callerNew.call('+399 999 999')
callerNew.end()


// In Functions that were called with the same arguments, the result will be taken from the cache.
callerCash.call('+399 999 999')
callerCash.call('+399 999 999')
callerCash.call('+399 999 333')
callerCash.call('+399 999 666')
callerNew.end()


callOnce('+399 777 777')


// Number
console.log(phoneNumber.value)
phoneNumber.value = 777
console.log(phoneNumber.value)




