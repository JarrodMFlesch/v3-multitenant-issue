// @ts-nocheck i hate this
import type { CollectionAfterChangeHook } from 'payload/types'

export const loginAfterCreate: CollectionAfterChangeHook = async ({
  doc,
  req,
  req: { payload, body = {}, res },
  operation,
}) => {
  if (operation === 'create' && !req.user) {
    const { email, password } = body

    if (email && password) {
      const { user, token } = await payload.login({
        collection: 'users',
        data: { email, password },
        req,
        res,
      })

      return {
        ...doc,
        token,
        user,
      }
    }
  }

  return doc
}
