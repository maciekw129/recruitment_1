import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FormControlAbstract} from "../form-control.abstract";
import {ReactiveFormsModule} from "@angular/forms";
import {ControlErrorDirective} from "../directives/control-error.directive";

@Component({
  selector: 'app-field-text',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ControlErrorDirective
  ],
  templateUrl: './field-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldTextComponent extends FormControlAbstract<string>{
  public placeholder = input<string>('');
}
