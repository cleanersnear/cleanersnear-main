import { metadata as pageMetadata } from './metadata'

export const metadata = pageMetadata

export default function GeneralCleaningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 