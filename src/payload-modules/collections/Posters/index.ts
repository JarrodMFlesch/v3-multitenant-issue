import type { CollectionConfig } from 'payload/types'

import { tenant } from '../../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const Posters: CollectionConfig = {
  slug: 'posters',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'createdAt', 'updatedAt', 'alt'],
  },
  access: {
    read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: 'date',
      label: 'Day of Event',
      type: 'date',
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      defaultValue: 'Poster for event',
      required: false,
    },
    tenant,
  ],
}
