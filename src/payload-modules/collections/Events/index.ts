import type { CollectionConfig } from 'payload/types'

import { tenant } from '../../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    hidden: true,
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      label: 'Day of Event',
      type: 'date',
      required: true,
    },
    {
      name: 'startTime',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'h:mm:ss a',
        },
      },
    },
    {
      name: 'endTime',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'h:mm:ss a',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    tenant,
  ],
}
