import {
  ChangeDetectionStrategy,
  Component,
  computed, effect,
  EventEmitter,
  input,
  OnInit,
  Output,
  signal,
  TemplateRef
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, ValidatorFn} from "@angular/forms";
import {ButtonComponent} from "../../button/button.component";
import {SelectOption} from "../../../controls/field-select/field-select.model";
import {FieldTextComponent} from "../../../controls/field-text/field-text.component";
import {FormSubmitDirective} from "../../../controls/directives/form-submit.directive";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {FieldSelectComponent} from "../../../controls/field-select/field-select.component";
import {EmployeesFormValidators} from "../../../../modules/employees/employees-form/employees-form.validators";
import {FieldNumberComponent} from "../../../controls/field-number/field-number.component";
import {CheckboxComponent} from "../../../controls/checkbox/checkbox.component";

@Component({
  selector: 'app-editable-cell',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    FieldTextComponent,
    FormSubmitDirective,
    NgIf,
    NgTemplateOutlet,
    FieldSelectComponent,
    FieldNumberComponent,
    CheckboxComponent
  ],
  templateUrl: './editable-cell.component.html',
  styleUrl: './editable-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableCellComponent<T> implements OnInit {
  public value = input<T>();
  public options = input<SelectOption<T>[]>([]);
  public readonlyTemplate = input<TemplateRef<any> | null>(null);
  public validators = input<ValidatorFn[]>([]);
  public controlType = input<'text' | 'number' | 'select'>('text');
  public separatorLimit = input('');

  @Output() valueChange = new EventEmitter<T>();

  public form!: FormGroup<{value: FormControl}>;
  public isEditMode = signal(false);

  ngOnInit() {
    this.form = new FormGroup({
      value: new FormControl<T | null>(this.value() ?? null, {validators: [EmployeesFormValidators.minAgeValidator()]})
    })
  }


  public setEditMode(value: boolean): void {
    if(!value) {
      this.control.reset(this.value())
    }
    this.isEditMode.set(value);
  }

  public submit(): void {
    if(this.control.invalid) {
      return;
    }

    const value = this.control.getRawValue();

    if(value !== null) {
      this.valueChange.emit(value);
    }
  }

  get control() {
    return this.form.controls.value;
  }
}
