import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService, NotificationService } from '../../../../core';
import { ButtonComponent, InputComponent, AlertComponent } from '../../../../shared/components';

@Component({
  selector: 'app-reset-password',
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
    <div class="reset-password">
      <div class="reset-password__header">
        <h1 class="reset-password__title">Reset your password</h1>
        <p class="reset-password__subtitle">
          Enter your new password below.
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

      <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()" class="reset-password__form">
        <div class="reset-password__field">
          <app-input
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            formControlName="newPassword"
            [hasError]="isFieldInvalid('newPassword')"
            [errorMessage]="getFieldError('newPassword')"
            [required]="true"
          />
        </div>

        <div class="reset-password__field">
          <app-input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your new password"
            formControlName="confirmPassword"
            [hasError]="isFieldInvalid('confirmPassword')"
            [errorMessage]="getFieldError('confirmPassword')"
            [required]="true"
          />
        </div>

        <app-button
          type="submit"
          variant="primary"
          [fullWidth]="true"
          [loading]="isLoading()"
          [disabled]="resetPasswordForm.invalid"
        >
          Reset Password
        </app-button>
      </form>

      <a routerLink="/auth/login" class="reset-password__back">
        ← Back to login
      </a>
    </div>
  `,
  styles: [`
    .reset-password {
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
      }

      &__form {
        margin-top: 1.5rem;
      }

      &__field {
        margin-bottom: 1.25rem;
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
export class ResetPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly notificationService = inject(NotificationService);

  isLoading = signal(false);
  errorMessage = signal('');
  private token = '';

  resetPasswordForm: FormGroup = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  constructor() {
    this.token = this.route.snapshot.queryParams['token'] || '';
    
    if (!this.token) {
      this.router.navigate(['/auth/forgot-password']);
    }
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.resetPassword({
      token: this.token,
      newPassword: this.resetPasswordForm.get('newPassword')?.value,
      confirmPassword: this.resetPasswordForm.get('confirmPassword')?.value
    }).subscribe({
      next: () => {
        this.notificationService.success('Password Reset!', 'Your password has been successfully reset.');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message || 'Failed to reset password. Please try again.');
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.resetPasswordForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  getFieldError(field: string): string {
    const control = this.resetPasswordForm.get(field);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) return `${this.formatFieldName(field)} is required`;
    if (control.errors['minlength']) {
      return `${this.formatFieldName(field)} must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    if (control.errors['passwordMismatch']) return 'Passwords do not match';
    return '';
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  private formatFieldName(field: string): string {
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }
}
