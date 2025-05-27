import Script from 'next/script'
import { getLocalBusinessSchema } from '../schema'

export default function SchemaScript({ suburb }: { suburb: string }) {
  const schema = getLocalBusinessSchema(suburb)
  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
} 