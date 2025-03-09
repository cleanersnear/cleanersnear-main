import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | Cleaning Professionals Melbourne',
  description: "Sorry, the page you're looking for doesn't exist. Explore our professional cleaning services in Melbourne or contact us for assistance.",
  robots: {
    index: false,
    follow: true
  }
}

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 