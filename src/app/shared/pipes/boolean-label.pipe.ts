import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanLabel',
  standalone: true
})
export class BooleanLabelPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Tak' : 'Nie';
  }
}
