import Wrapper from './wrapper'
import { cacheProvider } from './cache.mjs'

// Base example how to use wrapper
const caller = {
  phone: 99,
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


const callerWrapped = new Wrapper(caller, wrapperCaller)
const callerPhoneWrapped = new Wrapper(caller.phone, wrapperNumber)

callerWrapped.call('+399 999 999')
callerWrapped.end()

// Int
callerPhoneWrapped.value = 777


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

const phoneBookCached = new Wrapper(phoneBookFind, wrapperCache);

// In Functions that were called with the same arguments, the result will be taken from the cache.
(async () => {
  const phoneNumbers = [
    await phoneBookCached('liza'),
    await phoneBookCached('alice'),
    await phoneBookCached('liza'),
    await phoneBookCached('alice'),
    await phoneBookCached('liza')
  ]
  console.table(phoneNumbers);
})()




