import { metadata as pageMetadata } from './metadata'
import { getMelbourneLocalBusinessSchema } from './schema'

export const metadata = pageMetadata

export default function MelbourneAirbnbCleaningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getMelbourneLocalBusinessSchema()),
        }}
      />
      {children}
    </>
  )
}
