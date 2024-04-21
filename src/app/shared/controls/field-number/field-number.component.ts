import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {FormControlAbstract} from "../form-control.abstract";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskDirective} from "ngx-mask";
import {ControlErrorDirective} from "../control-error.directive";

@Component({
  selector: 'app-field-number',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ControlErrorDirective,
    NgxMaskDirective
  ],
  templateUrl: './field-number.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldNumberComponent extends FormControlAbstract<number>{
  public placeholder = input<string>('');
  public decimalPlaces = input<number>(2);
  public separatorLimit = input<string>('');

  public mask = computed(() => `separator.${this.decimalPlaces()}`);
}
