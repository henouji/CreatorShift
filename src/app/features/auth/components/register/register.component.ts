import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService, NotificationService } from '../../../../core';
import { ButtonComponent, InputComponent, AlertComponent } from '../../../../shared/components';

@Component({
  selector: 'app-register',
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
    <div class="register">
      <div class="register__header">
        <h1 class="register__title">Create an account</h1>
        <p class="register__subtitle">Get started with your free account today</p>
      </div>

      @if (errorMessage()) {
        <app-alert 
          type="error" 
          [message]="errorMessage()" 
          [dismissible]="true"
          (dismissed)="errorMessage.set('')"
        />
      }

      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register__form">
        <div class="register__row">
          <div class="register__field">
            <app-input
              label="First Name"
              type="text"
              placeholder="John"
              formControlName="firstName"
              [hasError]="isFieldInvalid('firstName')"
              [errorMessage]="getFieldError('firstName')"
              [required]="true"
            />
          </div>
          <div class="register__field">
            <app-input
              label="Last Name"
              type="text"
              placeholder="Doe"
              formControlName="lastName"
              [hasError]="isFieldInvalid('lastName')"
              [errorMessage]="getFieldError('lastName')"
              [required]="true"
            />
          </div>
        </div>

        <div class="register__field">
          <app-input
            label="Email"
            type="email"
            placeholder="john.doe@example.com"
            formControlName="email"
            [hasError]="isFieldInvalid('email')"
            [errorMessage]="getFieldError('email')"
            [required]="true"
          />
        </div>

        <div class="register__field">
          <app-input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            formControlName="password"
            [hasError]="isFieldInvalid('password')"
            [errorMessage]="getFieldError('password')"
            [required]="true"
          />
          <div class="register__password-requirements">
            <span [class.valid]="hasMinLength()">8+ characters</span>
            <span [class.valid]="hasUppercase()">Uppercase</span>
            <span [class.valid]="hasLowercase()">Lowercase</span>
            <span [class.valid]="hasNumber()">Number</span>
          </div>
        </div>

        <div class="register__field">
          <app-input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            formControlName="confirmPassword"
            [hasError]="isFieldInvalid('confirmPassword')"
            [errorMessage]="getFieldError('confirmPassword')"
            [required]="true"
          />
        </div>

        <div class="register__terms">
          <label class="register__checkbox">
            <input type="checkbox" formControlName="acceptTerms" />
            <span>
              I agree to the
              <a routerLink="/terms" target="_blank">Terms of Service</a>
              and
              <a routerLink="/privacy" target="_blank">Privacy Policy</a>
            </span>
          </label>
          @if (isFieldInvalid('acceptTerms')) {
            <span class="register__error">You must accept the terms and conditions</span>
          }
        </div>

        <app-button
          type="submit"
          variant="primary"
          [fullWidth]="true"
          [loading]="isLoading()"
          [disabled]="registerForm.invalid"
        >
          Create Account
        </app-button>
      </form>

      <p class="register__signin">
        Already have an account?
        <a routerLink="/auth/login">Sign in</a>
      </p>
    </div>
  `,
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);

  isLoading = signal(false);
  errorMessage = signal('');

  registerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
    confirmPassword: ['', [Validators.required]],
    acceptTerms: [false, [Validators.requiredTrue]]
  }, { validators: this.passwordMatchValidator });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.notificationService.success('Account Created!', 'Welcome to Automation.');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message || 'Registration failed. Please try again.');
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  getFieldError(field: string): string {
    const control = this.registerForm.get(field);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) return `${this.formatFieldName(field)} is required`;
    if (control.errors['email']) return 'Please enter a valid email';
    if (control.errors['minlength']) {
      return `${this.formatFieldName(field)} must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    if (control.errors['passwordMismatch']) return 'Passwords do not match';
    if (control.errors['passwordStrength']) return 'Password must contain uppercase, lowercase, and number';
    return '';
  }

  hasMinLength(): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return password.length >= 8;
  }

  hasUppercase(): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return /[A-Z]/.test(password);
  }

  hasLowercase(): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return /[a-z]/.test(password);
  }

  hasNumber(): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return /\d/.test(password);
  }

  private passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);

    if (!hasUppercase || !hasLowercase || !hasNumber) {
      return { passwordStrength: true };
    }
    return null;
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
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
