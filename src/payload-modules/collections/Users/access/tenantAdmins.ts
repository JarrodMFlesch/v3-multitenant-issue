import type { FieldAccess } from 'payload/types'

import { checkUserRoles } from '../../../utilities/checkUserRoles'
import { checkTenantRoles } from '../utilities/checkTenantRoles'
import { Tenant } from '~/payload-types'

export const tenantAdmins: FieldAccess = (args) => {
  const {
    req: { user },
    doc,
  } = args
  return (
    checkUserRoles(['super-admin'], user) ||
    doc?.tenants?.some(({ tenant }: { tenant: Tenant }) => {
      const id = typeof tenant === 'string' ? tenant : tenant?.id
      return checkTenantRoles(['admin'], user, id)
    })
  )
}
