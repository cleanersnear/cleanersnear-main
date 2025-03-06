// Define global types
export interface SiteConfig {
  name: string;
  url: string;
  links: {
    facebook: string;
    instagram: string;
  };
  title: {
    template: string;
    default: string;
    services: string
  };
  description: {
    default: string;
    services: string;
    locations: string;
  };
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
} 