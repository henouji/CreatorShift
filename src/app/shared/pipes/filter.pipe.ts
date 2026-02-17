import { Pipe, PipeTransform } from '@angular/core';

type SearchableObject = Record<string, unknown>;

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform<T extends SearchableObject>(
    items: T[] | null | undefined,
    searchTerm: string,
    properties: (keyof T)[] = []
  ): T[] {
    if (!items || !searchTerm) {
      return items || [];
    }

    const term = searchTerm.toLowerCase().trim();

    return items.filter(item => {
      if (properties.length === 0) {
        // Search all string properties
        return Object.values(item).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(term)
        );
      }

      // Search specific properties
      return properties.some(prop => {
        const value = item[prop];
        return typeof value === 'string' && value.toLowerCase().includes(term);
      });
    });
  }
}
