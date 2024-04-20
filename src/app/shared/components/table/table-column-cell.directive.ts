import {Directive, inject, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appTableColumnCell]',
  standalone: true
})
export class TableColumnCellDirective {
  @Input({required: true}) column!: string;
  public templateRef = inject(TemplateRef);
}
