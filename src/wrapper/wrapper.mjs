import { typesCreateHandler } from './types-create.mjs'

const errorTargetNotFound = 'Provider not found'


// Main
function Wrapper(target, targetHandler) {
  if (!target) {
    throw new Error(errorTargetNotFound)
  }
  const providerHandlerByType = typesCreateHandler(target)
  return providerHandlerByType(target, targetHandler)
}

export { Wrapper }
