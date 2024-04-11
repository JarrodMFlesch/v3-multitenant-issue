import type { FieldAccess } from 'payload/types'

import { checkUserRoles } from '../../../utilities/checkUserRoles'
import { Tenant, User } from '~/payload-types'

export const tenantAdminFieldAccess: FieldAccess = ({ req: { user }, doc }) => {
  return (
    checkUserRoles(['super-admin'], user) ||
    !doc?.tenant ||
    (doc?.tenant &&
      user?.tenants?.some(
        ({
          tenant: userTenant,
          roles,
        }: {
          tenant: NonNullable<User['tenants']>[0]['tenant']
          roles: NonNullable<User['tenants']>[0]['roles']
        }) =>
          (typeof doc?.tenant === 'string' ? doc?.tenant : doc?.tenant.id) ===
            (userTenant as Tenant)?.id && roles?.includes('admin'),
      ))
  )
}
