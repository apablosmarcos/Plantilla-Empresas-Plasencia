export interface SiteConfig {
  companyName: string;
  sector: string;
  tagline: string;
  description: string;
  primaryAction: string;
  apiBaseUrl?: string;
  brand: {
    primary: string;
    accent: string;
    background: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  services: string[];
  highlights: string[];
}
