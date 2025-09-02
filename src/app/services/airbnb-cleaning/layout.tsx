import { metadata as pageMetadata } from './metadata'
import { getLocalBusinessSchema } from './schema'

export const metadata = pageMetadata

export default function AirbnbCleaningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getLocalBusinessSchema()),
        }}
      />
      {children}
    </>
  )
} 