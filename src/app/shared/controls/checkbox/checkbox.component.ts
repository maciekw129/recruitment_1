import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControlAbstract} from "../form-control.abstract";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent extends FormControlAbstract<boolean>{}
