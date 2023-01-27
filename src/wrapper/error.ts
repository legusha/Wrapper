type TError = keyof typeof errorList

const errorList = {
  typeNotSupport: (type: string) => `Wrapper not support type "${type}"`,
  targetNotFound: () => 'Target not found'
}

export default <T extends []>(errorName: TError, ...args: T) => {
    return errorList[errorName](...args);
}
