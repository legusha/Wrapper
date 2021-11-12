import { types as targetTypes } from './types'

const errorTargetNotSupport = (type) => `Wrapper not support type "${type}"`

export const typesCreateHandler = (target) => {
  const type = typeof target
  const handler = targetTypes[type]
  if (!handler) {
    throw new Error(errorTargetNotSupport(type))
  }
  return targetTypes[type]
}
