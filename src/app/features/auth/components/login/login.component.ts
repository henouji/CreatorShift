import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, NotificationService } from '../../../../core';
import { ButtonComponent, InputComponent, AlertComponent } from '../../../../shared/components';

@Component({
  selector: 'app-login',
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
    <div class="login">
      <div class="login__header">
        <h1 class="login__title">Welcome back</h1>
        <p class="login__subtitle">Sign in to your account to continue</p>
      </div>

      @if (errorMessage()) {
        <app-alert 
          type="error" 
          [message]="errorMessage()" 
          [dismissible]="true"
          (dismissed)="errorMessage.set('')"
        />
      }

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login__form">
        <div class="login__field">
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

        <div class="login__field">
          <app-input
            label="Password"
            type="password"
            placeholder="Enter your password"
            formControlName="password"
            [hasError]="isFieldInvalid('password')"
            [errorMessage]="getFieldError('password')"
            [required]="true"
          />
        </div>

        <div class="login__options">
          <label class="login__remember">
            <input type="checkbox" formControlName="rememberMe" />
            <span>Remember me</span>
          </label>
          <a routerLink="/auth/forgot-password" class="login__forgot">
            Forgot password?
          </a>
        </div>

        <app-button
          type="submit"
          variant="primary"
          [fullWidth]="true"
          [loading]="isLoading()"
          [disabled]="loginForm.invalid"
        >
          Sign in
        </app-button>
      </form>

      <div class="login__divider">
        <span>or continue with</span>
      </div>

      <div class="login__social">
        <button type="button" class="login__social-btn">
          <span>G</span>
          Google
        </button>
        <button type="button" class="login__social-btn">
          <span>M</span>
          Microsoft
        </button>
      </div>

      <p class="login__signup">
        Don't have an account?
        <a routerLink="/auth/register">Create one</a>
      </p>
    </div>
  `,
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly notificationService = inject(NotificationService);

  isLoading = signal(false);
  errorMessage = signal('');

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.notificationService.success('Welcome!', 'You have successfully logged in.');
        this.router.navigateByUrl(returnUrl);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message || 'Invalid email or password');
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  getFieldError(field: string): string {
    const control = this.loginForm.get(field);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) return `${this.capitalizeFirst(field)} is required`;
    if (control.errors['email']) return 'Please enter a valid email';
    if (control.errors['minlength']) {
      return `${this.capitalizeFirst(field)} must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
