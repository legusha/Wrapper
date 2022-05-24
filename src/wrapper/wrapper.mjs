import { typesCreateHandler } from './types-create.mjs'
import createError from './error'


// Main
function Wrapper(target, targetHandler) {
  if (!target) {
    throw new Error(createError('targetNotFound'))
  }
  const targetHandlerByType = typesCreateHandler(target)
  return targetHandlerByType(target, targetHandler)
}

export { Wrapper }
