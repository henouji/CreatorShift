import { Component, Input, forwardRef, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="input-wrapper" [class.input-wrapper--error]="hasError" [class.input-wrapper--disabled]="disabled">
      @if (label) {
        <label class="input-wrapper__label" [for]="inputId">
          {{ label }}
          @if (required) {
            <span class="input-wrapper__required">*</span>
          }
        </label>
      }
      
      <div class="input-wrapper__container">
        @if (prefixIcon) {
          <span class="input-wrapper__prefix">{{ prefixIcon }}</span>
        }
        
        <input
          [id]="inputId"
          [type]="currentType()"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readonly]="readonly"
          [value]="value"
          (input)="onInput($event)"
          (blur)="onTouched()"
          class="input-wrapper__input"
          [class.input-wrapper__input--has-prefix]="prefixIcon"
          [class.input-wrapper__input--has-suffix]="suffixIcon || type === 'password'"
        />
        
        @if (type === 'password') {
          <button
            type="button"
            class="input-wrapper__toggle"
            (click)="togglePasswordVisibility()"
            tabindex="-1"
          >
            {{ showPassword() ? '👁️' : '👁️‍🗨️' }}
          </button>
        }
        
        @if (suffixIcon && type !== 'password') {
          <span class="input-wrapper__suffix">{{ suffixIcon }}</span>
        }
      </div>
      
      @if (hasError && errorMessage) {
        <span class="input-wrapper__error">{{ errorMessage }}</span>
      }
      
      @if (hint && !hasError) {
        <span class="input-wrapper__hint">{{ hint }}</span>
      }
    </div>
  `,
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() inputId = `input-${Math.random().toString(36).substring(2, 9)}`;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() hasError = false;
  @Input() errorMessage?: string;
  @Input() hint?: string;
  @Input() prefixIcon?: string;
  @Input() suffixIcon?: string;

  value = '';
  showPassword = signal(false);
  currentType = signal<InputType>('text');

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    this.currentType.set(this.type);
  }

  ngOnInit(): void {
    this.currentType.set(this.type);
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(show => !show);
    this.currentType.set(this.showPassword() ? 'text' : 'password');
  }
}
