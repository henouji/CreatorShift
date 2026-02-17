import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true
})
export class InitialsPipe implements PipeTransform {
  transform(value: string | null | undefined, maxInitials: number = 2): string {
    if (!value) return '';

    const parts = value.trim().split(/\s+/);
    
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    const initials = parts
      .slice(0, maxInitials)
      .map(part => part.charAt(0).toUpperCase())
      .join('');

    return initials;
  }
}
