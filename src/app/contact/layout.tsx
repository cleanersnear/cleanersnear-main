import { metadata as pageMetadata } from './metadata'

export const metadata = pageMetadata

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 