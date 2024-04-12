import type { CollectionConfig } from 'payload/types'

import richText from '../../fields/richText'
import { tenant } from '../../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'
import formatSlug from './hooks/formatSlug'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
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
    {
      name: 'poster',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    tenant,
  ],
}