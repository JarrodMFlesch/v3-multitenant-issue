import type { CollectionAfterLoginHook } from 'payload/types'

export const recordLastLoggedInTenant: CollectionAfterLoginHook = async ({ req, user }) => {
  try {
    console.log(req.host, 'host')
    console.log(req.origin, 'origin')
    console.log(req.url, 'url')
    console.log(req)
    const relatedOrg = await req.payload
      .find({
        collection: 'tenants',
        where: {
          'domains.domain': {
            in: [req.host],
          },
        },
        depth: 0,
        limit: 1,
      })
      ?.then((res) => res.docs?.[0])

    await req.payload.update({
      id: user.id,
      collection: 'users',
      data: {
        lastLoggedInTenant: relatedOrg?.id || null,
      },
      req,
    })
  } catch (err: unknown) {
    req.payload.logger.error(`Error recording last logged in tenant for user ${user.id}: ${err}`)
  }

  return user
}
