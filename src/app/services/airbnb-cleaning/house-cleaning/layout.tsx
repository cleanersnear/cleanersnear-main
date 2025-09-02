import { metadata as pageMetadata } from './metadata'
import { getHouseCleaningSchema } from './schema'

export const metadata = pageMetadata

export default function HouseCleaningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getHouseCleaningSchema()),
        }}
      />
      {children}
    </>
  )
}
