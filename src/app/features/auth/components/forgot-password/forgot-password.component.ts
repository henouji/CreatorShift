import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, NotificationService } from '../../../../core';
import { ButtonComponent, InputComponent, AlertComponent } from '../../../../shared/components';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    AlertComponent
  ],
  template: `
    <div class="forgot-password">
      @if (!emailSent()) {
        <div class="forgot-password__header">
          <h1 class="forgot-password__title">Forgot password?</h1>
          <p class="forgot-password__subtitle">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        @if (errorMessage()) {
          <app-alert 
            type="error" 
            [message]="errorMessage()" 
            [dismissible]="true"
            (dismissed)="errorMessage.set('')"
          />
        }

        <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" class="forgot-password__form">
          <div class="forgot-password__field">
            <app-input
              label="Email"
              type="email"
              placeholder="Enter your email"
              formControlName="email"
              [hasError]="isFieldInvalid('email')"
              [errorMessage]="getFieldError('email')"
              [required]="true"
            />
          </div>

          <app-button
            type="submit"
            variant="primary"
            [fullWidth]="true"
            [loading]="isLoading()"
            [disabled]="forgotPasswordForm.invalid"
          >
            Send Reset Link
          </app-button>
        </form>
      } @else {
        <div class="forgot-password__success">
          <div class="forgot-password__success-icon">✉️</div>
          <h1 class="forgot-password__title">Check your email</h1>
          <p class="forgot-password__subtitle">
            We've sent a password reset link to<br />
            <strong>{{ submittedEmail() }}</strong>
          </p>
          <p class="forgot-password__hint">
            Didn't receive the email? Check your spam folder or
            <button type="button" (click)="resetForm()" class="forgot-password__resend">
              try again
            </button>
          </p>
        </div>
      }

      <a routerLink="/auth/login" class="forgot-password__back">
        ← Back to login
      </a>
    </div>
  `,
  styles: [`
    .forgot-password {
      max-width: 400px;

      &__header {
        margin-bottom: 2rem;
      }

      &__title {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--text-color);
        margin: 0 0 0.5rem;
      }

      &__subtitle {
        font-size: 0.9375rem;
        color: var(--text-muted);
        margin: 0;
        line-height: 1.5;

        strong {
          color: var(--text-color);
        }
      }

      &__form {
        margin-top: 1.5rem;
      }

      &__field {
        margin-bottom: 1.5rem;
      }

      &__success {
        text-align: center;
        margin-bottom: 2rem;
      }

      &__success-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      &__hint {
        font-size: 0.875rem;
        color: var(--text-muted);
        margin-top: 1.5rem;
      }

      &__resend {
        background: none;
        border: none;
        color: var(--primary-color);
        cursor: pointer;
        font-size: inherit;
        text-decoration: underline;

        &:hover {
          text-decoration: none;
        }
      }

      &__back {
        display: inline-flex;
        align-items: center;
        margin-top: 1.5rem;
        font-size: 0.875rem;
        color: var(--text-muted);
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
          color: var(--primary-color);
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);

  isLoading = signal(false);
  errorMessage = signal('');
  emailSent = signal(false);
  submittedEmail = signal('');

  forgotPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const email = this.forgotPasswordForm.get('email')?.value;

    this.authService.forgotPassword({ email }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.submittedEmail.set(email);
        this.emailSent.set(true);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message || 'Failed to send reset link. Please try again.');
      }
    });
  }

  resetForm(): void {
    this.emailSent.set(false);
    this.forgotPasswordForm.reset();
  }

  isFieldInvalid(field: string): boolean {
    const control = this.forgotPasswordForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  getFieldError(field: string): string {
    const control = this.forgotPasswordForm.get(field);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) return 'Email is required';
    if (control.errors['email']) return 'Please enter a valid email';
    return '';
  }
}
