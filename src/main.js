import Wrapper from './wrapper'
import { cacheProvider } from './cache.mjs'

// Base example how to use wrapper
const caller = {
  number: 99,
  call: (n) => console.log('CALL\t', n),
  end: () => console.log('END')
}

const wrapperCaller = (fnName, fn) => {
  return (...args) => {
    console.log(`Function call with name "${fnName}"`)
    fn(...args)
  }
}
const wrapperNumber = (rootVal, val) => {
  console.log(`Function call with root value "${rootVal}" and actual value "${val}"`)
}


const callerNew = new Wrapper(caller, wrapperCaller)
const phoneNumber = new Wrapper(caller.number, wrapperNumber)

callerNew.call('+399 999 999')
callerNew.end()

// Int
phoneNumber.value = 777


// Asynchronous cache
const phoneBook = {
  liza: '+399 999 999',
  alice: '+311 111 111'
}
const phoneBookFind = (name) => phoneBook[name];

const wrapperCache = (fnName, fn) => {
  return async (...args) => {
    return await cacheProvider(fnName, fn, ...args);
  };
};

const callerCache = new Wrapper(phoneBookFind, wrapperCache);

// In Functions that were called with the same arguments, the result will be taken from the cache.
(async () => {
  await callerCache('liza')
  await callerCache('alice')
  await callerCache('liza')
  await callerCache('liza')
  await callerCache('liza')
})()




