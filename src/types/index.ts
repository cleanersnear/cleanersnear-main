// Define global types
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  links: {
    facebook: string;
    instagram: string;
  }
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
} 