import { Wrapper } from './wrapper'
import { cacheProvider } from './cache.mjs'

type fn = (...args: string[] | []) => void;
type TCaller = typeof caller;
type TWrapperCaller = typeof wrapperCaller;
type TWrapperPhone = typeof wrapperNumber;

const caller = {
    phone: 99,
    call: (n: string): void => console.log('CALL\t', n),
    end: (): void => console.log('END')
}

const wrapperCaller = (fnName: string, fn: fn): fn => {
    return (...args: string[] | []) => {
        console.log(`Function call with name "${fnName}"`)
        fn(...args)
    }
}
const wrapperCash = (fnName: string, fn: fn) => {
    return (...args: string[] | []) => {
        return cacheProvider(fnName, fn, ...args)
    }
}
const wrapperNumber = (rootVal:string, val:string) => {
    console.log(`Function call with root value "${rootVal}" and actual value "${val}"`)
}


const callerWrapped = Wrapper.wrap<TCaller, TWrapperCaller>(caller, wrapperCaller)
const callerPhoneWrapped = Wrapper.wrap<number, TWrapperPhone>(caller.phone, wrapperNumber)

callerWrapped.call('+399 999 999')
callerWrapped.end()

const callerCash = Wrapper.wrap(caller, wrapperCash)
const callOnce = Wrapper.wrap(caller.call, wrapperCash)

// Asynchronous cache
const phoneBook = {
  liza: '+399 999 999',
  alice: '+311 111 111'
}
const phoneBookFind = (name: keyof typeof phoneBook): string => phoneBook[name];

const wrapperCache = (fnName: string, fn: any) => {
  return async (...args: unknown[]) => {
    return await cacheProvider(fnName, fn, ...args);
  };
};

const phoneBookCached = Wrapper.wrap<typeof phoneBookFind, typeof wrapperCache>
    (phoneBookFind, wrapperCache);

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




