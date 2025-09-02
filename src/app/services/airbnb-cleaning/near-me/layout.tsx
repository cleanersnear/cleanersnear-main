import { metadata as pageMetadata } from './metadata'
import { getNearMeSchema } from './schema'

export const metadata = pageMetadata

export default function NearMeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getNearMeSchema()),
        }}
      />
      {children}
    </>
  )
}
