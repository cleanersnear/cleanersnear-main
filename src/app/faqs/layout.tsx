import { metadata as pageMetadata } from './metadata'

export const metadata = pageMetadata

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 