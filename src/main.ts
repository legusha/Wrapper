import Wrapper from './wrapper'
import { cacheProvider } from './cache.mjs'

type fn = (...args: string[] | []) => void;
// Base example how to use wrapper
const caller = {
    phone: 99,
    call: (n: number): void => console.log('CALL\t', n),
    end: (): void => console.log('END')
}

const wrapperCaller = (fnName: string, fn: fn) => {
    return (...args: string[] | []) => {
        console.log(`Function call with name "${fnName}"`)
        fn(...args)
    }
}
const wrapperCash = (fnName: string, fn: fn) => {
    return (...args: string[] | []) => {
        return cashProvider(fnName, fn, ...args)
    }
}
const wrapperNumber = (rootVal:string, val:string) => {
    console.log(`Function call with root value "${rootVal}" and actual value "${val}"`)
}


const callerWrapped = new Wrapper(caller, wrapperCaller)
const callerPhoneWrapped = new Wrapper(caller.phone, wrapperNumber)

callerWrapped.call('+399 999 999')
callerWrapped.end()

const callerNew = new Wrapper(caller, wrapperCaller)
const callerCash = new Wrapper(caller, wrapperCash)
const callOnce = new Wrapper(caller.call, wrapperCash)
const phoneNumber = new Wrapper(caller.number, wrapperNumber)
console.log(callerNew);
callerNew.call('+399 999 999')
callerNew.end()

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




