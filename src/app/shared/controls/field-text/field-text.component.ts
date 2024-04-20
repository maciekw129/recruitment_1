import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControlAbstract} from "../form-control.abstract";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-field-text',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './field-text.component.html',
  styleUrl: './field-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldTextComponent extends FormControlAbstract<string>{}
