import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {LIMIT, OPTIONS, TITLE, VALIDATION_ERRORS} from "./employees-form.data";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs";
import {EmployeesFormControls, EmployeesFormResolveData} from "./employees-form.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FieldTextComponent} from "../../../shared/controls/field-text/field-text.component";
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FieldNumberComponent} from "../../../shared/controls/field-number/field-number.component";
import {CheckboxComponent} from "../../../shared/controls/checkbox/checkbox.component";
import {FieldSelectComponent} from "../../../shared/controls/field-select/field-select.component";
import {ButtonComponent} from "../../../shared/components/button/button.component";
import {FormSubmitDirective} from "../../../shared/controls/directives/form-submit.directive";
import {EmployeesStateService} from "../employees-state.service";
import {Employee} from "../employees.model";

@Component({
  selector: 'app-employees-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FieldTextComponent,
    FieldNumberComponent,
    CheckboxComponent,
    FieldSelectComponent,
    ButtonComponent,
    FormSubmitDirective
  ],
  templateUrl: './employees-form.component.html',
  styleUrl: './employees-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesFormComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly employeesStateService = inject(EmployeesStateService);
  private readonly router = inject(Router);

  public readonly options = OPTIONS;
  public readonly limit = LIMIT;
  public readonly validationErrors = VALIDATION_ERRORS;

  public form: FormGroup<EmployeesFormControls> = this.buildForm();

  public readonly title = signal<string>('');

  private readonly resolve$ = this.activatedRoute.data.pipe(
    takeUntilDestroyed(this.destroyRef),
    tap((data) => {
      const {mode} = data as EmployeesFormResolveData;

      this.title.set(TITLE[mode]);
    })
  )

  ngOnInit() {
    this.resolve$.subscribe();
  }

  private buildForm(): FormGroup<EmployeesFormControls> {
    return this.fb.group<EmployeesFormControls>({
      id: this.fb.control(crypto.randomUUID()),
      name: this.fb.control('', {validators: Validators.required}),
      age: this.fb.control(null, {validators: [Validators.required, Validators.min(this.limit.age.min)]}),
      isFullTime: this.fb.control(false),
      position: this.fb.control(null, {validators: Validators.required})
    })
  }

  public submit(): void {
    if(this.form.invalid) {
      return
    }

    const newEmployee = this.form.getRawValue() as Employee;

    this.employeesStateService.addEmployee(newEmployee);
    this.navigateBack();
  }

  public navigateBack(): void {
    this.router.navigate(['..']);
  }
}
