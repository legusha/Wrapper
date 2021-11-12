// It defines the types of arguments that can be accepted to Wrapper
export const types = {
  /**
   * @param target {object}
   * @param targetHandler {function}
   * @return {object}
   * **/
  'object': (target, targetHandler) => {
    const fns = functionsFind(target)
    return  functionsWrap(fns, targetHandler)
  },
  /**
   * @param target {function}
   * @param targetHandler {function}
   * @return {function}
   * **/
  'function': (target, targetHandler) => {
    const fn = Object.assign({}, {target})
    const { target: newTarget } = functionsWrap(fn, targetHandler)
    return newTarget
  },
  /**
   * @param target {number}
   * @param targetHandler {function}
   * @return {object}
   * **/
  'number': (target, targetHandler) => {
    let newTarget = target
    return {
      get value () {
        return newTarget
      },
      set value (value) {
        newTarget = value
        targetHandler(target, newTarget)
        return newTarget
      }
    }
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
