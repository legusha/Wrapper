const errorList = {
  typeNotSupport: (type) => `Wrapper not support type "${type}"`,
  targetNotFound: () => 'Target not found'
}

export default (errorName, ...args) => errorList[errorName](...args)
