import { typesCreateHandler } from './types-create.mjs'
import createError from './error'

class Wrapper<T, H> {
    constructor(target: T, targetHandler: H) {
        if (!target) {
            throw new Error(createError('targetNotFound'))
        }
        const targetHandlerByType = typesCreateHandler(target)
        return targetHandlerByType(target, targetHandler)
    }
}

export { Wrapper }
