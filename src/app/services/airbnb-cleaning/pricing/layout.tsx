import { metadata as pageMetadata } from './metadata'
import { getPricingSchema } from './schema'

export const metadata = pageMetadata

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPricingSchema()),
        }}
      />
      {children}
    </>
  )
}
