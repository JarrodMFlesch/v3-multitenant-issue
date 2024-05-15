import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default withPayload(nextConfig)
