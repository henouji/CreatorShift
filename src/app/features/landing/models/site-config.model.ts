export interface Brand {
  name: string;
  logo: string;
  tagline: string;
}

export interface NavLink {
  label: string;
  path: string;
  fragment?: string;
}

export interface CtaButton {
  label: string;
  link: string;
}

export interface Navigation {
  links: NavLink[];
  ctaButton: CtaButton;
}

export interface HeroSection {
  headline: string;
  subheadline: string;
  primaryCta: CtaButton;
  secondaryCta: CtaButton;
  backgroundImage: string | null;
  featuredImage: string | null;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

export interface ServicesSection {
  sectionTitle: string;
  sectionSubtitle: string;
  items: ServiceItem[];
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  client: string;
  image: string;
  description: string;
}

export interface PortfolioSection {
  sectionTitle: string;
  sectionSubtitle: string;
  categories: string[];
  items: PortfolioItem[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface StatsSection {
  items: StatItem[];
}

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface AboutSection {
  sectionTitle: string;
  sectionSubtitle: string;
  headline: string;
  description: string;
  image: string;
  values: ValueItem[];
}

export interface TestimonialItem {
  id: number;
  content: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

export interface TestimonialsSection {
  sectionTitle: string;
  sectionSubtitle: string;
  items: TestimonialItem[];
}

export interface CtaSection {
  headline: string;
  subheadline: string;
  buttonLabel: string;
  buttonLink: string;
  backgroundImage: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  required: boolean;
  options?: string[];
}

export interface ContactSection {
  sectionTitle: string;
  sectionSubtitle: string;
  email: string;
  phone: string;
  address: string;
  social: SocialLink[];
  formFields: FormField[];
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterSection {
  copyright: string;
  links: FooterLink[];
}

export interface SiteConfig {
  brand: Brand;
  navigation: Navigation;
  hero: HeroSection;
  services: ServicesSection;
  portfolio: PortfolioSection;
  stats: StatsSection;
  about: AboutSection;
  testimonials: TestimonialsSection;
  cta: CtaSection;
  contact: ContactSection;
  footer: FooterSection;
}
