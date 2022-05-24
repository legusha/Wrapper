import { types as targetTypes } from './types'
import createError from './error'

export const typesCreateHandler = (target) => {
  const type = typeof target
  const handler = targetTypes[type]
  if (!handler) {
    throw new Error(createError('typeNotSupport', type))
  }
  return targetTypes[type]
}
