import { Injectable, signal } from '@angular/core';
import { SiteConfig } from '../models/site-config.model';
import siteConfigData from '../config/site-config.json';

@Injectable({
  providedIn: 'root'
})
export class SiteConfigService {
  private config = signal<SiteConfig>(siteConfigData as SiteConfig);

  getConfig() {
    return this.config;
  }

  getBrand() {
    return this.config().brand;
  }

  getNavigation() {
    return this.config().navigation;
  }

  getHero() {
    return this.config().hero;
  }

  getServices() {
    return this.config().services;
  }

  getPortfolio() {
    return this.config().portfolio;
  }

  getStats() {
    return this.config().stats;
  }

  getAbout() {
    return this.config().about;
  }

  getTestimonials() {
    return this.config().testimonials;
  }

  getCta() {
    return this.config().cta;
  }

  getContact() {
    return this.config().contact;
  }

  getFooter() {
    return this.config().footer;
  }

  updateConfig(newConfig: Partial<SiteConfig>) {
    this.config.update(current => ({ ...current, ...newConfig }));
  }
}
