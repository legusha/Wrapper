import { Buffer } from 'buffer';

const toStr = JSON.stringify
const getBytes = (str = '') => Buffer.from(str).byteOffset
const getBytesStr = (str = '') => Buffer.from(str).byteOffset

const cash = new Map()
const cashSizeMax = 102400 // in bytes
let cashSize = 0 // in bytes

const cashSizeSum = (num) => {
  cashSize += num
  return cashSizeSum
}
const cashSizeReset = () => (cashSize = 0)

// TODO need decomposition this code

const provider = (fnName, fn, ...args) => {
  const newArgs = toStr(args)
  const cashByFnName = cash.get(fnName)

  // Create new cash
  if (!cashByFnName) {
    const res = fn(...args)
    const newFnCollection = cash.set(fnName, new Map()).get(fnName)
    newFnCollection.set(newArgs, { result: res })
    cashSizeSum(getBytes(res))(getBytesStr(newArgs))
    return res
  }

  // Reset cash
  console.log(`CASH SIZE: ${cashSize}`)
  if (cashSize >= cashSizeMax) {
    cash.clear()
    cashSizeReset()
    return fn(...args)
  }

  const hasResultByArgs = cashByFnName.get(newArgs)

  if (hasResultByArgs) {
    return hasResultByArgs.result
  }
  const res = fn(...args)
  cashByFnName.set(newArgs, { result: res })
  cashSizeSum(getBytes(res))(getBytesStr(newArgs))
  return res
}

export { provider }
