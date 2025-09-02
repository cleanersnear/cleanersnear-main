import { metadata as pageMetadata } from './metadata'
import { getServiceAreasSchema } from './schema'

export const metadata = pageMetadata

export default function ServiceAreasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getServiceAreasSchema()),
        }}
      />
      {children}
    </>
  )
}
