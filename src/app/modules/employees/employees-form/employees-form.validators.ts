import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {LIMIT} from "./employees-form.data";

export class EmployeesFormValidators {
  static minAgeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const age = Number(control?.value);
      return (age < LIMIT.age.min) ? {minAge: true} : null;
    }
  }
}
