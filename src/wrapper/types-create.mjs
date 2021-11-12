import { types as providerTypes } from './types'

const errorProviderNotSupport = (type) => `Wrapper not support type "${type}"`

export const typesCreateHandler = (provider) => {
  const type = typeof provider
  const handler = providerTypes[type]
  if (!handler) {
    throw new Error(errorProviderNotSupport(type))
  }
  return providerTypes[type]
}
