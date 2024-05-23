import path from 'path'
import { en } from 'payload/i18n/en'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload/config'
import { fileURLToPath } from 'url'
import { Users } from '@/payload-modules/collections/Users'
import { Pages } from '@/payload-modules/collections/Pages'
import { Events } from '@/payload-modules/collections/Events'
import { Tenants } from '@/payload-modules/collections/Tenants'
import { seed } from '@/payload-modules/seed'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Users, Tenants, Pages, Events],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  i18n: {
    supportedLanguages: { en },
  },
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      await seed(payload)
      await payload.create({
        collection: 'users',
        data: {
          email: 'dev@payloadcms.com',
          password: 'test',
          roles: ['super-admin'],
        },
      })
    }
  },
})
