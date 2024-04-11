import type { CollectionConfig } from 'payload/types'

import richText from '../../fields/richText'
import { tenant } from '../../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'
import formatSlug from './hooks/formatSlug'

export const Media: CollectionConfig = {
  slug: 'media',
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
      name: 'alt',
      type: 'text',
      required: true,
    },
    tenant,
  ],
  upload: {
    disableLocalStorage: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      // {
      //   name: 'card',
      //   width: 768,
      //   height: 1024,
      //   position: 'centre',
      // },
      {
        name: 'tablet',
        width: 1024,
        // By specifying `undefined` or leaving a height undefined,
        // the image will be sized to a certain width,
        // but it will retain its original aspect ratio
        // and calculate a height automatically.
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
    adminThumbnail: 'thumbnail',
  },
}
