// It defines the types of arguments that can be accepted to Wrapper
export const types = {
  /**
   * @param provider {object}
   * @param providerHandler {function}
   * @return {object}
   * **/
  'object': (provider, providerHandler) => {
    const fns = functionsFind(provider)
    return  functionsWrap(fns, providerHandler)
  },
  /**
   * @param provider {function}
   * @param providerHandler {function}
   * @return {function}
   * **/
  'function': (provider, providerHandler) => {
    const fn = Object.assign({}, {provider})
    const { provider: newProvider } = functionsWrap(fn, providerHandler)
    return newProvider
  }
}

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
