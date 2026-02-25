import { Component, inject, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SiteConfigService } from '../../services/site-config.service';
import { SectionHeaderComponent } from '../section-header/section-header.component';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionHeaderComponent],
  template: `
    <section id="contact" class="contact-section" [attr.aria-labelledby]="'contact-title'">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <div class="contact-intro">
              <app-section-header
                [title]="contact.sectionTitle"
                [subtitle]="contact.sectionSubtitle"
                [centered]="false">
              </app-section-header>
              
              <div class="contact-description">
                <p class="lead-text">Ready to transform your business? Let's discuss your project and explore how we can help you achieve your goals.</p>
                <div class="contact-highlights" role="list" aria-label="Our service highlights">
                  <div class="highlight-item" role="listitem">
                    <div class="highlight-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 4 12 14.01 9 11.01"/>
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      </svg>
                    </div>
                    <span>Free consultation</span>
                  </div>
                  <div class="highlight-item" role="listitem">
                    <div class="highlight-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <span>24hr response time</span>
                  </div>
                  <div class="highlight-item" role="listitem">
                    <div class="highlight-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 12l2 2 4-4"/>
                        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.5 0 4.73 1.02 6.36 2.67"/>
                      </svg>
                    </div>
                    <span>Custom solutions</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="contact-details" role="region" aria-label="Contact information">
              <a [href]="'mailto:' + contact.email" class="contact-item" [attr.aria-label]="'Send email to ' + contact.email">
                <div class="contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div class="contact-text">
                  <span class="contact-label">Email</span>
                  <span class="contact-value">{{ contact.email }}</span>
                </div>
              </a>
              
              <a [href]="'tel:' + contact.phone" class="contact-item" [attr.aria-label]="'Call us at ' + contact.phone">
                <div class="contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div class="contact-text">
                  <span class="contact-label">Phone</span>
                  <span class="contact-value">{{ contact.phone }}</span>
                </div>
              </a>
              
              <div class="contact-item">
                <div class="contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div class="contact-text">
                  <span class="contact-label">Location</span>
                  <span class="contact-value">{{ contact.address }}</span>
                </div>
              </div>
            </div>
            
            <div class="social-links" role="region" aria-label="Social media links">
              <span class="social-label">Follow Us</span>
              <div class="social-icons">
                @for (social of contact.social; track social.platform) {
                  <a 
                    [href]="social.url" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="social-link" 
                    [attr.aria-label]="'Follow us on ' + social.platform">
                    <ng-container [ngSwitch]="social.platform">
                      <svg *ngSwitchCase="'facebook'" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <svg *ngSwitchCase="'instagram'" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <svg *ngSwitchCase="'linkedin'" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <svg *ngSwitchCase="'twitter'" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </ng-container>
                  </a>
                }
              </div>
            </div>
          </div>
          
          <div class="contact-form-wrapper">
            <div class="contact-form">
              <div class="form-header">
                <h3 class="form-title">Send us a message</h3>
                <p class="form-subtitle">Tell us about your project and we'll get back to you within 24 hours.</p>
              </div>
              
              <!-- Loading State -->
              <div class="form-loading" [class.hidden]="!isSubmitting()" [attr.aria-hidden]="!isSubmitting()">
                <div class="loading-spinner"></div>
                <p class="loading-text">Sending message...</p>
              </div>
              
              <!-- Success State -->
              <div class="form-success" [class.hidden]="!isSuccess()" [attr.aria-hidden]="!isSuccess()">
                <div class="success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <h4 class="success-title">Message sent successfully!</h4>
                <p class="success-message">Thank you for your message. We'll get back to you within 24 hours.</p>
                <button class="btn btn-primary" (click)="resetForm()">Send Another Message</button>
              </div>
              
              <!-- Error State -->
              <div class="form-error" [class.hidden]="!hasError()" [attr.aria-hidden]="!hasError()">
                <div class="error-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </div>
                <h4 class="error-title">Unable to send message</h4>
                <p class="error-message">{{ errorMessage() || 'Please try again or contact us directly at ' + contact.email }}</p>
                <button class="btn btn-outline-primary" (click)="resetError()">Try Again</button>
              </div>
              
              <!-- Contact Form -->
              <form class="contact-form-fields" [formGroup]="contactForm" (ngSubmit)="onSubmit()" [class.hidden]="isSuccess() || hasError()">
                <div class="form-row">
                  <div class="form-group">
                    <label for="name" class="form-label">Full Name *</label>
                    <input 
                      id="name"
                      type="text"
                      formControlName="name"
                      class="form-control"
                      [class.invalid]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched"
                      placeholder="Enter your full name"
                      required
                    />
                    @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
                      <span class="form-error-text">Name is required</span>
                    }
                  </div>
                  
                  <div class="form-group">
                    <label for="email" class="form-label">Email Address *</label>
                    <input 
                      id="email"
                      type="email"
                      formControlName="email"
                      class="form-control"
                      [class.invalid]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched"
                      placeholder="Enter your email address"
                      required
                    />
                    @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                      <span class="form-error-text">
                        @if (contactForm.get('email')?.errors?.['required']) {
                          Email is required
                        } @else if (contactForm.get('email')?.errors?.['email']) {
                          Please enter a valid email address
                        }
                      </span>
                    }
                  </div>
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="phone" class="form-label">Phone Number</label>
                    <input 
                      id="phone"
                      type="tel"
                      formControlName="phone"
                      class="form-control"
                      placeholder="Enter your phone number (optional)"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="company" class="form-label">Company</label>
                    <input 
                      id="company"
                      type="text"
                      formControlName="company"
                      class="form-control"
                      placeholder="Enter your company name (optional)"
                    />
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="subject" class="form-label">Subject *</label>
                  <select 
                    id="subject"
                    formControlName="subject"
                    class="form-control"
                    [class.invalid]="contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched"
                    required
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="content-creation">Content Creation</option>
                    <option value="brand-identity">Brand Identity</option>
                    <option value="web-development">Web Development</option>
                    <option value="social-media">Social Media Management</option>
                    <option value="consultation">Free Consultation</option>
                    <option value="other">Other</option>
                  </select>
                  @if (contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched) {
                    <span class="form-error-text">Please select a subject</span>
                  }
                </div>
                
                <div class="form-group">
                  <label for="message" class="form-label">Message *</label>
                  <textarea 
                    id="message"
                    formControlName="message"
                    class="form-control"
                    [class.invalid]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"
                    rows="5"
                    placeholder="Tell us about your project, goals, and how we can help you..."
                    required
                  ></textarea>
                  @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                    <span class="form-error-text">Message is required</span>
                  }
                </div>
                
                <div class="form-group checkbox-group">
                  <label class="checkbox-label">
                    <input 
                      type="checkbox"
                      formControlName="newsletter"
                      class="form-checkbox"
                    />
                    <span class="checkbox-mark"></span>
                    <span class="checkbox-text">I'd like to receive updates about your services and special offers</span>
                  </label>
                </div>
                
                <button 
                  type="submit"
                  class="btn btn-primary btn-lg btn-block"
                  [disabled]="contactForm.invalid || isSubmitting()"
                >
                  @if (isSubmitting()) {
                    <span class="btn-spinner"></span>
                    Sending...
                  } @else {
                    Send Message
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      padding: 100px 2rem;
      background: var(--bg-secondary);
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 5rem;
      align-items: start;
    }

    .contact-info {
      position: sticky;
      top: 2rem;
    }

    .contact-intro {
      margin-bottom: 3rem;
    }

    .contact-description {
      margin-top: 2rem;
    }

    .lead-text {
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--text-secondary);
      margin: 0 0 2rem 0;
      font-weight: 400;
    }

    .contact-highlights {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .highlight-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.95rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    .highlight-icon {
      width: 20px;
      height: 20px;
      color: var(--success-color);
      flex-shrink: 0;
    }

    .highlight-icon svg {
      width: 100%;
      height: 100%;
    }

    .contact-details {
      margin: 2.5rem 0 3rem;
    }

    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.25rem;
      margin-bottom: 1rem;
      background: var(--card-bg);
      border-radius: 1rem;
      text-decoration: none;
      transition: all var(--transition-base);
      border: 1px solid transparent;
    }

    .contact-item:hover {
      background: var(--primary-bg);
      border-color: var(--primary);
      transform: translateX(4px);
      box-shadow: 0 8px 25px rgba(var(--primary-rgb), 0.15);
    }

    .contact-item:hover .contact-icon {
      color: var(--primary);
      transform: scale(1.1);
    }

    .contact-item:last-child {
      margin-bottom: 0;
    }

    .contact-icon {
      width: 48px;
      height: 48px;
      background: var(--hover-bg);
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
      transition: all var(--transition-base);
      flex-shrink: 0;
    }

    .contact-icon svg {
      width: 24px;
      height: 24px;
    }

    .contact-text {
      flex: 1;
      min-width: 0;
    }

    .contact-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 0.25rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .contact-value {
      display: block;
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-primary);
      word-break: break-word;
    }

    .social-links {
      background: var(--card-bg);
      padding: 1.5rem;
      border-radius: 1rem;
      border: 1px solid var(--border-color);
    }

    .social-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .social-icons {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .social-link {
      width: 48px;
      height: 48px;
      background: var(--hover-bg);
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      text-decoration: none;
      transition: all var(--transition-base);
      border: 1px solid transparent;
    }

    .social-link:hover {
      background: var(--primary);
      color: white;
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 8px 25px rgba(var(--primary-rgb), 0.3);
      border-color: var(--primary-dark);
    }

    .social-link svg {
      width: 20px;
      height: 20px;
    }

    .contact-form-wrapper {
      background: var(--card-bg);
      border-radius: 1.5rem;
      padding: 0;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
      border: 1px solid var(--border-color);
      overflow: hidden;
      transition: all var(--transition-base);
      position: relative;
    }

    .contact-form-wrapper:hover {
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    .contact-form {
      position: relative;
    }

    .form-header {
      padding: 2.5rem 2.5rem 1.5rem;
      border-bottom: 1px solid var(--border-color);
      background: linear-gradient(135deg, var(--primary-bg) 0%, rgba(255, 255, 255, 0.8) 100%);
    }

    .form-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.5rem 0;
      line-height: 1.2;
    }

    .form-subtitle {
      font-size: 1rem;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.5;
    }

    .iframe-container {
      position: relative;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }

    .iframe-container.loaded {
      opacity: 1;
    }

    .contact-iframe {
      width: 100%;
      height: 600px;
      border: none;
      display: block;
      transition: all var(--transition-base);
    }

    .iframe-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      text-align: center;
      transition: all var(--transition-base);
    }

    .iframe-loading.hidden {
      display: none;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--border-color);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    .loading-text {
      color: var(--text-secondary);
      font-size: 1rem;
      margin: 0;
    }

    .iframe-error {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      text-align: center;
      transition: all var(--transition-base);
    }

    .iframe-error.hidden {
      display: none;
    }

    .error-icon {
      width: 48px;
      height: 48px;
      color: var(--danger-color);
      margin-bottom: 1rem;
    }

    .error-icon svg {
      width: 100%;
      height: 100%;
    }

    .error-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 0.5rem 0;
    }

    .error-message {
      color: var(--text-secondary);
      margin: 0 0 1.5rem 0;
      line-height: 1.5;
    }

    .contact-form-fields {
      padding: 2.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      margin-top: 1rem;
    }

    .form-group.checkbox-group {
      margin-bottom: 1rem;
      margin-top: 1rem;
    }

    .form-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
      line-height: 1.2;
    }

    .form-control {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      color: var(--text-primary);
      background: var(--input-bg);
      transition: all var(--transition-base);
      outline: none;
      resize: vertical;
    }

    .form-control:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
      background: var(--card-bg);
    }

    .form-control:hover:not(:focus) {
      border-color: var(--text-muted);
    }

    .form-control.invalid {
      border-color: var(--danger-color);
      background: var(--danger-bg);
    }

    .form-control.invalid:focus {
      border-color: var(--danger-color);
      box-shadow: 0 0 0 3px rgba(var(--danger-rgb), 0.1);
    }

    .form-control::placeholder {
      color: var(--placeholder-color);
    }

    .form-error-text {
      font-size: 0.75rem;
      color: var(--danger-color);
      margin-top: 0.5rem;
      display: block;
    }

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      cursor: pointer;
      font-size: 0.875rem;
      line-height: 1.5;
      user-select: none;
    }

    .form-checkbox {
      opacity: 0;
      position: absolute;
      pointer-events: none;
    }

    .checkbox-mark {
      width: 18px;
      height: 18px;
      border: 2px solid var(--border-color);
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-base);
      flex-shrink: 0;
      margin-top: 2px;
    }

    .checkbox-mark::after {
      content: '';
      width: 10px;
      height: 10px;
      background: var(--primary);
      border-radius: 0.125rem;
      transform: scale(0);
      transition: transform var(--transition-fast);
    }

    .form-checkbox:checked + .checkbox-mark {
      border-color: var(--primary);
      background: var(--primary-bg);
    }

    .form-checkbox:checked + .checkbox-mark::after {
      transform: scale(1);
    }

    .checkbox-label:hover .checkbox-mark {
      border-color: var(--primary);
    }

    .checkbox-text {
      color: var(--text-secondary);
    }

    .btn-block {
      width: 100%;
      justify-content: center;
    }

    .btn-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 0.5rem;
    }

    .form-loading,
    .form-success,
    .form-error {
      padding: 3rem 2.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
    }

    .form-loading {
      background: var(--hover-bg);
    }

    .form-success {
      background: var(--success-bg);
    }

    .form-error {
      background: var(--danger-bg);
    }

    .success-icon {
      width: 64px;
      height: 64px;
      color: var(--success-color);
      margin-bottom: 1.5rem;
    }

    .success-icon svg {
      width: 100%;
      height: 100%;
    }

    .success-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.75rem 0;
    }

    .success-message {
      color: var(--text-secondary);
      margin: 0 0 2rem 0;
      line-height: 1.6;
      max-width: 300px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 1024px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
      }

      .contact-info {
        position: static;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    @media (max-width: 768px) {
      .contact-grid {
        gap: 2rem;
      }

      .contact-form-fields {
        padding: 2rem 1.5rem;
      }
    }

    @media (max-width: 640px) {
      .contact-section {
        padding: 60px 1rem;
      }

      .contact-form-wrapper {
        border-radius: 1rem;
      }

      .form-header {
        padding: 2rem 1.5rem 1.25rem;
      }

      .form-title {
        font-size: 1.5rem;
      }
      
      .contact-form-fields {
        padding: 1.5rem;
      }

      .contact-item {
        padding: 1rem;
      }

      .contact-icon {
        width: 40px;
        height: 40px;
      }

      .contact-icon svg {
        width: 20px;
        height: 20px;
      }

      .social-link {
        width: 44px;
        height: 44px;
      }

      .social-link svg {
        width: 18px;
        height: 18px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSectionComponent implements OnInit {
  private configService = inject(SiteConfigService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  contact = this.configService.getContact();
  
  // Form states
  isSubmitting = signal(false);
  isSuccess = signal(false);
  hasError = signal(false);
  errorMessage = signal<string>('');

  // Contact form
  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    company: [''],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
    newsletter: [false]
  });

  // TODO: Replace with your actual endpoint
  private readonly FORM_ENDPOINT = 'https://your-api-endpoint.com/contact';

  ngOnInit() {
    // Form is ready immediately, no iframe loading needed
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.hasError.set(false);
    this.errorMessage.set('');

    const formData = this.contactForm.value;
    
    // Add timestamp and form source
    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
      source: 'website-contact-form',
      userAgent: navigator.userAgent
    };

    this.http.post(this.FORM_ENDPOINT, payload).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.isSuccess.set(true);
        this.contactForm.reset();
      },
      error: (error) => {
        this.isSubmitting.set(false);
        this.hasError.set(true);
        this.errorMessage.set(
          error.error?.message || 
          'There was an issue sending your message. Please try again.'
        );
        console.error('Contact form submission error:', error);
      }
    });
  }

  resetForm() {
    this.isSuccess.set(false);
    this.contactForm.reset();
  }

  resetError() {
    this.hasError.set(false);
    this.errorMessage.set('');
  }

  private markFormGroupTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }
}
