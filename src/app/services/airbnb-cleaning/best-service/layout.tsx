import { metadata as pageMetadata } from './metadata'
import { getBestServiceSchema } from './schema'

export const metadata = pageMetadata

export default function BestServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBestServiceSchema()),
        }}
      />
      {children}
    </>
  )
}
