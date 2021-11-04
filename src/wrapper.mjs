// Main
function Wrapper(provider, providerHandler) {
  const fns = functionsFind(provider)
  console.log(fns)
  return  functionsWrap(fns, providerHandler)
}

export { Wrapper }

// Private

/**
 * @return {Object}
 * **/
const functionsFind = (data = {}) => {
  const handler = (res, key) => {
    const isFn = typeof data[key] === 'function'
    if (isFn) {
      res[key] = data[key]
      return res
    }
    return res
  }
  return Object.keys(data).reduce(handler, {})
}

/**
 * @return {Object}
 * **/
const functionsWrap = (fns, wrapper) => {
  const handler = (res, key) => {
    res[key] = wrapper(key, res[key])
    return res
  }
  return Object.keys(fns).reduce(handler, fns)
}
