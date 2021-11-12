import { typesCreateHandler } from './types-create.mjs'

const errorProviderNotFound = 'Provider not found'


// Main
function Wrapper(provider, providerHandler) {
  if (!provider) {
    throw new Error(errorProviderNotFound)
  }
  const providerHandlerByType = typesCreateHandler(provider)
  return providerHandlerByType(provider, providerHandler)
}

export { Wrapper }
