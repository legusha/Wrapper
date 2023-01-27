import { typesCreateHandler } from './types-create.mjs'
import createError from './error'

class Wrapper {
    static wrap<T, H> (target: T, targetHandler: H): T {
        if (!target) {
            throw new Error(createError('targetNotFound'))
        }
        const targetHandlerByType = typesCreateHandler(target)
        return targetHandlerByType(target, targetHandler)
    }
}

export { Wrapper }
